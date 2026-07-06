import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Navbar() {

    const navigate = useNavigate();

    const role =
        localStorage.getItem("role");

    const handleLogout = async () => {

        const result = await Swal.fire({
            title: "Log out?",
            text: "You'll need to sign in again to continue.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, log out",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#6D5BD0",
            cancelButtonColor: "#8B8A97",
            reverseButtons: true
        });

        if (!result.isConfirmed) {

            return;

        }

        localStorage.removeItem("token");
        localStorage.removeItem("role");

        await Swal.fire({
            icon: "success",
            title: "Logged out",
            timer: 1200,
            showConfirmButton: false
        });

        navigate("/", { replace: true });

    };

    return (

        <nav className="nb-navbar">

            <div className="container nb-inner">

                <Link
                    to="/hotels"
                    className="nb-brand"
                >
                    HotelHub
                </Link>

                <div className="nb-links">

                    {
                        role === "CUSTOMER" && (

                            <>

                                <Link
                                    to="/hotels"
                                    className="nb-link"
                                >
                                    Hotels
                                </Link>

                                <Link
                                    to="/my-bookings"
                                    className="nb-link"
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
                                    className="nb-link"
                                >
                                    My Hotels
                                </Link>

                                <Link
                                    to="/create-hotel"
                                    className="nb-link"
                                >
                                    Create Hotel
                                </Link>

                            </>

                        )
                    }

                    <div className="nb-avatar">
                        {
                            role === "HOTEL_ADMIN"
                                ? "A"
                                : "C"
                        }
                    </div>

                    <button
                        className="nb-logout-btn"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>

            </div>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');

                .nb-navbar {
                    --violet: #6D5BD0;
                    --violet-deep: #4A3AA8;
                    --teal: #23C4A8;
                    --ink: #1B1B23;
                    --ink-soft: #5B5A66;
                    --muted: #8B8A97;
                    --line: #E9E8F0;
                    background: #FFFFFF;
                    border-bottom: 1px solid var(--line);
                    height: 80px;
                    display: flex;
                    align-items: center;
                    font-family: 'Inter', system-ui, sans-serif;
                }

                .nb-inner {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .nb-brand {
                    font-family: 'Space Grotesk', sans-serif;
                    font-weight: 700;
                    font-size: 1.5rem;
                    color: var(--ink);
                    text-decoration: none;
                    background: linear-gradient(120deg, var(--violet) 0%, var(--teal) 130%);
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .nb-links {
                    display: flex;
                    align-items: center;
                    gap: 1.8rem;
                }

                .nb-link {
                    color: var(--ink-soft);
                    font-weight: 600;
                    font-size: 0.94rem;
                    text-decoration: none;
                    transition: color 0.15s ease;
                }

                .nb-link:hover {
                    color: var(--violet-deep);
                }

                .nb-avatar {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: linear-gradient(135deg, var(--violet) 0%, var(--teal) 130%);
                    color: #FFFFFF;
                    font-weight: 700;
                    font-family: 'Space Grotesk', sans-serif;
                }

                .nb-logout-btn {
                    border: none;
                    border-radius: 12px;
                    padding: 0.55rem 1.2rem;
                    background: var(--ink);
                    color: #FFFFFF;
                    font-weight: 600;
                    font-size: 0.9rem;
                    cursor: pointer;
                    transition: filter 0.15s ease, transform 0.15s ease;
                }

                .nb-logout-btn:hover {
                    filter: brightness(1.15);
                    transform: translateY(-1px);
                }

                @media (max-width: 700px) {
                    .nb-links { gap: 1rem; }
                    .nb-link { display: none; }
                }
            `}</style>

        </nav>

    );

}

export default Navbar;