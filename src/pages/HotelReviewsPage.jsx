import { useEffect, useState } from "react";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import Navbar from "../components/Navbar";

import {
    getHotelReviews
} from "../services/reviewService";

function HotelReviewsPage() {

    const navigate = useNavigate();

    const { hotelId } = useParams();

    const [reviews, setReviews] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        fetchReviews();

    }, []);

    const fetchReviews =
        async () => {

            try {

                const response =
                    await getHotelReviews(
                        hotelId
                    );

                setReviews(
                    response.data
                );

            }

            catch (error) {

                console.error(error);

            }

            finally {

                setLoading(false);

            }

        };

    const renderStars =
        (rating) => {

            let stars = "";

            for (
                let i = 1;
                i <= 5;
                i++
            ) {

                if (i <= rating) {

                    stars += "⭐";

                }

                else {

                    stars += "☆";

                }

            }

            return stars;

        };

    const averageRating =
        reviews.length === 0
            ? 0
            :
            (
                reviews.reduce(
                    (
                        total,
                        review
                    ) =>
                        total +
                        review.rating,
                    0
                )
                /
                reviews.length
            ).toFixed(1);

    if (loading) {

        return (

            <div className="hr-root">

                <Navbar />

                <div className="container hr-loading-wrap">

                    <h3 className="hr-loading-text">

                        Loading Reviews...

                    </h3>

                </div>

                <style>{`
                    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');

                    .hr-root {
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

                    .hr-loading-wrap { padding-top: 3rem; }

                    .hr-loading-text {
                        font-family: 'Space Grotesk', sans-serif;
                        font-weight: 600;
                        color: var(--ink);
                    }
                `}</style>

            </div>

        );

    }

    return (

        <div className="hr-root">

            <Navbar />

            <div className="hr-hero">
                <div className="hr-hero-bg" aria-hidden="true">
                    <div className="hr-blob hr-blob-a" />
                    <div className="hr-blob hr-blob-b" />
                </div>
                <div className="container hr-hero-inner">

                    <button
                        className="hr-back-btn"
                        onClick={() =>
                            navigate(
                                `/manage-hotel/${hotelId}`
                            )
                        }
                    >
                        ← Back
                    </button>

                    <span className="hr-badge-tag">Hotel Admin</span>
                    <h2 className="hr-title">⭐ Hotel Reviews</h2>
                    <p className="hr-subtext">
                        Customer feedback for your hotel.
                    </p>

                </div>
            </div>

            <div className="container hr-container">

                <div className="hr-summary-card">

                    <h3 className="hr-summary-score">

                        {averageRating}

                        {" "}

                        <span className="hr-summary-outof">/ 5</span>

                    </h3>

                    <h5 className="hr-summary-stars">

                        {renderStars(
                            Math.round(
                                averageRating
                            )
                        )}

                    </h5>

                    <p className="hr-summary-count">

                        Based on

                        {" "}

                        {reviews.length}

                        {" "}

                        Reviews

                    </p>

                </div>

                {

                    reviews.length === 0

                        ?

                        (

                            <div className="hr-empty">

                                No Reviews Yet.

                            </div>

                        )

                        :

                        reviews.map(
                            (
                                review
                            ) => (

                                <div
                                    key={review.id}
                                    className="hr-card"
                                >

                                    <div className="hr-card-top">

                                        <div>

                                            <h4 className="hr-reviewer-name">

                                                {

                                                    review.customerName

                                                }

                                            </h4>

                                            <p className="hr-reviewer-email">

                                                {

                                                    review.customerEmail

                                                }

                                            </p>

                                        </div>

                                        <div className="hr-rating-block">

                                            <h5 className="hr-rating-stars">

                                                {

                                                    renderStars(
                                                        review.rating
                                                    )

                                                }

                                            </h5>

                                            <span className="hr-rating-num">

                                                {

                                                    review.rating

                                                }

                                                /5

                                            </span>

                                        </div>

                                    </div>

                                    <div className="hr-divider" />

                                    <p className="hr-comment">

                                        "

                                        {

                                            review.comment

                                        }

                                        "

                                    </p>

                                </div>

                            )

                        )

                }

            </div>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');

                .hr-root {
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
                .hr-hero {
                    position: relative;
                    overflow: hidden;
                    background: linear-gradient(150deg, var(--violet-deep) 0%, var(--violet) 45%, #3E8FBD 78%, var(--teal) 100%);
                    padding-bottom: 2.4rem;
                }

                .hr-hero-bg {
                    position: absolute;
                    inset: 0;
                    overflow: hidden;
                }

                .hr-blob {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(60px);
                    opacity: 0.5;
                }

                .hr-blob-a {
                    width: 320px; height: 320px;
                    top: -140px; left: -80px;
                    background: radial-gradient(circle, rgba(255,255,255,0.35), transparent 70%);
                }

                .hr-blob-b {
                    width: 280px; height: 280px;
                    bottom: -160px; right: -60px;
                    background: radial-gradient(circle, rgba(35,196,168,0.5), transparent 70%);
                }

                .hr-hero-inner {
                    position: relative;
                    z-index: 1;
                    padding-top: 2rem;
                    color: #FFFFFF;
                    animation: hr-rise 0.6s cubic-bezier(.22,1,.36,1) both;
                }

                .hr-back-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.3rem;
                    background: rgba(255,255,255,0.12);
                    border: 1px solid rgba(255,255,255,0.25);
                    color: #FFFFFF;
                    font-size: 0.85rem;
                    font-weight: 600;
                    padding: 0.5rem 1rem;
                    border-radius: 999px;
                    cursor: pointer;
                    margin-bottom: 1.4rem;
                    transition: background 0.15s ease, transform 0.15s ease;
                }

                .hr-back-btn:hover {
                    background: rgba(255,255,255,0.2);
                    transform: translateX(-2px);
                }

                .hr-badge-tag {
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

                .hr-title {
                    font-family: 'Space Grotesk', sans-serif;
                    font-weight: 700;
                    font-size: 2.1rem;
                    margin: 0 0 0.4rem;
                    text-shadow: 0 2px 20px rgba(0,0,0,0.15);
                }

                .hr-subtext {
                    font-size: 0.98rem;
                    color: rgba(255,255,255,0.82);
                    margin: 0;
                    max-width: 480px;
                }

                @keyframes hr-rise {
                    from { opacity: 0; transform: translateY(12px); }
                    to   { opacity: 1; transform: translateY(0); }
                }

                /* Container */
                .hr-container { padding: 2.4rem 1rem 4rem; }

                /* Summary card */
                .hr-summary-card {
                    max-width: 340px;
                    margin: -3.6rem auto 2.2rem;
                    position: relative;
                    z-index: 1;
                    background: #FFFFFF;
                    border-radius: 18px;
                    padding: 1.8rem 2rem;
                    text-align: center;
                    box-shadow: 0 24px 50px -24px rgba(30,20,70,0.32);
                    border: 1px solid var(--line);
                }

                .hr-summary-score {
                    font-family: 'Space Grotesk', sans-serif;
                    font-weight: 700;
                    font-size: 2.4rem;
                    color: var(--violet-deep);
                    margin: 0 0 0.3rem;
                }

                .hr-summary-outof {
                    font-size: 1.2rem;
                    color: var(--muted);
                    font-weight: 600;
                }

                .hr-summary-stars {
                    margin: 0 0 0.4rem;
                    font-size: 1.2rem;
                }

                .hr-summary-count {
                    color: var(--ink-soft);
                    font-size: 0.88rem;
                    margin: 0;
                }

                /* Reviews list */
                .hr-empty {
                    background: #EAF3FF;
                    border: 1px solid #CFE3FA;
                    color: #2C5C8A;
                    border-radius: 14px;
                    padding: 1.1rem 1.3rem;
                    font-size: 0.95rem;
                    font-weight: 500;
                    max-width: 780px;
                    margin: 0 auto;
                }

                .hr-card {
                    max-width: 780px;
                    margin: 0 auto 1.4rem;
                    background: #FFFFFF;
                    border-radius: 18px;
                    padding: 1.7rem 1.8rem;
                    box-shadow: 0 20px 44px -26px rgba(30,20,70,0.28);
                    border: 1px solid var(--line);
                    transition: transform 0.15s ease, box-shadow 0.15s ease;
                }

                .hr-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 26px 52px -24px rgba(30,20,70,0.34);
                }

                .hr-card-top {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    gap: 1rem;
                    flex-wrap: wrap;
                }

                .hr-reviewer-name {
                    font-family: 'Space Grotesk', sans-serif;
                    font-weight: 600;
                    font-size: 1.15rem;
                    color: var(--ink);
                    margin: 0 0 0.2rem;
                }

                .hr-reviewer-email {
                    color: var(--ink-soft);
                    font-size: 0.88rem;
                    margin: 0;
                }

                .hr-rating-block {
                    text-align: right;
                }

                .hr-rating-stars {
                    margin: 0 0 0.2rem;
                    font-size: 1.05rem;
                }

                .hr-rating-num {
                    color: var(--ink-soft);
                    font-size: 0.85rem;
                    font-weight: 600;
                }

                .hr-divider {
                    height: 1px;
                    background: var(--line);
                    margin: 1.1rem 0;
                }

                .hr-comment {
                    font-size: 1.02rem;
                    color: var(--ink);
                    font-style: italic;
                    margin: 0;
                    line-height: 1.55;
                }

                @media (max-width: 700px) {
                    .hr-title { font-size: 1.8rem; }
                    .hr-summary-card { margin-top: -2.6rem; }
                    .hr-card { padding: 1.4rem 1.3rem; }
                    .hr-rating-block { text-align: left; }
                }
            `}</style>

        </div>

    );

}

export default HotelReviewsPage;