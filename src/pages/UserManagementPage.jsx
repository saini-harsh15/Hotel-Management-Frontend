import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import {
    getAllUsers,
    updateUserRole,
    updateUserStatus
} from "../services/adminUserService";

function UserManagementPage() {

    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(true);

    const [loadingUserId, setLoadingUserId] =
        useState(null);

    const [search, setSearch] =
        useState("");

    const [roleFilter, setRoleFilter] =
        useState("ALL");

    const fetchUsers = async () => {

        try {

            setLoading(true);

            const response =
                await getAllUsers();

            setUsers(response.data.data);

        }

        catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to load users."
            );

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchUsers();

    }, []);
    const filteredUsers =
        useMemo(() => {

            return users.filter(user => {

                const matchesSearch =
                    `${user.firstName} ${user.lastName}`
                        .toLowerCase()
                        .includes(
                            search.toLowerCase()
                        );

                const matchesRole =
                    roleFilter === "ALL"
                    || user.role === roleFilter;

                return matchesSearch &&
                    matchesRole;

            });

        }, [users, search, roleFilter]);
    const getRoleBadge = (role) => {

        switch (role) {

            case "SUPER_ADMIN":
                return "bg-danger";

            case "HOTEL_ADMIN":
                return "bg-primary";

            default:
                return "bg-secondary";

        }

    };

    const getStatusBadge = (status) => {

        switch (status) {

            case "ACTIVE":
                return "bg-success";

            case "BLOCKED":
                return "bg-danger";

            default:
                return "bg-warning text-dark";

        }

    };
    const changeRole = async (
        userId,
        role
    ) => {

        try {

            setLoadingUserId(userId);

            await updateUserRole(
                userId,
                role
            );

            fetchUsers();

        }

        catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed."
            );

        }

        finally {

            setLoadingUserId(null);

        }

    };

    const changeStatus = async (
        userId,
        status
    ) => {

        try {

            setLoadingUserId(userId);

            await updateUserStatus(
                userId,
                status
            );

            fetchUsers();

        }

        catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed."
            );

        }

        finally {

            setLoadingUserId(null);

        }

    };
    return (

        <>

            <Navbar />

            <div className="container mt-5">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <div>

                        <h2 className="fw-bold">
                            👥 User Management
                        </h2>

                        <p className="text-muted mb-0">
                            Manage platform users, roles and account status.
                        </p>

                    </div>

                </div>

                <div className="card shadow-sm border-0 mb-4">

                    <div className="card-body">

                        <div className="row g-3">

                            <div className="col-md-8">

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search users..."
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(
                                            e.target.value
                                        )
                                    }
                                />

                            </div>

                            <div className="col-md-4">

                                <select
                                    className="form-select"
                                    value={roleFilter}
                                    onChange={(e) =>
                                        setRoleFilter(
                                            e.target.value
                                        )
                                    }
                                >

                                    <option value="ALL">
                                        All Roles
                                    </option>

                                    <option value="CUSTOMER">
                                        Customer
                                    </option>

                                    <option value="HOTEL_ADMIN">
                                        Hotel Admin
                                    </option>

                                    <option value="SUPER_ADMIN">
                                        Super Admin
                                    </option>

                                </select>

                            </div>

                        </div>

                    </div>

                </div>

                {
                    loading ?

                        (

                            <div className="text-center mt-5">

                                <div
                                    className="spinner-border"
                                    role="status"
                                >
                                </div>

                                <p className="mt-3">
                                    Loading users...
                                </p>

                            </div>

                        )

                        :

                        filteredUsers.length === 0 ?

                            (

                                <div className="text-center mt-5">

                                    <h1>
                                        👤
                                    </h1>

                                    <h3>
                                        No Users Found
                                    </h3>

                                    <p className="text-muted">
                                        Try changing your search
                                        or filter.
                                    </p>

                                </div>

                            )

                            :

                            (

                                <div className="row g-4">

                                    {
                                        filteredUsers.map((user) => (

                                            <div
                                                key={user.id}
                                                className="col-lg-6"
                                            >

                                                <div
                                                    className="card shadow-sm border-0 h-100"
                                                    style={{
                                                        transition: "0.25s"
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.transform =
                                                            "translateY(-5px)";
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.transform =
                                                            "translateY(0)";
                                                    }}
                                                >

                                                    <div className="card-body">

                                                        <div className="d-flex justify-content-between">

                                                            <div>

                                                                <h4 className="fw-bold mb-1">
                                                                    {`${user.firstName} ${user.lastName}`}
                                                                </h4>

                                                                <p className="text-muted mb-1">
                                                                    📧 {user.email}
                                                                </p>

                                                                <p className="text-muted mb-0">
                                                                    📱 {user.phoneNumber}
                                                                </p>

                                                            </div>

                                                            <div className="text-end">

                                                                <span
                                                                    className={`badge ${getRoleBadge(user.role)}`}
                                                                >
                                                                    {user.role}
                                                                </span>

                                                                <br />

                                                                <span
                                                                    className={`badge mt-2 ${getStatusBadge(user.status)}`}
                                                                >
                                                                    {user.status}
                                                                </span>

                                                            </div>

                                                        </div>

                                                        <hr />

                                                        <div className="row">

                                                            <div className="col-md-6 mb-3">

                                                                <label className="form-label fw-semibold">
                                                                    Role
                                                                </label>

                                                                <select
                                                                    className="form-select"
                                                                    value={user.role}
                                                                    disabled={
                                                                        user.role === "SUPER_ADMIN" ||
                                                                        loadingUserId === user.id
                                                                    }
                                                                    onChange={(e) =>
                                                                        changeRole(
                                                                            user.id,
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                >

                                                                    <option value="CUSTOMER">
                                                                        CUSTOMER
                                                                    </option>

                                                                    <option value="HOTEL_ADMIN">
                                                                        HOTEL_ADMIN
                                                                    </option>

                                                                </select>

                                                            </div>

                                                            <div className="col-md-6 mb-3">

                                                                <label className="form-label fw-semibold">
                                                                    Status
                                                                </label>

                                                                <select
                                                                    className="form-select"
                                                                    value={user.status}
                                                                    disabled={
                                                                        user.role === "SUPER_ADMIN" ||
                                                                        loadingUserId === user.id
                                                                    }
                                                                    onChange={(e) =>
                                                                        changeStatus(
                                                                            user.id,
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                >

                                                                    <option value="ACTIVE">
                                                                        ACTIVE
                                                                    </option>

                                                                    <option value="BLOCKED">
                                                                        BLOCKED
                                                                    </option>

                                                                </select>

                                                            </div>

                                                        </div>

                                                        <div className="d-flex justify-content-between align-items-center">

                                                            <small className="text-muted">

                                                                Joined{" "}

                                                                {
                                                                    new Date(
                                                                        user.createdAt
                                                                    ).toLocaleDateString()
                                                                }

                                                            </small>

                                                            {
                                                                loadingUserId === user.id &&

                                                                <div
                                                                    className="spinner-border spinner-border-sm"
                                                                    role="status"
                                                                >
                                                                </div>
                                                            }

                                                        </div>

                                                    </div>

                                                </div>

                                            </div>

                                        ))
                                    }

                                </div>

                            )

                }

            </div>

        </>

    );
}

export default UserManagementPage;