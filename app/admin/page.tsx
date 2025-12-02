import PageLayout from "../components/PageLayout";
import AdminPage from "../components/Pages/Admin";
import { redirect } from "next/navigation";
import { isAdminSession } from "@/lib/cookies";

export default async function Admin() {
  const adminSession = await isAdminSession();
  if (!adminSession) redirect("/");

  return (
    <PageLayout>
      <AdminPage />
    </PageLayout>
  );
}
