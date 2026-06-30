import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
    getMyBookings,
    cancelBooking,
    checkInBooking,
    checkOutBooking
} from "../services/bookingService";

import { createPayment }
    from "../services/paymentService";

import { createReview }
    from "../services/reviewService";

function MyBookingsPage() {

    const [bookings,
        setBookings] = useState([]);

    useEffect(() => {

        fetchBookings();

    }, []);

    const fetchBookings =
        async () => {

            try {

                const response =
                    await getMyBookings();

                setBookings(
                    response.data
                );

            } catch (error) {

                console.error(error);

            }

        };

    const handleReview =
        async (bookingId) => {

            const rating =
                prompt("Rating (1-5)");

            const comment =
                prompt("Comment");

            try {

                await createReview({
                    bookingId,
                    rating: Number(rating),
                    comment
                });

                fetchBookings();

                alert("Review Submitted");

            } catch (error) {

                console.error(error);

                console.log(
                    error.response?.data
                );

            }

        };

    const handleCheckIn =
        async (bookingId) => {

            try {

                await checkInBooking(
                    bookingId
                );

                fetchBookings();

            } catch (error) {

                console.error(error);

            }

        };

    const handleCheckOut =
        async (bookingId) => {

            try {

                await checkOutBooking(
                    bookingId
                );

                fetchBookings();

            } catch (error) {

                console.error(error);

            }

        };

    const handleCancel =
        async (bookingId) => {

            try {

                await cancelBooking(
                    bookingId
                );

                fetchBookings();

            } catch (error) {

                console.error(error);

            }

        };


    const handlePayment =
        async (bookingId) => {

            try {

                const paymentData = {

                    bookingId,

                    paymentMethod: "UPI"

                };

                const response =
                    await createPayment(
                        paymentData
                    );

                console.log(response);

                fetchBookings();

            } catch (error) {

                console.error(error);

            }

        };

    return (

        <>
            <Navbar />

            <div className="container mt-5">

                <h2 className="mb-4">
                    My Bookings
                </h2>

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
                            booking => (

                                <div
                                    key={booking.id}
                                    className="card mb-3 shadow-sm"
                                >

                                    <div
                                        className="card-body"
                                    >

                                        <h5>
                                            Booking #
                                            {booking.id}
                                        </h5>

                                        <p>
                                            Room Type ID:
                                            {" "}
                                            {
                                                booking.roomTypeId
                                            }
                                        </p>

                                        <p>
                                            Check In:
                                            {" "}
                                            {
                                                booking.checkInDate
                                            }
                                        </p>

                                        <p>
                                            Check Out:
                                            {" "}
                                            {
                                                booking.checkOutDate
                                            }
                                        </p>

                                        <p>
                                            Guests:
                                            {" "}
                                            {
                                                booking.guestCount
                                            }
                                        </p>

                                        <p>
                                            Total Amount:
                                            {" "}
                                            ₹
                                            {
                                                booking.totalAmount
                                            }
                                        </p>

                                        <span
                                            className="badge bg-primary"
                                        >
                                            {
                                                booking.status
                                            }
                                        </span>

                                        <div className="mt-3">

                                            {
                                                booking.status !== "CANCELLED" && booking.status !== "COMPLETED" && (

                                                    <button
                                                        className="btn btn-outline-danger"
                                                        onClick={() =>
                                                            handleCancel(
                                                                booking.id
                                                            )
                                                        }
                                                    >
                                                        Cancel Booking
                                                    </button>

                                                )
                                            }

                                            {
                                                booking.status ===
                                                "PENDING_PAYMENT" && (

                                                    <button
                                                        className="btn btn-success ms-2"
                                                        onClick={() =>
                                                            handlePayment(
                                                                booking.id
                                                            )
                                                        }
                                                    >
                                                        Pay Now
                                                    </button>

                                                )
                                            }

                                            {
                                                booking.status ===
                                                "CONFIRMED" && (

                                                    <button
                                                        className="btn btn-primary ms-2"
                                                        onClick={() =>
                                                            handleCheckIn(
                                                                booking.id
                                                            )
                                                        }
                                                    >
                                                        Check In
                                                    </button>

                                                )
                                            }

                                            {
                                                booking.status ===
                                                "CHECKED_IN" && (

                                                    <button
                                                        className="btn btn-success ms-2"
                                                        onClick={() =>
                                                            handleCheckOut(
                                                                booking.id
                                                            )
                                                        }
                                                    >
                                                        Complete Stay
                                                    </button>

                                                )
                                            }

                                            {
                                                booking.status ===
                                                "COMPLETED" && (

                                                    <button
                                                        className="btn btn-warning ms-2"
                                                        onClick={() =>
                                                            handleReview(
                                                                booking.id
                                                            )
                                                        }
                                                    >
                                                        Leave Review
                                                    </button>

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

export default MyBookingsPage;