import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import {
    getAllUsers,
    updateUserRole,
    updateUserStatus
} from "../services/adminUserService";
import {
    Users,
    Mail,
    Phone,
    UserX,
    Search
} from "lucide-react";

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
                return "um-badge-super";

            case "HOTEL_ADMIN":
                return "um-badge-admin";

            default:
                return "um-badge-customer";

        }

    };

    const getStatusBadge = (status) => {

        switch (status) {

            case "ACTIVE":
                return "um-badge-active";

            case "BLOCKED":
                return "um-badge-blocked";

            default:
                return "um-badge-pending";

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

        <div className="um-root">

            <Navbar />

            <div className="um-hero">
                <div className="um-hero-bg" aria-hidden="true">
                    <div className="um-blob um-blob-a" />
                    <div className="um-blob um-blob-b" />
                </div>
                <div className="container um-hero-inner">

                    <span className="um-badge-tag">
                        <Users size={14} strokeWidth={2.4} /> Platform Control
                    </span>
                    <h2 className="um-title">User Management</h2>
                    <p className="um-subtext">
                        Manage platform users, roles and account status.
                    </p>

                </div>
            </div>

            <div className="container um-container">

                <div className="um-filter-card">

                    <div className="um-filter-row">

                        <div className="um-search-wrap">

                            <Search size={17} strokeWidth={2.2} className="um-search-icon" />

                            <input
                                type="text"
                                className="um-input um-search-input"
                                placeholder="Search users..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                        <div className="um-select-shell">

                            <select
                                className="um-select-custom"
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

                {
                    loading ?

                        (

                            <div className="um-state-wrap">

                                <div className="um-spinner" />

                                <p className="um-state-text">
                                    Loading users...
                                </p>

                            </div>

                        )

                        :

                        filteredUsers.length === 0 ?

                            (

                                <div className="um-state-wrap">

                                    <UserX size={44} strokeWidth={1.8} className="um-state-icon" />

                                    <h3 className="um-state-title">
                                        No Users Found
                                    </h3>

                                    <p className="um-state-text">
                                        Try changing your search
                                        or filter.
                                    </p>

                                </div>

                            )

                            :

                            (

                                <div className="um-grid">

                                    {
                                        filteredUsers.map((user) => (

                                            <div
                                                key={user.id}
                                                className="um-card"
                                            >

                                                <div className="um-card-top">

                                                    <div>

                                                        <h4 className="um-user-name">
                                                            {`${user.firstName} ${user.lastName}`}
                                                        </h4>

                                                        <p className="um-user-meta">
                                                            <Mail size={13} strokeWidth={2.2} /> {user.email}
                                                        </p>

                                                        <p className="um-user-meta">
                                                            <Phone size={13} strokeWidth={2.2} /> {user.phoneNumber}
                                                        </p>

                                                    </div>

                                                    <div className="um-badges-col">

                                                        <span
                                                            className={`um-badge ${getRoleBadge(user.role)}`}
                                                        >
                                                            {user.role}
                                                        </span>

                                                        <span
                                                            className={`um-badge ${getStatusBadge(user.status)}`}
                                                        >
                                                            {user.status}
                                                        </span>

                                                    </div>

                                                </div>

                                                <div className="um-divider" />

                                                <div className="um-fields-row">

                                                    <div className="um-field">

                                                        <label className="um-label">
                                                            Role
                                                        </label>

                                                        <div
                                                            className={`um-select-shell um-select-shell-sm ${user.role === "HOTEL_ADMIN"
                                                                    ? "um-shell-violet"
                                                                    : "um-shell-muted"
                                                                }`}
                                                        >

                                                            <select
                                                                className="um-select-custom"
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

                                                    </div>

                                                    <div className="um-field">

                                                        <label className="um-label">
                                                            Status
                                                        </label>

                                                        <div
                                                            className={`um-select-shell um-select-shell-sm ${user.status === "ACTIVE"
                                                                    ? "um-shell-teal"
                                                                    : "um-shell-rose"
                                                                }`}
                                                        >

                                                            <select
                                                                className="um-select-custom"
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

                                                </div>

                                                <div className="um-card-footer">

                                                    <small className="um-joined">

                                                        Joined{" "}

                                                        {
                                                            new Date(
                                                                user.createdAt
                                                            ).toLocaleDateString()
                                                        }

                                                    </small>

                                                    {
                                                        loadingUserId === user.id &&

                                                        <div className="um-spinner um-spinner-sm" />
                                                    }

                                                </div>

                                            </div>

                                        ))
                                    }

                                </div>

                            )

                }

            </div>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');

                .um-root {
                    --violet: #6D5BD0;
                    --violet-deep: #4A3AA8;
                    --teal: #23C4A8;
                    --amber: #D9A441;
                    --rose: #C24F5C;
                    --ink: #1B1B23;
                    --ink-soft: #5B5A66;
                    --muted: #8B8A97;
                    --line: #E9E8F0;
                    --cream: #FCFBFF;
                    min-height: 100vh;
                    background: var(--cream);
                    font-family: 'Inter', system-ui, sans-serif;
                }

                /* HERO */
                .um-hero {
                    position: relative;
                    overflow: hidden;
                    background: linear-gradient(150deg, var(--violet-deep) 0%, var(--violet) 45%, #3E8FBD 78%, var(--teal) 100%);
                    padding-bottom: 2.4rem;
                }

                .um-hero-bg {
                    position: absolute;
                    inset: 0;
                    overflow: hidden;
                }

                .um-blob {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(60px);
                    opacity: 0.5;
                }

                .um-blob-a {
                    width: 320px; height: 320px;
                    top: -140px; left: -80px;
                    background: radial-gradient(circle, rgba(255,255,255,0.35), transparent 70%);
                }

                .um-blob-b {
                    width: 280px; height: 280px;
                    bottom: -160px; right: -60px;
                    background: radial-gradient(circle, rgba(35,196,168,0.5), transparent 70%);
                }

                .um-hero-inner {
                    position: relative;
                    z-index: 1;
                    padding-top: 2.8rem;
                    color: #FFFFFF;
                    animation: um-rise 0.6s cubic-bezier(.22,1,.36,1) both;
                }

                .um-badge-tag {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.35rem;
                    background: rgba(255,255,255,0.14);
                    backdrop-filter: blur(6px);
                    border: 1px solid rgba(255,255,255,0.2);
                    font-size: 0.76rem;
                    font-weight: 600;
                    padding: 0.4rem 0.9rem;
                    border-radius: 999px;
                    margin-bottom: 1rem;
                }

                .um-title {
                    font-family: 'Space Grotesk', sans-serif;
                    font-weight: 700;
                    font-size: 2.1rem;
                    margin: 0 0 0.4rem;
                    text-shadow: 0 2px 20px rgba(0,0,0,0.15);
                }

                .um-subtext {
                    font-size: 0.98rem;
                    color: rgba(255,255,255,0.82);
                    margin: 0;
                    max-width: 480px;
                }

                @keyframes um-rise {
                    from { opacity: 0; transform: translateY(12px); }
                    to   { opacity: 1; transform: translateY(0); }
                }

                /* Container */
                .um-container { padding: 2.4rem 1rem 4rem; }

                /* Filter card */
                .um-filter-card {
                    max-width: 900px;
                    margin: -1.8rem auto 2rem;
                    position: relative;
                    z-index: 1;
                    background: #FFFFFF;
                    border-radius: 16px;
                    padding: 1.3rem 1.5rem;
                    box-shadow: 0 24px 50px -24px rgba(30,20,70,0.32);
                    border: 1px solid var(--line);
                }

                .um-filter-row {
                    display: grid;
                    grid-template-columns: 2fr 1fr;
                    gap: 1rem;
                }

                .um-search-wrap {
                    position: relative;
                    display: flex;
                    align-items: center;
                }

                .um-search-icon {
                    position: absolute;
                    left: 0.85rem;
                    color: var(--muted);
                    pointer-events: none;
                }

                .um-search-input {
                    padding-left: 2.5rem !important;
                }

                .um-input {
                    width: 100%;
                    border: 1.5px solid var(--line);
                    background: #FFFFFF;
                    border-radius: 11px;
                    padding: 0.65rem 0.85rem;
                    font-size: 0.92rem;
                    color: var(--ink);
                    font-family: 'Inter', sans-serif;
                    transition: border-color 0.15s ease, box-shadow 0.15s ease;
                }

                .um-input:focus {
                    outline: none;
                    border-color: var(--violet);
                    box-shadow: 0 0 0 4px rgba(109, 91, 208, 0.15);
                }

                .um-select { cursor: pointer; }

                /* Custom select shells */
                .um-select-shell {
                    position: relative;
                    display: flex;
                    align-items: center;
                    border-radius: 11px;
                    background: #FFFFFF;
                    border: 1.5px solid var(--line);
                    transition: border-color 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
                }

                .um-select-shell:focus-within {
                    border-color: var(--violet);
                    box-shadow: 0 0 0 4px rgba(109, 91, 208, 0.15);
                }

                .um-select-shell::after {
                    content: "";
                    position: absolute;
                    right: 0.9rem;
                    top: 50%;
                    width: 9px;
                    height: 9px;
                    border-right: 2px solid currentColor;
                    border-bottom: 2px solid currentColor;
                    transform: translateY(-70%) rotate(45deg);
                    pointer-events: none;
                    opacity: 0.55;
                }

                .um-select-custom {
                    appearance: none;
                    -webkit-appearance: none;
                    width: 100%;
                    border: none;
                    background: transparent;
                    padding: 0.65rem 2.2rem 0.65rem 0.9rem;
                    font-size: 0.92rem;
                    font-weight: 600;
                    color: inherit;
                    font-family: 'Inter', sans-serif;
                    cursor: pointer;
                }

                .um-select-custom:disabled {
                    cursor: not-allowed;
                    opacity: 0.6;
                }

                .um-select-custom:focus {
                    outline: none;
                }

                .um-select-shell-sm .um-select-custom {
                    padding: 0.55rem 2rem 0.55rem 0.8rem;
                    font-size: 0.84rem;
                }

                /* Filter select (top of page) */
                .um-filter-row .um-select-shell {
                    color: var(--ink);
                }

                /* Colored variants for role/status shells */
                .um-shell-violet {
                    background: rgba(109, 91, 208, 0.08);
                    border-color: rgba(109, 91, 208, 0.35);
                    color: var(--violet-deep);
                }

                .um-shell-muted {
                    background: rgba(139, 138, 151, 0.08);
                    border-color: var(--line);
                    color: var(--ink-soft);
                }

                .um-shell-teal {
                    background: rgba(35, 196, 168, 0.1);
                    border-color: rgba(35, 196, 168, 0.4);
                    color: #1B8F76;
                }

                .um-shell-rose {
                    background: rgba(194, 79, 92, 0.08);
                    border-color: rgba(194, 79, 92, 0.35);
                    color: var(--rose);
                }

                /* States (loading / empty) */
                .um-state-wrap {
                    text-align: center;
                    padding: 3.5rem 1rem;
                }

                .um-state-icon {
                    color: var(--muted);
                    margin-bottom: 0.8rem;
                }

                .um-state-title {
                    font-family: 'Space Grotesk', sans-serif;
                    font-weight: 700;
                    font-size: 1.3rem;
                    color: var(--ink);
                    margin: 0 0 0.4rem;
                }

                .um-state-text {
                    color: var(--ink-soft);
                    font-size: 0.94rem;
                    margin: 0;
                }

                .um-spinner {
                    width: 34px;
                    height: 34px;
                    border-radius: 50%;
                    border: 3px solid var(--line);
                    border-top-color: var(--violet);
                    margin: 0 auto;
                    animation: um-spin 0.7s linear infinite;
                }

                .um-spinner-sm {
                    width: 18px;
                    height: 18px;
                    border-width: 2.5px;
                    margin: 0;
                }

                @keyframes um-spin {
                    to { transform: rotate(360deg); }
                }

                /* Grid / Cards */
                .um-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1.4rem;
                }

                .um-card {
                    background: #FFFFFF;
                    border-radius: 18px;
                    padding: 1.7rem 1.8rem;
                    box-shadow: 0 20px 44px -26px rgba(30,20,70,0.28);
                    border: 1px solid var(--line);
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                }

                .um-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 28px 54px -22px rgba(30,20,70,0.34);
                }

                .um-card-top {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    gap: 1rem;
                }

                .um-user-name {
                    font-family: 'Space Grotesk', sans-serif;
                    font-weight: 700;
                    font-size: 1.15rem;
                    color: var(--ink);
                    margin: 0 0 0.4rem;
                }

                .um-user-meta {
                    display: flex;
                    align-items: center;
                    gap: 0.4rem;
                    color: var(--ink-soft);
                    font-size: 0.86rem;
                    margin: 0 0 0.3rem;
                }

                .um-user-meta svg {
                    color: var(--muted);
                    flex-shrink: 0;
                }

                .um-badges-col {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    gap: 0.5rem;
                }

                .um-badge {
                    display: inline-block;
                    font-size: 0.72rem;
                    font-weight: 700;
                    letter-spacing: 0.02em;
                    padding: 0.36rem 0.8rem;
                    border-radius: 999px;
                    color: #FFFFFF;
                    white-space: nowrap;
                }

                .um-badge-super { background: var(--rose); }
                .um-badge-admin { background: var(--violet); }
                .um-badge-customer { background: var(--muted); }

                .um-badge-active { background: var(--teal); }
                .um-badge-blocked { background: var(--rose); }
                .um-badge-pending { background: var(--amber); color: var(--ink); }

                .um-divider {
                    height: 1px;
                    background: var(--line);
                    margin: 1.2rem 0;
                }

                .um-fields-row {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1rem;
                    margin-bottom: 1.2rem;
                }

                .um-field { display: flex; flex-direction: column; }

                .um-label {
                    font-size: 0.78rem;
                    font-weight: 600;
                    color: var(--ink-soft);
                    margin-bottom: 0.35rem;
                }

                .um-card-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .um-joined {
                    color: var(--muted);
                    font-size: 0.82rem;
                }

                @media (max-width: 900px) {
                    .um-grid { grid-template-columns: 1fr; }
                    .um-filter-row { grid-template-columns: 1fr; }
                }

                @media (max-width: 700px) {
                    .um-title { font-size: 1.8rem; }
                    .um-fields-row { grid-template-columns: 1fr; }
                    .um-card { padding: 1.4rem 1.3rem; }
                }
            `}</style>

        </div>

    );
}

export default UserManagementPage;