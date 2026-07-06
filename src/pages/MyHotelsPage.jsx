import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getMyHotels } from "../services/hotelService";
import { Star, MapPin, Plus } from "lucide-react";

function MyHotelsPage() {

    const navigate = useNavigate();

    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchHotels();

    }, []);

    const fetchHotels = async () => {

        try {

            setLoading(true);

            const response = await getMyHotels();

            setHotels(response.data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="mh-root">

            <Navbar />

            <div className="mh-hero">

                <div className="mh-hero-bg" aria-hidden="true">
                    <div className="mh-blob mh-blob-a" />
                    <div className="mh-blob mh-blob-b" />
                </div>

                <div className="container mh-hero-inner">

                    <div className="mh-hero-row">

                        <div>
                            <span className="mh-badge">Hotel Admin</span>
                            <h2 className="mh-title">My Hotels</h2>
                            <p className="mh-subtext">
                                Manage all your hotels from one place.
                            </p>
                        </div>

                        <button
                            className="mh-add-btn"
                            onClick={() => navigate("/create-hotel")}
                        >
                            <Plus size={16} strokeWidth={2.6} /> Add Hotel
                        </button>

                    </div>

                </div>

            </div>

            <div className="container mh-container">

                {
                    loading ?

                        (
                            <div className="mh-loading">
                                <div className="mh-spinner" role="status" />
                                <p className="mh-loading-text">Loading your hotels…</p>
                            </div>
                        )

                        :

                        hotels.length === 0 ?

                            (
                                <div className="mh-empty">
                                    <h3 className="mh-empty-title">No hotels yet</h3>
                                    <p className="mh-empty-text">
                                        You haven't added any hotels yet.
                                    </p>
                                    <button
                                        className="mh-add-btn mh-add-btn-inline"
                                        onClick={() => navigate("/create-hotel")}
                                    >
                                        <Plus size={16} strokeWidth={2.6} /> Add Your First Hotel
                                    </button>
                                </div>
                            )

                            :

                            (
                                <div className="row g-4">

                                    {
                                        hotels.map(hotel => {

                                            const isApproved = hotel.status === "APPROVED";

                                            return (

                                                <div key={hotel.id} className="col-lg-4 col-md-6">

                                                    <div className="mh-card">

                                                        <div className="mh-card-img-wrap">

                                                            <img
                                                                src="https://images.unsplash.com/photo-1566073771259-6a8506099945"
                                                                alt="Hotel"
                                                                className="mh-card-img"
                                                            />

                                                            <span className="mh-rating-chip">
                                                                <Star size={13} strokeWidth={2.3} fill="currentColor" />
                                                                {hotel.averageRating?.toFixed(1) || "0.0"}
                                                            </span>

                                                            <span className={`mh-status-chip ${isApproved ? "mh-status-good" : "mh-status-warn"}`}>
                                                                {isApproved ? "Approved" : hotel.status}
                                                            </span>

                                                        </div>

                                                        <div className="mh-card-body">

                                                            <h5 className="mh-hotel-name">{hotel.name}</h5>

                                                            <p className="mh-hotel-city">
                                                                <MapPin size={14} strokeWidth={2.2} /> {hotel.city}
                                                            </p>

                                                            {
                                                                isApproved ?

                                                                    (
                                                                        <button
                                                                            className="mh-manage-btn"
                                                                            onClick={() => navigate(`/manage-hotel/${hotel.id}`)}
                                                                        >
                                                                            Manage Hotel →
                                                                        </button>
                                                                    )

                                                                    :

                                                                    (
                                                                        <button className="mh-pending-btn" disabled>
                                                                            Awaiting Approval
                                                                        </button>
                                                                    )
                                                            }

                                                        </div>

                                                    </div>

                                                </div>

                                            );

                                        })
                                    }

                                </div>
                            )

                }

            </div>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');

                .mh-root {
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
                .mh-hero {
                    position: relative;
                    overflow: hidden;
                    background: linear-gradient(150deg, var(--violet-deep) 0%, var(--violet) 45%, #3E8FBD 78%, var(--teal) 100%);
                    padding-bottom: 2.6rem;
                }

                .mh-hero-bg {
                    position: absolute;
                    inset: 0;
                    overflow: hidden;
                }

                .mh-blob {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(60px);
                    opacity: 0.5;
                }

                .mh-blob-a {
                    width: 340px; height: 340px;
                    top: -140px; left: -80px;
                    background: radial-gradient(circle, rgba(255,255,255,0.35), transparent 70%);
                }

                .mh-blob-b {
                    width: 300px; height: 300px;
                    bottom: -160px; right: -60px;
                    background: radial-gradient(circle, rgba(35,196,168,0.5), transparent 70%);
                }

                .mh-hero-inner {
                    position: relative;
                    z-index: 1;
                    padding-top: 2.8rem;
                    color: #FFFFFF;
                    animation: mh-rise 0.6s cubic-bezier(.22,1,.36,1) both;
                }

                .mh-hero-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    gap: 1.5rem;
                    flex-wrap: wrap;
                }

                .mh-badge {
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

                .mh-title {
                    font-family: 'Space Grotesk', sans-serif;
                    font-weight: 700;
                    font-size: 2.2rem;
                    margin: 0 0 0.4rem;
                    text-shadow: 0 2px 20px rgba(0,0,0,0.15);
                }

                .mh-subtext {
                    font-size: 0.98rem;
                    color: rgba(255,255,255,0.82);
                    margin: 0;
                }

                .mh-add-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.45rem;
                    flex-shrink: 0;
                    border: none;
                    border-radius: 12px;
                    padding: 0.8rem 1.4rem;
                    background: #FFFFFF;
                    color: var(--violet-deep);
                    font-weight: 700;
                    font-size: 0.92rem;
                    cursor: pointer;
                    box-shadow: 0 14px 30px -12px rgba(0,0,0,0.35);
                    transition: transform 0.15s ease, box-shadow 0.15s ease;
                }

                .mh-add-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 18px 36px -12px rgba(0,0,0,0.4);
                }

                .mh-add-btn:active { transform: translateY(0); }

                .mh-add-btn:focus-visible {
                    outline: 2px solid #FFFFFF;
                    outline-offset: 2px;
                }

                /* GRID */
                .mh-container {
                    padding: 2.6rem 1rem 4rem;
                }

                .mh-loading, .mh-empty {
                    text-align: center;
                    padding: 4rem 1rem;
                }

                .mh-spinner {
                    width: 28px;
                    height: 28px;
                    border: 3px solid var(--line);
                    border-top-color: var(--violet);
                    border-radius: 50%;
                    margin: 0 auto 1rem;
                    animation: mh-spin 0.8s linear infinite;
                }

                @keyframes mh-spin { to { transform: rotate(360deg); } }

                .mh-loading-text { color: var(--muted); font-size: 0.9rem; }

                .mh-empty-title {
                    font-family: 'Space Grotesk', sans-serif;
                    font-weight: 600;
                    color: var(--ink);
                    margin-bottom: 0.3rem;
                }

                .mh-empty-text {
                    color: var(--muted);
                    font-size: 0.92rem;
                    margin: 0 0 1.4rem;
                }

                .mh-add-btn-inline {
                    display: inline-flex;
                    background: linear-gradient(120deg, var(--violet) 0%, var(--teal) 130%);
                    color: #FFFFFF;
                    box-shadow: 0 10px 22px -8px rgba(109,91,208,0.5);
                }

                .mh-card {
                    height: 100%;
                    background: #FFFFFF;
                    border-radius: 18px;
                    overflow: hidden;
                    box-shadow: 0 18px 40px -26px rgba(30,20,70,0.3);
                    transition: transform 0.22s ease, box-shadow 0.22s ease;
                }

                .mh-card:hover {
                    transform: translateY(-6px);
                    box-shadow: 0 26px 50px -22px rgba(30,20,70,0.38);
                }

                .mh-card-img-wrap {
                    position: relative;
                    height: 200px;
                }

                .mh-card-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .mh-rating-chip {
                    position: absolute;
                    top: 0.9rem;
                    right: 0.9rem;
                    display: inline-flex;
                    align-items: center;
                    gap: 0.3rem;
                    background: rgba(255,255,255,0.94);
                    backdrop-filter: blur(8px);
                    border-radius: 999px;
                    padding: 0.3rem 0.7rem;
                    font-size: 0.8rem;
                    font-weight: 700;
                    color: var(--ink);
                    box-shadow: 0 8px 20px -8px rgba(0,0,0,0.3);
                }

                .mh-rating-chip svg {
                    color: var(--amber);
                }

                .mh-status-chip {
                    position: absolute;
                    top: 0.9rem;
                    left: 0.9rem;
                    font-size: 0.72rem;
                    font-weight: 700;
                    letter-spacing: 0.03em;
                    text-transform: uppercase;
                    padding: 0.3rem 0.7rem;
                    border-radius: 999px;
                    backdrop-filter: blur(8px);
                }

                .mh-status-good {
                    background: rgba(35,196,168,0.9);
                    color: #FFFFFF;
                }

                .mh-status-warn {
                    background: rgba(217,164,65,0.92);
                    color: #FFFFFF;
                }

                .mh-card-body {
                    padding: 1.3rem 1.4rem 1.5rem;
                }

                .mh-hotel-name {
                    font-family: 'Space Grotesk', sans-serif;
                    font-weight: 600;
                    font-size: 1.1rem;
                    color: var(--ink);
                    margin: 0 0 0.35rem;
                }

                .mh-hotel-city {
                    display: flex;
                    align-items: center;
                    gap: 0.35rem;
                    color: var(--muted);
                    font-size: 0.9rem;
                    margin: 0 0 1.1rem;
                }

                .mh-hotel-city svg {
                    color: var(--violet);
                    flex-shrink: 0;
                }

                .mh-manage-btn {
                    width: 100%;
                    border: none;
                    border-radius: 11px;
                    padding: 0.7rem;
                    background: linear-gradient(120deg, var(--violet) 0%, var(--teal) 130%);
                    color: #FFFFFF;
                    font-weight: 700;
                    font-size: 0.9rem;
                    cursor: pointer;
                    transition: filter 0.15s ease, transform 0.15s ease;
                }

                .mh-manage-btn:hover {
                    filter: brightness(1.06);
                    transform: translateY(-1px);
                }

                .mh-manage-btn:active { transform: translateY(0); }

                .mh-manage-btn:focus-visible {
                    outline: 2px solid var(--violet-deep);
                    outline-offset: 2px;
                }

                .mh-pending-btn {
                    width: 100%;
                    border: 1.5px dashed var(--line);
                    border-radius: 11px;
                    padding: 0.7rem;
                    background: transparent;
                    color: var(--muted);
                    font-weight: 600;
                    font-size: 0.9rem;
                    cursor: not-allowed;
                }

                @keyframes mh-rise {
                    from { opacity: 0; transform: translateY(12px); }
                    to   { opacity: 1; transform: translateY(0); }
                }

                @media (max-width: 600px) {
                    .mh-title { font-size: 1.8rem; }
                    .mh-hero-row { align-items: flex-start; }
                }
            `}</style>

        </div>

    );

}

export default MyHotelsPage;