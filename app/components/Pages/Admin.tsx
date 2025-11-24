"use client";

import { useState, useEffect } from "react";

type SecretDocument = {
  id: number;
  title: string;
  content: string;
  confidentialityLevel: string;
  createdAt: string;
};

export default function AdminPage() {
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(true);
  const [documents, setDocuments] = useState<SecretDocument[]>([]);
  const [loadingDocs, setLoadingDocs] = useState(true);

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

    async function fetchDocuments() {
      try {
        const res = await fetch("/api/admin/data");
        if (res.ok) {
          const data = await res.json();
          const delay = 500 + Math.random() * 1500;
          setTimeout(() => {
            if (cancelled) return;
            setDocuments(data);
            setLoadingDocs(false);
          }, delay);
        } else {
          if (!cancelled) setLoadingDocs(false);
        }
      } catch (e) {
        console.error("Failed to fetch documents", e);
        if (!cancelled) setLoadingDocs(false);
      }
    }

    fetchWhoAmI();
    fetchDocuments();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="p-8 space-y-8">
      <div className="mt-2">
        {loading ? (
          <p className="text-gray-400 italic animate-pulse">Connecting to internal API…</p>
        ) : (
          <h1 className="text-3xl font-bold text-red-600">
            ADMIN {output} SERVER PANEL
          </h1>
        )}
      </div>

      <div className="liquid-glass p-6 rounded-lg shadow-md border">
        <h2 className="text-xl font-semibold mb-4">
          Confidential Documents
        </h2>
        {loadingDocs ? (
          <p className="text-gray-400 italic animate-pulse">
            Loading classified data...
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Level
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Content Preview
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {doc.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {doc.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          doc.confidentialityLevel === "TOP SECRET"
                            ? "bg-red-100 text-red-800"
                            : doc.confidentialityLevel === "CONFIDENTIAL"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                        }`}
                      >
                        {doc.confidentialityLevel}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate max-w-xs">
                      {doc.content}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
