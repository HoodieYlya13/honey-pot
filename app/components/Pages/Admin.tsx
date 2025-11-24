"use client";

import { useState, useEffect } from "react";

export default function AdminPage() {
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchWhoAmI() {
      setLoading(true);

      const response = await fetch("/api/shell?information=whoami");
      const data = await response.json();

      const delay = 500 + Math.random() * 1500;

      setTimeout(() => {
        if (cancelled) return;
        setOutput(data.output);
        setLoading(false);
      }, delay);
    }

    fetchWhoAmI();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div>
      {loading ? (
        <p className="text-gray-400 italic">Connecting to internal API…</p>
      ) : (
        <p>Welcome on {output} server!</p>
      )}
    </div>
  );
}