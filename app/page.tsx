import { redirect } from "next/navigation";
import Login from "./components/Pages/Login";
import PageLayout from "./components/PageLayout";
import { isAdminSession } from "@/lib/cookies";

export default async function Home() {
  const adminSession = await isAdminSession();
  if (adminSession) redirect("/admin");

  return (
    <PageLayout showAuroraBackground={true}>
      <Login />
    </PageLayout>
  );
}
