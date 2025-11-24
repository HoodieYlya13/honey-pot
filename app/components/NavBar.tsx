import { isAdminSession } from "@/lib/cookies";
import NavBarClient from "./NavBarClient";

export default async function NavBar() {
  const adminSession = await isAdminSession();

  return (
    <header className="fixed w-full z-20 h-20 md:h-30 backdrop-blur-md liquid-glass-background border-b liquid-glass-border-color shadow-sm flex">
      <NavBarClient adminSession={adminSession} />
    </header>
  );
}