"use client";

import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import { logout } from "@/lib/logout";

interface NavBarClientProps {
  adminSession?: boolean;
}

export default function NavBarClient({ adminSession = false }: NavBarClientProps) {
  return (
    <nav className="w-full flex items-center justify-between px-4 bg-ultra-dark">
      <Link href="/" className="flex items-center gap-2 md:gap-3">
        <Image
          src="/favicon.png"
          alt="Logo"
          width={40}
          height={40}
          className="size-10 md:size-15"
          priority
        />
        <span>Service Akaby</span>
      </Link>

      {adminSession && <Button onClick={logout} label="Logout" />}
    </nav>
  );
}