import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Check if user is already logged in when the page loads
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = () => {
        // Using the Client ID from your backend .env file
        const clientId = "05V9-VeOw83hhpbl";
        const redirectUri = "http://localhost:3000/auth/callback";

        // Redirect user to DAuth login page
        window.location.href = `https://auth.delta.nitt.edu/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&grant_type=authorization_code&state=merch`;
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};