import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getHotelById } from "../services/hotelService";
import { getHotelReviews } from "../services/reviewService";
import { MapPin, Star, BadgeCheck } from "lucide-react";

function HotelDetailsPage() {

    const { hotelId } = useParams();
    const navigate = useNavigate();

    const [hotel, setHotel] = useState(null);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {

        fetchHotel();

        fetchReviews();

    }, []);

    const fetchHotel = async () => {

        try {

            const response = await getHotelById(hotelId);

            setHotel(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    const fetchReviews = async () => {

        try {

            const response = await getHotelReviews(hotelId);

            setReviews(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    if (!hotel) {

        return (
            <div className="hd-root">
                <Navbar />
                <div className="container hd-loading">
                    <div className="hd-spinner" role="status" />
                    <p className="hd-loading-text">Loading hotel details…</p>
                </div>
                <style>{hdStyles}</style>
            </div>
        );

    }

    return (

        <div className="hd-root">

            <Navbar />

            <div className="container hd-container">

                <div className="hd-card">

                    {/* Hero */}
                    <div className="hd-hero">

                        <img
                            src="https://images.unsplash.com/photo-1566073771259-6a8506099945"
                            alt="Hotel"
                            className="hd-hero-img"
                        />

                        <div className="hd-hero-overlay" />

                        <div className="hd-hero-content">

                            <span className="hd-location-pill">
                                <MapPin size={13} strokeWidth={2.3} /> {hotel.city}
                            </span>

                            <h1 className="hd-hotel-name">{hotel.name}</h1>

                        </div>

                        <div className="hd-rating-badge">
                            <Star size={15} strokeWidth={2.2} className="hd-rating-star" fill="currentColor" />
                            <span className="hd-rating-value">
                                {hotel.averageRating?.toFixed(1) || "0.0"}
                            </span>
                            <span className="hd-rating-divider" />
                            <span className="hd-rating-count">{reviews.length} reviews</span>
                        </div>

                    </div>

                    <div className="hd-body">

                        <div className="hd-main">

                            <section className="hd-section">
                                <h5 className="hd-section-title">Description</h5>
                                <p className="hd-description">
                                    {hotel.description || "No description available."}
                                </p>
                            </section>

                            <section className="hd-section hd-times">
                                <div className="hd-time-block">
                                    <span className="hd-time-label">Check In</span>
                                    <span className="hd-time-value">{hotel.checkInTime}</span>
                                </div>
                                <div className="hd-time-divider" />
                                <div className="hd-time-block">
                                    <span className="hd-time-label">Check Out</span>
                                    <span className="hd-time-value">{hotel.checkOutTime}</span>
                                </div>
                            </section>

                            <section className="hd-section hd-reviews-section">

                                <h3 className="hd-reviews-title">
                                    Guest Reviews <span className="hd-reviews-count">({reviews.length})</span>
                                </h3>

                                {
                                    reviews.length === 0 ?

                                        (

                                            <div className="hd-empty-reviews">
                                                <h5 className="hd-empty-title">No Reviews Yet</h5>
                                                <p className="hd-empty-text">
                                                    Be the first guest to share your experience.
                                                </p>
                                            </div>

                                        )

                                        :

                                        reviews.map(review => (

                                            <div key={review.id} className="hd-review-card">

                                                <div className="hd-review-top">

                                                    <div className="hd-review-stars">
                                                        {
                                                            Array.from({ length: review.rating }).map((_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    size={14}
                                                                    strokeWidth={2.2}
                                                                    fill="currentColor"
                                                                    className="hd-review-star-icon"
                                                                />
                                                            ))
                                                        }
                                                    </div>

                                                    <span className="hd-verified">
                                                        <BadgeCheck size={14} strokeWidth={2.3} /> Verified Stay
                                                    </span>

                                                </div>

                                                <p className="hd-review-comment">
                                                    {review.comment || "No written review."}
                                                </p>

                                            </div>

                                        ))
                                }

                            </section>

                        </div>

                        <aside className="hd-side">

                            <div className="hd-book-card">

                                <span className="hd-book-eyebrow">Ready to stay?</span>
                                <p className="hd-book-text">
                                    Reserve your room in just a few steps.
                                </p>

                                <button
                                    className="hd-book-btn"
                                    onClick={() => navigate(`/book-hotel/${hotelId}`)}
                                >
                                    Book Now →
                                </button>

                            </div>

                        </aside>

                    </div>

                </div>

            </div>

            <style>{hdStyles}</style>

        </div>

    );

}

const hdStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');

    .hd-root {
        --violet: #6D5BD0;
        --violet-deep: #4A3AA8;
        --teal: #23C4A8;
        --amber: #D9A441;
        --ink: #1B1B23;
        --ink-soft: #5B5A66;
        --muted: #8B8A97;
        --line: #E9E8F0;
        --cream: #FCFBFF;
        min-height: 100vh;
        background: var(--cream);
        font-family: 'Inter', system-ui, sans-serif;
    }

    .hd-container { padding: 2.5rem 1rem 4rem; }

    .hd-loading {
        text-align: center;
        padding-top: 5rem;
    }

    .hd-spinner {
        width: 30px;
        height: 30px;
        border: 3px solid var(--line);
        border-top-color: var(--violet);
        border-radius: 50%;
        margin: 0 auto 1rem;
        animation: hd-spin 0.8s linear infinite;
    }

    @keyframes hd-spin { to { transform: rotate(360deg); } }

    .hd-loading-text {
        color: var(--muted);
        font-size: 0.9rem;
    }

    .hd-card {
        background: #FFFFFF;
        border-radius: 24px;
        overflow: hidden;
        box-shadow: 0 30px 70px -30px rgba(30, 20, 70, 0.25);
        animation: hd-rise 0.6s cubic-bezier(.22,1,.36,1) both;
    }

    @keyframes hd-rise {
        from { opacity: 0; transform: translateY(16px); }
        to   { opacity: 1; transform: translateY(0); }
    }

    /* Hero */
    .hd-hero {
        position: relative;
        height: 400px;
    }

    .hd-hero-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .hd-hero-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(0deg, rgba(30,20,64,0.75) 0%, rgba(74,58,168,0.25) 45%, transparent 75%);
    }

    .hd-hero-content {
        position: absolute;
        left: 2.2rem;
        bottom: 1.8rem;
        right: 2.2rem;
        color: #FFFFFF;
    }

    .hd-location-pill {
        display: inline-flex;
        align-items: center;
        gap: 0.35rem;
        background: rgba(255,255,255,0.16);
        backdrop-filter: blur(6px);
        border: 1px solid rgba(255,255,255,0.25);
        font-size: 0.82rem;
        font-weight: 600;
        padding: 0.35rem 0.85rem;
        border-radius: 999px;
        margin-bottom: 0.8rem;
    }

    .hd-hotel-name {
        font-family: 'Space Grotesk', sans-serif;
        font-weight: 700;
        font-size: 2.4rem;
        margin: 0;
        text-shadow: 0 2px 20px rgba(0,0,0,0.25);
    }

    .hd-rating-badge {
        position: absolute;
        top: 1.8rem;
        right: 1.8rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        background: rgba(255,255,255,0.92);
        backdrop-filter: blur(10px);
        border-radius: 999px;
        padding: 0.55rem 1.1rem;
        box-shadow: 0 12px 30px -10px rgba(30,20,70,0.35);
    }

    .hd-rating-star { color: var(--amber); flex-shrink: 0; }

    .hd-rating-value {
        font-family: 'Space Grotesk', sans-serif;
        font-weight: 700;
        font-size: 1rem;
        color: var(--ink);
    }

    .hd-rating-divider {
        width: 1px;
        height: 14px;
        background: var(--line);
    }

    .hd-rating-count {
        font-size: 0.82rem;
        color: var(--muted);
        white-space: nowrap;
    }

    /* Body */
    .hd-body {
        display: grid;
        grid-template-columns: 1fr 280px;
        gap: 2.5rem;
        padding: 2.4rem;
    }

    .hd-section { margin-bottom: 2rem; }

    .hd-section-title {
        font-family: 'Space Grotesk', sans-serif;
        font-weight: 600;
        font-size: 1.05rem;
        color: var(--ink);
        margin-bottom: 0.6rem;
    }

    .hd-description {
        color: var(--ink-soft);
        line-height: 1.7;
        font-size: 1rem;
        margin: 0;
    }

    .hd-times {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        background: #F7F6FC;
        border: 1px solid var(--line);
        border-radius: 14px;
        padding: 1.1rem 1.4rem;
    }

    .hd-time-block {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }

    .hd-time-label {
        font-size: 0.75rem;
        font-weight: 600;
        letter-spacing: 0.03em;
        text-transform: uppercase;
        color: var(--muted);
    }

    .hd-time-value {
        font-family: 'Space Grotesk', sans-serif;
        font-weight: 600;
        font-size: 1.05rem;
        color: var(--ink);
    }

    .hd-time-divider {
        width: 1px;
        height: 32px;
        background: var(--line);
    }

    .hd-reviews-section { margin-bottom: 0; }

    .hd-reviews-title {
        font-family: 'Space Grotesk', sans-serif;
        font-weight: 700;
        font-size: 1.35rem;
        color: var(--ink);
        margin-bottom: 1.2rem;
    }

    .hd-reviews-count {
        color: var(--muted);
        font-weight: 500;
        font-size: 1rem;
    }

    .hd-empty-reviews {
        text-align: center;
        padding: 2.4rem 1rem;
        background: #F7F6FC;
        border: 1px dashed var(--line);
        border-radius: 14px;
    }

    .hd-empty-title {
        font-family: 'Space Grotesk', sans-serif;
        font-weight: 600;
        color: var(--ink);
        margin-bottom: 0.3rem;
    }

    .hd-empty-text {
        color: var(--muted);
        font-size: 0.9rem;
        margin: 0;
    }

    .hd-review-card {
        background: #F7F6FC;
        border-left: 3px solid var(--teal);
        border-radius: 12px;
        padding: 1.1rem 1.3rem;
        margin-bottom: 0.9rem;
    }

    .hd-review-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 0.6rem;
    }

    .hd-review-stars {
        display: flex;
        align-items: center;
        gap: 0.15rem;
    }

    .hd-review-star-icon {
        color: var(--amber);
    }

    .hd-verified {
        display: inline-flex;
        align-items: center;
        gap: 0.3rem;
        font-size: 0.78rem;
        font-weight: 600;
        color: var(--teal);
    }

    .hd-review-comment {
        color: var(--ink-soft);
        line-height: 1.6;
        margin: 0;
        font-size: 0.95rem;
    }

    /* Sidebar */
    .hd-side {
        position: relative;
    }

    .hd-book-card {
        position: sticky;
        top: 1.5rem;
        background: linear-gradient(160deg, var(--violet-deep) 0%, var(--violet) 60%, var(--teal) 130%);
        border-radius: 18px;
        padding: 1.7rem 1.5rem;
        color: #FFFFFF;
        box-shadow: 0 20px 40px -18px rgba(74,58,168,0.5);
    }

    .hd-book-eyebrow {
        display: block;
        font-family: 'Space Grotesk', sans-serif;
        font-weight: 700;
        font-size: 1.1rem;
        margin-bottom: 0.4rem;
    }

    .hd-book-text {
        color: rgba(255,255,255,0.8);
        font-size: 0.88rem;
        line-height: 1.5;
        margin: 0 0 1.3rem;
    }

    .hd-book-btn {
        width: 100%;
        border: none;
        background: #FFFFFF;
        color: var(--violet-deep);
        font-weight: 700;
        font-size: 0.92rem;
        padding: 0.75rem;
        border-radius: 12px;
        cursor: pointer;
        transition: transform 0.15s ease, box-shadow 0.15s ease;
    }

    .hd-book-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 24px -10px rgba(0,0,0,0.35);
    }

    .hd-book-btn:active { transform: translateY(0); }

    .hd-book-btn:focus-visible {
        outline: 2px solid #FFFFFF;
        outline-offset: 3px;
    }

    @media (max-width: 900px) {
        .hd-body {
            grid-template-columns: 1fr;
            padding: 1.8rem 1.5rem;
        }
        .hd-hero { height: 300px; }
        .hd-hotel-name { font-size: 1.8rem; }
        .hd-rating-badge {
            top: auto;
            bottom: 1.2rem;
            right: 1.2rem;
        }
        .hd-book-card { position: static; }
        .hd-times { flex-wrap: wrap; }
    }
`;

export default HotelDetailsPage;