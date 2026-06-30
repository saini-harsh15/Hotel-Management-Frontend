import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    getAllHotels,
    searchHotelsByCity
} from "../services/hotelService";
import Navbar from "../components/Navbar";

function HotelsPage() {

    const [hotels, setHotels] = useState([]);
    const [city, setCity] = useState("");
    const navigate = useNavigate();

    useEffect(() => {

        fetchHotels();

    }, []);

    const fetchHotels = async () => {

        try {

            const response =
                await getAllHotels();

            setHotels(
                response.data
            );

        } catch (error) {

            console.error(error);

        }

    };

    const handleSearch = async () => {

        try {

            if (city.trim() === "") {

                fetchHotels();
                return;

            }

            const response =
                await searchHotelsByCity(city);

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

            <div className="container mt-4">

                <div
                    className="p-5 mb-5 rounded-4 text-white"
                    style={{
                        background:
                            "linear-gradient(135deg,#0f172a,#1e293b)"
                    }}
                >

                    <h1 className="fw-bold">
                        Find Your Perfect Stay
                    </h1>

                    <p className="mb-0">
                        Discover hotels, book rooms and manage
                        reservations seamlessly.
                    </p>

                </div>

                <div className="card border-0 shadow-sm mb-5">

                    <div className="card-body p-4">

                        <div className="row g-3">

                            <div className="col-md-10">

                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    placeholder="Search hotels by city..."
                                    value={city}
                                    onChange={(e) =>
                                        setCity(
                                            e.target.value
                                        )
                                    }
                                    onKeyDown={(e) => {

                                        if (e.key === "Enter") {

                                            handleSearch();

                                        }

                                    }}
                                />

                            </div>

                            <div className="col-md-2">

                                <button
                                    className="btn btn-dark w-100 h-100"
                                    onClick={handleSearch}
                                >
                                    Search
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="row">

                    {
                        hotels.map(hotel => (

                            <div
                                key={hotel.id}
                                className="col-lg-4 col-md-6 mb-4"
                            >

                                <div
                                    className="card border-0 shadow-sm h-100"
                                    style={{
                                        borderRadius: "20px",
                                        overflow: "hidden",
                                        transition: "all 0.3s ease",
                                        cursor: "pointer"
                                    }}
                                >

                                    <img
                                        src="https://images.unsplash.com/photo-1566073771259-6a8506099945"
                                        alt="Hotel"
                                        style={{
                                            height: "220px",
                                            objectFit: "cover"
                                        }}
                                    />

                                    <div className="card-body">

                                        <div className="d-flex justify-content-between align-items-center">

                                            <h5 className="fw-bold mb-0">
                                                {hotel.name}
                                            </h5>

                                            <span className="badge bg-success">
                                                ⭐ {hotel.averageRating?.toFixed(1)}
                                            </span>

                                        </div>

                                        <p className="text-muted mt-2">
                                            📍 {hotel.city}
                                        </p>

                                        <hr />

                                        <button
                                            className="btn btn-dark w-100"
                                            style={{
                                                borderRadius: "12px"
                                            }}
                                            onClick={() =>
                                                navigate(
                                                    `/hotels/${hotel.id}`
                                                )
                                            }
                                        >
                                            View Details
                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))
                    }

                </div>

            </div>

        </>
    );

}

export default HotelsPage;