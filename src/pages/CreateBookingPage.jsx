import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getRoomTypesByHotel } from "../services/roomTypeService";
import { createBooking } from "../services/bookingService";
import { useNavigate } from "react-router-dom";

function CreateBookingPage() {

    const { hotelId } = useParams();
    const navigate = useNavigate();

    const [roomTypes, setRoomTypes] = useState([]);
    const [roomTypeId, setRoomTypeId] = useState("");
    const [checkInDate, setCheckInDate] = useState("");
    const [checkOutDate, setCheckOutDate] = useState("");
    const [guestCount, setGuestCount] = useState(1);
    const [specialRequest, setSpecialRequest] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        fetchRoomTypes();

    }, []);

    const fetchRoomTypes = async () => {

        try {

            const response = await getRoomTypesByHotel(hotelId);

            setRoomTypes(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    const selectedRoom = useMemo(() => {

        return roomTypes.find(
            room => String(room.id) === String(roomTypeId)
        );

    }, [roomTypes, roomTypeId]);

    const nightCount = useMemo(() => {

        if (!checkInDate || !checkOutDate) return 0;

        const inDate = new Date(checkInDate);
        const outDate = new Date(checkOutDate);

        const diff = Math.round(
            (outDate - inDate) / (1000 * 60 * 60 * 24)
        );

        return diff > 0 ? diff : 0;

    }, [checkInDate, checkOutDate]);

    const estimatedTotal = useMemo(() => {

        if (!selectedRoom || !nightCount) return 0;

        return selectedRoom.price * nightCount;

    }, [selectedRoom, nightCount]);

    const handleBooking = async () => {

        try {

            setLoading(true);

            const bookingData = {

                roomTypeId: Number(roomTypeId),

                checkInDate,

                checkOutDate,

                guestCount: Number(guestCount),

                specialRequest

            };

            const response = await createBooking(bookingData);

            console.log(response);

            navigate("/my-bookings");

        } catch (error) {

            console.error(error);

            alert("Booking Failed");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="cb-root">

            <Navbar />

            <div className="cb-hero-bg" aria-hidden="true">
                <div className="cb-blob cb-blob-a" />
                <div className="cb-blob cb-blob-b" />
            </div>

            <div className="container cb-container">

                <div className="cb-shell">

                    <form
                        className="cb-card"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleBooking();
                        }}
                    >

                        <div className="cb-card-head">
                            <span className="cb-eyebrow">New Reservation</span>
                            <h2 className="cb-title">Create Booking</h2>
                        </div>

                        <div className="cb-field">
                            <label className="cb-label" htmlFor="roomType">Room Type</label>
                            <select
                                id="roomType"
                                className="cb-input"
                                value={roomTypeId}
                                onChange={(e) => setRoomTypeId(e.target.value)}
                                required
                            >
                                <option value="">Select Room Type</option>
                                {
                                    roomTypes.map(room => (
                                        <option key={room.id} value={room.id}>
                                            {room.name} - ₹{room.price}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className="cb-row">

                            <div className="cb-field">
                                <label className="cb-label" htmlFor="checkIn">Check In Date</label>
                                <input
                                    id="checkIn"
                                    type="date"
                                    className="cb-input"
                                    value={checkInDate}
                                    onChange={(e) => setCheckInDate(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="cb-field">
                                <label className="cb-label" htmlFor="checkOut">Check Out Date</label>
                                <input
                                    id="checkOut"
                                    type="date"
                                    className="cb-input"
                                    value={checkOutDate}
                                    onChange={(e) => setCheckOutDate(e.target.value)}
                                    required
                                />
                            </div>

                        </div>

                        <div className="cb-field">
                            <label className="cb-label" htmlFor="guests">Guests</label>
                            <input
                                id="guests"
                                type="number"
                                min="1"
                                className="cb-input"
                                value={guestCount}
                                onChange={(e) => setGuestCount(e.target.value)}
                                required
                            />
                        </div>

                        <div className="cb-field">
                            <label className="cb-label" htmlFor="request">Special Request</label>
                            <textarea
                                id="request"
                                className="cb-input cb-textarea"
                                rows="3"
                                placeholder="Anything we should know? (optional)"
                                value={specialRequest}
                                onChange={(e) => setSpecialRequest(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="cb-btn" disabled={loading}>
                            {loading ? "Booking…" : "Create Booking"}
                        </button>

                    </form>

                    <aside className="cb-summary">

                        <span className="cb-summary-eyebrow">Booking Summary</span>

                        <div className="cb-summary-row">
                            <span>Room</span>
                            <span className="cb-summary-value">
                                {selectedRoom ? selectedRoom.name : "—"}
                            </span>
                        </div>

                        <div className="cb-summary-row">
                            <span>Rate / night</span>
                            <span className="cb-summary-value">
                                {selectedRoom ? `₹${selectedRoom.price}` : "—"}
                            </span>
                        </div>

                        <div className="cb-summary-row">
                            <span>Nights</span>
                            <span className="cb-summary-value">
                                {nightCount || "—"}
                            </span>
                        </div>

                        <div className="cb-summary-row">
                            <span>Guests</span>
                            <span className="cb-summary-value">{guestCount}</span>
                        </div>

                        <div className="cb-summary-divider" />

                        <div className="cb-summary-total">
                            <span>Estimated total</span>
                            <span className="cb-summary-total-value">
                                {estimatedTotal ? `₹${estimatedTotal}` : "₹0"}
                            </span>
                        </div>

                        {
                            nightCount === 0 && checkInDate && checkOutDate &&
                            <p className="cb-summary-hint">
                                Check-out should be after check-in.
                            </p>
                        }

                    </aside>

                </div>

            </div>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');

                .cb-root {
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
                    background: var(--cream);
                    font-family: 'Inter', system-ui, sans-serif;
                    overflow: hidden;
                }

                .cb-hero-bg {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 420px;
                    background: linear-gradient(150deg, var(--violet-deep) 0%, var(--violet) 55%, var(--teal) 130%);
                    overflow: hidden;
                    z-index: 0;
                }

                .cb-blob {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(60px);
                    opacity: 0.5;
                }

                .cb-blob-a {
                    width: 360px; height: 360px;
                    top: -140px; left: -80px;
                    background: radial-gradient(circle, rgba(255,255,255,0.35), transparent 70%);
                }

                .cb-blob-b {
                    width: 320px; height: 320px;
                    top: -100px; right: -60px;
                    background: radial-gradient(circle, rgba(35,196,168,0.5), transparent 70%);
                }

                .cb-container {
                    position: relative;
                    z-index: 1;
                    padding: 3.2rem 1rem 4rem;
                }

                .cb-shell {
                    max-width: 920px;
                    margin: 0 auto;
                    display: grid;
                    grid-template-columns: 1.4fr 1fr;
                    gap: 1.6rem;
                    align-items: start;
                }

                .cb-card {
                    background: rgba(255,255,255,0.96);
                    backdrop-filter: blur(16px);
                    border-radius: 20px;
                    padding: 2.2rem 2rem;
                    box-shadow: 0 30px 60px -24px rgba(30,20,70,0.35);
                    animation: cb-rise 0.6s cubic-bezier(.22,1,.36,1) both;
                }

                .cb-card-head { margin-bottom: 1.6rem; }

                .cb-eyebrow {
                    display: block;
                    font-size: 0.78rem;
                    font-weight: 700;
                    letter-spacing: 0.06em;
                    text-transform: uppercase;
                    color: var(--teal);
                    margin-bottom: 0.4rem;
                }

                .cb-title {
                    font-family: 'Space Grotesk', sans-serif;
                    font-weight: 700;
                    font-size: 1.6rem;
                    color: var(--ink);
                    margin: 0;
                }

                .cb-row {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1rem;
                }

                .cb-field { margin-bottom: 1.1rem; }

                .cb-label {
                    display: block;
                    font-size: 0.82rem;
                    font-weight: 600;
                    color: var(--ink-soft);
                    margin-bottom: 0.4rem;
                }

                .cb-input {
                    width: 100%;
                    border: 1.5px solid var(--line);
                    background: #FFFFFF;
                    border-radius: 11px;
                    padding: 0.68rem 0.85rem;
                    font-size: 0.94rem;
                    color: var(--ink);
                    font-family: 'Inter', sans-serif;
                    transition: border-color 0.15s ease, box-shadow 0.15s ease;
                }

                .cb-textarea { resize: vertical; }

                .cb-input:focus {
                    outline: none;
                    border-color: var(--violet);
                    box-shadow: 0 0 0 4px rgba(109, 91, 208, 0.15);
                }

                .cb-btn {
                    width: 100%;
                    margin-top: 0.5rem;
                    padding: 0.85rem;
                    border: none;
                    border-radius: 12px;
                    background: linear-gradient(120deg, var(--violet) 0%, var(--teal) 130%);
                    color: #FFFFFF;
                    font-size: 0.98rem;
                    font-weight: 700;
                    cursor: pointer;
                    box-shadow: 0 10px 24px -8px rgba(109, 91, 208, 0.5);
                    transition: filter 0.15s ease, transform 0.15s ease;
                }

                .cb-btn:hover:not(:disabled) {
                    filter: brightness(1.06);
                    transform: translateY(-1px);
                }

                .cb-btn:active:not(:disabled) { transform: translateY(0); }

                .cb-btn:disabled {
                    opacity: 0.65;
                    cursor: not-allowed;
                }

                .cb-btn:focus-visible {
                    outline: 2px solid var(--violet-deep);
                    outline-offset: 3px;
                }

                /* Summary panel */
                .cb-summary {
                    position: sticky;
                    top: 1.5rem;
                    background: linear-gradient(165deg, var(--violet-deep) 0%, var(--violet) 60%, var(--teal) 140%);
                    border-radius: 18px;
                    padding: 1.7rem 1.5rem;
                    color: #FFFFFF;
                    box-shadow: 0 24px 50px -20px rgba(74,58,168,0.5);
                    animation: cb-rise 0.6s 0.08s cubic-bezier(.22,1,.36,1) both;
                }

                .cb-summary-eyebrow {
                    display: block;
                    font-family: 'Space Grotesk', sans-serif;
                    font-weight: 700;
                    font-size: 1.1rem;
                    margin-bottom: 1.1rem;
                }

                .cb-summary-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: baseline;
                    font-size: 0.88rem;
                    color: rgba(255,255,255,0.78);
                    padding: 0.45rem 0;
                }

                .cb-summary-value {
                    color: #FFFFFF;
                    font-weight: 600;
                    text-align: right;
                    max-width: 60%;
                }

                .cb-summary-divider {
                    border-top: 1px solid rgba(255,255,255,0.2);
                    margin: 0.9rem 0;
                }

                .cb-summary-total {
                    display: flex;
                    justify-content: space-between;
                    align-items: baseline;
                }

                .cb-summary-total span:first-child {
                    font-size: 0.92rem;
                    color: rgba(255,255,255,0.85);
                }

                .cb-summary-total-value {
                    font-family: 'Space Grotesk', sans-serif;
                    font-weight: 700;
                    font-size: 1.5rem;
                }

                .cb-summary-hint {
                    margin: 0.9rem 0 0;
                    font-size: 0.78rem;
                    color: rgba(255,255,255,0.75);
                }

                @keyframes cb-rise {
                    from { opacity: 0; transform: translateY(16px); }
                    to   { opacity: 1; transform: translateY(0); }
                }

                @media (prefers-reduced-motion: reduce) {
                    .cb-card, .cb-summary { animation: none; }
                }

                @media (max-width: 800px) {
                    .cb-shell {
                        grid-template-columns: 1fr;
                    }
                    .cb-summary { position: static; }
                    .cb-row { grid-template-columns: 1fr; }
                }
            `}</style>

        </div>

    );

}

export default CreateBookingPage;