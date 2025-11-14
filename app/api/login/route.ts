export async function POST(request: Request) {
  const { login, password } = await request.json();

  if (login === "admin" && password === "admin") {
    const response = Response.json(
      {
        success: true,
        message: "Login successful",
        user: { name: "Admin", role: "Administrator" },
      },
      { status: 200 }
    );
    response.headers.append(
      "Set-Cookie",
      `session_token=T1lAW9yM9bKzq0xKbh0zbc4pWc7MM6sXx4J3g2MVAWzy0qRAlDliE7AVR4aUUjrw; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=3600`
    );
    return response;
  } else
    return Response.json(
      { success: false, message: "Invalid credentials" },
      { status: 401 }
    );
}