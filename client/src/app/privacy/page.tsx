
import Link from "next/link";


import './privacy.css';

const PrivacyPolicy = () => {
    return (
        <div className="policy-container">
            <div className="policy-card">
                <Link href="/" className="back-link">← BACK TO HQ</Link>
                <h1 className="policy-title">PRIVACY POLICY</h1>
                <div className="classifed-stamp">CLASSIFIED</div>

                <div className="policy-content">
                    <p className="update-date">LAST UPDATED: FEBRUARY 2026</p>

                    <section>
                        <p>NITTFEST is the official mobile application of the annual inter-department cultural fest of the National Institute of Technology Tiruchirappalli.</p>
                        <p>This Privacy Policy explains how we collect, use, and protect your information when you use the NITTFEST app.</p>
                    </section>

                    <section>
                        <h2>1. INFORMATION WE COLLECT</h2>
                        <ul className="comic-list">
                            <li>NAME</li>
                            <li>ROLL NUMBER / USER ID</li>
                            <li>DEPARTMENT DETAILS</li>
                            <li>AUTHENTICATION CREDENTIALS (PASSWORD AND PIN, SECURELY STORED IN ENCRYPTED FORM)</li>
                            <li>NF CREDITS BALANCE AND TRANSACTION RECORDS</li>
                            <li>BASIC APP USAGE INFORMATION</li>
                        </ul>
                        <p className="note">NOTE: WE DO NOT COLLECT PAYMENT CARD INFORMATION, BANK DETAILS, HEALTH DATA, LOCATION DATA, OR ADVERTISING IDENTIFIERS.</p>
                    </section>

                    <section>
                        <h2>2. HOW WE USE YOUR INFORMATION</h2>
                        <p>WE USE THE COLLECTED INFORMATION SOLELY FOR THE FOLLOWING PURPOSES:</p>
                        <ul className="comic-list">
                            <li>TO AUTHENTICATE USERS</li>
                            <li>TO ENABLE ACCESS TO FEST FEATURES</li>
                            <li>TO MANAGE NF CREDITS</li>
                            <li>TO DISPLAY LEADERBOARDS AND EVENT PARTICIPATION</li>
                            <li>TO MAINTAIN SECURITY AND PREVENT UNAUTHORIZED ACCESS</li>
                            <li>TO IMPROVE APP PERFORMANCE AND RELIABILITY</li>
                        </ul>
                        <p className="disclaimer">WE DO NOT USE YOUR DATA FOR ADVERTISING OR MARKETING PURPOSES.</p>
                    </section>

                    <section>
                        <h2>3. DATA SHARING</h2>
                        <p>WE DO NOT SELL, RENT, OR TRADE YOUR PERSONAL INFORMATION.</p>
                        <p>YOUR DATA IS NOT SHARED WITH THIRD-PARTY ADVERTISERS OR DATA BROKERS. INFORMATION IS USED STRICTLY FOR FEST-RELATED OPERATIONS AND APP FUNCTIONALITY.</p>
                    </section>

                    <section>
                        <h2>4. DATA SECURITY</h2>
                        <p>WE USE SECURE COMMUNICATION PROTOCOLS (HTTPS) AND APPROPRIATE TECHNICAL SAFEGUARDS TO PROTECT USER DATA. AUTHENTICATION CREDENTIALS ARE STORED IN ENCRYPTED OR HASHED FORM.</p>
                    </section>

                    <section>
                        <h2>5. DATA RETENTION</h2>
                        <p>USER DATA IS RETAINED ONLY FOR THE DURATION NECESSARY TO SUPPORT FEST OPERATIONS AND RELATED ADMINISTRATIVE REQUIREMENTS.</p>
                    </section>

                    <section>
                        <h2>6. CHILDREN’S PRIVACY</h2>
                        <p>THE NITTFEST APP IS INTENDED FOR USE BY STUDENTS AND PARTICIPANTS OF NIT TIRUCHIRAPPALLI. IT IS NOT DIRECTED TOWARD CHILDREN UNDER THE AGE OF 13.</p>
                    </section>

                    <section>
                        <h2>7. CHANGES TO THIS POLICY</h2>
                        <p>WE MAY UPDATE THIS PRIVACY POLICY FROM TIME TO TIME. ANY CHANGES WILL BE REFLECTED ON THIS PAGE WITH AN UPDATED REVISION DATE.</p>
                    </section>

                    <section className="contact-section">
                        <h2>8. CONTACT US</h2>
                        <p>IF YOU HAVE ANY QUESTIONS REGARDING THIS PRIVACY POLICY, PLEASE CONTACT:</p>
                        <div className="email-bubble">EMAIL: developer@nittfest.in</div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
