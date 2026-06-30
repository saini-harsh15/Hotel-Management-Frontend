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
                    path="/my-bookings"
                    element={
                        <ProtectedRoute>
                            <MyBookingsPage />
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