'use client';

import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './support.css';

const SupportPage = () => {
    const form = useRef<HTMLFormElement>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const sendEmail = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.current) return;

        setLoading(true);
        setMessage(null);

        // Basic validation
        const formData = new FormData(form.current);
        const userEmail = formData.get('user_email') as string;
        if (!userEmail || !userEmail.includes('@')) {
            setMessage({ type: 'error', text: 'Please enter a valid email address.' });
            setLoading(false);
            return;
        }

        // Environment variables in Next.js usually start with NEXT_PUBLIC_ for client side
        const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
        const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '';
        const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '';

        if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
            console.error('EmailJS credentials missing from environment variables');
            // Falling back to logging for demo if needed, but in production these should be set
        }

        emailjs
            .sendForm(SERVICE_ID, TEMPLATE_ID, form.current, {
                publicKey: PUBLIC_KEY,
            })
            .then(
                () => {
                    setLoading(false);
                    setMessage({ type: 'success', text: 'Message sent successfully!' });
                    form.current?.reset();
                },
                (error) => {
                    setLoading(false);
                    setMessage({ type: 'error', text: 'Failed to send message. Please try again later.' });
                    console.error('FAILED...', error.text);
                },
            );
    };

    return (
        <div className="support-container">
            <div className="support-card">
                <h2 className="title">HERO SUPPORT</h2>
                <p className="subtitle">SEND A SIGNAL TO HEADQUARTERS!</p>

                <form ref={form} onSubmit={sendEmail} className="support-form">
                    <div className="input-groups">
                        <label htmlFor="user_name">Secret Identity (Name)</label>
                        <input type="text" name="user_name" id="user_name" placeholder="PETER PARKER" required />
                    </div>

                    <div className="input-groups">
                        <label htmlFor="user_email">Comms Channel (Email)</label>
                        <input type="email" name="user_email" id="user_email" placeholder="spidey@avengers.com" required />
                    </div>

                    <div className="input-groups">
                        <label htmlFor="message">Mission Query</label>
                        <textarea name="message" id="message" rows={5} placeholder="WHAT'S THE MISSION, CAP?" required></textarea>
                    </div>

                    <button type="submit" disabled={loading} className={`submit-btn ${loading ? 'loading' : ''}`}>
                        {loading ? 'SENDING SIGNAL...' : 'ASSEMBLE!'}
                    </button>

                    {message && (
                        <div className={`message ${message.type}`}>
                            {message.text}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default SupportPage;
