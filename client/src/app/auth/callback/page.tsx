"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

function DAuthCallbackContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { setAuthData } = useAuth();
    const [error, setError] = useState<string | null>(null);

    // Use a ref to prevent double-fetching in React Strict Mode
    const processedRef = useRef(false);

    useEffect(() => {
        const code = searchParams.get("code");

        // Ensure we only process the code once
        if (!code || processedRef.current) return;

        processedRef.current = true;

        const authenticateWithBackend = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

                const response = await fetch(`${apiUrl}/auth/dauth/callback`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ code }),
                });

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(errorData.error || "Authentication failed");
                }

                const data = await response.json();

                if (data.token && data.user) {
                    // Save to context (which saves to localStorage)
                    setAuthData(data.user, data.token);
                    // Redirect to merch page
                    router.push("/merch");
                } else {
                    throw new Error("Invalid response format from server");
                }
            } catch (err: any) {
                console.error("Authentication error:", err);
                setError(err.message || "An error occurred during authentication");

                // Optional: Redirect to merch page or login page after a few seconds
                setTimeout(() => {
                    router.push("/merch");
                }, 3000);
            }
        };

        authenticateWithBackend();
    }, [searchParams, router, setAuthData]);

    return (
        <div style={{
            minHeight: "100vh",
            backgroundImage: "url('/nfbackground.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
        }} className="flex items-center justify-center p-4 text-black">
            <div className="bg-comic-yellow p-8 sm:p-12 rounded-xl shadow-comic-lg text-center max-w-lg w-full border-4 border-black transform transition-transform hover:-translate-y-1">
                <div className="flex justify-center mb-6">
                    <div className="bg-white rounded-full p-4 border-4 border-black shadow-comic">
                        {error ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-comic-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-comic-blue animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                        )}
                    </div>
                </div>

                <h1 className="text-4xl sm:text-5xl font-bangers text-comic-red mb-4 text-shadow-comic transform -rotate-2">
                    {error ? "CRASH! FAILED!" : "CONNECTING TO MAINFRAME..."}
                </h1>

                {error ? (
                    <div className="bg-white border-4 border-black p-4 mb-6 shadow-[4px_4px_0_0_#000] transform rotate-1">
                        <p className="font-roboto font-bold text-gray-800 text-lg mb-2">{error}</p>
                        <p className="font-roboto text-sm text-gray-600 animate-pulse">Redirecting you back...</p>
                    </div>
                ) : (
                    <div className="bg-white border-4 border-black p-4 mb-6 shadow-[4px_4px_0_0_#000] transform rotate-1">
                        <p className="font-roboto font-bold text-gray-800 text-lg">
                            Please wait while we verify your hero credentials...
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function DAuthCallback() {
    return (
        <Suspense fallback={
            <div style={{
                minHeight: "100vh",
                backgroundImage: "url('/nfbackground.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }} className="flex items-center justify-center p-4 text-black">
                <div className="bg-comic-yellow p-8 sm:p-12 rounded-xl shadow-comic-lg text-center max-w-lg w-full border-4 border-black transform transition-transform hover:-translate-y-1">
                    <h1 className="text-4xl sm:text-5xl font-bangers text-comic-red mb-4 text-shadow-comic transform -rotate-2">
                        LOADING...
                    </h1>
                </div>
            </div>
        }>
            <DAuthCallbackContent />
        </Suspense>
    );
}
