import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getMyHotels } from "../services/hotelService";

function MyHotelsPage() {

    const navigate = useNavigate();

    const [hotels, setHotels] = useState([]);

    useEffect(() => {

        fetchHotels();

    }, []);

    const fetchHotels = async () => {

        try {

            const response =
                await getMyHotels();

            setHotels(
                response.data
            );

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <>
            <Navbar />

            <div className="container mt-5">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <div>

                        <h2 className="fw-bold">
                            My Hotels
                        </h2>

                        <p className="text-muted mb-0">
                            Manage all your hotels from one place.
                        </p>

                    </div>

                    <button
                        className="btn btn-dark"
                        onClick={() =>
                            navigate("/create-hotel")
                        }
                    >
                        + Add Hotel
                    </button>

                </div>

                {
                    hotels.length === 0 ?

                        (

                            <div className="alert alert-info">

                                You haven't added any hotels yet.

                            </div>

                        )

                        :

                        <div className="row">

                            {
                                hotels.map(hotel => (

                                    <div
                                        key={hotel.id}
                                        className="col-lg-4 mb-4"
                                    >

                                        <div
                                            className="card border-0 shadow h-100"
                                            style={{
                                                borderRadius: "20px"
                                            }}
                                        >

                                            <img
                                                src="https://images.unsplash.com/photo-1566073771259-6a8506099945"
                                                alt="Hotel"
                                                style={{
                                                    height: "220px",
                                                    objectFit: "cover",
                                                    borderTopLeftRadius: "20px",
                                                    borderTopRightRadius: "20px"
                                                }}
                                            />

                                            <div className="card-body">

                                                <div className="d-flex justify-content-between">

                                                    <h5 className="fw-bold">
                                                        {hotel.name}
                                                    </h5>

                                                    <span className="badge bg-success">
                                                        ⭐ {hotel.averageRating?.toFixed(1) || "0.0"}
                                                    </span>

                                                </div>

                                                <p className="text-muted mt-2">
                                                    📍 {hotel.city}
                                                </p>

                                                <p className="mb-3">

                                                    <strong>Status:</strong>{" "}

                                                    <span
                                                        className={
                                                            hotel.status === "APPROVED"
                                                                ? "text-success"
                                                                : "text-warning"
                                                        }
                                                    >
                                                        {hotel.status}
                                                    </span>

                                                </p>

                                                {
                                                    hotel.status === "APPROVED"

                                                        ? (

                                                            <button
                                                                className="btn btn-dark w-100"
                                                                onClick={() =>
                                                                    navigate(
                                                                        `/manage-hotel/${hotel.id}`
                                                                    )
                                                                }
                                                            >
                                                                Manage Hotel →
                                                            </button>

                                                        )

                                                        : (

                                                            <button
                                                                className="btn btn-secondary w-100"
                                                                disabled
                                                            >
                                                                Awaiting Approval
                                                            </button>

                                                        )
                                                }

                                            </div>

                                        </div>

                                    </div>

                                ))
                            }

                        </div>

                }

            </div>

        </>

    );

}

export default MyHotelsPage;