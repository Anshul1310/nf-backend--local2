"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PaymentFailedPage() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("/merch");
    }, 2000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-comic-red p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-md w-full border-4 border-black">
        <h1 className="text-3xl font-bangers text-black mb-4">
          Payment Failed
        </h1>
        <p className="font-roboto text-gray-700 mb-2">
          Your transaction could not be completed.
        </p>
        <p className="font-roboto text-gray-700">
          Redirecting you back to merch...
        </p>
      </div>
    </div>
  );
}

