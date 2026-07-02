import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
    getPendingHotels,
    approveHotel,
    rejectHotel
} from "../services/adminHotelService";

function PendingHotelsPage() {

    const [hotels, setHotels] =
        useState([]);

    const [loadingHotelId, setLoadingHotelId] = useState(null);

    const fetchHotels =
        async () => {

            try {

                const response =
                    await getPendingHotels();

                setHotels(
                    response.data
                );

            }

            catch (error) {

                console.error(error);

            }

        };

    useEffect(() => {

        fetchHotels();

    }, []);

    const handleApprove = async (hotelId, hotelName) => {

        const confirmed = window.confirm(
            `Approve "${hotelName}"?`
        );

        if (!confirmed) {
            return;
        }

        try {

            setLoadingHotelId(hotelId);

            await approveHotel(hotelId);

            alert("Hotel approved successfully.");

            fetchHotels();

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to approve hotel."
            );

        } finally {

            setLoadingHotelId(null);

        }

    };

    const handleReject = async (hotelId, hotelName) => {

        const confirmed = window.confirm(
            `Reject "${hotelName}"?`
        );

        if (!confirmed) {
            return;
        }

        try {

            setLoadingHotelId(hotelId);

            await rejectHotel(hotelId);

            alert("Hotel rejected successfully.");

            fetchHotels();

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to reject hotel."
            );

        } finally {

            setLoadingHotelId(null);

        }

    };

    return (

        <>

            <Navbar />

            <div className="container py-5">

                <button
                    className="btn btn-outline-secondary mb-4"
                    onClick={() => window.history.back()}
                >
                    ← Back
                </button>

                <div className="mb-5">

                    <h1 className="fw-bold">
                        🏨 Pending Hotel Approvals
                    </h1>

                    <p className="text-muted fs-5">
                        {hotels.length} hotel(s) awaiting approval.
                    </p>

                </div>

                {

                    hotels.length === 0 ?

                        (

                            <div
                                className="card shadow-sm border-0 text-center p-5"
                            >

                                <div className="display-2">
                                    🎉
                                </div>

                                <h3 className="fw-bold mt-3">
                                    No Pending Hotels
                                </h3>

                                <p className="text-muted">
                                    All submitted hotels have already been reviewed.
                                </p>

                            </div>

                        )

                        :

                        (

                            <div className="row g-4">

                                {

                                    hotels.map(

                                        hotel => (

                                            <div
                                                key={hotel.id}
                                                className="col-lg-6"
                                            >

                                                <div
                                                    className="card border-0 shadow-sm h-100"
                                                    style={{
                                                        transition: "all .25s ease",
                                                        cursor: "pointer",
                                                        borderLeft: "6px solid #ffc107"
                                                    }}
                                                    onMouseEnter={(e) => {

                                                        e.currentTarget.style.transform =
                                                            "translateY(-6px)";

                                                        e.currentTarget.style.boxShadow =
                                                            "0 .8rem 1.5rem rgba(0,0,0,.15)";

                                                    }}
                                                    onMouseLeave={(e) => {

                                                        e.currentTarget.style.transform =
                                                            "translateY(0px)";

                                                        e.currentTarget.style.boxShadow =
                                                            "";

                                                    }}
                                                >

                                                    <div className="card-body p-4">

                                                        <div
                                                            className="d-flex justify-content-between align-items-start"
                                                        >

                                                            <div>

                                                                <h3 className="fw-bold mb-2">

                                                                    🏨 {hotel.name}

                                                                </h3>

                                                                <span
                                                                    className="badge bg-warning text-dark fs-6"
                                                                >
                                                                    {hotel.status}
                                                                </span>

                                                            </div>

                                                        </div>

                                                        <hr />

                                                        <div className="mb-2">

                                                            <strong>
                                                                📍 City
                                                            </strong>

                                                            <div className="text-muted">

                                                                {hotel.city}

                                                            </div>

                                                        </div>

                                                        <div className="mb-2">

                                                            <strong>
                                                                📧 Email
                                                            </strong>

                                                            <div className="text-muted">

                                                                {hotel.email}

                                                            </div>

                                                        </div>

                                                        <div className="mb-4">

                                                            <strong>
                                                                📞 Contact
                                                            </strong>

                                                            <div className="text-muted">

                                                                {hotel.contactNumber}

                                                            </div>

                                                        </div>

                                                        <div
                                                            className="d-grid gap-2"
                                                        >

                                                            <button

                                                                className="btn btn-success btn-lg"

                                                                disabled={
                                                                    loadingHotelId === hotel.id
                                                                }

                                                                onClick={() =>
                                                                    handleApprove(
                                                                        hotel.id,
                                                                        hotel.name
                                                                    )
                                                                }

                                                            >

                                                                {

                                                                    loadingHotelId === hotel.id

                                                                        ?

                                                                        "Approving..."

                                                                        :

                                                                        "✅ Approve Hotel"

                                                                }

                                                            </button>

                                                            <button

                                                                className="btn btn-outline-danger btn-lg"

                                                                disabled={
                                                                    loadingHotelId === hotel.id
                                                                }

                                                                onClick={() =>
                                                                    handleReject(
                                                                        hotel.id,
                                                                        hotel.name
                                                                    )
                                                                }

                                                            >

                                                                {

                                                                    loadingHotelId === hotel.id

                                                                        ?

                                                                        "Rejecting..."

                                                                        :

                                                                        "❌ Reject Hotel"

                                                                }

                                                            </button>

                                                        </div>

                                                    </div>

                                                </div>

                                            </div>

                                        )

                                    )

                                }

                            </div>

                        )

                }

            </div>

        </>

    );

}

export default PendingHotelsPage;