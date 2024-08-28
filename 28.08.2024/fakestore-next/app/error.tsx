"use client";

import React from "react";
import { useRouter } from "next/navigation";

const ErrorPage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-4">Page Not Found</p>
      <button
        onClick={() => router.push("/")}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Go to Home
      </button>
    </div>
  );
};

export default ErrorPage;
