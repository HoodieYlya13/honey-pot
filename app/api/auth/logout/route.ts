
import { deleteCookie } from "@/lib/cookies";
import { NextResponse } from "next/server";

export function POST() {
  const response = NextResponse.json({ success: true });
  deleteCookie("session_token", response);
  return response;
}