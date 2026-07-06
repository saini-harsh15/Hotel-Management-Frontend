import { useEffect, useState } from "react";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import Navbar from "../components/Navbar";

import {
    getBookingsForHotel,
    checkInBooking,
    checkOutBooking
} from "../services/bookingService";

function HotelBookingsPage() {

    const navigate = useNavigate();

    const { hotelId } = useParams();

    const [bookings, setBookings] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        fetchBookings();

    }, []);

    const fetchBookings =
        async () => {

            try {

                const response =
                    await getBookingsForHotel(
                        hotelId
                    );

                setBookings(
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

    const handleCheckIn =
        async (bookingId) => {

            try {

                await checkInBooking(
                    bookingId
                );

                await fetchBookings();

            }

            catch (error) {

                console.error(error);

                alert(
                    error.response?.data?.message
                    ||
                    "Failed to check in."
                );

            }

        };

    const handleCheckOut =
        async (bookingId) => {

            try {

                await checkOutBooking(
                    bookingId
                );

                await fetchBookings();

            }

            catch (error) {

                console.error(error);

                alert(
                    error.response?.data?.message
                    ||
                    "Failed to check out."
                );

            }

        };

    const getBadgeClass =
        (status) => {

            switch (status) {

                case "CONFIRMED":

                    return "hb-badge-confirmed";

                case "CHECKED_IN":

                    return "hb-badge-checkedin";

                case "COMPLETED":

                    return "hb-badge-completed";

                case "CANCELLED":

                    return "hb-badge-cancelled";

                case "PENDING_PAYMENT":

                    return "hb-badge-pending";

                default:

                    return "hb-badge-default";

            }

        };

    if (loading) {

        return (

            <div className="hb-root">

                <Navbar />

                <div className="container hb-loading-wrap">

                    <h3 className="hb-loading-text">
                        Loading bookings...
                    </h3>

                </div>

                <style>{`
                    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');

                    .hb-root {
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

                    .hb-loading-wrap { padding-top: 3rem; }

                    .hb-loading-text {
                        font-family: 'Space Grotesk', sans-serif;
                        font-weight: 600;
                        color: var(--ink);
                    }
                `}</style>

            </div>

        );

    }

    return (

        <div className="hb-root">

            <Navbar />

            <div className="hb-hero">
                <div className="hb-hero-bg" aria-hidden="true">
                    <div className="hb-blob hb-blob-a" />
                    <div className="hb-blob hb-blob-b" />
                </div>
                <div className="container hb-hero-inner">

                    <button
                        className="hb-back-btn"
                        onClick={() =>
                            navigate(
                                `/manage-hotel/${hotelId}`
                            )
                        }
                    >
                        ← Back
                    </button>

                    <div className="hb-hero-row">

                        <div>
                            <span className="hb-badge-tag">Hotel Admin</span>
                            <h2 className="hb-title">Hotel Bookings</h2>
                            <p className="hb-subtext">
                                Manage bookings for your hotel.
                            </p>
                        </div>

                        <span className="hb-count-badge">
                            {bookings.length} Bookings
                        </span>

                    </div>

                </div>
            </div>

            <div className="container hb-container">

                {
                    bookings.length === 0 ?

                        (

                            <div className="hb-empty">

                                No bookings found.

                            </div>

                        )

                        :

                        bookings.map(
                            (booking) => (

                                <div
                                    key={booking.id}
                                    className="hb-card"
                                >

                                    <div className="hb-card-top">

                                        <div>

                                            <h4 className="hb-guest-name">

                                                {booking.customerName}

                                            </h4>

                                            <p className="hb-guest-email">

                                                {booking.customerEmail}

                                            </p>

                                        </div>

                                        <span
                                            className={`hb-badge ${getBadgeClass(booking.status)}`}
                                        >

                                            {booking.status}

                                        </span>

                                    </div>

                                    <div className="hb-divider" />

                                    <div className="hb-details">

                                        <div className="hb-details-col">

                                            <p className="hb-detail">

                                                <strong>

                                                    Room Type :

                                                </strong>

                                                {" "}

                                                {booking.roomTypeName}

                                            </p>

                                            <p className="hb-detail">

                                                <strong>

                                                    Room :

                                                </strong>

                                                {" "}

                                                {
                                                    booking.assignedRoomNumber
                                                    ||
                                                    "Not Assigned"
                                                }

                                            </p>

                                        </div>

                                        <div className="hb-details-col">

                                            <p className="hb-detail">

                                                <strong>

                                                    Check In :

                                                </strong>

                                                {" "}

                                                {booking.checkInDate}

                                            </p>

                                            <p className="hb-detail">

                                                <strong>

                                                    Check Out :

                                                </strong>

                                                {" "}

                                                {booking.checkOutDate}

                                            </p>

                                            <p className="hb-detail">

                                                <strong>

                                                    Guests :

                                                </strong>

                                                {" "}

                                                {booking.guestCount}

                                            </p>

                                            <p className="hb-detail">

                                                <strong>

                                                    Amount :

                                                </strong>

                                                {" "}

                                                ₹{booking.totalAmount}

                                            </p>

                                        </div>

                                    </div>

                                    <div className="hb-actions">

                                        {

                                            booking.status === "CONFIRMED"

                                            &&

                                            (

                                                <button
                                                    className="hb-btn-checkin"
                                                    onClick={() =>
                                                        handleCheckIn(
                                                            booking.id
                                                        )
                                                    }
                                                >
                                                    ✔ Check In
                                                </button>

                                            )

                                        }

                                        {

                                            booking.status === "CHECKED_IN"

                                            &&

                                            (

                                                <button
                                                    className="hb-btn-checkout"
                                                    onClick={() =>
                                                        handleCheckOut(
                                                            booking.id
                                                        )
                                                    }
                                                >
                                                    ✔ Check Out
                                                </button>

                                            )

                                        }

                                        {

                                            booking.status === "COMPLETED"

                                            &&

                                            (

                                                <span
                                                    className="hb-status-text hb-status-completed"
                                                >
                                                    Guest has checked out.
                                                </span>

                                            )

                                        }

                                        {

                                            booking.status === "CANCELLED"

                                            &&

                                            (

                                                <span
                                                    className="hb-status-text hb-status-cancelled"
                                                >
                                                    Booking Cancelled
                                                </span>

                                            )

                                        }

                                        {

                                            booking.status === "PENDING_PAYMENT"

                                            &&

                                            (

                                                <span
                                                    className="hb-status-text hb-status-pending"
                                                >
                                                    Awaiting Payment
                                                </span>

                                            )

                                        }

                                    </div>

                                </div>

                            )

                        )

                }

            </div>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');

                .hb-root {
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
                .hb-hero {
                    position: relative;
                    overflow: hidden;
                    background: linear-gradient(150deg, var(--violet-deep) 0%, var(--violet) 45%, #3E8FBD 78%, var(--teal) 100%);
                    padding-bottom: 2.4rem;
                }

                .hb-hero-bg {
                    position: absolute;
                    inset: 0;
                    overflow: hidden;
                }

                .hb-blob {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(60px);
                    opacity: 0.5;
                }

                .hb-blob-a {
                    width: 320px; height: 320px;
                    top: -140px; left: -80px;
                    background: radial-gradient(circle, rgba(255,255,255,0.35), transparent 70%);
                }

                .hb-blob-b {
                    width: 280px; height: 280px;
                    bottom: -160px; right: -60px;
                    background: radial-gradient(circle, rgba(35,196,168,0.5), transparent 70%);
                }

                .hb-hero-inner {
                    position: relative;
                    z-index: 1;
                    padding-top: 2rem;
                    color: #FFFFFF;
                    animation: hb-rise 0.6s cubic-bezier(.22,1,.36,1) both;
                }

                .hb-back-btn {
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

                .hb-back-btn:hover {
                    background: rgba(255,255,255,0.2);
                    transform: translateX(-2px);
                }

                .hb-hero-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    gap: 1.2rem;
                    flex-wrap: wrap;
                }

                .hb-badge-tag {
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

                .hb-title {
                    font-family: 'Space Grotesk', sans-serif;
                    font-weight: 700;
                    font-size: 2.1rem;
                    margin: 0 0 0.4rem;
                    text-shadow: 0 2px 20px rgba(0,0,0,0.15);
                }

                .hb-subtext {
                    font-size: 0.98rem;
                    color: rgba(255,255,255,0.82);
                    margin: 0;
                    max-width: 480px;
                }

                .hb-count-badge {
                    background: #FFFFFF;
                    color: var(--violet-deep);
                    font-family: 'Space Grotesk', sans-serif;
                    font-weight: 700;
                    font-size: 0.95rem;
                    padding: 0.55rem 1.1rem;
                    border-radius: 999px;
                    box-shadow: 0 12px 26px -10px rgba(0,0,0,0.35);
                    white-space: nowrap;
                }

                @keyframes hb-rise {
                    from { opacity: 0; transform: translateY(12px); }
                    to   { opacity: 1; transform: translateY(0); }
                }

                /* Container / cards */
                .hb-container { padding: 2.4rem 1rem 4rem; }

                .hb-empty {
                    background: #EAF3FF;
                    border: 1px solid #CFE3FA;
                    color: #2C5C8A;
                    border-radius: 14px;
                    padding: 1.1rem 1.3rem;
                    font-size: 0.95rem;
                    font-weight: 500;
                }

                .hb-card {
                    background: #FFFFFF;
                    border-radius: 18px;
                    padding: 1.7rem 1.8rem;
                    margin-bottom: 1.4rem;
                    box-shadow: 0 20px 44px -26px rgba(30,20,70,0.28);
                    border: 1px solid var(--line);
                    transition: transform 0.15s ease, box-shadow 0.15s ease;
                }

                .hb-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 26px 52px -24px rgba(30,20,70,0.34);
                }

                .hb-card-top {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    gap: 1rem;
                    flex-wrap: wrap;
                }

                .hb-guest-name {
                    font-family: 'Space Grotesk', sans-serif;
                    font-weight: 600;
                    font-size: 1.2rem;
                    color: var(--ink);
                    margin: 0 0 0.2rem;
                }

                .hb-guest-email {
                    color: var(--ink-soft);
                    font-size: 0.9rem;
                    margin: 0;
                }

                .hb-badge {
                    display: inline-block;
                    font-size: 0.76rem;
                    font-weight: 700;
                    letter-spacing: 0.02em;
                    padding: 0.42rem 0.85rem;
                    border-radius: 999px;
                    color: #FFFFFF;
                    white-space: nowrap;
                    height: fit-content;
                }

                .hb-badge-confirmed { background: var(--violet); }
                .hb-badge-checkedin { background: var(--teal); }
                .hb-badge-completed { background: var(--ink); }
                .hb-badge-cancelled { background: var(--rose); }
                .hb-badge-pending { background: var(--amber); color: var(--ink); }
                .hb-badge-default { background: var(--muted); }

                .hb-divider {
                    height: 1px;
                    background: var(--line);
                    margin: 1.2rem 0;
                }

                .hb-details {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1rem;
                }

                .hb-detail {
                    font-size: 0.92rem;
                    color: var(--ink-soft);
                    margin: 0 0 0.5rem;
                }

                .hb-detail strong {
                    color: var(--ink);
                    font-weight: 600;
                }

                .hb-actions {
                    margin-top: 1.3rem;
                }

                .hb-btn-checkin {
                    border: none;
                    border-radius: 11px;
                    padding: 0.65rem 1.4rem;
                    background: linear-gradient(120deg, var(--teal) 0%, #2FB88F 130%);
                    color: #FFFFFF;
                    font-weight: 700;
                    font-size: 0.9rem;
                    cursor: pointer;
                    box-shadow: 0 12px 22px -12px rgba(35, 196, 168, 0.5);
                    transition: filter 0.15s ease, transform 0.15s ease;
                    margin-right: 0.6rem;
                }

                .hb-btn-checkin:hover {
                    filter: brightness(1.05);
                    transform: translateY(-1px);
                }

                .hb-btn-checkout {
                    border: none;
                    border-radius: 11px;
                    padding: 0.65rem 1.4rem;
                    background: linear-gradient(120deg, var(--rose) 0%, #A5404B 130%);
                    color: #FFFFFF;
                    font-weight: 700;
                    font-size: 0.9rem;
                    cursor: pointer;
                    box-shadow: 0 12px 22px -12px rgba(194, 79, 92, 0.5);
                    transition: filter 0.15s ease, transform 0.15s ease;
                }

                .hb-btn-checkout:hover {
                    filter: brightness(1.05);
                    transform: translateY(-1px);
                }

                .hb-status-text {
                    font-weight: 700;
                    font-size: 0.92rem;
                }

                .hb-status-completed { color: var(--teal); }
                .hb-status-cancelled { color: var(--rose); }
                .hb-status-pending { color: var(--amber); }

                @media (max-width: 700px) {
                    .hb-details { grid-template-columns: 1fr; }
                    .hb-title { font-size: 1.8rem; }
                    .hb-hero-row { align-items: flex-start; }
                    .hb-card { padding: 1.4rem 1.3rem; }
                }
            `}</style>

        </div>

    );

}

export default HotelBookingsPage;