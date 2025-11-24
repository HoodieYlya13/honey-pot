import { setServerCookie } from "@/lib/cookies";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const { login, password } = await request.json();

  try {
    const user = await prisma.user.findUnique({
      where: { username: login },
    });

    // FIXME: Password comparison should be done with a secure method (hash for example)
    if (user && user.password === password) {
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
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
