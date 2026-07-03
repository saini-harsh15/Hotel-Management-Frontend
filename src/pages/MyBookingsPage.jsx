import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
    getMyBookings,
    cancelBooking,
    checkInBooking,
    checkOutBooking
} from "../services/bookingService";

import { createPayment } from "../services/paymentService";

import { createReview } from "../services/reviewService";

const STATUS_META = {
    PENDING_PAYMENT: { label: "Pending Payment", tone: "warn" },
    CONFIRMED: { label: "Confirmed", tone: "info" },
    CHECKED_IN: { label: "Checked In", tone: "good" },
    COMPLETED: { label: "Completed", tone: "muted" },
    CANCELLED: { label: "Cancelled", tone: "bad" }
};

function MyBookingsPage() {

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionId, setActionId] = useState(null);

    useEffect(() => {

        fetchBookings();

    }, []);

    const fetchBookings = async () => {

        try {

            setLoading(true);

            const response = await getMyBookings();

            setBookings(response.data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    const handleReview = async (bookingId) => {

        const rating = prompt("Rating (1-5)");

        const comment = prompt("Comment");

        try {

            setActionId(bookingId);

            await createReview({
                bookingId,
                rating: Number(rating),
                comment
            });

            fetchBookings();

            alert("Review Submitted");

        } catch (error) {

            console.error(error);

            console.log(error.response?.data);

        } finally {

            setActionId(null);

        }

    };

    const handleCheckIn = async (bookingId) => {

        try {

            setActionId(bookingId);

            await checkInBooking(bookingId);

            fetchBookings();

        } catch (error) {

            console.error(error);

        } finally {

            setActionId(null);

        }

    };

    const handleCheckOut = async (bookingId) => {

        try {

            setActionId(bookingId);

            await checkOutBooking(bookingId);

            fetchBookings();

        } catch (error) {

            console.error(error);

        } finally {

            setActionId(null);

        }

    };

    const handleCancel = async (bookingId) => {

        try {

            setActionId(bookingId);

            await cancelBooking(bookingId);

            fetchBookings();

        } catch (error) {

            console.error(error);

        } finally {

            setActionId(null);

        }

    };


    const handlePayment = async (bookingId) => {

        try {

            setActionId(bookingId);

            const paymentData = {

                bookingId,

                paymentMethod: "UPI"

            };

            const response = await createPayment(paymentData);

            console.log(response);

            fetchBookings();

        } catch (error) {

            console.error(error);

        } finally {

            setActionId(null);

        }

    };

    return (

        <div className="mb-root">

            <Navbar />

            <div className="container mb-container">

                <div className="mb-header">
                    <span className="mb-eyebrow">Your Stays</span>
                    <h2 className="mb-title">My Bookings</h2>
                </div>

                {
                    loading ?

                        (
                            <div className="mb-loading">
                                <div className="mb-spinner" role="status" />
                                <p className="mb-loading-text">Loading your bookings…</p>
                            </div>
                        )

                        :

                        bookings.length === 0 ?

                            (
                                <div className="mb-empty">
                                    <h3 className="mb-empty-title">No bookings yet</h3>
                                    <p className="mb-empty-text">
                                        Once you book a stay, it'll show up here.
                                    </p>
                                </div>
                            )

                            :

                            (
                                <div className="mb-list">

                                    {
                                        bookings.map(booking => {

                                            const meta = STATUS_META[booking.status] || { label: booking.status, tone: "muted" };
                                            const isBusy = actionId === booking.id;

                                            return (

                                                <div
                                                    key={booking.id}
                                                    className={`mb-card mb-tone-${meta.tone}`}
                                                >

                                                    <div className="mb-card-main">

                                                        <div className="mb-card-top">

                                                            <h5 className="mb-booking-id">Booking #{booking.id}</h5>

                                                            <span className={`mb-chip mb-chip-${meta.tone}`}>
                                                                {meta.label}
                                                            </span>

                                                        </div>

                                                        <div className="mb-details-grid">

                                                            <div className="mb-detail">
                                                                <span className="mb-detail-label">Room Type</span>
                                                                <span className="mb-detail-value">{booking.roomTypeId}</span>
                                                            </div>

                                                            <div className="mb-detail">
                                                                <span className="mb-detail-label">Check In</span>
                                                                <span className="mb-detail-value">{booking.checkInDate}</span>
                                                            </div>

                                                            <div className="mb-detail">
                                                                <span className="mb-detail-label">Check Out</span>
                                                                <span className="mb-detail-value">{booking.checkOutDate}</span>
                                                            </div>

                                                            <div className="mb-detail">
                                                                <span className="mb-detail-label">Guests</span>
                                                                <span className="mb-detail-value">{booking.guestCount}</span>
                                                            </div>

                                                        </div>

                                                        <div className="mb-total">
                                                            Total Amount
                                                            <span className="mb-total-value">₹{booking.totalAmount}</span>
                                                        </div>

                                                    </div>

                                                    <div className="mb-actions">

                                                        {
                                                            booking.status !== "CANCELLED" && booking.status !== "COMPLETED" && (

                                                                <button
                                                                    className="mb-btn mb-btn-outline"
                                                                    disabled={isBusy}
                                                                    onClick={() => handleCancel(booking.id)}
                                                                >
                                                                    Cancel Booking
                                                                </button>

                                                            )
                                                        }

                                                        {
                                                            booking.status === "PENDING_PAYMENT" && (

                                                                <button
                                                                    className="mb-btn mb-btn-solid"
                                                                    disabled={isBusy}
                                                                    onClick={() => handlePayment(booking.id)}
                                                                >
                                                                    {isBusy ? "Processing…" : "Pay Now"}
                                                                </button>

                                                            )
                                                        }

                                                        {
                                                            booking.status === "CONFIRMED" && (

                                                                <button
                                                                    className="mb-btn mb-btn-solid"
                                                                    disabled={isBusy}
                                                                    onClick={() => handleCheckIn(booking.id)}
                                                                >
                                                                    {isBusy ? "Checking in…" : "Check In"}
                                                                </button>

                                                            )
                                                        }

                                                        {
                                                            booking.status === "CHECKED_IN" && (

                                                                <button
                                                                    className="mb-btn mb-btn-solid"
                                                                    disabled={isBusy}
                                                                    onClick={() => handleCheckOut(booking.id)}
                                                                >
                                                                    {isBusy ? "Completing…" : "Complete Stay"}
                                                                </button>

                                                            )
                                                        }

                                                        {
                                                            booking.status === "COMPLETED" && (

                                                                <button
                                                                    className="mb-btn mb-btn-ghost"
                                                                    disabled={isBusy}
                                                                    onClick={() => handleReview(booking.id)}
                                                                >
                                                                    Leave Review
                                                                </button>

                                                            )
                                                        }

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

                .mb-root {
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

                .mb-container { padding: 2.6rem 1rem 4rem; }

                .mb-header { margin-bottom: 2rem; }

                .mb-eyebrow {
                    display: block;
                    font-size: 0.78rem;
                    font-weight: 700;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    color: var(--violet);
                    margin-bottom: 0.4rem;
                }

                .mb-title {
                    font-family: 'Space Grotesk', sans-serif;
                    font-weight: 700;
                    font-size: 1.9rem;
                    color: var(--ink);
                    margin: 0;
                }

                .mb-loading, .mb-empty {
                    text-align: center;
                    padding: 4rem 1rem;
                }

                .mb-spinner {
                    width: 28px;
                    height: 28px;
                    border: 3px solid var(--line);
                    border-top-color: var(--violet);
                    border-radius: 50%;
                    margin: 0 auto 1rem;
                    animation: mb-spin 0.8s linear infinite;
                }

                @keyframes mb-spin { to { transform: rotate(360deg); } }

                .mb-loading-text { color: var(--muted); font-size: 0.9rem; }

                .mb-empty-title {
                    font-family: 'Space Grotesk', sans-serif;
                    font-weight: 600;
                    color: var(--ink);
                    margin-bottom: 0.3rem;
                }

                .mb-empty-text { color: var(--muted); font-size: 0.92rem; margin: 0; }

                .mb-list {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .mb-card {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 1.4rem;
                    background: #FFFFFF;
                    border: 1px solid var(--line);
                    border-left: 4px solid var(--muted);
                    border-radius: 16px;
                    padding: 1.5rem 1.7rem;
                    box-shadow: 0 16px 34px -28px rgba(30,20,70,0.35);
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                }

                .mb-card:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 22px 44px -26px rgba(30,20,70,0.4);
                }

                .mb-tone-warn  { border-left-color: var(--amber); }
                .mb-tone-info  { border-left-color: var(--violet); }
                .mb-tone-good  { border-left-color: var(--teal); }
                .mb-tone-bad   { border-left-color: var(--rose); }
                .mb-tone-muted { border-left-color: var(--muted); }

                .mb-card-main { flex: 1; min-width: 260px; }

                .mb-card-top {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 0.8rem;
                    margin-bottom: 1rem;
                }

                .mb-booking-id {
                    font-family: 'Space Grotesk', sans-serif;
                    font-weight: 600;
                    font-size: 1.05rem;
                    color: var(--ink);
                    margin: 0;
                }

                .mb-chip {
                    font-size: 0.72rem;
                    font-weight: 700;
                    letter-spacing: 0.03em;
                    text-transform: uppercase;
                    padding: 0.32rem 0.75rem;
                    border-radius: 999px;
                    white-space: nowrap;
                }

                .mb-chip-warn  { background: rgba(217,164,65,0.14); color: #9C7422; }
                .mb-chip-info  { background: rgba(109,91,208,0.12); color: var(--violet-deep); }
                .mb-chip-good  { background: rgba(35,196,168,0.14); color: #157D69; }
                .mb-chip-bad   { background: rgba(194,79,92,0.13); color: #A03744; }
                .mb-chip-muted { background: rgba(139,138,151,0.14); color: var(--ink-soft); }

                .mb-details-grid {
                    display: grid;
                    grid-template-columns: repeat(4, auto);
                    gap: 1.6rem;
                    margin-bottom: 1rem;
                }

                .mb-detail {
                    display: flex;
                    flex-direction: column;
                    gap: 0.2rem;
                }

                .mb-detail-label {
                    font-size: 0.7rem;
                    font-weight: 600;
                    letter-spacing: 0.03em;
                    text-transform: uppercase;
                    color: var(--muted);
                }

                .mb-detail-value {
                    font-size: 0.92rem;
                    color: var(--ink);
                    font-weight: 500;
                }

                .mb-total {
                    display: flex;
                    align-items: baseline;
                    gap: 0.6rem;
                    font-size: 0.85rem;
                    color: var(--muted);
                    padding-top: 0.7rem;
                    border-top: 1px dashed var(--line);
                }

                .mb-total-value {
                    font-family: 'Space Grotesk', sans-serif;
                    font-weight: 700;
                    font-size: 1.15rem;
                    color: var(--ink);
                }

                .mb-actions {
                    display: flex;
                    align-items: flex-start;
                    gap: 0.6rem;
                    flex-wrap: wrap;
                    padding-top: 0.2rem;
                }

                .mb-btn {
                    border: none;
                    border-radius: 10px;
                    padding: 0.6rem 1.1rem;
                    font-size: 0.85rem;
                    font-weight: 700;
                    cursor: pointer;
                    white-space: nowrap;
                    transition: filter 0.15s ease, transform 0.15s ease, background 0.15s ease;
                }

                .mb-btn:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }

                .mb-btn-solid {
                    background: linear-gradient(120deg, var(--violet) 0%, var(--teal) 130%);
                    color: #FFFFFF;
                    box-shadow: 0 8px 18px -8px rgba(109,91,208,0.5);
                }

                .mb-btn-solid:hover:not(:disabled) {
                    filter: brightness(1.06);
                    transform: translateY(-1px);
                }

                .mb-btn-outline {
                    background: transparent;
                    border: 1.5px solid var(--rose);
                    color: var(--rose);
                }

                .mb-btn-outline:hover:not(:disabled) {
                    background: rgba(194,79,92,0.08);
                }

                .mb-btn-ghost {
                    background: rgba(217,164,65,0.12);
                    color: #9C7422;
                }

                .mb-btn-ghost:hover:not(:disabled) {
                    background: rgba(217,164,65,0.2);
                }

                .mb-btn:focus-visible {
                    outline: 2px solid var(--violet-deep);
                    outline-offset: 2px;
                }

                @media (max-width: 700px) {
                    .mb-details-grid {
                        grid-template-columns: repeat(2, 1fr);
                        gap: 1rem 1.4rem;
                    }
                    .mb-card { flex-direction: column; }
                }
            `}</style>

        </div>

    );

}

export default MyBookingsPage;