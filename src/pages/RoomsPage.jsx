import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Swal from "sweetalert2";

import {
    getRoomsByRoomType,
    createRoom,
    updateRoom,
    updateRoomStatus,
    deleteRoom
} from "../services/roomService";

function RoomsPage() {

    const { roomTypeId } = useParams();

    const navigate = useNavigate();

    const [rooms, setRooms] =
        useState([]);

    const [showModal, setShowModal] =
        useState(false);

    const [editingRoom, setEditingRoom] =
        useState(null);

    const [roomNumber, setRoomNumber] =
        useState("");

    const [floorNumber, setFloorNumber] =
        useState("");

    useEffect(() => {

        fetchRooms();

    }, []);

    const fetchRooms =
        async () => {

            try {

                const response =
                    await getRoomsByRoomType(
                        roomTypeId
                    );

                setRooms(
                    response.data
                );

            }

            catch (error) {

                console.error(error);

            }

        };

    const resetForm =
        () => {

            setRoomNumber("");

            setFloorNumber("");

        };

    const handleCreateRoom =
        async () => {

            try {

                await createRoom(
                    roomTypeId,
                    {
                        roomNumber,
                        floorNumber:
                            Number(floorNumber)
                    }
                );

                resetForm();

                setShowModal(false);

                await fetchRooms();

            }

            catch (error) {

                console.error(error);

                alert(
                    error.response?.data?.message
                    ||
                    "Failed to create room."
                );

            }

        };

    const handleEditRoom =
        async () => {

            try {

                await updateRoom(
                    roomTypeId,
                    editingRoom.id,
                    {
                        roomNumber,
                        floorNumber:
                            Number(floorNumber)
                    }
                );

                setEditingRoom(null);

                resetForm();

                await fetchRooms();

            }

            catch (error) {

                console.error(error);

                alert(
                    error.response?.data?.message
                    ||
                    "Failed to update room."
                );

            }

        };

    const handleStatusChange =
        async (
            roomId,
            status
        ) => {

            try {

                await updateRoomStatus(
                    roomTypeId,
                    roomId,
                    status
                );

                await fetchRooms();

            }

            catch (error) {

                console.error(error);

                alert(
                    error.response?.data?.message
                    ||
                    "Failed to update room status."
                );

            }

        };


    const handleDeleteRoom =
        async (
            roomId
        ) => {

            const result = await Swal.fire({
                title: "Delete this room?",
                text: "This action cannot be undone.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, delete it",
                cancelButtonText: "Cancel",
                confirmButtonColor: "#C24F5C",   // your --rose
                cancelButtonColor: "#8B8A97",    // your --muted
                reverseButtons: true
            });

            if (!result.isConfirmed) {
                return;
            }

            try {

                await deleteRoom(
                    roomTypeId,
                    roomId
                );
                Swal.fire({
                    icon: "success",
                    title: "Room deleted",
                    timer: 1500,
                    showConfirmButton: false
                });

                await fetchRooms();

            }

            catch (error) {

                console.error(error);

                Swal.fire({
                    icon: "error",
                    title: "Failed to delete room",
                    text: error.response?.data?.message || "Something went wrong."
                });

            }

        };
    const openEditModal =
        (room) => {

            setEditingRoom(room);

            setRoomNumber(
                room.roomNumber
            );

            setFloorNumber(
                room.floorNumber
            );

        };

    const getBadge =
        (status) => {

            switch (status) {

                case "AVAILABLE":

                    return "rm-badge-available";

                case "OCCUPIED":

                    return "rm-badge-occupied";

                case "MAINTENANCE":

                    return "rm-badge-maintenance";

                case "INACTIVE":

                    return "rm-badge-inactive";

                default:

                    return "rm-badge-default";

            }

        };

    return (

        <div className="rm-root">

            <Navbar />

            <div className="rm-hero">
                <div className="rm-hero-bg" aria-hidden="true">
                    <div className="rm-blob rm-blob-a" />
                    <div className="rm-blob rm-blob-b" />
                </div>
                <div className="container rm-hero-inner">

                    <button
                        className="rm-back-btn"
                        onClick={() =>
                            navigate(-1)
                        }
                    >
                        ← Back
                    </button>

                    <div className="rm-hero-row">

                        <div>
                            <span className="rm-badge-tag">Hotel Admin</span>
                            <h2 className="rm-title">Rooms</h2>
                            <p className="rm-subtext">
                                Manage all hotel rooms.
                            </p>
                        </div>

                        <button
                            className="rm-add-btn"
                            onClick={() => {

                                resetForm();

                                setShowModal(true);

                            }}
                        >
                            + Add Room
                        </button>

                    </div>

                </div>
            </div>

            <div className="container rm-container">

                <div className="rm-grid">

                    {

                        rooms.length === 0

                            ?

                            (

                                <div className="rm-empty">

                                    No rooms available.

                                </div>

                            )

                            :

                            rooms.map(room => (

                                <div
                                    className="rm-card"
                                    key={room.id}
                                >

                                    <h4 className="rm-card-title">

                                        🚪 Room {room.roomNumber}

                                    </h4>

                                    <p className="rm-card-floor">

                                        Floor : {room.floorNumber}

                                    </p>

                                    <span
                                        className={`rm-badge ${getBadge(room.status)}`}
                                    >

                                        {room.status}

                                    </span>

                                    <div className="rm-divider" />

                                    <div className="rm-actions">

                                        <button
                                            className="rm-btn-edit"
                                            onClick={() =>
                                                openEditModal(room)
                                            }
                                        >
                                            ✏ Edit Room
                                        </button>

                                        {
                                            room.status !== "AVAILABLE" && (

                                                <button
                                                    className="rm-btn-available"
                                                    onClick={() =>
                                                        handleStatusChange(
                                                            room.id,
                                                            "AVAILABLE"
                                                        )
                                                    }
                                                >
                                                    🟢 Make Available
                                                </button>

                                            )
                                        }

                                        {
                                            room.status !== "MAINTENANCE" && (

                                                <button
                                                    className="rm-btn-maintenance"
                                                    onClick={() =>
                                                        handleStatusChange(
                                                            room.id,
                                                            "MAINTENANCE"
                                                        )
                                                    }
                                                >
                                                    🟡 Maintenance
                                                </button>

                                            )
                                        }

                                        {
                                            room.status !== "INACTIVE" && (

                                                <button
                                                    className="rm-btn-inactive"
                                                    onClick={() =>
                                                        handleStatusChange(
                                                            room.id,
                                                            "INACTIVE"
                                                        )
                                                    }
                                                >
                                                    ⚫ Inactivate
                                                </button>

                                            )
                                        }

                                        <button
                                            className="rm-btn-delete"
                                            onClick={() =>
                                                handleDeleteRoom(room.id)
                                            }
                                        >
                                            🗑 Delete Room
                                        </button>

                                    </div>

                                </div>

                            ))

                    }

                </div>

            </div>

            {
                showModal && (

                    <div className="rm-modal-overlay">

                        <div className="rm-modal">

                            <div className="rm-modal-header">

                                <h5 className="rm-modal-title">

                                    Add Room

                                </h5>

                                <button
                                    className="rm-modal-close"
                                    onClick={() => {

                                        setShowModal(false);

                                        resetForm();

                                    }}
                                >
                                    ×
                                </button>

                            </div>

                            <div className="rm-modal-body">

                                <div className="rm-field">

                                    <label className="rm-label">

                                        Room Number

                                    </label>

                                    <input
                                        className="rm-input"
                                        value={roomNumber}
                                        onChange={(e) =>
                                            setRoomNumber(
                                                e.target.value
                                            )
                                        }
                                    />

                                </div>

                                <div className="rm-field">

                                    <label className="rm-label">

                                        Floor Number

                                    </label>

                                    <input
                                        type="number"
                                        className="rm-input"
                                        value={floorNumber}
                                        onChange={(e) =>
                                            setFloorNumber(
                                                e.target.value
                                            )
                                        }
                                    />

                                </div>

                            </div>

                            <div className="rm-modal-footer">

                                <button
                                    className="rm-btn-cancel"
                                    onClick={() => {

                                        setShowModal(false);

                                        resetForm();

                                    }}
                                >

                                    Cancel

                                </button>

                                <button
                                    className="rm-btn-create"
                                    onClick={
                                        handleCreateRoom
                                    }
                                >

                                    Create Room

                                </button>

                            </div>

                        </div>

                    </div>

                )
            }

            {
                editingRoom && (

                    <div className="rm-modal-overlay">

                        <div className="rm-modal">

                            <div className="rm-modal-header">

                                <h5 className="rm-modal-title">

                                    Edit Room

                                </h5>

                                <button
                                    className="rm-modal-close"
                                    onClick={() => {

                                        setEditingRoom(null);

                                        resetForm();

                                    }}
                                >
                                    ×
                                </button>

                            </div>

                            <div className="rm-modal-body">

                                <div className="rm-field">

                                    <label className="rm-label">

                                        Room Number

                                    </label>

                                    <input
                                        className="rm-input"
                                        value={roomNumber}
                                        onChange={(e) =>
                                            setRoomNumber(
                                                e.target.value
                                            )
                                        }
                                    />

                                </div>

                                <div className="rm-field">

                                    <label className="rm-label">

                                        Floor Number

                                    </label>

                                    <input
                                        type="number"
                                        className="rm-input"
                                        value={floorNumber}
                                        onChange={(e) =>
                                            setFloorNumber(
                                                e.target.value
                                            )
                                        }
                                    />

                                </div>

                            </div>

                            <div className="rm-modal-footer">

                                <button
                                    className="rm-btn-cancel"
                                    onClick={() => {

                                        setEditingRoom(null);

                                        resetForm();

                                    }}
                                >

                                    Cancel

                                </button>

                                <button
                                    className="rm-btn-save"
                                    onClick={
                                        handleEditRoom
                                    }
                                >

                                    Save Changes

                                </button>

                            </div>

                        </div>

                    </div>

                )
            }

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');

                .rm-root {
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
                .rm-hero {
                    position: relative;
                    overflow: hidden;
                    background: linear-gradient(150deg, var(--violet-deep) 0%, var(--violet) 45%, #3E8FBD 78%, var(--teal) 100%);
                    padding-bottom: 2.4rem;
                }

                .rm-hero-bg {
                    position: absolute;
                    inset: 0;
                    overflow: hidden;
                }

                .rm-blob {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(60px);
                    opacity: 0.5;
                }

                .rm-blob-a {
                    width: 320px; height: 320px;
                    top: -140px; left: -80px;
                    background: radial-gradient(circle, rgba(255,255,255,0.35), transparent 70%);
                }

                .rm-blob-b {
                    width: 280px; height: 280px;
                    bottom: -160px; right: -60px;
                    background: radial-gradient(circle, rgba(35,196,168,0.5), transparent 70%);
                }

                .rm-hero-inner {
                    position: relative;
                    z-index: 1;
                    padding-top: 2rem;
                    color: #FFFFFF;
                    animation: rm-rise 0.6s cubic-bezier(.22,1,.36,1) both;
                }

                .rm-back-btn {
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

                .rm-back-btn:hover {
                    background: rgba(255,255,255,0.2);
                    transform: translateX(-2px);
                }

                .rm-hero-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    gap: 1.2rem;
                    flex-wrap: wrap;
                }

                .rm-badge-tag {
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

                .rm-title {
                    font-family: 'Space Grotesk', sans-serif;
                    font-weight: 700;
                    font-size: 2.1rem;
                    margin: 0 0 0.4rem;
                    text-shadow: 0 2px 20px rgba(0,0,0,0.15);
                }

                .rm-subtext {
                    font-size: 0.98rem;
                    color: rgba(255,255,255,0.82);
                    margin: 0;
                    max-width: 480px;
                }

                .rm-add-btn {
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

                .rm-add-btn:hover {
                    filter: brightness(0.97);
                    transform: translateY(-1px);
                }

                @keyframes rm-rise {
                    from { opacity: 0; transform: translateY(12px); }
                    to   { opacity: 1; transform: translateY(0); }
                }

                /* Grid / Cards */
                .rm-container { padding: 2.4rem 1rem 4rem; }

                .rm-empty {
                    background: #EAF3FF;
                    border: 1px solid #CFE3FA;
                    color: #2C5C8A;
                    border-radius: 14px;
                    padding: 1.1rem 1.3rem;
                    font-size: 0.95rem;
                    font-weight: 500;
                    grid-column: 1 / -1;
                }

                .rm-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1.4rem;
                }

                .rm-card {
                    background: #FFFFFF;
                    border-radius: 18px;
                    padding: 1.6rem 1.6rem 1.5rem;
                    box-shadow: 0 20px 44px -26px rgba(30,20,70,0.28);
                    border: 1px solid var(--line);
                    transition: transform 0.15s ease, box-shadow 0.15s ease;
                }

                .rm-card:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 26px 52px -24px rgba(30,20,70,0.34);
                }

                .rm-card-title {
                    font-family: 'Space Grotesk', sans-serif;
                    font-weight: 600;
                    font-size: 1.15rem;
                    color: var(--ink);
                    margin: 0 0 0.3rem;
                }

                .rm-card-floor {
                    color: var(--ink-soft);
                    font-size: 0.9rem;
                    margin: 0 0 0.7rem;
                }

                .rm-badge {
                    display: inline-block;
                    font-size: 0.76rem;
                    font-weight: 700;
                    letter-spacing: 0.02em;
                    padding: 0.4rem 0.85rem;
                    border-radius: 999px;
                    color: #FFFFFF;
                }

                .rm-badge-available { background: var(--teal); }
                .rm-badge-occupied { background: var(--rose); }
                .rm-badge-maintenance { background: var(--amber); color: var(--ink); }
                .rm-badge-inactive { background: var(--muted); }
                .rm-badge-default { background: var(--ink); }

                .rm-divider {
                    height: 1px;
                    background: var(--line);
                    margin: 1.1rem 0;
                }

                .rm-actions {
                    display: flex;
                    flex-direction: column;
                    gap: 0.6rem;
                }

                .rm-actions button {
                    border: none;
                    border-radius: 11px;
                    padding: 0.62rem 1rem;
                    font-size: 0.86rem;
                    font-weight: 700;
                    cursor: pointer;
                    transition: filter 0.15s ease, transform 0.15s ease;
                }

                .rm-actions button:hover {
                    filter: brightness(1.05);
                    transform: translateY(-1px);
                }

                .rm-btn-edit {
                    background: linear-gradient(120deg, var(--violet) 0%, var(--teal) 130%);
                    color: #FFFFFF;
                    box-shadow: 0 12px 22px -12px rgba(109, 91, 208, 0.5);
                }

                .rm-btn-available {
                    background: var(--teal);
                    color: #FFFFFF;
                }

                .rm-btn-maintenance {
                    background: var(--amber);
                    color: var(--ink);
                }

                .rm-btn-inactive {
                    background: var(--muted);
                    color: #FFFFFF;
                }

                .rm-btn-delete {
                    background: #FFFFFF;
                    color: var(--rose);
                    border: 1.5px solid var(--rose) !important;
                }

                /* Modal */
                .rm-modal-overlay {
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

                .rm-modal {
                    width: 100%;
                    max-width: 480px;
                    background: #FFFFFF;
                    border-radius: 18px;
                    box-shadow: 0 30px 60px -20px rgba(30,20,70,0.4);
                    overflow: hidden;
                    animation: rm-rise 0.25s ease both;
                }

                .rm-modal-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 1.4rem 1.6rem;
                    border-bottom: 1px dashed var(--line);
                }

                .rm-modal-title {
                    font-family: 'Space Grotesk', sans-serif;
                    font-weight: 600;
                    font-size: 1.15rem;
                    color: var(--ink);
                    margin: 0;
                }

                .rm-modal-close {
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

                .rm-modal-close:hover {
                    background: #DCDAE8;
                }

                .rm-modal-body {
                    padding: 1.5rem 1.6rem 0.6rem;
                }

                .rm-field { margin-bottom: 1.1rem; }

                .rm-label {
                    display: block;
                    font-size: 0.82rem;
                    font-weight: 600;
                    color: var(--ink-soft);
                    margin-bottom: 0.4rem;
                }

                .rm-input {
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

                .rm-input:focus {
                    outline: none;
                    border-color: var(--violet);
                    box-shadow: 0 0 0 4px rgba(109, 91, 208, 0.15);
                }

                .rm-modal-footer {
                    display: flex;
                    justify-content: flex-end;
                    gap: 0.7rem;
                    padding: 1.2rem 1.6rem 1.5rem;
                }

                .rm-btn-cancel {
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

                .rm-btn-cancel:hover {
                    background: #F5F4FA;
                }

                .rm-btn-create,
                .rm-btn-save {
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

                .rm-btn-create:hover,
                .rm-btn-save:hover {
                    filter: brightness(1.06);
                    transform: translateY(-1px);
                }

                @media (max-width: 900px) {
                    .rm-grid { grid-template-columns: repeat(2, 1fr); }
                }

                @media (max-width: 700px) {
                    .rm-grid { grid-template-columns: 1fr; }
                    .rm-title { font-size: 1.8rem; }
                    .rm-hero-row { align-items: flex-start; }
                }
            `}</style>

        </div>

    );

}

export default RoomsPage;