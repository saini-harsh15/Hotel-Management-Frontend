import { useState } from "react";
import { useNavigate, Link }
    from "react-router-dom";
import { register }
    from "../services/authService";

function RegisterPage() {

    const navigate = useNavigate();

    const [formData,
        setFormData] = useState({

            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            password: ""

        });

    const handleChange =
        (e) => {

            setFormData({

                ...formData,

                [e.target.name]:
                    e.target.value

            });

        };

    const handleRegister =
        async (e) => {

            e.preventDefault();

            try {

                await register(
                    formData
                );

                navigate("/");

            } catch (error) {

                console.error(error);

            }

        };

    return (

        <div
            className="container d-flex justify-content-center align-items-center"
            style={{
                minHeight: "100vh"
            }}
        >

            <div
                className="card shadow-lg border-0 p-4"
                style={{
                    width: "500px",
                    borderRadius: "20px"
                }}
            >

                <h2
                    className="text-center mb-4"
                >
                    Create Account
                </h2>

                <form
                    onSubmit={
                        handleRegister
                    }
                >

                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        className="form-control mb-3"
                        onChange={
                            handleChange
                        }
                    />

                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        className="form-control mb-3"
                        onChange={
                            handleChange
                        }
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="form-control mb-3"
                        onChange={
                            handleChange
                        }
                    />

                    <input
                        type="text"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        className="form-control mb-3"
                        onChange={
                            handleChange
                        }
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="form-control mb-4"
                        onChange={
                            handleChange
                        }
                    />

                    <button
                        type="submit"
                        className="btn btn-dark w-100"
                    >
                        Sign Up
                    </button>

                </form>

                <div
                    className="text-center mt-3"
                >

                    Already have an account?

                    <Link
                        to="/"
                        className="ms-2"
                    >
                        Login
                    </Link>

                </div>

            </div>

        </div>

    );

}

export default RegisterPage;