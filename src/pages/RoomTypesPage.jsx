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

        <>
            <Navbar />

            <div className="container mt-5">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <div>

                        <button
                            className="btn btn-outline-dark mb-3"
                            onClick={() =>
                                navigate(
                                    `/manage-hotel/${hotelId}`
                                )
                            }
                        >
                            ← Back
                        </button>

                        <h2 className="fw-bold">
                            Room Types
                        </h2>

                        <p className="text-muted">
                            Manage all room categories.
                        </p>

                    </div>

                    <button
                        className="btn btn-dark"
                        onClick={() =>
                            setShowModal(true)
                        }
                    >
                        + Add Room Type
                    </button>

                </div>

                <div className="row">

                    {

                        roomTypes.map(room => (

                            <div
                                key={room.id}
                                className="col-md-4 mb-4"
                            >

                                <div
                                    className="card shadow border-0 h-100"
                                    style={{
                                        borderRadius: "18px"
                                    }}
                                >

                                    <div className="card-body">

                                        <h4>

                                            {room.name}

                                        </h4>

                                        <p className="text-muted">

                                            {room.description}

                                        </p>

                                        <hr />

                                        <h5>

                                            ₹ {room.price}

                                        </h5>

                                        <p>

                                            Capacity :
                                            {" "}
                                            {room.capacity}

                                        </p>

                                        <p>

                                            Bed :
                                            {" "}
                                            {room.bedType}

                                        </p>

                                        <button
                                            className="btn btn-dark w-100 mt-3"
                                            onClick={() =>
                                                navigate(
                                                    `/room-types/${room.id}/rooms`
                                                )
                                            }
                                        >
                                            Manage Rooms →
                                        </button>

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
                        className="modal fade show"
                        style={{
                            display: "block",
                            backgroundColor: "rgba(0,0,0,0.5)"
                        }}
                    >

                        <div className="modal-dialog">

                            <div className="modal-content">

                                <div className="modal-header">

                                    <h5>
                                        Create Room Type
                                    </h5>

                                    <button
                                        className="btn-close"
                                        onClick={() => {

                                            setShowModal(false);

                                            setName("");
                                            setDescription("");
                                            setPrice("");
                                            setCapacity("");
                                            setBedType("KING");

                                        }}
                                    />

                                </div>

                                <div className="modal-body">

                                    <div className="mb-3">

                                        <label>Name</label>

                                        <input
                                            className="form-control"
                                            value={name}
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                        />

                                    </div>

                                    <div className="mb-3">

                                        <label>Description</label>

                                        <textarea
                                            className="form-control"
                                            value={description}
                                            onChange={(e) =>
                                                setDescription(
                                                    e.target.value
                                                )
                                            }
                                        />

                                    </div>

                                    <div className="mb-3">

                                        <label>Price</label>

                                        <input
                                            type="number"
                                            className="form-control"
                                            value={price}
                                            onChange={(e) =>
                                                setPrice(e.target.value)
                                            }
                                        />

                                    </div>

                                    <div className="mb-3">

                                        <label>Capacity</label>

                                        <input
                                            type="number"
                                            className="form-control"
                                            value={capacity}
                                            onChange={(e) =>
                                                setCapacity(
                                                    e.target.value
                                                )
                                            }
                                        />

                                    </div>

                                    <div className="mb-3">

                                        <label>Bed Type</label>

                                        <select
                                            className="form-select"
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

                                <div className="modal-footer">

                                    <button
                                        className="btn btn-secondary"
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
                                        className="btn btn-dark"
                                        onClick={
                                            handleCreateRoomType
                                        }
                                    >
                                        Create
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                )
            }

            {
                showModal && (

                    <div
                        className="modal-backdrop fade show"
                    />

                )
            }

        </>

    );

}

export default RoomTypesPage;