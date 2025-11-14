export async function logout() {
  await fetch("/api/auth/logout", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    }
  });
  const isProduction = process.env.NODE_ENV === "production";
  const domain = isProduction
    ? process.env.NEXT_PUBLIC_STORE_DOMAIN
    : "http://localhost:3000";
  window.location.href = `${domain}`;
}