import { useEffect, useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function LoginPage() {

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    useEffect(() => {

        const token =
            localStorage.getItem("token");

        const role =
            localStorage.getItem("role");

        if (token) {

            if (role === "SUPER_ADMIN") {

                navigate(
                    "/admin/dashboard",
                    { replace: true }
                );

            }
            else if (role === "HOTEL_ADMIN") {

                navigate(
                    "/my-hotels",
                    { replace: true }
                );

            }
            else {

                navigate(
                    "/hotels",
                    { replace: true }
                );

            }

        }

    }, [navigate]);

    const handleLogin = async () => {

        try {

            const response =
                await login(
                    email,
                    password
                );

            console.log(response.data);

            localStorage.setItem(
                "token",
                response.data.token
            );

            localStorage.setItem(
                "role",
                response.data.role
            );

            if (response.data.role === "SUPER_ADMIN") {

                navigate(
                    "/admin/dashboard",
                    { replace: true }
                );

            }
            else if (response.data.role === "HOTEL_ADMIN") {

                navigate(
                    "/my-hotels",
                    { replace: true }
                );

            }
            else {

                navigate(
                    "/hotels",
                    { replace: true }
                );

            }

        }
        catch (error) {

            console.error(error);

            const message =
                error?.response?.data?.message
                || "Invalid email or password";

            alert(message);

        }

    };

    return (

        <div
            className="container-fluid vh-100 p-0"
            style={{
                backgroundColor: "#0f172a"
            }}
        >

            <div className="row g-0 h-100">

                <div
                    className="col-lg-7 d-none d-lg-flex flex-column justify-content-center px-5"
                    style={{
                        background:
                            "linear-gradient(135deg,#0f172a,#1e293b)"
                    }}
                >

                    <div
                        style={{
                            maxWidth: "600px",
                            marginLeft: "80px"
                        }}
                    >

                        <span
                            className="badge rounded-pill mb-4"
                            style={{
                                backgroundColor: "#1e293b",
                                color: "#cbd5e1",
                                padding: "10px 18px"
                            }}
                        >
                            Hotel Management Platform
                        </span>

                        <h1
                            className="fw-bold text-white"
                            style={{
                                fontSize: "4rem",
                                lineHeight: "1.1"
                            }}
                        >
                            Manage hotels,
                            bookings and guests
                            from one dashboard.
                        </h1>

                        <p
                            className="text-secondary mt-4"
                            style={{
                                fontSize: "1.2rem"
                            }}
                        >
                            A modern platform for hotel
                            operations, reservations,
                            payments and customer
                            management.
                        </p>

                    </div>

                </div>

                <div
                    className="col-lg-5 bg-white d-flex justify-content-center align-items-center"
                >

                    <div
                        style={{
                            width: "100%",
                            maxWidth: "420px"
                        }}
                    >

                        <div className="mb-5">

                            <h2
                                className="fw-bold"
                                style={{
                                    fontSize: "2rem"
                                }}
                            >
                                Welcome back
                            </h2>

                            <p className="text-secondary">
                                Sign in to your account
                            </p>

                        </div>

                        <div className="mb-3">

                            <label
                                className="form-label fw-medium"
                            >
                                Email
                            </label>

                            <input
                                type="email"
                                className="form-control form-control-lg"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) =>
                                    setEmail(
                                        e.target.value
                                    )
                                }
                                style={{
                                    borderRadius: "12px"
                                }}
                            />

                        </div>

                        <div className="mb-4">

                            <label
                                className="form-label fw-medium"
                            >
                                Password
                            </label>

                            <input
                                type="password"
                                className="form-control form-control-lg"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) =>
                                    setPassword(
                                        e.target.value
                                    )
                                }
                                style={{
                                    borderRadius: "12px"
                                }}
                            />

                        </div>

                        <button
                            className="btn btn-dark w-100 py-3"
                            style={{
                                borderRadius: "12px",
                                fontWeight: "600"
                            }}
                            onClick={handleLogin}
                        >
                            Log In
                        </button>

                        <div className="text-center mt-3">

                            Don't have an account?

                            <Link
                                to="/register"
                                className="ms-2"
                            >
                                Sign Up
                            </Link>

                        </div>
                        <div
                            className="text-center mt-5 text-secondary"
                        >
                            Hotel Management System
                            v1.0
                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default LoginPage;   