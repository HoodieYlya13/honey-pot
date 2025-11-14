import { redirect } from "next/navigation";
import Login from "./components/Pages/Login";
import PageBuilder from "./components/PageBuilder";
import { isAdminSession } from "@/lib/cookies";

export default async function Home() {
  const adminSession = await isAdminSession();
  if (adminSession) redirect("/admin");

  return (
    <PageBuilder showAuroraBackground={true}>
      <Login />
    </PageBuilder>
  );
}