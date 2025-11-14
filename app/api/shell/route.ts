import { run } from "@/lib/runCommand";
import { headers } from "next/headers";
import fs from "fs";
import path from "path";
import { isAdminSession } from "@/lib/cookies";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const cmd = url.searchParams.get("information") || "ls -la";

  const adminSession = await isAdminSession();
  if (!adminSession) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const ip = (await headers()).get("x-forwarded-for") || "unknown-ip";
  const userAgent = (await headers()).get("user-agent") || "unknown-ua";
  const logDir = path.join(process.cwd(), "logs");
  if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);
  const logPath = path.join(logDir, "honeypot.log");
  fs.appendFileSync(
    logPath,
    `[${new Date().toISOString()}] IP=${ip} UA="${userAgent}" CMD="${cmd}" accessed /api/shell\n`
  );
  const result = await run(cmd);
  return Response.json({ output: result });
}