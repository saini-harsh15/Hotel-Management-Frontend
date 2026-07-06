import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
    getRoomTypesByHotel,
    createRoomType
} from "../services/roomTypeService";

function RoomTypesPage() {

    const { hotelId } = useParams();

    const navigate = useNavigate();

    const [roomTypes, setRoomTypes] =
        useState([]);

    const [showModal, setShowModal] =
        useState(false);

    const [name, setName] =
        useState("");

    const [description, setDescription] =
        useState("");

    const [price, setPrice] =
        useState("");

    const [capacity, setCapacity] =
        useState("");

    const [bedType, setBedType] =
        useState("KING");

    useEffect(() => {

        fetchRoomTypes();

    }, []);

    const fetchRoomTypes =
        async () => {

            try {

                const response =
                    await getRoomTypesByHotel(
                        hotelId
                    );

                setRoomTypes(
                    response.data
                );

            } catch (error) {

                console.error(error);

            }

        };

    const handleCreateRoomType =
        async () => {

            try {

                const roomType = {

                    name,

                    description,

                    price: Number(price),

                    capacity: Number(capacity),

                    bedType

                };

                await createRoomType(
                    hotelId,
                    roomType
                );

                setShowModal(false);

                setName("");
                setDescription("");
                setPrice("");
                setCapacity("");
                setBedType("KING");

                await fetchRoomTypes();

            } catch (error) {

                console.error(error);

                alert("Failed to create Room Type");

            }

        };

    return (

        <div className="rt-root">

            <Navbar />

            <div className="rt-hero">
                <div className="rt-hero-bg" aria-hidden="true">
                    <div className="rt-blob rt-blob-a" />
                    <div className="rt-blob rt-blob-b" />
                </div>
                <div className="container rt-hero-inner">

                    <button
                        className="rt-back-btn"
                        onClick={() =>
                            navigate(
                                `/manage-hotel/${hotelId}`
                            )
                        }
                    >
                        ← Back
                    </button>

                    <div className="rt-hero-row">

                        <div>
                            <span className="rt-badge">Hotel Admin</span>
                            <h2 className="rt-title">Room Types</h2>
                            <p className="rt-subtext">
                                Manage all room categories.
                            </p>
                        </div>

                        <button
                            className="rt-add-btn"
                            onClick={() =>
                                setShowModal(true)
                            }
                        >
                            + Add Room Type
                        </button>

                    </div>

                </div>
            </div>

            <div className="container rt-container">

                <div className="rt-grid">

                    {

                        roomTypes.map(room => (

                            <div
                                key={room.id}
                                className="rt-card"
                            >

                                <h4 className="rt-card-title">

                                    {room.name}

                                </h4>

                                <p className="rt-card-desc">

                                    {room.description}

                                </p>

                                <div className="rt-divider" />

                                <h5 className="rt-price">

                                    ₹ {room.price}

                                </h5>

                                <p className="rt-meta">

                                    Capacity :
                                    {" "}
                                    {room.capacity}

                                </p>

                                <p className="rt-meta">

                                    Bed :
                                    {" "}
                                    {room.bedType}

                                </p>

                                <button
                                    className="rt-manage-btn"
                                    onClick={() =>
                                        navigate(
                                            `/room-types/${room.id}/rooms`
                                        )
                                    }
                                >
                                    Manage Rooms →
                                </button>

                            </div>

                        ))

                    }

                </div>

            </div>

            {
                showModal && (

                    <div className="rt-modal-overlay">

                        <div className="rt-modal">

                            <div className="rt-modal-header">

                                <h5 className="rt-modal-title">
                                    Create Room Type
                                </h5>

                                <button
                                    className="rt-modal-close"
                                    onClick={() => {

                                        setShowModal(false);

                                        setName("");
                                        setDescription("");
                                        setPrice("");
                                        setCapacity("");
                                        setBedType("KING");

                                    }}
                                >
                                    ×
                                </button>

                            </div>

                            <div className="rt-modal-body">

                                <div className="rt-field">

                                    <label className="rt-label">Name</label>

                                    <input
                                        className="rt-input"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                    />

                                </div>

                                <div className="rt-field">

                                    <label className="rt-label">Description</label>

                                    <textarea
                                        className="rt-input rt-textarea"
                                        rows="3"
                                        value={description}
                                        onChange={(e) =>
                                            setDescription(
                                                e.target.value
                                            )
                                        }
                                    />

                                </div>

                                <div className="rt-row">

                                    <div className="rt-field">

                                        <label className="rt-label">Price</label>

                                        <input
                                            type="number"
                                            className="rt-input"
                                            value={price}
                                            onChange={(e) =>
                                                setPrice(e.target.value)
                                            }
                                        />

                                    </div>

                                    <div className="rt-field">

                                        <label className="rt-label">Capacity</label>

                                        <input
                                            type="number"
                                            className="rt-input"
                                            value={capacity}
                                            onChange={(e) =>
                                                setCapacity(
                                                    e.target.value
                                                )
                                            }
                                        />

                                    </div>

                                </div>

                                <div className="rt-field">

                                    <label className="rt-label">Bed Type</label>

                                    <select
                                        className="rt-input rt-select"
                                        value={bedType}
                                        onChange={(e) =>
                                            setBedType(
                                                e.target.value
                                            )
                                        }
                                    >

                                        <option value="KING">
                                            KING
                                        </option>

                                        <option value="QUEEN">
                                            QUEEN
                                        </option>

                                        <option value="SINGLE">
                                            SINGLE
                                        </option>

                                        <option value="DOUBLE">
                                            DOUBLE
                                        </option>

                                    </select>

                                </div>

                            </div>

                            <div className="rt-modal-footer">

                                <button
                                    className="rt-btn-cancel"
                                    onClick={() => {

                                        setShowModal(false);

                                        setName("");
                                        setDescription("");
                                        setPrice("");
                                        setCapacity("");
                                        setBedType("KING");

                                    }}
                                >
                                    Cancel
                                </button>

                                <button
                                    className="rt-btn-create"
                                    onClick={
                                        handleCreateRoomType
                                    }
                                >
                                    Create
                                </button>

                            </div>

                        </div>

                    </div>

                )
            }

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');

                .rt-root {
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
                .rt-hero {
                    position: relative;
                    overflow: hidden;
                    background: linear-gradient(150deg, var(--violet-deep) 0%, var(--violet) 45%, #3E8FBD 78%, var(--teal) 100%);
                    padding-bottom: 2.4rem;
                }

                .rt-hero-bg {
                    position: absolute;
                    inset: 0;
                    overflow: hidden;
                }

                .rt-blob {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(60px);
                    opacity: 0.5;
                }

                .rt-blob-a {
                    width: 320px; height: 320px;
                    top: -140px; left: -80px;
                    background: radial-gradient(circle, rgba(255,255,255,0.35), transparent 70%);
                }

                .rt-blob-b {
                    width: 280px; height: 280px;
                    bottom: -160px; right: -60px;
                    background: radial-gradient(circle, rgba(35,196,168,0.5), transparent 70%);
                }

                .rt-hero-inner {
                    position: relative;
                    z-index: 1;
                    padding-top: 2rem;
                    color: #FFFFFF;
                    animation: rt-rise 0.6s cubic-bezier(.22,1,.36,1) both;
                }

                .rt-back-btn {
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

                .rt-back-btn:hover {
                    background: rgba(255,255,255,0.2);
                    transform: translateX(-2px);
                }

                .rt-hero-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    gap: 1.2rem;
                    flex-wrap: wrap;
                }

                .rt-badge {
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

                .rt-title {
                    font-family: 'Space Grotesk', sans-serif;
                    font-weight: 700;
                    font-size: 2.1rem;
                    margin: 0 0 0.4rem;
                    text-shadow: 0 2px 20px rgba(0,0,0,0.15);
                }

                .rt-subtext {
                    font-size: 0.98rem;
                    color: rgba(255,255,255,0.82);
                    margin: 0;
                    max-width: 480px;
                }

                .rt-add-btn {
                    border: none;
                    border-radius: 12px;
                    padding: 0.85rem 1.5rem;
                    background: #FFFFFF;
                    color: var(--violet-deep);
                    font-size: 0.95rem;
                    font-weight: 700;
                    cursor: pointer;
                    box-shadow: 0 12px 26px -10px rgba(0,0,0,0.35);
                    transition: filter 0.15s ease, transform 0.15s ease;
                    white-space: nowrap;
                }

                .rt-add-btn:hover {
                    filter: brightness(0.97);
                    transform: translateY(-1px);
                }

                @keyframes rt-rise {
                    from { opacity: 0; transform: translateY(12px); }
                    to   { opacity: 1; transform: translateY(0); }
                }

                /* Grid / Cards */
                .rt-container { padding: 2.4rem 1rem 4rem; }

                .rt-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1.4rem;
                }

                .rt-card {
                    background: #FFFFFF;
                    border-radius: 18px;
                    padding: 1.6rem 1.6rem 1.5rem;
                    box-shadow: 0 20px 44px -26px rgba(30,20,70,0.28);
                    border: 1px solid var(--line);
                    display: flex;
                    flex-direction: column;
                    transition: transform 0.15s ease, box-shadow 0.15s ease;
                }

                .rt-card:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 26px 52px -24px rgba(30,20,70,0.34);
                }

                .rt-card-title {
                    font-family: 'Space Grotesk', sans-serif;
                    font-weight: 600;
                    font-size: 1.2rem;
                    color: var(--ink);
                    margin: 0 0 0.4rem;
                }

                .rt-card-desc {
                    color: var(--ink-soft);
                    font-size: 0.9rem;
                    margin: 0;
                }

                .rt-divider {
                    height: 1px;
                    background: var(--line);
                    border: none;
                    margin: 1.1rem 0;
                }

                .rt-price {
                    font-family: 'Space Grotesk', sans-serif;
                    font-weight: 700;
                    color: var(--violet-deep);
                    font-size: 1.3rem;
                    margin: 0 0 0.6rem;
                }

                .rt-meta {
                    font-size: 0.88rem;
                    color: var(--ink-soft);
                    margin: 0 0 0.3rem;
                }

                .rt-manage-btn {
                    margin-top: 1rem;
                    width: 100%;
                    padding: 0.7rem;
                    border: none;
                    border-radius: 11px;
                    background: linear-gradient(120deg, var(--violet) 0%, var(--teal) 130%);
                    color: #FFFFFF;
                    font-size: 0.92rem;
                    font-weight: 700;
                    cursor: pointer;
                    box-shadow: 0 12px 22px -12px rgba(109, 91, 208, 0.5);
                    transition: filter 0.15s ease, transform 0.15s ease;
                }

                .rt-manage-btn:hover {
                    filter: brightness(1.06);
                    transform: translateY(-1px);
                }

                /* Modal */
                .rt-modal-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(27, 27, 35, 0.55);
                    backdrop-filter: blur(2px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1050;
                    padding: 1rem;
                }

                .rt-modal {
                    width: 100%;
                    max-width: 520px;
                    background: #FFFFFF;
                    border-radius: 18px;
                    box-shadow: 0 30px 60px -20px rgba(30,20,70,0.4);
                    overflow: hidden;
                    animation: rt-rise 0.25s ease both;
                }

                .rt-modal-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 1.4rem 1.6rem;
                    border-bottom: 1px dashed var(--line);
                }

                .rt-modal-title {
                    font-family: 'Space Grotesk', sans-serif;
                    font-weight: 600;
                    font-size: 1.15rem;
                    color: var(--ink);
                    margin: 0;
                }

                .rt-modal-close {
                    border: none;
                    background: var(--line);
                    color: var(--ink-soft);
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    font-size: 1.1rem;
                    line-height: 1;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background 0.15s ease;
                }

                .rt-modal-close:hover {
                    background: #DCDAE8;
                }

                .rt-modal-body {
                    padding: 1.5rem 1.6rem 0.6rem;
                }

                .rt-field { margin-bottom: 1.1rem; }

                .rt-row {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1rem;
                }

                .rt-label {
                    display: block;
                    font-size: 0.82rem;
                    font-weight: 600;
                    color: var(--ink-soft);
                    margin-bottom: 0.4rem;
                }

                .rt-input {
                    width: 100%;
                    border: 1.5px solid var(--line);
                    background: #FFFFFF;
                    border-radius: 11px;
                    padding: 0.65rem 0.85rem;
                    font-size: 0.94rem;
                    color: var(--ink);
                    font-family: 'Inter', sans-serif;
                    transition: border-color 0.15s ease, box-shadow 0.15s ease;
                }

                .rt-textarea { resize: vertical; }

                .rt-select { cursor: pointer; }

                .rt-input:focus {
                    outline: none;
                    border-color: var(--violet);
                    box-shadow: 0 0 0 4px rgba(109, 91, 208, 0.15);
                }

                .rt-modal-footer {
                    display: flex;
                    justify-content: flex-end;
                    gap: 0.7rem;
                    padding: 1.2rem 1.6rem 1.5rem;
                }

                .rt-btn-cancel {
                    padding: 0.65rem 1.3rem;
                    border-radius: 11px;
                    border: 1.5px solid var(--line);
                    background: #FFFFFF;
                    color: var(--ink-soft);
                    font-weight: 600;
                    font-size: 0.9rem;
                    cursor: pointer;
                    transition: background 0.15s ease;
                }

                .rt-btn-cancel:hover {
                    background: #F5F4FA;
                }

                .rt-btn-create {
                    padding: 0.65rem 1.4rem;
                    border-radius: 11px;
                    border: none;
                    background: linear-gradient(120deg, var(--violet) 0%, var(--teal) 130%);
                    color: #FFFFFF;
                    font-weight: 700;
                    font-size: 0.9rem;
                    cursor: pointer;
                    box-shadow: 0 12px 22px -12px rgba(109, 91, 208, 0.5);
                    transition: filter 0.15s ease, transform 0.15s ease;
                }

                .rt-btn-create:hover {
                    filter: brightness(1.06);
                    transform: translateY(-1px);
                }

                @media (max-width: 900px) {
                    .rt-grid { grid-template-columns: repeat(2, 1fr); }
                }

                @media (max-width: 700px) {
                    .rt-grid { grid-template-columns: 1fr; }
                    .rt-row { grid-template-columns: 1fr; }
                    .rt-title { font-size: 1.8rem; }
                    .rt-hero-row { align-items: flex-start; }
                }
            `}</style>

        </div>

    );

}

export default RoomTypesPage;