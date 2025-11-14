import { setServerCookie } from "@/lib/cookies";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { login, password } = await request.json();

  if (login === "admin" && password === "admin") {
    const response = NextResponse.json(
      {
        success: true,
        message: "Login successful",
        user: { name: "Admin", role: "Administrator" },
      },
      { status: 200 }
    );
    setServerCookie({
      name: "session_token",
      value: "T1lAW9yM9bKzq0xKbh0zbc4pWc7MM6sXx4J3g2MVAWzy0qRAlDliE7AVR4aUUjrw",
      response,
    });
    return response;
  } else
    return NextResponse.json(
      { success: false, message: "Invalid credentials" },
      { status: 401 }
    );
}