import { useEffect, useState } from "react";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import Navbar from "../components/Navbar";

import {
    getHotelReviews
} from "../services/reviewService";

function HotelReviewsPage() {

    const navigate = useNavigate();

    const { hotelId } = useParams();

    const [reviews, setReviews] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        fetchReviews();

    }, []);

    const fetchReviews =
        async () => {

            try {

                const response =
                    await getHotelReviews(
                        hotelId
                    );

                setReviews(
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

    const renderStars =
        (rating) => {

            let stars = "";

            for (
                let i = 1;
                i <= 5;
                i++
            ) {

                if (i <= rating) {

                    stars += "⭐";

                }

                else {

                    stars += "☆";

                }

            }

            return stars;

        };

    const averageRating =
        reviews.length === 0
            ? 0
            :
            (
                reviews.reduce(
                    (
                        total,
                        review
                    ) =>
                        total +
                        review.rating,
                    0
                )
                /
                reviews.length
            ).toFixed(1);

    if (loading) {

        return (

            <>

                <Navbar />

                <div className="container mt-5">

                    <h3>

                        Loading Reviews...

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

                <div className="mb-5">

                    <h2
                        className="fw-bold"
                    >
                        ⭐ Hotel Reviews
                    </h2>

                    <p
                        className="text-muted"
                    >
                        Customer feedback for your hotel.
                    </p>

                </div>

                <div
                    className="card shadow-sm border-0 mb-5"
                >

                    <div className="card-body">

                        <h3>

                            {averageRating}

                            {" "}

                            / 5

                        </h3>

                        <h5>

                            {renderStars(
                                Math.round(
                                    averageRating
                                )
                            )}

                        </h5>

                        <p
                            className="text-muted"
                        >

                            Based on

                            {" "}

                            {reviews.length}

                            {" "}

                            Reviews

                        </p>

                    </div>

                </div>

                {

                    reviews.length === 0

                        ?

                        (

                            <div
                                className="alert alert-info"
                            >

                                No Reviews Yet.

                            </div>

                        )

                        :

                        reviews.map(
                            (
                                review
                            ) => (

                                <div
                                    key={review.id}
                                    className="card shadow-sm border-0 mb-4"
                                >

                                    <div
                                        className="card-body"
                                    >

                                        <div
                                            className="d-flex justify-content-between"
                                        >

                                            <div>

                                                <h4>

                                                    {

                                                        review.customerName

                                                    }

                                                </h4>

                                                <p
                                                    className="text-muted"
                                                >

                                                    {

                                                        review.customerEmail

                                                    }

                                                </p>

                                            </div>

                                            <div
                                                className="text-end"
                                            >

                                                <h5>

                                                    {

                                                        renderStars(
                                                            review.rating
                                                        )

                                                    }

                                                </h5>

                                                <span>

                                                    {

                                                        review.rating

                                                    }

                                                    /5

                                                </span>

                                            </div>

                                        </div>

                                        <hr />

                                        <p
                                            className="fs-5"
                                        >

                                            "

                                            {

                                                review.comment

                                            }

                                            "

                                        </p>
                                    </div>

                                </div>

                            )

                        )

                }

            </div>

        </>

    );

}

export default HotelReviewsPage;