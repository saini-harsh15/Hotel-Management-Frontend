import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getRoomTypesByHotel } from "../services/roomTypeService";
import { createBooking } from "../services/bookingService";
import { useNavigate } from "react-router-dom";

function CreateBookingPage() {

    const { hotelId } = useParams();
    const navigate = useNavigate();

    const [roomTypes, setRoomTypes] =
        useState([]);

    const [roomTypeId, setRoomTypeId] =
        useState("");

    const [checkInDate,
        setCheckInDate] = useState("");

    const [checkOutDate,
        setCheckOutDate] = useState("");

    const [guestCount,
        setGuestCount] = useState(1);

    const [specialRequest,
        setSpecialRequest] = useState("");

    useEffect(() => {

        fetchRoomTypes();

    }, []);

    const fetchRoomTypes = async () => {

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

    const handleBooking =
        async () => {

            try {

                const bookingData = {

                    roomTypeId:
                        Number(roomTypeId),

                    checkInDate,

                    checkOutDate,

                    guestCount:
                        Number(guestCount),

                    specialRequest

                };

                const response =
                    await createBooking(
                        bookingData
                    );

                console.log(response);

                navigate("/my-bookings");

            } catch (error) {

                console.error(error);

                alert(
                    "Booking Failed"
                );

            }

        };

    return (

        <>
            <Navbar />

            <div className="container mt-5">

                <div className="card shadow border-0">

                    <div className="card-body p-4">

                        <h2 className="mb-4">
                            Create Booking
                        </h2>

                        <div className="mb-3">

                            <label
                                className="form-label"
                            >
                                Room Type
                            </label>

                            <select
                                className="form-select"
                                value={roomTypeId}
                                onChange={(e) =>
                                    setRoomTypeId(
                                        e.target.value
                                    )
                                }
                            >

                                <option value="">
                                    Select Room Type
                                </option>

                                {
                                    roomTypes.map(
                                        room => (

                                            <option
                                                key={room.id}
                                                value={room.id}
                                            >
                                                {room.name}
                                                {" - ₹"}
                                                {room.price}
                                            </option>

                                        )
                                    )
                                }

                            </select>

                        </div>

                        <div className="mb-3">

                            <label
                                className="form-label"
                            >
                                Check In Date
                            </label>

                            <input
                                type="date"
                                className="form-control"
                                value={checkInDate}
                                onChange={(e) =>
                                    setCheckInDate(
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                        <div className="mb-3">

                            <label
                                className="form-label"
                            >
                                Check Out Date
                            </label>

                            <input
                                type="date"
                                className="form-control"
                                value={checkOutDate}
                                onChange={(e) =>
                                    setCheckOutDate(
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                        <div className="mb-3">

                            <label
                                className="form-label"
                            >
                                Guests
                            </label>

                            <input
                                type="number"
                                min="1"
                                className="form-control"
                                value={guestCount}
                                onChange={(e) =>
                                    setGuestCount(
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                        <div className="mb-4">

                            <label
                                className="form-label"
                            >
                                Special Request
                            </label>

                            <textarea
                                className="form-control"
                                rows="3"
                                value={specialRequest}
                                onChange={(e) =>
                                    setSpecialRequest(
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                        <button
                            className="btn btn-dark btn-lg"
                            onClick={
                                handleBooking
                            }
                        >
                            Create Booking
                        </button>

                    </div>

                </div>

            </div>

        </>

    );

}

export default CreateBookingPage;