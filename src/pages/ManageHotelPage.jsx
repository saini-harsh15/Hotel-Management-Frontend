import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

function ManageHotelPage() {

    const navigate = useNavigate();

    const { hotelId } = useParams();

    return (

        <>
            <Navbar />

            <div className="container mt-5">

                <button
                    className="btn btn-outline-dark mb-4"
                    onClick={() =>
                        navigate("/my-hotels")
                    }
                >
                    ← Back to My Hotels
                </button>

                <div
                    className="card border-0 shadow"
                    style={{
                        borderRadius: "20px"
                    }}
                >

                    <div className="card-body p-5">

                        <h2 className="fw-bold">
                            Hotel Management
                        </h2>

                        <p className="text-muted">
                            Manage every aspect of your hotel from here.
                        </p>

                        <hr className="my-4" />

                        <div className="row">

                            <div className="col-md-6 mb-4">

                                <div
                                    className="card h-100 shadow-sm"
                                    style={{
                                        cursor: "pointer"
                                    }}
                                    onClick={() =>
                                        navigate(
                                            `/manage-hotel/${hotelId}/room-types`
                                        )
                                    }
                                >

                                    <div className="card-body">

                                        <h4>
                                            🛏 Room Types
                                        </h4>

                                        <p className="text-muted">
                                            Create and manage room categories.
                                        </p>

                                    </div>

                                </div>

                            </div>



                            <div className="col-md-6 mb-4">

                                <div
                                    className="card h-100 shadow-sm"
                                    style={{
                                        cursor: "pointer"
                                    }}
                                    onClick={() =>
                                        navigate(
                                            `/manage-hotel/${hotelId}/bookings`
                                        )
                                    }
                                >

                                    <div className="card-body">

                                        <h4>
                                            📅 Bookings
                                        </h4>

                                        <p className="text-muted">
                                            View guest bookings.
                                        </p>

                                    </div>

                                </div>

                            </div>

                            <div className="col-md-6 mb-4">

                                <div
                                    className="card h-100 shadow-sm"
                                    style={{
                                        cursor: "pointer"
                                    }}
                                    onClick={() =>
                                        navigate(
                                            `/manage-hotel/${hotelId}/reviews`
                                        )
                                    }
                                >

                                    <div className="card-body">

                                        <h4>
                                            ⭐ Reviews
                                        </h4>

                                        <p className="text-muted">
                                            Read guest reviews.
                                        </p>

                                    </div>

                                </div>

                            </div>

                            <div className="col-md-6 mb-4">

                                <div
                                    className="card h-100 shadow-sm"
                                    style={{
                                        cursor: "pointer"
                                    }}
                                    onClick={() =>
                                        navigate(
                                            `/manage-hotel/${hotelId}/edit`
                                        )
                                    }
                                >

                                    <div className="card-body">

                                        <h4>
                                            ✏️ Edit Hotel
                                        </h4>

                                        <p className="text-muted">
                                            Update hotel details, contact information and timings.
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </>

    );

}

export default ManageHotelPage;