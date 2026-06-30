import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const role =
        localStorage.getItem("role");

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");

        navigate("/", { replace: true });

    };

    return (

        <nav
            className="navbar navbar-expand-lg"
            style={{
                backgroundColor: "#ffffff",
                borderBottom: "1px solid #e5e7eb",
                height: "80px"
            }}
        >

            <div className="container">

                <Link
                    to="/hotels"
                    className="navbar-brand fw-bold"
                    style={{
                        fontSize: "1.5rem",
                        color: "#111827"
                    }}
                >
                    HotelHub
                </Link>

                <div className="d-flex align-items-center gap-4">

                    {
                        role === "CUSTOMER" && (

                            <>

                                <Link
                                    to="/hotels"
                                    className="text-decoration-none"
                                    style={{
                                        color: "#6b7280",
                                        fontWeight: "500"
                                    }}
                                >
                                    Hotels
                                </Link>

                                <Link
                                    to="/my-bookings"
                                    className="text-decoration-none"
                                    style={{
                                        color: "#6b7280",
                                        fontWeight: "500"
                                    }}
                                >
                                    My Bookings
                                </Link>

                            </>

                        )
                    }

                    {
                        role === "HOTEL_ADMIN" && (

                            <>

                                <Link
                                    to="/my-hotels"
                                    className="text-decoration-none"
                                    style={{
                                        color: "#6b7280",
                                        fontWeight: "500"
                                    }}
                                >
                                    My Hotels
                                </Link>

                                <Link
                                    to="/create-hotel"
                                    className="text-decoration-none"
                                    style={{
                                        color: "#6b7280",
                                        fontWeight: "500"
                                    }}
                                >
                                    Create Hotel
                                </Link>

                            </>

                        )
                    }

                    <div
                        className="rounded-circle d-flex justify-content-center align-items-center"
                        style={{
                            width: "40px",
                            height: "40px",
                            backgroundColor: "#111827",
                            color: "white",
                            fontWeight: "bold"
                        }}
                    >
                        {
                            role === "HOTEL_ADMIN"
                                ? "A"
                                : "C"
                        }
                    </div>

                    <button
                        className="btn"
                        onClick={handleLogout}
                        style={{
                            backgroundColor: "#111827",
                            color: "white",
                            borderRadius: "12px",
                            padding: "8px 18px"
                        }}
                    >
                        Logout
                    </button>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;