import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    getAllHotels,
    searchHotelsByCity
} from "../services/hotelService";
import Navbar from "../components/Navbar";
import { Star, MapPin } from "lucide-react";

function HotelsPage() {

    const [hotels, setHotels] = useState([]);
    const [city, setCity] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {

        fetchHotels();

    }, []);

    const fetchHotels = async () => {

        try {

            setLoading(true);

            const response = await getAllHotels();

            setHotels(response.data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    const handleSearch = async () => {

        try {

            if (city.trim() === "") {

                fetchHotels();
                return;

            }

            setLoading(true);

            const response = await searchHotelsByCity(city);

            setHotels(response.data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    return (
        <div className="hp-root">

            <Navbar />

            <div className="hp-hero">

                <div className="hp-hero-bg" aria-hidden="true">
                    <div className="hp-blob hp-blob-a" />
                    <div className="hp-blob hp-blob-b" />
                </div>

                <div className="container hp-hero-inner">

                    <span className="hp-badge">Hotel Management Platform</span>

                    <h1 className="hp-headline">Find your perfect stay</h1>

                    <p className="hp-subtext">
                        Discover hotels, book rooms and manage
                        reservations seamlessly.
                    </p>

                    <div className="hp-search-bar">

                        <input
                            type="text"
                            className="hp-search-input"
                            placeholder="Search hotels by city…"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            onKeyDown={(e) => {

                                if (e.key === "Enter") {

                                    handleSearch();

                                }

                            }}
                        />

                        <button className="hp-search-btn" onClick={handleSearch}>
                            Search
                        </button>

                    </div>

                </div>

            </div>

            <div className="container hp-container">

                {
                    loading ?

                        (
                            <div className="hp-loading">
                                <div className="hp-spinner" role="status" />
                                <p className="hp-loading-text">Loading hotels…</p>
                            </div>
                        )

                        :

                        hotels.length === 0 ?

                            (
                                <div className="hp-empty">
                                    <h3 className="hp-empty-title">No hotels found</h3>
                                    <p className="hp-empty-text">
                                        Try a different city or clear your search.
                                    </p>
                                </div>
                            )

                            :

                            (
                                <div className="row g-4">

                                    {
                                        hotels.map(hotel => (

                                            <div
                                                key={hotel.id}
                                                className="col-lg-4 col-md-6"
                                            >

                                                <div className="hp-card">

                                                    <div className="hp-card-img-wrap">

                                                        <img
                                                            src="https://images.unsplash.com/photo-1566073771259-6a8506099945"
                                                            alt="Hotel"
                                                            className="hp-card-img"
                                                        />

                                                        <span className="hp-rating-chip">
                                                            <Star size={13} strokeWidth={2.3} fill="currentColor" />
                                                            {hotel.averageRating?.toFixed(1) || "0.0"}
                                                        </span>

                                                    </div>

                                                    <div className="hp-card-body">

                                                        <h5 className="hp-hotel-name">{hotel.name}</h5>

                                                        <p className="hp-hotel-city">
                                                            <MapPin size={14} strokeWidth={2.2} /> {hotel.city}
                                                        </p>

                                                        <button
                                                            className="hp-view-btn"
                                                            onClick={() => navigate(`/hotels/${hotel.id}`)}
                                                        >
                                                            View Details →
                                                        </button>

                                                    </div>

                                                </div>

                                            </div>

                                        ))
                                    }

                                </div>
                            )

                }

            </div>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');

                .hp-root {
                    --violet: #6D5BD0;
                    --violet-deep: #4A3AA8;
                    --teal: #23C4A8;
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
                .hp-hero {
                    position: relative;
                    overflow: hidden;
                    background: linear-gradient(150deg, var(--violet-deep) 0%, var(--violet) 45%, #3E8FBD 78%, var(--teal) 100%);
                    padding-bottom: 3.2rem;
                }

                .hp-hero-bg {
                    position: absolute;
                    inset: 0;
                    overflow: hidden;
                }

                .hp-blob {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(60px);
                    opacity: 0.5;
                }

                .hp-blob-a {
                    width: 380px;
                    height: 380px;
                    top: -140px;
                    left: -80px;
                    background: radial-gradient(circle, rgba(255,255,255,0.35), transparent 70%);
                }

                .hp-blob-b {
                    width: 340px;
                    height: 340px;
                    bottom: -160px;
                    right: -60px;
                    background: radial-gradient(circle, rgba(35,196,168,0.5), transparent 70%);
                }

                .hp-hero-inner {
                    position: relative;
                    z-index: 1;
                    padding-top: 3rem;
                    color: #FFFFFF;
                    animation: hp-rise 0.6s cubic-bezier(.22,1,.36,1) both;
                }

                .hp-badge {
                    display: inline-block;
                    background: rgba(255,255,255,0.14);
                    backdrop-filter: blur(6px);
                    border: 1px solid rgba(255,255,255,0.2);
                    font-size: 0.78rem;
                    font-weight: 600;
                    padding: 0.45rem 0.95rem;
                    border-radius: 999px;
                    margin-bottom: 1.2rem;
                }

                .hp-headline {
                    font-family: 'Space Grotesk', sans-serif;
                    font-weight: 700;
                    font-size: 2.6rem;
                    margin: 0 0 0.6rem;
                    text-shadow: 0 2px 20px rgba(0,0,0,0.15);
                }

                .hp-subtext {
                    font-size: 1.02rem;
                    color: rgba(255,255,255,0.82);
                    margin: 0 0 2rem;
                    max-width: 520px;
                }

                .hp-search-bar {
                    display: flex;
                    gap: 0.7rem;
                    background: rgba(255,255,255,0.94);
                    backdrop-filter: blur(16px);
                    border-radius: 16px;
                    padding: 0.6rem;
                    max-width: 640px;
                    box-shadow: 0 25px 50px -20px rgba(30,20,70,0.4);
                }

                .hp-search-input {
                    flex: 1;
                    border: none;
                    background: transparent;
                    padding: 0.7rem 0.9rem;
                    font-size: 0.98rem;
                    color: var(--ink);
                    font-family: 'Inter', sans-serif;
                }

                .hp-search-input::placeholder { color: #BFBECB; }

                .hp-search-input:focus { outline: none; }

                .hp-search-btn {
                    border: none;
                    border-radius: 11px;
                    padding: 0.7rem 1.5rem;
                    background: linear-gradient(120deg, var(--violet) 0%, var(--teal) 130%);
                    color: #FFFFFF;
                    font-weight: 700;
                    font-size: 0.92rem;
                    cursor: pointer;
                    transition: filter 0.15s ease, transform 0.15s ease;
                }

                .hp-search-btn:hover {
                    filter: brightness(1.06);
                    transform: translateY(-1px);
                }

                .hp-search-btn:active { transform: translateY(0); }

                .hp-search-btn:focus-visible {
                    outline: 2px solid #FFFFFF;
                    outline-offset: 2px;
                }

                /* GRID */
                .hp-container {
                    padding: 2.6rem 1rem 4rem;
                }

                .hp-loading, .hp-empty {
                    text-align: center;
                    padding: 4rem 1rem;
                }

                .hp-spinner {
                    width: 28px;
                    height: 28px;
                    border: 3px solid var(--line);
                    border-top-color: var(--violet);
                    border-radius: 50%;
                    margin: 0 auto 1rem;
                    animation: hp-spin 0.8s linear infinite;
                }

                @keyframes hp-spin { to { transform: rotate(360deg); } }

                .hp-loading-text {
                    color: var(--muted);
                    font-size: 0.9rem;
                }

                .hp-empty-title {
                    font-family: 'Space Grotesk', sans-serif;
                    font-weight: 600;
                    color: var(--ink);
                    margin-bottom: 0.3rem;
                }

                .hp-empty-text {
                    color: var(--muted);
                    font-size: 0.92rem;
                    margin: 0;
                }

                .hp-card {
                    height: 100%;
                    background: #FFFFFF;
                    border-radius: 18px;
                    overflow: hidden;
                    box-shadow: 0 18px 40px -26px rgba(30,20,70,0.3);
                    transition: transform 0.22s ease, box-shadow 0.22s ease;
                }

                .hp-card:hover {
                    transform: translateY(-6px);
                    box-shadow: 0 26px 50px -22px rgba(30,20,70,0.38);
                }

                .hp-card-img-wrap {
                    position: relative;
                    height: 200px;
                }

                .hp-card-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .hp-rating-chip {
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

                .hp-rating-chip svg {
                    color: #D9A441;
                }

                .hp-card-body {
                    padding: 1.3rem 1.4rem 1.5rem;
                }

                .hp-hotel-name {
                    font-family: 'Space Grotesk', sans-serif;
                    font-weight: 600;
                    font-size: 1.1rem;
                    color: var(--ink);
                    margin: 0 0 0.35rem;
                }

                .hp-hotel-city {
                    display: flex;
                    align-items: center;
                    gap: 0.35rem;
                    color: var(--muted);
                    font-size: 0.9rem;
                    margin: 0 0 1.1rem;
                }

                .hp-hotel-city svg {
                    color: var(--violet);
                    flex-shrink: 0;
                }

                .hp-view-btn {
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

                .hp-view-btn:hover {
                    filter: brightness(1.06);
                    transform: translateY(-1px);
                }

                .hp-view-btn:active { transform: translateY(0); }

                .hp-view-btn:focus-visible {
                    outline: 2px solid var(--violet-deep);
                    outline-offset: 2px;
                }

                @keyframes hp-rise {
                    from { opacity: 0; transform: translateY(14px); }
                    to   { opacity: 1; transform: translateY(0); }
                }

                @media (prefers-reduced-motion: reduce) {
                    .hp-hero-inner { animation: none; }
                }

                @media (max-width: 600px) {
                    .hp-headline { font-size: 2rem; }
                    .hp-search-bar { flex-direction: column; }
                }
            `}</style>

        </div>
    );

}

export default HotelsPage;