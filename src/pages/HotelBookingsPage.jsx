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

                    return "bg-primary";

                case "CHECKED_IN":

                    return "bg-success";

                case "COMPLETED":

                    return "bg-dark";

                case "CANCELLED":

                    return "bg-danger";

                case "PENDING_PAYMENT":

                    return "bg-warning text-dark";

                default:

                    return "bg-secondary";

            }

        };

    if (loading) {

        return (

            <>
                <Navbar />

                <div className="container mt-5">

                    <h3>
                        Loading bookings...
                    </h3>

                </div>

            </>

        );

    }

    return (

        <>

            <Navbar />

            <div className="container mt-5">

                <button
                    className="btn btn-outline-dark mb-4"
                    onClick={() =>
                        navigate(
                            `/manage-hotel/${hotelId}`
                        )
                    }
                >
                    ← Back
                </button>

                <div
                    className="d-flex justify-content-between align-items-center mb-4"
                >

                    <div>

                        <h2
                            className="fw-bold"
                        >
                            Hotel Bookings
                        </h2>

                        <p
                            className="text-muted"
                        >
                            Manage bookings for your hotel.
                        </p>

                    </div>

                    <span
                        className="badge bg-dark fs-6"
                    >
                        {bookings.length} Bookings
                    </span>

                </div>

                {
                    bookings.length === 0 ?

                        (

                            <div
                                className="alert alert-info"
                            >

                                No bookings found.

                            </div>

                        )

                        :

                        bookings.map(
                            (booking) => (

                                <div
                                    key={booking.id}
                                    className="card shadow-sm border-0 mb-4"
                                >

                                    <div className="card-body">

                                        <div
                                            className="d-flex justify-content-between"
                                        >

                                            <div>

                                                <h4>

                                                    {booking.customerName}

                                                </h4>

                                                <p
                                                    className="text-muted mb-1"
                                                >

                                                    {booking.customerEmail}

                                                </p>

                                            </div>

                                            <span
                                                className={`badge ${getBadgeClass(booking.status)}`}
                                            >

                                                {booking.status}

                                            </span>

                                        </div>

                                        <hr />

                                        <div className="row">

                                            <div className="col-md-6">

                                                <p>

                                                    <strong>

                                                        Room Type :

                                                    </strong>

                                                    {" "}

                                                    {booking.roomTypeName}

                                                </p>

                                                <p>

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

                                            <div className="col-md-6">

                                                <p>

                                                    <strong>

                                                        Check In :

                                                    </strong>

                                                    {" "}

                                                    {booking.checkInDate}

                                                </p>

                                                <p>

                                                    <strong>

                                                        Check Out :

                                                    </strong>

                                                    {" "}

                                                    {booking.checkOutDate}

                                                </p>

                                                <p>

                                                    <strong>

                                                        Guests :

                                                    </strong>

                                                    {" "}

                                                    {booking.guestCount}

                                                </p>

                                                <p>

                                                    <strong>

                                                        Amount :

                                                    </strong>

                                                    {" "}

                                                    ₹{booking.totalAmount}

                                                </p>

                                            </div>

                                        </div>
                                        <div className="mt-4">

                                            {

                                                booking.status === "CONFIRMED"

                                                &&

                                                (

                                                    <button
                                                        className="btn btn-success me-2"
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
                                                        className="btn btn-danger"
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
                                                        className="text-success fw-bold"
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
                                                        className="text-danger fw-bold"
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
                                                        className="text-warning fw-bold"
                                                    >
                                                        Awaiting Payment
                                                    </span>

                                                )

                                            }

                                        </div>

                                    </div>

                                </div>

                            )

                        )

                }

            </div>

        </>

    );

}

export default HotelBookingsPage;