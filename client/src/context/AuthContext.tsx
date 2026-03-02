"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// DAuth User Info Interface based on Backend implementation
interface User {
    _id: string;
    email: string;
    name?: string;
    gender?: string;
    dauthId?: string;
    phoneNumber?: string;
    batch?: string;
    department?: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: () => void;
    logout: () => void;
    isLoading: boolean;
    setAuthData: (user: User, token: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Load auth state from localStorage on mount
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (storedToken && storedUser) {
            try {
                setToken(storedToken);
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("Failed to parse user from localStorage", error);
                localStorage.removeItem("token");
                localStorage.removeItem("user");
            }
        }
        setIsLoading(false);
    }, []);

    const login = () => {
        // Redirect to DAuth login URL
        const clientId = process.env.NEXT_PUBLIC_DAUTH_CLIENT_ID;
        const redirectUri = process.env.NEXT_PUBLIC_DAUTH_REDIRECT_URI;

        if (!clientId || !redirectUri) {
            console.error("DAuth configuration is missing. Check your environment variables.");
            alert("Login configuration is missing. Please try again later.");
            return;
        }

        const state = "xyz"; // Optional: Add state for CSRF protection
        const nonce = "12345"; // Optional: Add nonce
        const scope = encodeURIComponent("email openid profile user");

        const dauthUrl = `https://auth.delta.nitt.edu/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
            redirectUri
        )}&response_type=code&grant_type=authorization_code&state=${state}&scope=${scope}&nonce=${nonce}`;

        window.location.href = dauthUrl;
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        // Optional: Add redirect to home or merch page after logout if needed
    };

    const setAuthData = (newUser: User, newToken: string) => {
        setUser(newUser);
        setToken(newToken);
        localStorage.setItem("user", JSON.stringify(newUser));
        localStorage.setItem("token", newToken);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, isLoading, setAuthData }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
