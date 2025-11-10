export async function POST(request: Request) {
  const { login, password } = await request.json();

  if (login === "admin" && password === "password123")
    return Response.json(
      {
        success: true,
        message: "Login successful",
        user: { name: "Admin", role: "Administrator" },
      },
      { status: 200 }
    );
  else
    return Response.json(
      { success: false, message: "Invalid credentials" },
      { status: 401 }
    );
}
