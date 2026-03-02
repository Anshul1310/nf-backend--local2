"use client";

import Link from "next/link";

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-comic-red p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-md w-full border-4 border-black">
        <h1 className="text-3xl font-bangers text-black mb-4">
          Thanks for your order!
        </h1>
        <p className="font-roboto text-gray-700 mb-2">
          Your payment was successful and your order has been recorded.
        </p>
        <p className="font-roboto text-gray-700 mb-6">
          You will receive your NITTFEST merch soon.
        </p>
        <Link
          href="/merch"
          className="inline-block px-6 py-2 border-2 border-black rounded-full bg-comic-red text-white font-bangers text-lg shadow-md"
        >
          Back to Merch
        </Link>
      </div>
    </div>
  );
}

