import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getDashboard } from "../services/adminDashboardService";

function AdminDashboardPage() {
    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchDashboard = async () => {
        try {
            const response = await getDashboard();
            setDashboard(response.data.data);
        } catch (error) {
            console.error(error);
            alert("Failed to load dashboard.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboard();
    }, []);

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="container text-center mt-5">
                    <div className="spinner-border" role="status" />
                    <p className="mt-3">Loading dashboard...</p>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />

            <div className="container mt-5 mb-5">
                <div className="mb-5">
                    <h2 className="fw-bold">📊 Platform Analytics</h2>
                    <p className="text-muted">
                        Real-time overview of your Hotel Reservation & Management Platform.
                    </p>
                </div>

                {/* The global grid row wrapper */}
                <div className="row g-4">

                    {/* Hotels Card */}
                    <div className="col-lg-4 col-md-6">
                        <div className="card shadow-sm border-0 h-100">
                            <div className="card-body">
                                <h4 className="fw-bold">🏨 Hotels</h4>
                                <hr />
                                <p>Total Hotels
                                    <span className="float-end fw-bold">{dashboard?.totalHotels}</span>
                                </p>
                                <p>Approved
                                    <span className="float-end text-success fw-bold">{dashboard?.approvedHotels}</span>
                                </p>
                                <p>Pending
                                    <span className="float-end text-warning fw-bold">{dashboard?.pendingHotels}</span>
                                </p>
                                <p className="mb-0">Rejected
                                    <span className="float-end text-danger fw-bold">{dashboard?.rejectedHotels}</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Users Card */}
                    <div className="col-lg-4 col-md-6">
                        <div className="card shadow-sm border-0 h-100">
                            <div className="card-body">
                                <h4 className="fw-bold">👥 Users</h4>
                                <hr />
                                <p>Total Users
                                    <span className="float-end fw-bold">{dashboard?.totalUsers}</span>
                                </p>
                                <p>Customers
                                    <span className="float-end">{dashboard?.totalCustomers}</span>
                                </p>
                                <p>Hotel Admins
                                    <span className="float-end">{dashboard?.totalHotelAdmins}</span>
                                </p>
                                <p>Super Admins
                                    <span className="float-end">{dashboard?.totalSuperAdmins}</span>
                                </p>
                                <p>Active
                                    <span className="float-end text-success fw-bold">{dashboard?.activeUsers}</span>
                                </p>
                                <p className="mb-0">Blocked
                                    <span className="float-end text-danger fw-bold">{dashboard?.blockedUsers}</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Rooms Card */}
                    <div className="col-lg-4 col-md-6">
                        <div className="card shadow-sm border-0 h-100">
                            <div className="card-body">
                                <h4 className="fw-bold">🛏 Rooms</h4>
                                <hr />
                                <p>Total Rooms
                                    <span className="float-end fw-bold">{dashboard?.totalRooms}</span>
                                </p>
                                <p>Available
                                    <span className="float-end text-success">{dashboard?.availableRooms}</span>
                                </p>
                                <p>Occupied
                                    <span className="float-end text-primary">{dashboard?.occupiedRooms}</span>
                                </p>
                                <p>Maintenance
                                    <span className="float-end text-warning">{dashboard?.maintenanceRooms}</span>
                                </p>
                                <p className="mb-0">Inactive
                                    <span className="float-end text-secondary">{dashboard?.inactiveRooms}</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Bookings Card */}
                    <div className="col-lg-6 col-md-6">
                        <div className="card shadow-sm border-0 h-100">
                            <div className="card-body">
                                <h4 className="fw-bold">📅 Bookings</h4>
                                <hr />
                                <p>Total Bookings
                                    <span className="float-end fw-bold">{dashboard?.totalBookings}</span>
                                </p>
                                <p>Pending
                                    <span className="float-end text-warning">{dashboard?.pendingBookings}</span>
                                </p>
                                <p>Completed
                                    <span className="float-end text-success">{dashboard?.completedBookings}</span>
                                </p>
                                <p className="mb-0">Cancelled
                                    <span className="float-end text-danger">{dashboard?.cancelledBookings}</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Reviews Card */}
                    <div className="col-lg-6 col-md-12">
                        <div className="card shadow-sm border-0 h-100">
                            <div className="card-body">
                                <h4 className="fw-bold">⭐ Reviews</h4>
                                <hr />
                                <p>Total Reviews
                                    <span className="float-end fw-bold">{dashboard?.totalReviews}</span>
                                </p>
                                <p className="mb-0">Platform Rating
                                    <span className="float-end text-warning fw-bold">
                                        ⭐ {dashboard?.averagePlatformRating || "0.0"}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>

                </div> {/* End of row g-4 */}
            </div> {/* End of container */}
        </>
    );
}

export default AdminDashboardPage;