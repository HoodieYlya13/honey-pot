import { cookies } from "next/headers";
import PageBuilder from "../components/PageBuilder";
import AdminPage from "../components/Pages/Admin";
import { redirect } from "next/navigation";

export default async function Admin() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session_token");
  if (
    session?.value !==
    "T1lAW9yM9bKzq0xKbh0zbc4pWc7MM6sXx4J3g2MVAWzy0qRAlDliE7AVR4aUUjrw"
  )
    redirect("/");

  return (
    <PageBuilder>
      <AdminPage />
    </PageBuilder>
  );
}
