import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    getHotelById,
    updateHotel
} from "../services/hotelService";
import Navbar from "../components/Navbar";


function EditHotelPage() {

    const navigate = useNavigate();
    const { hotelId } = useParams();

    const [name, setName] =
        useState("");

    const [description, setDescription] =
        useState("");

    const [addressLine1, setAddressLine1] =
        useState("");

    const [addressLine2, setAddressLine2] =
        useState("");

    const [city, setCity] =
        useState("");

    const [state, setState] =
        useState("");

    const [country, setCountry] =
        useState("");

    const [postalCode, setPostalCode] =
        useState("");

    const [contactNumber, setContactNumber] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [checkInTime, setCheckInTime] =
        useState("");

    const [checkOutTime, setCheckOutTime] =
        useState("");

    useEffect(() => {

        fetchHotel();

    }, []);

    const fetchHotel =
        async () => {

            try {

                const response =
                    await getHotelById(
                        hotelId
                    );

                const hotel =
                    response.data;

                setName(hotel.name);
                setDescription(hotel.description);
                setAddressLine1(hotel.addressLine1);
                setAddressLine2(hotel.addressLine2);
                setCity(hotel.city);
                setState(hotel.state);
                setCountry(hotel.country);
                setPostalCode(hotel.postalCode);
                setContactNumber(hotel.contactNumber);
                setEmail(hotel.email);
                setCheckInTime(hotel.checkInTime);
                setCheckOutTime(hotel.checkOutTime);

            }

            catch (error) {

                console.error(error);

            }

        };

    const handleUpdateHotel =
        async () => {

            try {

                const hotelData = {

                    name,

                    description,

                    addressLine1,

                    addressLine2,

                    city,

                    state,

                    country,

                    postalCode,

                    contactNumber,

                    email,

                    checkInTime,

                    checkOutTime

                };

                await updateHotel(
                    hotelId,
                    hotelData
                );

                alert("Hotel updated successfully.");

                navigate(
                    "/my-hotels",
                    {
                        replace: true
                    }
                );

            }

            catch (error) {

                console.error(error);

                alert(
                    error.response?.data?.message ||
                    "Failed to update hotel."
                );

            }

        };

    return (

        <>
            <Navbar />

            <div className="container mt-5 mb-5">

                <div
                    className="card border-0 shadow"
                    style={{
                        borderRadius: "20px"
                    }}
                >

                    <div className="card-body p-5">

                        <h2 className="fw-bold mb-2">
                            Edit Hotel
                        </h2>

                        <p className="text-muted mb-5">
                            Update your hotel information.
                        </p>

                        <h4 className="mb-3">
                            Hotel Information
                        </h4>

                        <div className="mb-3">

                            <label className="form-label">
                                Hotel Name
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(e) =>
                                    setName(e.target.value)
                                }
                            />

                        </div>

                        <div className="mb-4">

                            <label className="form-label">
                                Description
                            </label>

                            <textarea
                                className="form-control"
                                rows="4"
                                value={description}
                                onChange={(e) =>
                                    setDescription(e.target.value)
                                }
                            />

                        </div>

                        <hr className="my-5" />

                        <h4 className="mb-3">
                            Location
                        </h4>

                        <div className="mb-3">

                            <label className="form-label">
                                Address Line 1
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                value={addressLine1}
                                onChange={(e) =>
                                    setAddressLine1(e.target.value)
                                }
                            />

                        </div>

                        <div className="mb-3">

                            <label className="form-label">
                                Address Line 2
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                value={addressLine2}
                                onChange={(e) =>
                                    setAddressLine2(e.target.value)
                                }
                            />

                        </div>

                        <div className="row">

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    City
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    value={city}
                                    onChange={(e) =>
                                        setCity(e.target.value)
                                    }
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    State
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    value={state}
                                    onChange={(e) =>
                                        setState(e.target.value)
                                    }
                                />

                            </div>

                        </div>

                        <div className="row">

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Country
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    value={country}
                                    onChange={(e) =>
                                        setCountry(e.target.value)
                                    }
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Postal Code
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    value={postalCode}
                                    onChange={(e) =>
                                        setPostalCode(e.target.value)
                                    }
                                />

                            </div>

                        </div>

                        <hr className="my-5" />

                        <h4 className="mb-3">
                            Contact Information
                        </h4>

                        <div className="row">

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Contact Number
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    value={contactNumber}
                                    onChange={(e) =>
                                        setContactNumber(e.target.value)
                                    }
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                />

                            </div>

                        </div>

                        <hr className="my-5" />

                        <h4 className="mb-3">
                            Check-In / Check-Out
                        </h4>

                        <div className="row">

                            <div className="col-md-6 mb-4">

                                <label className="form-label">
                                    Check In Time
                                </label>

                                <input
                                    type="time"
                                    className="form-control"
                                    value={checkInTime}
                                    onChange={(e) =>
                                        setCheckInTime(e.target.value)
                                    }
                                />

                            </div>

                            <div className="col-md-6 mb-4">

                                <label className="form-label">
                                    Check Out Time
                                </label>

                                <input
                                    type="time"
                                    className="form-control"
                                    value={checkOutTime}
                                    onChange={(e) =>
                                        setCheckOutTime(e.target.value)
                                    }
                                />

                            </div>

                        </div>

                        <button
                            className="btn btn-dark btn-lg"
                            onClick={handleUpdateHotel}
                        >
                            Update Hotel
                        </button>

                    </div>

                </div>

            </div>

        </>

    );

}

export default EditHotelPage;