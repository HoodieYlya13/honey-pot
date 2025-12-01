import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export function setServerCookie({
  name,
  value,
  response,
  options = {},
}: {
  name: string;
  value: string;
  response: NextResponse;
  options?: Partial<{
    maxAge: number;
    path: string;
    httpOnly: boolean;
    secure: boolean;
    sameSite: "lax" | "strict" | "none";
  }>;
}) {
  response.cookies.set({
    name,
    value,
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    secure: false,
    sameSite: "lax",
    path: "/",
    ...options,
  });
}

export async function getServerCookie(
  name: string
): Promise<string | undefined> {
  return (await cookies()).get(name)?.value;
}

export async function getSessionToken(): Promise<string | undefined> {
  return await getServerCookie("session_token");
}

export async function isAdminSession(): Promise<boolean> {
  const session = await getSessionToken();
  return (
    session ===
    "T1lAW9yM9bKzq0xKbh0zbc4pWc7MM6sXx4J3g2MVAWzy0qRAlDliE7AVR4aUUjrw"
  );
}

export function deleteCookie(name: string, response: NextResponse) {
  response.cookies.set({
    name,
    value: "",
    path: "/",
    maxAge: 0,
    httpOnly: true,
  });
}