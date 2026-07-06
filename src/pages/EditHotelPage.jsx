import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    getHotelById,
    updateHotel
} from "../services/hotelService";
import Navbar from "../components/Navbar";


function EditHotelPage() {

    const navigate = useNavigate();
    const { hotelId } = useParams();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [addressLine1, setAddressLine1] = useState("");
    const [addressLine2, setAddressLine2] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [email, setEmail] = useState("");
    const [checkInTime, setCheckInTime] = useState("");
    const [checkOutTime, setCheckOutTime] = useState("");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {

        fetchHotel();

    }, []);

    const fetchHotel = async () => {

        try {

            setLoading(true);

            const response = await getHotelById(hotelId);

            const hotel = response.data;

            setName(hotel.name);
            setDescription(hotel.description);
            setAddressLine1(hotel.addressLine1);
            setAddressLine2(hotel.addressLine2);
            setCity(hotel.city);
            setState(hotel.state);
            setCountry(hotel.country);
            setPostalCode(hotel.postalCode);
            setContactNumber(hotel.contactNumber);
            setEmail(hotel.email);
            setCheckInTime(hotel.checkInTime);
            setCheckOutTime(hotel.checkOutTime);

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };

    const handleUpdateHotel = async (e) => {

        if (e) e.preventDefault();

        try {

            setSaving(true);

            const hotelData = {

                name,

                description,

                addressLine1,

                addressLine2,

                city,

                state,

                country,

                postalCode,

                contactNumber,

                email,

                checkInTime,

                checkOutTime

            };

            await updateHotel(hotelId, hotelData);

            alert("Hotel updated successfully.");

            navigate("/my-hotels", { replace: true });

        }

        catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to update hotel."
            );

        }

        finally {

            setSaving(false);

        }

    };

    return (

        <div className="eh-root">

            <Navbar />

            <div className="eh-hero">
                <div className="eh-hero-bg" aria-hidden="true">
                    <div className="eh-blob eh-blob-a" />
                    <div className="eh-blob eh-blob-b" />
                </div>
                <div className="container eh-hero-inner">
                    <span className="eh-badge">Hotel Admin</span>
                    <h2 className="eh-title">Edit Hotel</h2>
                    <p className="eh-subtext">Update your hotel information.</p>
                </div>
            </div>

            <div className="container eh-container">

                {
                    loading ?

                        (
                            <div className="eh-loading">
                                <div className="eh-spinner" role="status" />
                                <p className="eh-loading-text">Loading hotel details…</p>
                            </div>
                        )

                        :

                        (
                            <form className="eh-card" onSubmit={handleUpdateHotel}>

                                {/* Hotel Information */}
                                <div className="eh-section">

                                    <div className="eh-section-head">
                                        <span className="eh-section-dot" />
                                        <h4 className="eh-section-title">Hotel Information</h4>
                                    </div>

                                    <div className="eh-field">
                                        <label className="eh-label">Hotel Name</label>
                                        <input
                                            type="text"
                                            className="eh-input"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>

                                    <div className="eh-field">
                                        <label className="eh-label">Description</label>
                                        <textarea
                                            className="eh-input eh-textarea"
                                            rows="4"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </div>

                                </div>

                                {/* Location */}
                                <div className="eh-section">

                                    <div className="eh-section-head">
                                        <span className="eh-section-dot" />
                                        <h4 className="eh-section-title">Location</h4>
                                    </div>

                                    <div className="eh-field">
                                        <label className="eh-label">Address Line 1</label>
                                        <input
                                            type="text"
                                            className="eh-input"
                                            value={addressLine1}
                                            onChange={(e) => setAddressLine1(e.target.value)}
                                        />
                                    </div>

                                    <div className="eh-field">
                                        <label className="eh-label">Address Line 2</label>
                                        <input
                                            type="text"
                                            className="eh-input"
                                            value={addressLine2}
                                            onChange={(e) => setAddressLine2(e.target.value)}
                                        />
                                    </div>

                                    <div className="eh-row">

                                        <div className="eh-field">
                                            <label className="eh-label">City</label>
                                            <input
                                                type="text"
                                                className="eh-input"
                                                value={city}
                                                onChange={(e) => setCity(e.target.value)}
                                            />
                                        </div>

                                        <div className="eh-field">
                                            <label className="eh-label">State</label>
                                            <input
                                                type="text"
                                                className="eh-input"
                                                value={state}
                                                onChange={(e) => setState(e.target.value)}
                                            />
                                        </div>

                                    </div>

                                    <div className="eh-row">

                                        <div className="eh-field">
                                            <label className="eh-label">Country</label>
                                            <input
                                                type="text"
                                                className="eh-input"
                                                value={country}
                                                onChange={(e) => setCountry(e.target.value)}
                                            />
                                        </div>

                                        <div className="eh-field">
                                            <label className="eh-label">Postal Code</label>
                                            <input
                                                type="text"
                                                className="eh-input"
                                                value={postalCode}
                                                onChange={(e) => setPostalCode(e.target.value)}
                                            />
                                        </div>

                                    </div>

                                </div>

                                {/* Contact */}
                                <div className="eh-section">

                                    <div className="eh-section-head">
                                        <span className="eh-section-dot" />
                                        <h4 className="eh-section-title">Contact Information</h4>
                                    </div>

                                    <div className="eh-row">

                                        <div className="eh-field">
                                            <label className="eh-label">Contact Number</label>
                                            <input
                                                type="text"
                                                className="eh-input"
                                                value={contactNumber}
                                                onChange={(e) => setContactNumber(e.target.value)}
                                            />
                                        </div>

                                        <div className="eh-field">
                                            <label className="eh-label">Email</label>
                                            <input
                                                type="email"
                                                className="eh-input"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>

                                    </div>

                                </div>

                                {/* Check-In / Check-Out */}
                                <div className="eh-section eh-section-last">

                                    <div className="eh-section-head">
                                        <span className="eh-section-dot" />
                                        <h4 className="eh-section-title">Check-In / Check-Out</h4>
                                    </div>

                                    <div className="eh-row">

                                        <div className="eh-field">
                                            <label className="eh-label">Check In Time</label>
                                            <input
                                                type="time"
                                                className="eh-input"
                                                value={checkInTime}
                                                onChange={(e) => setCheckInTime(e.target.value)}
                                            />
                                        </div>

                                        <div className="eh-field">
                                            <label className="eh-label">Check Out Time</label>
                                            <input
                                                type="time"
                                                className="eh-input"
                                                value={checkOutTime}
                                                onChange={(e) => setCheckOutTime(e.target.value)}
                                            />
                                        </div>

                                    </div>

                                </div>

                                <button type="submit" className="eh-submit" disabled={saving}>
                                    {saving ? "Updating…" : "Update Hotel"}
                                </button>

                            </form>
                        )

                }

            </div>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');

                .eh-root {
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
                .eh-hero {
                    position: relative;
                    overflow: hidden;
                    background: linear-gradient(150deg, var(--violet-deep) 0%, var(--violet) 45%, #3E8FBD 78%, var(--teal) 100%);
                    padding-bottom: 2.4rem;
                }

                .eh-hero-bg {
                    position: absolute;
                    inset: 0;
                    overflow: hidden;
                }

                .eh-blob {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(60px);
                    opacity: 0.5;
                }

                .eh-blob-a {
                    width: 320px; height: 320px;
                    top: -140px; left: -80px;
                    background: radial-gradient(circle, rgba(255,255,255,0.35), transparent 70%);
                }

                .eh-blob-b {
                    width: 280px; height: 280px;
                    bottom: -160px; right: -60px;
                    background: radial-gradient(circle, rgba(35,196,168,0.5), transparent 70%);
                }

                .eh-hero-inner {
                    position: relative;
                    z-index: 1;
                    padding-top: 2.8rem;
                    color: #FFFFFF;
                    animation: eh-rise 0.6s cubic-bezier(.22,1,.36,1) both;
                }

                .eh-badge {
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

                .eh-title {
                    font-family: 'Space Grotesk', sans-serif;
                    font-weight: 700;
                    font-size: 2.1rem;
                    margin: 0 0 0.4rem;
                    text-shadow: 0 2px 20px rgba(0,0,0,0.15);
                }

                .eh-subtext {
                    font-size: 0.98rem;
                    color: rgba(255,255,255,0.82);
                    margin: 0;
                }

                @keyframes eh-rise {
                    from { opacity: 0; transform: translateY(12px); }
                    to   { opacity: 1; transform: translateY(0); }
                }

                /* Loading */
                .eh-container { padding: 2.4rem 1rem 4rem; }

                .eh-loading { text-align: center; padding: 4rem 1rem; }

                .eh-spinner {
                    width: 30px;
                    height: 30px;
                    border: 3px solid var(--line);
                    border-top-color: var(--violet);
                    border-radius: 50%;
                    margin: 0 auto 1rem;
                    animation: eh-spin 0.8s linear infinite;
                }

                @keyframes eh-spin { to { transform: rotate(360deg); } }

                .eh-loading-text { color: var(--muted); font-size: 0.9rem; }

                /* Card */
                .eh-card {
                    max-width: 780px;
                    margin: -1.6rem auto 0;
                    position: relative;
                    z-index: 1;
                    background: #FFFFFF;
                    border-radius: 20px;
                    padding: 2.4rem 2.4rem 2.2rem;
                    box-shadow: 0 30px 60px -28px rgba(30,20,70,0.35);
                }

                .eh-section {
                    margin-bottom: 2.2rem;
                    padding-bottom: 2.2rem;
                    border-bottom: 1px dashed var(--line);
                }

                .eh-section-last {
                    margin-bottom: 1.6rem;
                    padding-bottom: 0;
                    border-bottom: none;
                }

                .eh-section-head {
                    display: flex;
                    align-items: center;
                    gap: 0.6rem;
                    margin-bottom: 1.3rem;
                }

                .eh-section-dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: linear-gradient(120deg, var(--violet) 0%, var(--teal) 130%);
                    flex-shrink: 0;
                }

                .eh-section-title {
                    font-family: 'Space Grotesk', sans-serif;
                    font-weight: 600;
                    font-size: 1.15rem;
                    color: var(--ink);
                    margin: 0;
                }

                .eh-row {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1rem;
                }

                .eh-field { margin-bottom: 1.1rem; }

                .eh-label {
                    display: block;
                    font-size: 0.82rem;
                    font-weight: 600;
                    color: var(--ink-soft);
                    margin-bottom: 0.4rem;
                }

                .eh-input {
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

                .eh-textarea { resize: vertical; }

                .eh-input:focus {
                    outline: none;
                    border-color: var(--violet);
                    box-shadow: 0 0 0 4px rgba(109, 91, 208, 0.15);
                }

                .eh-submit {
                    width: 100%;
                    padding: 0.9rem;
                    border: none;
                    border-radius: 12px;
                    background: linear-gradient(120deg, var(--violet) 0%, var(--teal) 130%);
                    color: #FFFFFF;
                    font-size: 1rem;
                    font-weight: 700;
                    cursor: pointer;
                    box-shadow: 0 12px 26px -10px rgba(109, 91, 208, 0.5);
                    transition: filter 0.15s ease, transform 0.15s ease;
                }

                .eh-submit:hover:not(:disabled) {
                    filter: brightness(1.06);
                    transform: translateY(-1px);
                }

                .eh-submit:active:not(:disabled) { transform: translateY(0); }

                .eh-submit:disabled {
                    opacity: 0.65;
                    cursor: not-allowed;
                }

                .eh-submit:focus-visible {
                    outline: 2px solid var(--violet-deep);
                    outline-offset: 3px;
                }

                @media (max-width: 700px) {
                    .eh-row { grid-template-columns: 1fr; }
                    .eh-card { padding: 1.8rem 1.5rem; margin-top: -1rem; }
                    .eh-title { font-size: 1.8rem; }
                }
            `}</style>

        </div>

    );

}

export default EditHotelPage;