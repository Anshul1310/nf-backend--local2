import React, { useEffect, useContext, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const AuthCallback = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);
    const hasFetched = useRef(false);

    useEffect(() => {
        const code = searchParams.get('code');

        if (code && !hasFetched.current) {
            hasFetched.current = true; // Prevent double-firing in React Strict Mode

            // Send the code to your backend index.js endpoint
            axios.post('http://localhost:5000/auth/dauth/callback', { code })
                .then(res => {
                    const { token, user } = res.data;

                    // Store token and user data
                    localStorage.setItem('token', token);
                    localStorage.setItem('user', JSON.stringify(user));
                    setUser(user);

                    // Redirect back to the merch page
                    navigate('/merch');
                })
                .catch(err => {
                    console.error('DAuth Error:', err);
                    alert("Login failed. Please try again.");
                    navigate('/merch');
                });
        }
    }, [searchParams, navigate, setUser]);

    return (
        <div style={{ textAlign: 'center', marginTop: '100px', fontFamily: 'sans-serif' }}>
            <h2>Authenticating with DAuth... Please wait.</h2>
        </div>
    );
};

export default AuthCallback;