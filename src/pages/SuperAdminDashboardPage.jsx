import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function SuperAdminDashboardPage() {

    const navigate = useNavigate();

    return (

        <>

            <Navbar />

            <div className="container mt-5">

                <div className="mb-5">

                    <h2 className="fw-bold">
                        👑 Super Admin Dashboard
                    </h2>

                    <p className="text-muted">
                        Manage hotels, users, and monitor the entire platform.
                    </p>

                </div>

                <div className="row g-4">

                    {/* Pending Hotels */}

                    <div className="col-lg-4 col-md-6">

                        <div
                            className="card shadow-sm border-0 h-100"
                            style={{
                                cursor: "pointer",
                                transition: "0.25s"
                            }}
                            onClick={() =>
                                navigate("/admin/pending-hotels")
                            }
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-5px)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                            }}
                        >

                            <div className="card-body text-center p-4">

                                <div
                                    className="mb-3"
                                    style={{ fontSize: "3rem" }}
                                >
                                    🏨
                                </div>

                                <h4 className="fw-bold">
                                    Pending Hotels
                                </h4>

                                <p className="text-muted mb-4">
                                    Review newly submitted hotels and
                                    approve or reject them.
                                </p>

                                <button className="btn btn-dark">
                                    Open Module
                                </button>

                            </div>

                        </div>

                    </div>

                    {/* User Management */}

                    <div className="col-lg-4 col-md-6">

                        <div
                            className="card shadow-sm border-0 h-100"
                            style={{
                                cursor: "pointer",
                                transition: "0.25s"
                            }}
                            onClick={() =>
                                navigate("/admin/users")
                            }
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-5px)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                            }}
                        >

                            <div className="card-body text-center p-4">

                                <div
                                    className="mb-3"
                                    style={{ fontSize: "3rem" }}
                                >
                                    👥
                                </div>

                                <h4 className="fw-bold">
                                    User Management
                                </h4>

                                <p className="text-muted mb-4">
                                    View users, promote hotel admins,
                                    block accounts and manage roles.
                                </p>

                                <button className="btn btn-dark">
                                    Open Module
                                </button>

                            </div>

                        </div>

                    </div>

                    {/* Analytics */}

                    {/* Analytics */}

                    <div className="col-lg-4 col-md-6">

                        <div
                            className="card shadow-sm border-0 h-100"
                            style={{
                                cursor: "pointer",
                                transition: "0.25s"
                            }}
                            onClick={() =>
                                navigate("/admin/analytics")
                            }
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "translateY(-5px)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                            }}
                        >

                            <div className="card-body text-center p-4">

                                <div
                                    className="mb-3"
                                    style={{ fontSize: "3rem" }}
                                >
                                    📊
                                </div>

                                <h4 className="fw-bold">
                                    Platform Analytics
                                </h4>

                                <p className="text-muted mb-4">
                                    View platform statistics, booking trends,
                                    room occupancy and user insights.
                                </p>

                                <button className="btn btn-dark">
                                    Open Module
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </>

    );

}

export default SuperAdminDashboardPage;