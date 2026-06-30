import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getHotelById } from "../services/hotelService";
import { getHotelReviews } from "../services/reviewService";

function HotelDetailsPage() {

    const { hotelId } = useParams();
    const navigate = useNavigate();

    const [hotel, setHotel] = useState(null);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {

        fetchHotel();

        fetchReviews();

    }, []);

    const fetchHotel = async () => {

        try {

            const response =
                await getHotelById(
                    hotelId
                );

            setHotel(
                response.data
            );

        } catch (error) {

            console.error(error);

        }

    };

    const fetchReviews = async () => {

        try {

            const response =
                await getHotelReviews(
                    hotelId
                );

            setReviews(
                response.data
            );

        } catch (error) {

            console.error(error);

        }

    };

    if (!hotel) {

        return (
            <>
                <Navbar />

                <div className="container mt-5">
                    <h3>Loading...</h3>
                </div>
            </>
        );

    }

    return (

        <>
            <Navbar />

            <div className="container mt-5">

                <div className="card border-0 shadow">

                    <img
                        src="https://images.unsplash.com/photo-1566073771259-6a8506099945"
                        alt="Hotel"
                        style={{
                            height: "400px",
                            objectFit: "cover"
                        }}
                    />

                    <div className="card-body p-4">


                        <div className="d-flex justify-content-between align-items-center">

                            <h1>
                                {hotel.name}
                            </h1>

                            <span className="badge bg-success fs-6">
                                <div className="d-flex align-items-center">

                                    <span
                                        className="badge bg-success fs-6 px-3 py-2"
                                    >
                                        ⭐ {hotel.averageRating?.toFixed(1) || "0.0"}
                                    </span>

                                    <span
                                        className="ms-3 text-muted"
                                    >
                                        {reviews.length} Reviews
                                    </span>

                                </div>
                            </span>

                        </div>

                        <p className="text-muted fs-5">
                            📍 {hotel.city}
                        </p>

                        <hr />

                        <h5>
                            Description
                        </h5>

                        <p>
                            {
                                hotel.description ||
                                "No description available."
                            }
                        </p>

                        <hr />

                        <div className="row">

                            <div className="col-md-6">

                                <h6>
                                    Check In
                                </h6>

                                <p>
                                    {hotel.checkInTime}
                                </p>

                            </div>

                            <div className="col-md-6">

                                <h6>
                                    Check Out
                                </h6>

                                <p>
                                    {hotel.checkOutTime}
                                </p>

                            </div>

                        </div>

                        <button
                            className="btn btn-dark btn-lg mt-3"
                            onClick={() =>
                                navigate(
                                    `/book-hotel/${hotelId}`
                                )
                            }
                        >
                            Book Now
                        </button>
                        <hr className="my-5" />

                        <h3 className="fw-bold mb-4">
                            Guest Reviews ({reviews.length})
                        </h3>

                        {
                            reviews.length === 0 ?

                                (

                                    <div className="alert alert-light border">

                                        <div className="alert alert-light border text-center">

                                            <h5>No Reviews Yet</h5>

                                            <p className="mb-0">
                                                Be the first guest to share your experience.
                                            </p>

                                        </div>

                                    </div>

                                )

                                :

                                reviews.map(review => (

                                    <div
                                        key={review.id}
                                        className="card border-0 shadow-sm mb-3"
                                        style={{
                                            borderRadius: "18px",
                                            background: "#f8fafc"
                                        }}
                                    >

                                        <div className="card-body">

                                            <div
                                                className="d-flex justify-content-between align-items-center"
                                            >

                                                <div>

                                                    <div className="mb-2">

                                                        {"⭐".repeat(review.rating)}

                                                    </div>

                                                    <small className="text-success fw-semibold">
                                                        ✔ Verified Stay
                                                    </small>

                                                </div>

                                            </div>

                                            <p className="mt-3 mb-0">

                                                {
                                                    review.comment
                                                        ? review.comment
                                                        : "No written review."
                                                }

                                            </p>

                                        </div>

                                    </div>

                                ))
                        }

                    </div>

                </div>

            </div>

        </>

    );

}

export default HotelDetailsPage;