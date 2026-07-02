import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

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

            const confirmed =
                window.confirm(
                    "Are you sure you want to delete this room?"
                );

            if (!confirmed) {

                return;

            }

            try {

                await deleteRoom(
                    roomTypeId,
                    roomId
                );

                await fetchRooms();

            }

            catch (error) {

                console.error(error);

                alert(
                    error.response?.data?.message
                    ||
                    "Failed to delete room."
                );

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

                    return "bg-success";

                case "OCCUPIED":

                    return "bg-danger";

                case "MAINTENANCE":

                    return "bg-warning text-dark";

                case "INACTIVE":

                    return "bg-secondary";

                default:

                    return "bg-dark";

            }

        };

    return (

        <>

            <Navbar />

            <div className="container mt-5">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <div>

                        <button
                            className="btn btn-outline-dark mb-3"
                            onClick={() =>
                                navigate(-1)
                            }
                        >
                            ← Back
                        </button>

                        <h2 className="fw-bold">

                            Rooms

                        </h2>

                        <p className="text-muted">

                            Manage all hotel rooms.

                        </p>

                    </div>

                    <button
                        className="btn btn-dark"
                        onClick={() => {

                            resetForm();

                            setShowModal(true);

                        }}
                    >

                        + Add Room

                    </button>

                </div>

                <div className="row">

                    {

                        rooms.length === 0

                            ?

                            (

                                <div className="alert alert-info">

                                    No rooms available.

                                </div>

                            )

                            :

                            rooms.map(room => (

                                <div
                                    className="col-md-4 mb-4"
                                    key={room.id}
                                >

                                    <div className="card shadow-sm h-100">

                                        <div className="card-body">

                                            <h4>

                                                🚪 Room {room.roomNumber}

                                            </h4>

                                            <p>

                                                Floor : {room.floorNumber}

                                            </p>

                                            <span
                                                className={`badge ${getBadge(room.status)}`}
                                            >

                                                {room.status}

                                            </span>

                                            <hr />

                                            <div className="d-grid gap-2 mt-3">

                                                <button
                                                    className="btn btn-dark"
                                                    onClick={() =>
                                                        openEditModal(room)
                                                    }
                                                >
                                                    ✏ Edit Room
                                                </button>

                                                {
                                                    room.status !== "AVAILABLE" && (

                                                        <button
                                                            className="btn btn-success"
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
                                                            className="btn btn-warning"
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
                                                            className="btn btn-secondary"
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
                                                    className="btn btn-outline-danger"
                                                    onClick={() =>
                                                        handleDeleteRoom(room.id)
                                                    }
                                                >
                                                    🗑 Delete Room
                                                </button>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            ))

                    }

                </div>

            </div>
            {
                showModal && (

                    <div
                        className="modal fade show d-block"
                        style={{
                            backgroundColor:
                                "rgba(0,0,0,0.5)"
                        }}
                    >

                        <div className="modal-dialog">

                            <div className="modal-content">

                                <div className="modal-header">

                                    <h5>

                                        Add Room

                                    </h5>

                                    <button
                                        className="btn-close"
                                        onClick={() => {

                                            setShowModal(false);

                                            resetForm();

                                        }}
                                    />

                                </div>

                                <div className="modal-body">

                                    <div className="mb-3">

                                        <label>

                                            Room Number

                                        </label>

                                        <input
                                            className="form-control"
                                            value={roomNumber}
                                            onChange={(e) =>
                                                setRoomNumber(
                                                    e.target.value
                                                )
                                            }
                                        />

                                    </div>

                                    <div className="mb-3">

                                        <label>

                                            Floor Number

                                        </label>

                                        <input
                                            type="number"
                                            className="form-control"
                                            value={floorNumber}
                                            onChange={(e) =>
                                                setFloorNumber(
                                                    e.target.value
                                                )
                                            }
                                        />

                                    </div>

                                </div>

                                <div className="modal-footer">

                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => {

                                            setShowModal(false);

                                            resetForm();

                                        }}
                                    >

                                        Cancel

                                    </button>

                                    <button
                                        className="btn btn-dark"
                                        onClick={
                                            handleCreateRoom
                                        }
                                    >

                                        Create Room

                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                )
            }

            {
                editingRoom && (

                    <div
                        className="modal fade show d-block"
                        style={{
                            backgroundColor:
                                "rgba(0,0,0,0.5)"
                        }}
                    >

                        <div className="modal-dialog">

                            <div className="modal-content">

                                <div className="modal-header">

                                    <h5>

                                        Edit Room

                                    </h5>

                                    <button
                                        className="btn-close"
                                        onClick={() => {

                                            setEditingRoom(null);

                                            resetForm();

                                        }}
                                    />

                                </div>

                                <div className="modal-body">

                                    <div className="mb-3">

                                        <label>

                                            Room Number

                                        </label>

                                        <input
                                            className="form-control"
                                            value={roomNumber}
                                            onChange={(e) =>
                                                setRoomNumber(
                                                    e.target.value
                                                )
                                            }
                                        />

                                    </div>

                                    <div className="mb-3">

                                        <label>

                                            Floor Number

                                        </label>

                                        <input
                                            type="number"
                                            className="form-control"
                                            value={floorNumber}
                                            onChange={(e) =>
                                                setFloorNumber(
                                                    e.target.value
                                                )
                                            }
                                        />

                                    </div>

                                </div>

                                <div className="modal-footer">

                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => {

                                            setEditingRoom(null);

                                            resetForm();

                                        }}
                                    >

                                        Cancel

                                    </button>

                                    <button
                                        className="btn btn-primary"
                                        onClick={
                                            handleEditRoom
                                        }
                                    >

                                        Save Changes

                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                )
            }

            {
                (showModal || editingRoom) && (

                    <div
                        className="modal-backdrop fade show"
                    />

                )
            }

        </>

    );

}

export default RoomsPage;