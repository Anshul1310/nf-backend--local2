"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function PaymentSuccessPage() {
  return (
    <div style={{
      minHeight: "100vh",
      backgroundImage: "url('/nfbackground.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }} className="flex items-center justify-center p-4">
      <div className="bg-comic-yellow p-8 sm:p-12 rounded-xl shadow-comic-lg text-center max-w-lg w-full border-4 border-black transform transition-transform hover:-translate-y-1">
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-full p-4 border-4 border-black shadow-comic">
            <CheckCircle className="w-16 h-16 text-green-600" strokeWidth={3} />
          </div>
        </div>

        <h1 className="text-5xl sm:text-6xl font-bangers text-white text-shadow-comic mb-4 tracking-wider transform -rotate-2">
          BAM! SUCCESS!
        </h1>

        <div className="bg-white border-4 border-black p-4 mb-8 shadow-[4px_4px_0_0_#000] rotate-1">
          <p className="font-roboto text-xl font-bold text-black mb-2 uppercase">
            Order Recorded
          </p>
          <p className="font-roboto text-gray-800 font-medium">
            Your NITTFEST merch is on its way, hero!
          </p>
        </div>

        <Link
          href="/merch"
          className="inline-block px-8 py-4 border-4 border-black bg-blue-500 hover:bg-blue-400 text-white font-bangers text-2xl tracking-wider shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-y-[2px] hover:translate-x-[2px] transition-all"
        >
          BACK TO MERCH
        </Link>
      </div>
    </div>
  );
}
