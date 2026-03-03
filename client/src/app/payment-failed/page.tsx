"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle } from "lucide-react";

export default function PaymentFailedPage() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("/merch");
    }, 4000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div style={{
      minHeight: "100vh",
      backgroundImage: "url('/nfbackground.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }} className="flex items-center justify-center p-4">
      <div className="bg-comic-red p-8 sm:p-12 rounded-xl shadow-comic-lg text-center max-w-lg w-full border-4 border-black transform transition-transform hover:scale-[1.02]">
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-full p-4 border-4 border-black shadow-comic">
            <AlertTriangle className="w-16 h-16 text-red-600" strokeWidth={3} />
          </div>
        </div>

        <h1 className="text-5xl sm:text-6xl font-bangers text-white text-shadow-comic mb-4 tracking-wider transform rotate-2">
          CRASH! FAILED!
        </h1>

        <div className="bg-white border-4 border-black p-4 mb-8 shadow-[4px_4px_0_0_#000] -rotate-1">
          <p className="font-roboto text-xl font-bold text-black mb-2 uppercase">
            Transaction Error
          </p>
          <p className="font-roboto text-gray-800 font-medium">
            Looks like your payment hit a snag with a supervillain!
          </p>
        </div>

        <div className="font-roboto text-white font-bold tracking-widest uppercase animate-pulse">
          Redirecting you back...
        </div>

        <button
          onClick={() => router.push("/merch")}
          className="mt-6 inline-block px-8 py-3 w-full border-4 border-black bg-comic-yellow hover:bg-yellow-400 text-black font-bangers text-2xl tracking-wider shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-y-[2px] hover:translate-x-[2px] transition-all"
        >
          OR CLICK HERE TO RETRY
        </button>
      </div>
    </div>
  );
}
