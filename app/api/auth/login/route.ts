import { setServerCookie } from "@/lib/cookies";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";
import { headers } from "next/headers";

export async function POST(request: Request) {
  const { login, password } = await request.json();

  const ip = (await headers()).get("x-forwarded-for") || "unknown-ip";
  const userAgent = (await headers()).get("user-agent") || "unknown-ua";

  const log = (status: number) => {
    const logDir = path.join(process.cwd(), "logs");
    if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);
    const logPath = path.join(logDir, "honeypot.log");
    fs.appendFileSync(
      logPath,
      `[${new Date().toISOString()}] IP=${ip} UA="${userAgent}" CMD="${login}/${password}" accessed /api/auth/login with Status=${status}\n`
    );
  };

  try {
    const user = await prisma.user.findUnique({
      where: { username: login },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      log(200);
      const response = NextResponse.json(
        {
          success: true,
          message: "Login successful",
          user: { name: user.username, role: user.role },
        },
        { status: 200 }
      );
      setServerCookie({
        name: "session_token",
        value:
          "T1lAW9yM9bKzq0xKbh0zbc4pWc7MM6sXx4J3g2MVAWzy0qRAlDliE7AVR4aUUjrw",
        response,
      });
      return response;
    } else {
      log(401);
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Login error:", error);
    log(500);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
