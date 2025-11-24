import { run } from "@/lib/runCommand";
import { headers } from "next/headers";
import fs from "fs";
import path from "path";
import { isAdminSession } from "@/lib/cookies";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const cmd = url.searchParams.get("information") || "ls -la";

  const ip = (await headers()).get("x-forwarded-for") || "unknown-ip";
  const userAgent = (await headers()).get("user-agent") || "unknown-ua";

  const log = (status: number) => {
    const logDir = path.join(process.cwd(), "logs");
    if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);
    const logPath = path.join(logDir, "honeypot.log");
    fs.appendFileSync(
      logPath,
      `[${new Date().toISOString()}] IP=${ip} UA="${userAgent}" CMD="${cmd}" accessed /api/shell with Status=${status}\n`
    );
  };

  const adminSession = await isAdminSession();
  if (!adminSession) {
    log(401);
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  log(200);
  const result = await run(cmd);
  return Response.json({ output: result });
}
