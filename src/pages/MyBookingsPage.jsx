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

import { Building2, Star, X } from "lucide-react";

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

    const [toast, setToast] = useState(null); // { message, tone }

    const [reviewModal, setReviewModal] = useState({
        open: false,
        bookingId: null
    });

    const [reviewRating, setReviewRating] = useState(0);
    const [reviewHoverRating, setReviewHoverRating] = useState(0);
    const [reviewComment, setReviewComment] = useState("");
    const [reviewSubmitting, setReviewSubmitting] = useState(false);
    const [reviewError, setReviewError] = useState("");

    useEffect(() => {

        fetchBookings();

    }, []);

    useEffect(() => {

        if (!toast) return;

        const timer = setTimeout(() => setToast(null), 3200);

        return () => clearTimeout(timer);

    }, [toast]);

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

    const openReviewModal = (bookingId) => {

        setReviewModal({ open: true, bookingId });
        setReviewRating(0);
        setReviewHoverRating(0);
        setReviewComment("");
        setReviewError("");

    };

    const closeReviewModal = () => {

        if (reviewSubmitting) return;

        setReviewModal({ open: false, bookingId: null });

    };

    const handleSubmitReview = async () => {

        if (reviewRating === 0) {

            setReviewError("Please select a rating.");
            return;

        }

        try {

            setReviewSubmitting(true);
            setReviewError("");

            setActionId(reviewModal.bookingId);

            await createReview({
                bookingId: reviewModal.bookingId,
                rating: reviewRating,
                comment: reviewComment
            });

            setReviewModal({ open: false, bookingId: null });

            setToast({ message: "Review submitted — thank you!", tone: "good" });

            fetchBookings();

        } catch (error) {

            console.error(error);

            const message = error.response?.data?.message || "Failed to submit review. Please try again.";

            setReviewError(message);

        } finally {

            setReviewSubmitting(false);
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

            setToast({ message: "Failed to check in. Please try again.", tone: "bad" });

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

            setToast({ message: "Failed to complete stay. Please try again.", tone: "bad" });

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

            setToast({ message: "Failed to cancel booking. Please try again.", tone: "bad" });

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

            setToast({ message: "Payment failed. Please try again.", tone: "bad" });

        } finally {

            setActionId(null);

        }

    };

    const confirmationCode = (id) => `HTL-${String(id).padStart(6, "0")}`;

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

                                                <div key={booking.id} className="ticket">

                                                    <div className={`ticket-band ticket-band-${meta.tone}`}>

                                                        <div className="ticket-band-left">
                                                            <Building2 size={17} strokeWidth={2.2} className="ticket-icon" />
                                                            <span className="ticket-code">{confirmationCode(booking.id)}</span>
                                                        </div>

                                                        <span className={`ticket-stamp ticket-stamp-${meta.tone}`}>
                                                            {meta.label}
                                                        </span>

                                                    </div>

                                                    <div className="ticket-body">

                                                        <div className="ticket-room-row">
                                                            <span className="ticket-room-label">Room</span>
                                                            <span className="ticket-room-value">
                                                                {booking.roomTypeName || `Room Type #${booking.roomTypeId}`}
                                                            </span>
                                                        </div>

                                                        <div className="ticket-lines">

                                                            <div className="ticket-line">
                                                                <span className="ticket-line-label">Check In</span>
                                                                <span className="ticket-line-leader" />
                                                                <span className="ticket-line-value">{booking.checkInDate}</span>
                                                            </div>

                                                            <div className="ticket-line">
                                                                <span className="ticket-line-label">Check Out</span>
                                                                <span className="ticket-line-leader" />
                                                                <span className="ticket-line-value">{booking.checkOutDate}</span>
                                                            </div>

                                                            <div className="ticket-line">
                                                                <span className="ticket-line-label">Guests</span>
                                                                <span className="ticket-line-leader" />
                                                                <span className="ticket-line-value">{booking.guestCount}</span>
                                                            </div>

                                                        </div>

                                                    </div>

                                                    <div className="ticket-perforation">
                                                        <span className="ticket-notch ticket-notch-left" />
                                                        <span className="ticket-notch ticket-notch-right" />
                                                    </div>

                                                    <div className="ticket-stub">

                                                        <div className="ticket-total">
                                                            <span className="ticket-total-label">Total Paid</span>
                                                            <span className="ticket-total-value">₹{booking.totalAmount}</span>
                                                        </div>

                                                        <div className="ticket-actions">

                                                            {
                                                                booking.status !== "CANCELLED" && booking.status !== "COMPLETED" && (

                                                                    <button
                                                                        className="tk-btn tk-btn-outline"
                                                                        disabled={isBusy}
                                                                        onClick={() => handleCancel(booking.id)}
                                                                    >
                                                                        Cancel
                                                                    </button>

                                                                )
                                                            }

                                                            {
                                                                booking.status === "PENDING_PAYMENT" && (

                                                                    <button
                                                                        className="tk-btn tk-btn-solid"
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
                                                                        className="tk-btn tk-btn-solid"
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
                                                                        className="tk-btn tk-btn-solid"
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
                                                                        className="tk-btn tk-btn-ghost"
                                                                        disabled={isBusy}
                                                                        onClick={() => openReviewModal(booking.id)}
                                                                    >
                                                                        Leave Review
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

            {/* ===== Review Modal ===== */}
            {
                reviewModal.open && (

                    <div className="rv-overlay" onClick={closeReviewModal}>

                        <div className="rv-modal" onClick={(e) => e.stopPropagation()}>

                            <button
                                className="rv-close"
                                onClick={closeReviewModal}
                                disabled={reviewSubmitting}
                                aria-label="Close"
                            >
                                <X size={18} strokeWidth={2.2} />
                            </button>

                            <span className="rv-eyebrow">Share your experience</span>
                            <h3 className="rv-title">Leave a Review</h3>

                            <div className="rv-stars">

                                {
                                    [1, 2, 3, 4, 5].map(star => {

                                        const active = star <= (reviewHoverRating || reviewRating);

                                        return (

                                            <button
                                                key={star}
                                                type="button"
                                                className="rv-star-btn"
                                                onMouseEnter={() => setReviewHoverRating(star)}
                                                onMouseLeave={() => setReviewHoverRating(0)}
                                                onClick={() => setReviewRating(star)}
                                                aria-label={`${star} star`}
                                            >
                                                <Star
                                                    size={30}
                                                    strokeWidth={1.8}
                                                    className={`rv-star ${active ? "rv-star-active" : ""}`}
                                                    fill={active ? "currentColor" : "none"}
                                                />
                                            </button>

                                        );

                                    })
                                }

                            </div>

                            <p className="rv-rating-caption">
                                {
                                    reviewRating === 0 ? "Tap a star to rate" :
                                        reviewRating === 1 ? "Poor" :
                                            reviewRating === 2 ? "Fair" :
                                                reviewRating === 3 ? "Good" :
                                                    reviewRating === 4 ? "Great" : "Excellent"
                                }
                            </p>

                            <textarea
                                className="rv-textarea"
                                placeholder="Tell us more about your stay (optional)…"
                                rows={4}
                                value={reviewComment}
                                onChange={(e) => setReviewComment(e.target.value)}
                                disabled={reviewSubmitting}
                            />

                            {
                                reviewError && (
                                    <p className="rv-error">{reviewError}</p>
                                )
                            }

                            <div className="rv-actions">

                                <button
                                    className="tk-btn tk-btn-outline rv-cancel-btn"
                                    onClick={closeReviewModal}
                                    disabled={reviewSubmitting}
                                >
                                    Cancel
                                </button>

                                <button
                                    className="tk-btn tk-btn-solid rv-submit-btn"
                                    onClick={handleSubmitReview}
                                    disabled={reviewSubmitting}
                                >
                                    {reviewSubmitting ? "Submitting…" : "Submit Review"}
                                </button>

                            </div>

                        </div>

                    </div>

                )
            }

            {/* ===== Toast ===== */}
            {
                toast && (

                    <div className={`mb-toast mb-toast-${toast.tone}`}>
                        {toast.message}
                    </div>

                )
            }

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600&display=swap');

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
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
                    gap: 1.6rem;
                }

                /* ===== Ticket / receipt card ===== */
                .ticket {
                    display: flex;
                    flex-direction: column;
                    background: #FFFFFF;
                    border-radius: 18px;
                    overflow: visible;
                    box-shadow: 0 20px 44px -26px rgba(30,20,70,0.4);
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                }

                .ticket:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 28px 54px -24px rgba(30,20,70,0.45);
                }

                .ticket-band {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0.95rem 1.3rem;
                    border-radius: 18px 18px 0 0;
                    color: #FFFFFF;
                    background: linear-gradient(120deg, var(--violet-deep) 0%, var(--violet) 55%, var(--teal) 140%);
                }

                .ticket-band-left {
                    display: flex;
                    align-items: center;
                    gap: 0.6rem;
                }

                .ticket-icon { flex-shrink: 0; }

                .ticket-code {
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 0.82rem;
                    font-weight: 600;
                    letter-spacing: 0.03em;
                }

                .ticket-stamp {
                    font-size: 0.68rem;
                    font-weight: 700;
                    letter-spacing: 0.04em;
                    text-transform: uppercase;
                    padding: 0.3rem 0.7rem;
                    border-radius: 999px;
                    background: rgba(255,255,255,0.22);
                    backdrop-filter: blur(4px);
                }

                .ticket-body {
                    padding: 1.3rem 1.4rem 0.4rem;
                }

                .ticket-room-row {
                    display: flex;
                    flex-direction: column;
                    gap: 0.2rem;
                    margin-bottom: 1.1rem;
                }

                .ticket-room-label {
                    font-size: 0.7rem;
                    font-weight: 700;
                    letter-spacing: 0.05em;
                    text-transform: uppercase;
                    color: var(--muted);
                }

                .ticket-room-value {
                    font-family: 'Space Grotesk', sans-serif;
                    font-weight: 700;
                    font-size: 1.15rem;
                    color: var(--ink);
                }

                .ticket-lines {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                    margin-bottom: 0.9rem;
                }

                .ticket-line {
                    display: flex;
                    align-items: baseline;
                    gap: 0.5rem;
                }

                .ticket-line-label {
                    font-size: 0.85rem;
                    color: var(--ink-soft);
                    white-space: nowrap;
                }

                .ticket-line-leader {
                    flex: 1;
                    border-bottom: 1.5px dotted var(--line);
                    transform: translateY(-3px);
                }

                .ticket-line-value {
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 0.85rem;
                    font-weight: 600;
                    color: var(--ink);
                    white-space: nowrap;
                }

                /* perforation with punched notches */
                .ticket-perforation {
                    position: relative;
                    height: 0;
                    border-top: 2px dashed var(--line);
                    margin: 0 0;
                }

                .ticket-notch {
                    position: absolute;
                    top: -9px;
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    background: var(--cream);
                }

                .ticket-notch-left { left: -9px; }
                .ticket-notch-right { right: -9px; }

                .ticket-stub {
                    padding: 1.1rem 1.4rem 1.4rem;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .ticket-total {
                    display: flex;
                    align-items: baseline;
                    justify-content: space-between;
                }

                .ticket-total-label {
                    font-size: 0.78rem;
                    font-weight: 600;
                    color: var(--muted);
                    text-transform: uppercase;
                    letter-spacing: 0.04em;
                }

                .ticket-total-value {
                    font-family: 'Space Grotesk', sans-serif;
                    font-weight: 700;
                    font-size: 1.5rem;
                    background: linear-gradient(120deg, var(--violet-deep), var(--teal));
                    -webkit-background-clip: text;
                    background-clip: text;
                    color: transparent;
                }

                .ticket-actions {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.55rem;
                }

                .tk-btn {
                    flex: 1;
                    min-width: 110px;
                    border: none;
                    border-radius: 10px;
                    padding: 0.6rem 0.9rem;
                    font-size: 0.83rem;
                    font-weight: 700;
                    cursor: pointer;
                    white-space: nowrap;
                    transition: filter 0.15s ease, transform 0.15s ease, background 0.15s ease;
                }

                .tk-btn:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }

                .tk-btn-solid {
                    background: linear-gradient(120deg, var(--violet) 0%, var(--teal) 130%);
                    color: #FFFFFF;
                    box-shadow: 0 8px 18px -8px rgba(109,91,208,0.5);
                }

                .tk-btn-solid:hover:not(:disabled) {
                    filter: brightness(1.06);
                    transform: translateY(-1px);
                }

                .tk-btn-outline {
                    background: transparent;
                    border: 1.5px solid var(--rose);
                    color: var(--rose);
                }

                .tk-btn-outline:hover:not(:disabled) {
                    background: rgba(194,79,92,0.08);
                }

                .tk-btn-ghost {
                    background: rgba(217,164,65,0.12);
                    color: #9C7422;
                }

                .tk-btn-ghost:hover:not(:disabled) {
                    background: rgba(217,164,65,0.2);
                }

                .tk-btn:focus-visible {
                    outline: 2px solid var(--violet-deep);
                    outline-offset: 2px;
                }

                /* ===== Review Modal ===== */
                .rv-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(27,27,35,0.5);
                    backdrop-filter: blur(3px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 1rem;
                    z-index: 1000;
                    animation: rv-fade-in 0.18s ease both;
                }

                @keyframes rv-fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                .rv-modal {
                    position: relative;
                    background: #FFFFFF;
                    border-radius: 20px;
                    padding: 2rem 2rem 1.8rem;
                    width: 100%;
                    max-width: 420px;
                    box-shadow: 0 40px 80px -30px rgba(30,20,70,0.5);
                    animation: rv-rise 0.22s cubic-bezier(.22,1,.36,1) both;
                }

                @keyframes rv-rise {
                    from { opacity: 0; transform: translateY(16px) scale(0.98); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }

                .rv-close {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    border: none;
                    background: var(--cream);
                    color: var(--muted);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: background 0.15s ease, color 0.15s ease;
                }

                .rv-close:hover:not(:disabled) {
                    background: var(--line);
                    color: var(--ink);
                }

                .rv-close:disabled { opacity: 0.5; cursor: not-allowed; }

                .rv-eyebrow {
                    display: block;
                    font-size: 0.74rem;
                    font-weight: 700;
                    letter-spacing: 0.07em;
                    text-transform: uppercase;
                    color: var(--violet);
                    margin-bottom: 0.35rem;
                }

                .rv-title {
                    font-family: 'Space Grotesk', sans-serif;
                    font-weight: 700;
                    font-size: 1.4rem;
                    color: var(--ink);
                    margin: 0 0 1.4rem;
                }

                .rv-stars {
                    display: flex;
                    justify-content: center;
                    gap: 0.3rem;
                    margin-bottom: 0.5rem;
                }

                .rv-star-btn {
                    background: none;
                    border: none;
                    padding: 0.2rem;
                    cursor: pointer;
                    line-height: 0;
                }

                .rv-star {
                    color: var(--line);
                    transition: color 0.12s ease, transform 0.12s ease;
                }

                .rv-star-btn:hover .rv-star {
                    transform: scale(1.08);
                }

                .rv-star-active {
                    color: var(--amber);
                }

                .rv-rating-caption {
                    text-align: center;
                    font-size: 0.85rem;
                    font-weight: 600;
                    color: var(--ink-soft);
                    margin: 0 0 1.3rem;
                    min-height: 1.2em;
                }

                .rv-textarea {
                    width: 100%;
                    border: 1.5px solid var(--line);
                    border-radius: 12px;
                    padding: 0.8rem 0.95rem;
                    font-family: 'Inter', sans-serif;
                    font-size: 0.92rem;
                    color: var(--ink);
                    resize: vertical;
                    min-height: 90px;
                    transition: border-color 0.15s ease;
                }

                .rv-textarea:focus {
                    outline: none;
                    border-color: var(--violet);
                }

                .rv-textarea:disabled {
                    background: var(--cream);
                    opacity: 0.7;
                }

                .rv-error {
                    color: var(--rose);
                    font-size: 0.83rem;
                    font-weight: 600;
                    margin: 0.7rem 0 0;
                }

                .rv-actions {
                    display: flex;
                    gap: 0.7rem;
                    margin-top: 1.4rem;
                }

                .rv-cancel-btn, .rv-submit-btn {
                    flex: 1;
                    min-width: 0;
                }

                /* ===== Toast ===== */
                .mb-toast {
                    position: fixed;
                    bottom: 1.6rem;
                    left: 50%;
                    transform: translateX(-50%);
                    padding: 0.85rem 1.4rem;
                    border-radius: 12px;
                    font-size: 0.9rem;
                    font-weight: 600;
                    color: #FFFFFF;
                    box-shadow: 0 20px 40px -18px rgba(0,0,0,0.4);
                    z-index: 1100;
                    animation: mb-toast-rise 0.22s cubic-bezier(.22,1,.36,1) both;
                }

                @keyframes mb-toast-rise {
                    from { opacity: 0; transform: translate(-50%, 10px); }
                    to { opacity: 1; transform: translate(-50%, 0); }
                }

                .mb-toast-good {
                    background: linear-gradient(120deg, var(--teal) 0%, #2FB88F 130%);
                }

                .mb-toast-bad {
                    background: var(--rose);
                }

                @media (max-width: 500px) {
                    .mb-list { grid-template-columns: 1fr; }
                }
            `}</style>

        </div>

    );

}

export default MyBookingsPage;