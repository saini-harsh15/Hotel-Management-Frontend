import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { createHotel } from "../services/hotelService";

function CreateHotelPage() {

    const navigate = useNavigate();

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

    const [saving, setSaving] = useState(false);

    const handleCreateHotel = async (e) => {

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

            await createHotel(hotelData);

            navigate("/my-hotels", { replace: true });

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to create hotel."
            );

        } finally {

            setSaving(false);

        }

    };

    return (

        <div className="ch-root">

            <Navbar />

            <div className="ch-hero">
                <div className="ch-hero-bg" aria-hidden="true">
                    <div className="ch-blob ch-blob-a" />
                    <div className="ch-blob ch-blob-b" />
                </div>
                <div className="container ch-hero-inner">
                    <span className="ch-badge">Hotel Admin</span>
                    <h2 className="ch-title">Register Your Hotel</h2>
                    <p className="ch-subtext">
                        Add your property to HotelHub and start accepting bookings.
                    </p>
                </div>
            </div>

            <div className="container ch-container">

                <form className="ch-card" onSubmit={handleCreateHotel}>

                    {/* Hotel Information */}
                    <div className="ch-section">

                        <div className="ch-section-head">
                            <span className="ch-section-dot" />
                            <h4 className="ch-section-title">Hotel Information</h4>
                        </div>

                        <div className="ch-field">
                            <label className="ch-label">Hotel Name</label>
                            <input
                                type="text"
                                className="ch-input"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="ch-field">
                            <label className="ch-label">Description</label>
                            <textarea
                                className="ch-input ch-textarea"
                                rows="4"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                    </div>

                    {/* Location */}
                    <div className="ch-section">

                        <div className="ch-section-head">
                            <span className="ch-section-dot" />
                            <h4 className="ch-section-title">Location</h4>
                        </div>

                        <div className="ch-field">
                            <label className="ch-label">Address Line 1</label>
                            <input
                                type="text"
                                className="ch-input"
                                value={addressLine1}
                                onChange={(e) => setAddressLine1(e.target.value)}
                            />
                        </div>

                        <div className="ch-field">
                            <label className="ch-label">Address Line 2</label>
                            <input
                                type="text"
                                className="ch-input"
                                value={addressLine2}
                                onChange={(e) => setAddressLine2(e.target.value)}
                            />
                        </div>

                        <div className="ch-row">

                            <div className="ch-field">
                                <label className="ch-label">City</label>
                                <input
                                    type="text"
                                    className="ch-input"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </div>

                            <div className="ch-field">
                                <label className="ch-label">State</label>
                                <input
                                    type="text"
                                    className="ch-input"
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                />
                            </div>

                        </div>

                        <div className="ch-row">

                            <div className="ch-field">
                                <label className="ch-label">Country</label>
                                <input
                                    type="text"
                                    className="ch-input"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                />
                            </div>

                            <div className="ch-field">
                                <label className="ch-label">Postal Code</label>
                                <input
                                    type="text"
                                    className="ch-input"
                                    value={postalCode}
                                    onChange={(e) => setPostalCode(e.target.value)}
                                />
                            </div>

                        </div>

                    </div>

                    {/* Contact */}
                    <div className="ch-section">

                        <div className="ch-section-head">
                            <span className="ch-section-dot" />
                            <h4 className="ch-section-title">Contact Information</h4>
                        </div>

                        <div className="ch-row">

                            <div className="ch-field">
                                <label className="ch-label">Contact Number</label>
                                <input
                                    type="text"
                                    className="ch-input"
                                    value={contactNumber}
                                    onChange={(e) => setContactNumber(e.target.value)}
                                />
                            </div>

                            <div className="ch-field">
                                <label className="ch-label">Email</label>
                                <input
                                    type="email"
                                    className="ch-input"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                        </div>

                    </div>

                    {/* Check-In / Check-Out */}
                    <div className="ch-section ch-section-last">

                        <div className="ch-section-head">
                            <span className="ch-section-dot" />
                            <h4 className="ch-section-title">Check-In / Check-Out</h4>
                        </div>

                        <div className="ch-row">

                            <div className="ch-field">
                                <label className="ch-label">Check In Time</label>
                                <input
                                    type="time"
                                    className="ch-input"
                                    value={checkInTime}
                                    onChange={(e) => setCheckInTime(e.target.value)}
                                />
                            </div>

                            <div className="ch-field">
                                <label className="ch-label">Check Out Time</label>
                                <input
                                    type="time"
                                    className="ch-input"
                                    value={checkOutTime}
                                    onChange={(e) => setCheckOutTime(e.target.value)}
                                />
                            </div>

                        </div>

                    </div>

                    <button type="submit" className="ch-submit" disabled={saving}>
                        {saving ? "Creating…" : "Create Hotel"}
                    </button>

                </form>

            </div>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');

                .ch-root {
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
                .ch-hero {
                    position: relative;
                    overflow: hidden;
                    background: linear-gradient(150deg, var(--violet-deep) 0%, var(--violet) 45%, #3E8FBD 78%, var(--teal) 100%);
                    padding-bottom: 2.4rem;
                }

                .ch-hero-bg {
                    position: absolute;
                    inset: 0;
                    overflow: hidden;
                }

                .ch-blob {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(60px);
                    opacity: 0.5;
                }

                .ch-blob-a {
                    width: 320px; height: 320px;
                    top: -140px; left: -80px;
                    background: radial-gradient(circle, rgba(255,255,255,0.35), transparent 70%);
                }

                .ch-blob-b {
                    width: 280px; height: 280px;
                    bottom: -160px; right: -60px;
                    background: radial-gradient(circle, rgba(35,196,168,0.5), transparent 70%);
                }

                .ch-hero-inner {
                    position: relative;
                    z-index: 1;
                    padding-top: 2.8rem;
                    color: #FFFFFF;
                    animation: ch-rise 0.6s cubic-bezier(.22,1,.36,1) both;
                }

                .ch-badge {
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

                .ch-title {
                    font-family: 'Space Grotesk', sans-serif;
                    font-weight: 700;
                    font-size: 2.1rem;
                    margin: 0 0 0.4rem;
                    text-shadow: 0 2px 20px rgba(0,0,0,0.15);
                }

                .ch-subtext {
                    font-size: 0.98rem;
                    color: rgba(255,255,255,0.82);
                    margin: 0;
                    max-width: 480px;
                }

                @keyframes ch-rise {
                    from { opacity: 0; transform: translateY(12px); }
                    to   { opacity: 1; transform: translateY(0); }
                }

                /* Card */
                .ch-container { padding: 2.4rem 1rem 4rem; }

                .ch-card {
                    max-width: 780px;
                    margin: -1.6rem auto 0;
                    position: relative;
                    z-index: 1;
                    background: #FFFFFF;
                    border-radius: 20px;
                    padding: 2.4rem 2.4rem 2.2rem;
                    box-shadow: 0 30px 60px -28px rgba(30,20,70,0.35);
                }

                .ch-section {
                    margin-bottom: 2.2rem;
                    padding-bottom: 2.2rem;
                    border-bottom: 1px dashed var(--line);
                }

                .ch-section-last {
                    margin-bottom: 1.6rem;
                    padding-bottom: 0;
                    border-bottom: none;
                }

                .ch-section-head {
                    display: flex;
                    align-items: center;
                    gap: 0.6rem;
                    margin-bottom: 1.3rem;
                }

                .ch-section-dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: linear-gradient(120deg, var(--violet) 0%, var(--teal) 130%);
                    flex-shrink: 0;
                }

                .ch-section-title {
                    font-family: 'Space Grotesk', sans-serif;
                    font-weight: 600;
                    font-size: 1.15rem;
                    color: var(--ink);
                    margin: 0;
                }

                .ch-row {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1rem;
                }

                .ch-field { margin-bottom: 1.1rem; }

                .ch-label {
                    display: block;
                    font-size: 0.82rem;
                    font-weight: 600;
                    color: var(--ink-soft);
                    margin-bottom: 0.4rem;
                }

                .ch-input {
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

                .ch-textarea { resize: vertical; }

                .ch-input:focus {
                    outline: none;
                    border-color: var(--violet);
                    box-shadow: 0 0 0 4px rgba(109, 91, 208, 0.15);
                }

                .ch-submit {
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

                .ch-submit:hover:not(:disabled) {
                    filter: brightness(1.06);
                    transform: translateY(-1px);
                }

                .ch-submit:active:not(:disabled) { transform: translateY(0); }

                .ch-submit:disabled {
                    opacity: 0.65;
                    cursor: not-allowed;
                }

                .ch-submit:focus-visible {
                    outline: 2px solid var(--violet-deep);
                    outline-offset: 3px;
                }

                @media (max-width: 700px) {
                    .ch-row { grid-template-columns: 1fr; }
                    .ch-card { padding: 1.8rem 1.5rem; margin-top: -1rem; }
                    .ch-title { font-size: 1.8rem; }
                }
            `}</style>

        </div>

    );

}

export default CreateHotelPage;