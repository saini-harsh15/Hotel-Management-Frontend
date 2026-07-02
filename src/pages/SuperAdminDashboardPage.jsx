import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function SuperAdminDashboardPage() {

    const navigate = useNavigate();

    return (

        <>

            <Navbar />

            <div className="container mt-5">

                <h2 className="fw-bold mb-4">
                    👑 Super Admin Dashboard
                </h2>

                <div className="row">

                    <div className="col-md-4 mb-4">

                        <div
                            className="card shadow h-100"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                                navigate("/admin/pending-hotels")
                            }
                        >

                            <div className="card-body text-center">

                                <h1>🏨</h1>

                                <h4>Pending Hotels</h4>

                                <p className="text-muted">
                                    Approve or reject newly submitted hotels.
                                </p>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-4 mb-4">

                        <div className="card shadow h-100">

                            <div className="card-body text-center">

                                <h1>👥</h1>

                                <h4>Users</h4>

                                <p className="text-muted">
                                    Coming Soon
                                </p>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-4 mb-4">

                        <div className="card shadow h-100">

                            <div className="card-body text-center">

                                <h1>📊</h1>

                                <h4>Analytics</h4>

                                <p className="text-muted">
                                    Coming Soon
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </>

    );

}

export default SuperAdminDashboardPage;