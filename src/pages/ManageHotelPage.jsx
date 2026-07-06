import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

function ManageHotelPage() {

    const navigate = useNavigate();

    const { hotelId } = useParams();

    const modules = [
        {
            icon: "🛏",
            title: "Room Types",
            text: "Create and manage room categories.",
            path: `/manage-hotel/${hotelId}/room-types`
        },
        {
            icon: "📅",
            title: "Bookings",
            text: "View guest bookings.",
            path: `/manage-hotel/${hotelId}/bookings`
        },
        {
            icon: "⭐",
            title: "Reviews",
            text: "Read guest reviews.",
            path: `/manage-hotel/${hotelId}/reviews`
        },
        {
            icon: "✏️",
            title: "Edit Hotel",
            text: "Update hotel details, contact information and timings.",
            path: `/manage-hotel/${hotelId}/edit`
        }
    ];

    return (

        <div className="mgh-root">

            <Navbar />

            <div className="mgh-hero">
                <div className="mgh-hero-bg" aria-hidden="true">
                    <div className="mgh-blob mgh-blob-a" />
                    <div className="mgh-blob mgh-blob-b" />
                </div>
                <div className="container mgh-hero-inner">

                    <button
                        className="mgh-back-btn"
                        onClick={() => navigate("/my-hotels")}
                    >
                        ← Back to My Hotels
                    </button>

                    <span className="mgh-badge">Hotel Admin</span>
                    <h2 className="mgh-title">Hotel Management</h2>
                    <p className="mgh-subtext">
                        Manage every aspect of your hotel from here.
                    </p>

                </div>
            </div>

            <div className="container mgh-container">

                <div className="row g-4">

                    {
                        modules.map((mod) => (

                            <div key={mod.path} className="col-md-6">

                                <div
                                    className="mgh-card"
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => navigate(mod.path)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") navigate(mod.path);
                                    }}
                                >

                                    <div className="mgh-icon-badge">{mod.icon}</div>

                                    <div className="mgh-card-text">
                                        <h4 className="mgh-card-title">{mod.title}</h4>
                                        <p className="mgh-card-desc">{mod.text}</p>
                                    </div>

                                    <span className="mgh-arrow">→</span>

                                </div>

                            </div>

                        ))
                    }

                </div>

            </div>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');

                .mgh-root {
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
                .mgh-hero {
                    position: relative;
                    overflow: hidden;
                    background: linear-gradient(150deg, var(--violet-deep) 0%, var(--violet) 45%, #3E8FBD 78%, var(--teal) 100%);
                    padding-bottom: 2.6rem;
                }

                .mgh-hero-bg {
                    position: absolute;
                    inset: 0;
                    overflow: hidden;
                }

                .mgh-blob {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(60px);
                    opacity: 0.5;
                }

                .mgh-blob-a {
                    width: 320px; height: 320px;
                    top: -140px; left: -80px;
                    background: radial-gradient(circle, rgba(255,255,255,0.35), transparent 70%);
                }

                .mgh-blob-b {
                    width: 280px; height: 280px;
                    bottom: -160px; right: -60px;
                    background: radial-gradient(circle, rgba(35,196,168,0.5), transparent 70%);
                }

                .mgh-hero-inner {
                    position: relative;
                    z-index: 1;
                    padding-top: 2rem;
                    color: #FFFFFF;
                    animation: mgh-rise 0.6s cubic-bezier(.22,1,.36,1) both;
                }

                .mgh-back-btn {
                    display: inline-block;
                    border: 1.5px solid rgba(255,255,255,0.3);
                    background: rgba(255,255,255,0.1);
                    backdrop-filter: blur(6px);
                    color: #FFFFFF;
                    font-size: 0.85rem;
                    font-weight: 600;
                    padding: 0.5rem 1rem;
                    border-radius: 10px;
                    cursor: pointer;
                    margin-bottom: 1.6rem;
                    transition: background 0.15s ease, transform 0.15s ease;
                }

                .mgh-back-btn:hover {
                    background: rgba(255,255,255,0.18);
                    transform: translateX(-2px);
                }

                .mgh-back-btn:focus-visible {
                    outline: 2px solid #FFFFFF;
                    outline-offset: 2px;
                }

                .mgh-badge {
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

                .mgh-title {
                    font-family: 'Space Grotesk', sans-serif;
                    font-weight: 700;
                    font-size: 2.1rem;
                    margin: 0 0 0.4rem;
                    text-shadow: 0 2px 20px rgba(0,0,0,0.15);
                }

                .mgh-subtext {
                    font-size: 0.98rem;
                    color: rgba(255,255,255,0.82);
                    margin: 0;
                }

                @keyframes mgh-rise {
                    from { opacity: 0; transform: translateY(12px); }
                    to   { opacity: 1; transform: translateY(0); }
                }

                /* Cards */
                .mgh-container {
                    padding: 2.6rem 1rem 4rem;
                }

                .mgh-card {
                    display: flex;
                    align-items: center;
                    gap: 1.2rem;
                    height: 100%;
                    background: #FFFFFF;
                    border-radius: 18px;
                    padding: 1.6rem 1.7rem;
                    cursor: pointer;
                    box-shadow: 0 18px 40px -28px rgba(30,20,70,0.35);
                    transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
                    border: 1.5px solid transparent;
                }

                .mgh-card:hover,
                .mgh-card:focus-visible {
                    transform: translateY(-5px);
                    box-shadow: 0 26px 50px -24px rgba(30,20,70,0.4);
                    border-color: rgba(109,91,208,0.25);
                }

                .mgh-card:focus-visible {
                    outline: 2px solid var(--violet);
                    outline-offset: 3px;
                }

                .mgh-icon-badge {
                    flex-shrink: 0;
                    width: 54px;
                    height: 54px;
                    border-radius: 14px;
                    background: linear-gradient(135deg, rgba(109,91,208,0.12) 0%, rgba(35,196,168,0.14) 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.5rem;
                }

                .mgh-card-text {
                    flex: 1;
                    min-width: 0;
                }

                .mgh-card-title {
                    font-family: 'Space Grotesk', sans-serif;
                    font-weight: 600;
                    font-size: 1.1rem;
                    color: var(--ink);
                    margin: 0 0 0.25rem;
                }

                .mgh-card-desc {
                    color: var(--muted);
                    font-size: 0.88rem;
                    margin: 0;
                    line-height: 1.4;
                }

                .mgh-arrow {
                    flex-shrink: 0;
                    font-size: 1.2rem;
                    color: var(--muted);
                    transition: transform 0.2s ease, color 0.2s ease;
                }

                .mgh-card:hover .mgh-arrow {
                    transform: translateX(4px);
                    color: var(--violet);
                }

                @media (max-width: 600px) {
                    .mgh-title { font-size: 1.8rem; }
                    .mgh-card { flex-wrap: wrap; }
                }
            `}</style>

        </div>

    );

}

export default ManageHotelPage;