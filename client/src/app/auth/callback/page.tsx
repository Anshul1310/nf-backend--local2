"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function DAuthCallback() {
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
        <div className="min-h-screen flex items-center justify-center bg-comic-red p-4">
            <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-md w-full border-4 border-black">
                <h1 className="text-3xl font-bangers text-black mb-4">
                    {error ? "Authentication Failed" : "Authenticating..."}
                </h1>

                {error ? (
                    <div className="text-red-600 font-roboto">
                        <p className="mb-4">{error}</p>
                        <p className="text-sm">Redirecting back...</p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center">
                        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="font-roboto text-gray-700">
                            Please wait while we verify your credentials...
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
