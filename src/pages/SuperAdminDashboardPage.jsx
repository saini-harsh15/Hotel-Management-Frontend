import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function SuperAdminDashboardPage() {

    const navigate = useNavigate();

    return (

        <div className="sa-root">

            <Navbar />

            <div className="sa-hero">
                <div className="sa-hero-bg" aria-hidden="true">
                    <div className="sa-blob sa-blob-a" />
                    <div className="sa-blob sa-blob-b" />
                </div>
                <div className="container sa-hero-inner">

                    <span className="sa-badge-tag">Platform Control</span>
                    <h2 className="sa-title">👑 Super Admin Dashboard</h2>
                    <p className="sa-subtext">
                        Manage hotels, users, and monitor the entire platform.
                    </p>

                </div>
            </div>

            <div className="container sa-container">

                <div className="sa-grid">

                    {/* Pending Hotels */}

                    <div
                        className="sa-card"
                        onClick={() =>
                            navigate("/admin/pending-hotels")
                        }
                    >

                        <div className="sa-icon">
                            🏨
                        </div>

                        <h4 className="sa-card-title">
                            Pending Hotels
                        </h4>

                        <p className="sa-card-desc">
                            Review newly submitted hotels and
                            approve or reject them.
                        </p>

                        <button className="sa-open-btn">
                            Open Module
                        </button>

                    </div>

                    {/* User Management */}

                    <div
                        className="sa-card"
                        onClick={() =>
                            navigate("/admin/users")
                        }
                    >

                        <div className="sa-icon">
                            👥
                        </div>

                        <h4 className="sa-card-title">
                            User Management
                        </h4>

                        <p className="sa-card-desc">
                            View users, promote hotel admins,
                            block accounts and manage roles.
                        </p>

                        <button className="sa-open-btn">
                            Open Module
                        </button>

                    </div>

                    {/* Analytics */}

                    <div
                        className="sa-card"
                        onClick={() =>
                            navigate("/admin/eval")
                        }
                    >

                        <div className="sa-icon">
                            📊
                        </div>

                        <h4 className="sa-card-title">
                            Platform Analytics
                        </h4>

                        <p className="sa-card-desc">
                            View platform statistics, booking trends,
                            room occupancy and user insights.
                        </p>

                        <button className="sa-open-btn">
                            Open Module
                        </button>

                    </div>

                </div>

            </div>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');

                .sa-root {
                    --violet: #6D5BD0;
                    --violet-deep: #4A3AA8;
                    --teal: #23C4A8;
                    --amber: #D9A441;
                    --rose: #C24F5C;
                    --ink: #1B1B23;
                    --ink-soft: #5B5A66;
                    --muted: #8B8A97;
                    --line: #E9E8F0;
                    --cream: #FCFBFF;
                    min-height: 100vh;
                    background: var(--cream);
                    font-family: 'Inter', system-ui, sans-serif;
                }

                /* HERO */
                .sa-hero {
                    position: relative;
                    overflow: hidden;
                    background: linear-gradient(150deg, var(--violet-deep) 0%, var(--violet) 45%, #3E8FBD 78%, var(--teal) 100%);
                    padding-bottom: 2.4rem;
                }

                .sa-hero-bg {
                    position: absolute;
                    inset: 0;
                    overflow: hidden;
                }

                .sa-blob {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(60px);
                    opacity: 0.5;
                }

                .sa-blob-a {
                    width: 320px; height: 320px;
                    top: -140px; left: -80px;
                    background: radial-gradient(circle, rgba(255,255,255,0.35), transparent 70%);
                }

                .sa-blob-b {
                    width: 280px; height: 280px;
                    bottom: -160px; right: -60px;
                    background: radial-gradient(circle, rgba(35,196,168,0.5), transparent 70%);
                }

                .sa-hero-inner {
                    position: relative;
                    z-index: 1;
                    padding-top: 2.8rem;
                    color: #FFFFFF;
                    animation: sa-rise 0.6s cubic-bezier(.22,1,.36,1) both;
                }

                .sa-badge-tag {
                    display: inline-block;
                    background: rgba(255,255,255,0.14);
                    backdrop-filter: blur(6px);
                    border: 1px solid rgba(255,255,255,0.2);
                    font-size: 0.76rem;
                    font-weight: 600;
                    padding: 0.4rem 0.9rem;
                    border-radius: 999px;
                    margin-bottom: 1rem;
                }

                .sa-title {
                    font-family: 'Space Grotesk', sans-serif;
                    font-weight: 700;
                    font-size: 2.1rem;
                    margin: 0 0 0.4rem;
                    text-shadow: 0 2px 20px rgba(0,0,0,0.15);
                }

                .sa-subtext {
                    font-size: 0.98rem;
                    color: rgba(255,255,255,0.82);
                    margin: 0;
                    max-width: 520px;
                }

                @keyframes sa-rise {
                    from { opacity: 0; transform: translateY(12px); }
                    to   { opacity: 1; transform: translateY(0); }
                }

                /* Grid / Cards */
                .sa-container { padding: 2.4rem 1rem 4rem; }

                .sa-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1.6rem;
                }

                .sa-card {
                    background: #FFFFFF;
                    border-radius: 20px;
                    padding: 2.2rem 1.8rem;
                    text-align: center;
                    box-shadow: 0 20px 44px -26px rgba(30,20,70,0.28);
                    border: 1px solid var(--line);
                    cursor: pointer;
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                }

                .sa-card:hover {
                    transform: translateY(-6px);
                    box-shadow: 0 30px 56px -22px rgba(30,20,70,0.36);
                }

                .sa-icon {
                    font-size: 3rem;
                    margin-bottom: 1rem;
                }

                .sa-card-title {
                    font-family: 'Space Grotesk', sans-serif;
                    font-weight: 700;
                    font-size: 1.25rem;
                    color: var(--ink);
                    margin: 0 0 0.6rem;
                }

                .sa-card-desc {
                    color: var(--ink-soft);
                    font-size: 0.92rem;
                    margin: 0 0 1.6rem;
                    line-height: 1.5;
                }

                .sa-open-btn {
                    border: none;
                    border-radius: 11px;
                    padding: 0.7rem 1.6rem;
                    background: linear-gradient(120deg, var(--violet) 0%, var(--teal) 130%);
                    color: #FFFFFF;
                    font-size: 0.9rem;
                    font-weight: 700;
                    cursor: pointer;
                    box-shadow: 0 12px 22px -12px rgba(109, 91, 208, 0.5);
                    transition: filter 0.15s ease, transform 0.15s ease;
                }

                .sa-open-btn:hover {
                    filter: brightness(1.06);
                    transform: translateY(-1px);
                }

                @media (max-width: 900px) {
                    .sa-grid { grid-template-columns: repeat(2, 1fr); }
                }

                @media (max-width: 700px) {
                    .sa-grid { grid-template-columns: 1fr; }
                    .sa-title { font-size: 1.8rem; }
                }
            `}</style>

        </div>

    );

}

export default SuperAdminDashboardPage;
