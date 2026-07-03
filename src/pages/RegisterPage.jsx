import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../services/authService";

function RegisterPage() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({

        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: ""

    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const handleRegister = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            await register(formData);

            navigate("/");

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="auth-root">

            <div className="auth-bg" aria-hidden="true">
                <div className="blob blob-a" />
                <div className="blob blob-b" />
                <svg className="skyline" viewBox="0 0 900 300" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
                    <g stroke="rgba(255,255,255,0.16)" strokeWidth="1.4" fill="none">
                        <rect x="40" y="130" width="70" height="170" rx="4" />
                        <rect x="120" y="90" width="90" height="210" rx="4" />
                        <rect x="220" y="150" width="60" height="150" rx="4" />
                        <rect x="600" y="110" width="80" height="190" rx="4" />
                        <rect x="690" y="160" width="65" height="140" rx="4" />
                        <rect x="770" y="70" width="95" height="230" rx="4" />
                    </g>
                    <g fill="rgba(255,255,255,0.35)">
                        <circle cx="55" cy="150" r="1.6" />
                        <circle cx="55" cy="170" r="1.6" />
                        <circle cx="75" cy="150" r="1.6" />
                        <circle cx="75" cy="170" r="1.6" />
                        <circle cx="95" cy="150" r="1.6" />
                        <circle cx="140" cy="115" r="1.6" />
                        <circle cx="140" cy="140" r="1.6" />
                        <circle cx="140" cy="165" r="1.6" />
                        <circle cx="165" cy="115" r="1.6" />
                        <circle cx="165" cy="140" r="1.6" />
                        <circle cx="790" cy="100" r="1.6" />
                        <circle cx="790" cy="130" r="1.6" />
                        <circle cx="815" cy="100" r="1.6" />
                        <circle cx="815" cy="130" r="1.6" />
                    </g>
                </svg>
            </div>

            <div className="auth-shell auth-shell-wide">

                <div className="auth-intro">

                    <span className="auth-badge">Hotel Management Platform</span>

                    <h1 className="auth-headline">
                        Join the platform
                        running modern
                        hotel operations.
                    </h1>

                    <p className="auth-subtext">
                        Create an account to manage bookings, track
                        guests, and run your property from one place.
                    </p>

                </div>

                <form className="auth-card auth-card-wide" onSubmit={handleRegister}>

                    <div className="auth-card-head">
                        <h2 className="auth-title">Create account</h2>
                        <p className="auth-subtitle">It only takes a minute</p>
                    </div>

                    <div className="auth-row">

                        <div className="auth-field">
                            <label className="auth-label" htmlFor="firstName">First Name</label>
                            <input
                                id="firstName"
                                type="text"
                                name="firstName"
                                autoComplete="given-name"
                                className="auth-input"
                                placeholder="Jordan"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="auth-field">
                            <label className="auth-label" htmlFor="lastName">Last Name</label>
                            <input
                                id="lastName"
                                type="text"
                                name="lastName"
                                autoComplete="family-name"
                                className="auth-input"
                                placeholder="Rivers"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                    </div>

                    <div className="auth-field">
                        <label className="auth-label" htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            autoComplete="email"
                            className="auth-input"
                            placeholder="name@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="auth-field">
                        <label className="auth-label" htmlFor="phoneNumber">Phone Number</label>
                        <input
                            id="phoneNumber"
                            type="tel"
                            name="phoneNumber"
                            autoComplete="tel"
                            className="auth-input"
                            placeholder="+1 (555) 000-0000"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="auth-field">
                        <label className="auth-label" htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            autoComplete="new-password"
                            className="auth-input"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="auth-btn" disabled={loading}>
                        {loading ? "Creating account…" : "Sign Up"}
                    </button>

                    <div className="auth-signup-row">
                        Already have an account?
                        <Link to="/" className="auth-link">Login</Link>
                    </div>

                    <div className="auth-version">Hotel Management System v1.0</div>

                </form>

            </div>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');

                .auth-root {
                    --violet: #6D5BD0;
                    --violet-deep: #4A3AA8;
                    --teal: #23C4A8;
                    --ink: #1B1B23;
                    --ink-soft: #5B5A66;
                    --muted: #8B8A97;
                    --line: #E9E8F0;
                    --cream: #FCFBFF;
                    position: relative;
                    min-height: 100vh;
                    width: 100%;
                    overflow: hidden;
                    font-family: 'Inter', system-ui, sans-serif;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 2rem 0;
                }

                .auth-bg {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(150deg, var(--violet-deep) 0%, var(--violet) 45%, #3E8FBD 78%, var(--teal) 100%);
                    overflow: hidden;
                }

                .blob {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(60px);
                    opacity: 0.55;
                }

                .blob-a {
                    width: 480px;
                    height: 480px;
                    top: -160px;
                    left: -120px;
                    background: radial-gradient(circle, rgba(255,255,255,0.35), transparent 70%);
                    animation: drift-a 16s ease-in-out infinite;
                }

                .blob-b {
                    width: 420px;
                    height: 420px;
                    bottom: -180px;
                    right: -100px;
                    background: radial-gradient(circle, rgba(35,196,168,0.5), transparent 70%);
                    animation: drift-b 18s ease-in-out infinite;
                }

                @keyframes drift-a {
                    0%, 100% { transform: translate(0, 0); }
                    50%      { transform: translate(40px, 30px); }
                }

                @keyframes drift-b {
                    0%, 100% { transform: translate(0, 0); }
                    50%      { transform: translate(-30px, -25px); }
                }

                .skyline {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 38%;
                    opacity: 0.8;
                }

                .auth-shell {
                    position: relative;
                    z-index: 1;
                    width: 100%;
                    max-width: 1100px;
                    display: grid;
                    grid-template-columns: 1.15fr 1fr;
                    gap: 3.5rem;
                    align-items: center;
                    padding: 2rem;
                }

                .auth-shell-wide {
                    max-width: 1180px;
                    grid-template-columns: 1fr 1.05fr;
                }

                .auth-intro {
                    color: #FFFFFF;
                    animation: rise 0.7s cubic-bezier(.22,1,.36,1) both;
                }

                .auth-badge {
                    display: inline-block;
                    background: rgba(255,255,255,0.14);
                    backdrop-filter: blur(6px);
                    border: 1px solid rgba(255,255,255,0.2);
                    color: #FFFFFF;
                    font-size: 0.8rem;
                    font-weight: 600;
                    padding: 0.5rem 1.05rem;
                    border-radius: 999px;
                    margin-bottom: 1.8rem;
                }

                .auth-headline {
                    font-family: 'Space Grotesk', sans-serif;
                    font-weight: 700;
                    font-size: 3rem;
                    line-height: 1.16;
                    letter-spacing: -0.01em;
                    margin: 0 0 1.3rem;
                    text-shadow: 0 2px 24px rgba(0,0,0,0.15);
                }

                .auth-subtext {
                    font-size: 1.05rem;
                    line-height: 1.6;
                    color: rgba(255,255,255,0.82);
                    max-width: 420px;
                    margin: 0;
                }

                .auth-card {
                    position: relative;
                    background: rgba(255, 255, 255, 0.92);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255,255,255,0.5);
                    border-radius: 22px;
                    padding: 2.5rem 2.3rem 2.1rem;
                    box-shadow: 0 30px 70px -20px rgba(30, 20, 70, 0.45);
                    animation: rise 0.7s 0.1s cubic-bezier(.22,1,.36,1) both;
                }

                .auth-card-wide {
                    padding: 2.3rem 2.2rem 2rem;
                }

                .auth-card-head { margin-bottom: 1.7rem; }

                .auth-title {
                    font-family: 'Space Grotesk', sans-serif;
                    font-weight: 700;
                    font-size: 1.65rem;
                    color: var(--ink);
                    margin: 0 0 0.25rem;
                }

                .auth-subtitle {
                    color: var(--muted);
                    font-size: 0.9rem;
                    margin: 0;
                }

                .auth-row {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1rem;
                }

                .auth-field { margin-bottom: 1.05rem; }

                .auth-label {
                    display: block;
                    font-size: 0.8rem;
                    font-weight: 600;
                    color: var(--ink-soft);
                    margin-bottom: 0.4rem;
                }

                .auth-input {
                    width: 100%;
                    border: 1.5px solid var(--line);
                    background: #FFFFFF;
                    border-radius: 12px;
                    padding: 0.68rem 0.85rem;
                    font-size: 0.94rem;
                    color: var(--ink);
                    font-family: 'Inter', sans-serif;
                    transition: border-color 0.15s ease, box-shadow 0.15s ease;
                }

                .auth-input::placeholder { color: #BFBECB; }

                .auth-input:focus {
                    outline: none;
                    border-color: var(--violet);
                    box-shadow: 0 0 0 4px rgba(109, 91, 208, 0.15);
                }

                .auth-btn {
                    width: 100%;
                    margin-top: 0.4rem;
                    padding: 0.8rem;
                    border: none;
                    border-radius: 12px;
                    background: linear-gradient(120deg, var(--violet) 0%, var(--teal) 130%);
                    color: #FFFFFF;
                    font-size: 0.94rem;
                    font-weight: 700;
                    cursor: pointer;
                    box-shadow: 0 10px 24px -8px rgba(109, 91, 208, 0.55);
                    transition: transform 0.15s ease, box-shadow 0.15s ease, filter 0.15s ease;
                }

                .auth-btn:hover:not(:disabled) {
                    filter: brightness(1.06);
                    transform: translateY(-1px);
                }

                .auth-btn:active:not(:disabled) {
                    transform: translateY(0);
                }

                .auth-btn:disabled {
                    opacity: 0.65;
                    cursor: not-allowed;
                }

                .auth-btn:focus-visible {
                    outline: 2px solid var(--violet-deep);
                    outline-offset: 3px;
                }

                .auth-signup-row {
                    text-align: center;
                    margin-top: 1.2rem;
                    font-size: 0.86rem;
                    color: var(--muted);
                }

                .auth-link {
                    color: var(--violet);
                    font-weight: 700;
                    text-decoration: none;
                    margin-left: 0.4rem;
                }

                .auth-link:hover { text-decoration: underline; }

                .auth-version {
                    text-align: center;
                    margin-top: 1.5rem;
                    font-size: 0.72rem;
                    color: #C6C4D4;
                }

                @keyframes rise {
                    from { opacity: 0; transform: translateY(18px); }
                    to   { opacity: 1; transform: translateY(0); }
                }

                @media (prefers-reduced-motion: reduce) {
                    .auth-intro, .auth-card, .blob-a, .blob-b { animation: none; }
                }

                @media (max-width: 900px) {
                    .auth-shell, .auth-shell-wide {
                        grid-template-columns: 1fr;
                        gap: 2.2rem;
                        text-align: center;
                    }
                    .auth-intro { display: flex; flex-direction: column; align-items: center; }
                    .auth-headline { font-size: 2.1rem; }
                    .auth-card { max-width: 480px; margin: 0 auto; }
                    .auth-row { grid-template-columns: 1fr; }
                }
            `}</style>

        </div>

    );

}

export default RegisterPage;