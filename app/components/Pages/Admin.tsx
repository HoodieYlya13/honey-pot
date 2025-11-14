"use client";

import { logout } from "@/lib/logout";
import { useState } from "react";

export default function AdminPage() {
  const [output, setOutput] = useState("");

  async function handleClick() {
    const response = await fetch("/api/shell?information=whoami");
    const data = await response.json();
    setOutput(data.output);
  }

  return (
    <div>
      <button onClick={logout}>Logout</button>
      <button onClick={handleClick}>Get User Info</button>
      <pre className="bg-gray-900 text-green-400 p-4 rounded-md mt-4 whitespace-pre-wrap">
        {output}
      </pre>
    </div>
  );
}
