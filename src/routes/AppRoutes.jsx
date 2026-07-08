import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import HotelsPage from "../pages/HotelsPage";
import HotelDetailsPage from "../pages/HotelDetailsPage";
import CreateBookingPage from "../pages/CreateBookingPage";
import MyBookingsPage from "../pages/MyBookingsPage";
import RegisterPage
    from "../pages/RegisterPage";

import ProtectedRoute from "../components/ProtectedRoute";
import MyHotelsPage
    from "../pages/MyHotelsPage";
import CreateHotelPage
    from "../pages/CreateHotelPage";

import ManageHotelPage
    from "../pages/ManageHotelPage";

import RoomTypesPage
    from "../pages/RoomTypesPage";
import RoomsPage
    from "../pages/RoomsPage";
import HotelReviewsPage
    from "../pages/HotelReviewsPage";

import EditHotelPage from "../pages/EditHotelPage";
import HotelBookingsPage
    from "../pages/HotelBookingsPage";

import PendingHotelsPage from "../pages/PendingHotelsPage";

import SuperAdminDashboardPage from "../pages/SuperAdminDashboardPage";

import UserManagementPage
    from "../pages/UserManagementPage";

import AdminDashboardPage
    from "../pages/AdminDashboardPage";
function AppRoutes() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={
                        <LoginPage />}
                />

                <Route
                    path="/manage-hotel/:hotelId/bookings"
                    element={
                        <ProtectedRoute>
                            <HotelBookingsPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/eval"
                    element={
                        <ProtectedRoute>
                            <AdminDashboardPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/users"
                    element={
                        <ProtectedRoute>
                            <UserManagementPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/pending-hotels"
                    element={
                        <ProtectedRoute>
                            <PendingHotelsPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/dashboard"
                    element={<SuperAdminDashboardPage />}
                />

                <Route
                    path="/manage-hotel/:hotelId/reviews"
                    element={
                        <ProtectedRoute>
                            <HotelReviewsPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/my-bookings"
                    element={
                        <ProtectedRoute>
                            <MyBookingsPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/manage-hotel/:hotelId/edit"
                    element={
                        <ProtectedRoute>
                            <EditHotelPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/room-types/:roomTypeId/rooms"
                    element={
                        <ProtectedRoute>
                            <RoomsPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/manage-hotel/:hotelId/room-types"
                    element={
                        <ProtectedRoute>
                            <RoomTypesPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/manage-hotel/:hotelId"
                    element={
                        <ProtectedRoute>
                            <ManageHotelPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/create-hotel"
                    element={
                        <ProtectedRoute>
                            <CreateHotelPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/my-hotels"
                    element={
                        <ProtectedRoute>
                            <MyHotelsPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/register"
                    element={<RegisterPage />}
                />

                <Route
                    path="/hotels"
                    element={
                        <ProtectedRoute>
                            <HotelsPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/hotels/:hotelId"
                    element={
                        <ProtectedRoute>
                            <HotelDetailsPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/book-hotel/:hotelId"
                    element={
                        <ProtectedRoute>
                            <CreateBookingPage />
                        </ProtectedRoute>
                    }
                />


            </Routes>

        </BrowserRouter>

    );

}

export default AppRoutes;
