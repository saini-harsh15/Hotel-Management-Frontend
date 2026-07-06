import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getDashboard } from "../services/adminDashboardService";
import {
    LayoutDashboard,
    Building2,
    Users,
    CalendarCheck2,
    Star,
    ShieldCheck,
    TrendingUp,
    BedDouble,
    UserCheck,
    UserX
} from "lucide-react";

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

    // Safe percentage helper (no fabricated data — purely derived from existing fields)
    const pct = (num, denom) => {
        const n = Number(num) || 0;
        const d = Number(denom) || 0;
        if (d === 0) return 0;
        return Math.round((n / d) * 100);
    };

    if (loading) {
        return (
            <div className="ad-root">
                <Navbar />
                <div className="ad-loading">
                    <div className="ad-spinner" role="status" />
                    <p className="ad-loading-text">Loading dashboard…</p>
                </div>
                <style>{`
                    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');

                    .ad-root {
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

                    .ad-loading { text-align: center; padding: 6rem 1rem; }

                    .ad-spinner {
                        width: 28px;
                        height: 28px;
                        border: 3px solid var(--line);
                        border-top-color: var(--violet);
                        border-radius: 50%;
                        margin: 0 auto 1rem;
                        animation: ad-spin 0.8s linear infinite;
                    }

                    @keyframes ad-spin { to { transform: rotate(360deg); } }

                    .ad-loading-text { color: var(--muted); font-size: 0.9rem; }
                `}</style>
            </div>
        );
    }

    const hotelApprovedPct = pct(dashboard?.approvedHotels, dashboard?.totalHotels);
    const hotelPendingPct = pct(dashboard?.pendingHotels, dashboard?.totalHotels);
    const hotelRejectedPct = pct(dashboard?.rejectedHotels, dashboard?.totalHotels);

    const userActivePct = pct(dashboard?.activeUsers, dashboard?.totalUsers);
    const userBlockedPct = pct(dashboard?.blockedUsers, dashboard?.totalUsers);
    const customersPct = pct(dashboard?.totalCustomers, dashboard?.totalUsers);
    const hotelAdminsPct = pct(dashboard?.totalHotelAdmins, dashboard?.totalUsers);
    const superAdminsPct = pct(dashboard?.totalSuperAdmins, dashboard?.totalUsers);

    const roomsAvailablePct = pct(dashboard?.availableRooms, dashboard?.totalRooms);
    const roomsOccupiedPct = pct(dashboard?.occupiedRooms, dashboard?.totalRooms);
    const roomsMaintenancePct = pct(dashboard?.maintenanceRooms, dashboard?.totalRooms);
    const roomsInactivePct = pct(dashboard?.inactiveRooms, dashboard?.totalRooms);

    const bookingPendingPct = pct(dashboard?.pendingBookings, dashboard?.totalBookings);
    const bookingCompletedPct = pct(dashboard?.completedBookings, dashboard?.totalBookings);
    const bookingCancelledPct = pct(dashboard?.cancelledBookings, dashboard?.totalBookings);

    const ratingValue = Number(dashboard?.averagePlatformRating) || 0;
    const ratingPct = Math.min(100, Math.round((ratingValue / 5) * 100));

    return (
        <div className="ad-root">

            <Navbar />

            <div className="ad-hero">

                <div className="ad-hero-bg" aria-hidden="true">
                    <div className="ad-blob ad-blob-a" />
                    <div className="ad-blob ad-blob-b" />
                </div>

                <div className="container ad-hero-inner">

                    <span className="ad-badge-tag">
                        <ShieldCheck size={14} strokeWidth={2.4} /> Super Admin
                    </span>

                    <h2 className="ad-title">
                        <LayoutDashboard size={30} strokeWidth={2.2} className="ad-title-icon" />
                        Platform Analytics
                    </h2>

                    <p className="ad-subtext">
                        Real-time overview of your Hotel Reservation &amp; Management Platform.
                    </p>

                </div>

            </div>

            <div className="container ad-container">

                {/* KPI ROW */}
                <div className="kpi-grid">

                    <div className="kpi-card">
                        <div className="kpi-icon-wrap kpi-icon-violet">
                            <Building2 size={22} strokeWidth={2.2} />
                        </div>
                        <div className="kpi-value">{dashboard?.totalHotels ?? 0}</div>
                        <div className="kpi-label">Total Hotels</div>
                        <div className="kpi-trend kpi-trend-good">
                            <TrendingUp size={13} strokeWidth={2.4} />
                            {dashboard?.approvedHotels ?? 0} approved
                        </div>
                    </div>

                    <div className="kpi-card">
                        <div className="kpi-icon-wrap kpi-icon-teal">
                            <Users size={22} strokeWidth={2.2} />
                        </div>
                        <div className="kpi-value">{dashboard?.totalUsers ?? 0}</div>
                        <div className="kpi-label">Total Users</div>
                        <div className="kpi-trend kpi-trend-good">
                            <TrendingUp size={13} strokeWidth={2.4} />
                            {dashboard?.activeUsers ?? 0} active
                        </div>
                    </div>

                    <div className="kpi-card">
                        <div className="kpi-icon-wrap kpi-icon-amber">
                            <CalendarCheck2 size={22} strokeWidth={2.2} />
                        </div>
                        <div className="kpi-value">{dashboard?.totalBookings ?? 0}</div>
                        <div className="kpi-label">Total Bookings</div>
                        <div className="kpi-trend kpi-trend-good">
                            <TrendingUp size={13} strokeWidth={2.4} />
                            {dashboard?.completedBookings ?? 0} completed
                        </div>
                    </div>

                    <div className="kpi-card">
                        <div className="kpi-icon-wrap kpi-icon-rose">
                            <Star size={22} strokeWidth={2.2} />
                        </div>
                        <div className="kpi-value">{dashboard?.totalReviews ?? 0}</div>
                        <div className="kpi-label">Total Reviews</div>
                        <div className="kpi-trend kpi-trend-neutral">
                            <Star size={13} strokeWidth={2.4} fill="currentColor" />
                            {dashboard?.averagePlatformRating || "0.0"} avg rating
                        </div>
                    </div>

                </div>

                {/* OVERVIEW PANELS */}
                <div className="panel-grid">

                    {/* Hotels Panel */}
                    <div className="ov-panel">
                        <div className="ov-panel-head">
                            <h4 className="ov-panel-title">
                                <Building2 size={19} strokeWidth={2.2} className="ov-panel-icon" />
                                Hotels Overview
                            </h4>
                        </div>

                        <div className="ov-metric">
                            <div className="ov-metric-row">
                                <span className="ov-metric-label">Approved</span>
                                <span className="ov-metric-value ov-good">{dashboard?.approvedHotels ?? 0} · {hotelApprovedPct}%</span>
                            </div>
                            <div className="ov-track">
                                <div className="ov-fill ov-fill-good" style={{ width: `${hotelApprovedPct}%` }} />
                            </div>
                        </div>

                        <div className="ov-metric">
                            <div className="ov-metric-row">
                                <span className="ov-metric-label">Pending</span>
                                <span className="ov-metric-value ov-warn">{dashboard?.pendingHotels ?? 0} · {hotelPendingPct}%</span>
                            </div>
                            <div className="ov-track">
                                <div className="ov-fill ov-fill-warn" style={{ width: `${hotelPendingPct}%` }} />
                            </div>
                        </div>

                        <div className="ov-metric ov-metric-last">
                            <div className="ov-metric-row">
                                <span className="ov-metric-label">Rejected</span>
                                <span className="ov-metric-value ov-bad">{dashboard?.rejectedHotels ?? 0} · {hotelRejectedPct}%</span>
                            </div>
                            <div className="ov-track">
                                <div className="ov-fill ov-fill-bad" style={{ width: `${hotelRejectedPct}%` }} />
                            </div>
                        </div>
                    </div>

                    {/* Users Panel */}
                    <div className="ov-panel">
                        <div className="ov-panel-head">
                            <h4 className="ov-panel-title">
                                <Users size={19} strokeWidth={2.2} className="ov-panel-icon" />
                                Users Overview
                            </h4>
                        </div>

                        <div className="ov-metric">
                            <div className="ov-metric-row">
                                <span className="ov-metric-label">
                                    <UserCheck size={13} strokeWidth={2.3} /> Active
                                </span>
                                <span className="ov-metric-value ov-good">{dashboard?.activeUsers ?? 0} · {userActivePct}%</span>
                            </div>
                            <div className="ov-track">
                                <div className="ov-fill ov-fill-good" style={{ width: `${userActivePct}%` }} />
                            </div>
                        </div>

                        <div className="ov-metric">
                            <div className="ov-metric-row">
                                <span className="ov-metric-label">
                                    <UserX size={13} strokeWidth={2.3} /> Blocked
                                </span>
                                <span className="ov-metric-value ov-bad">{dashboard?.blockedUsers ?? 0} · {userBlockedPct}%</span>
                            </div>
                            <div className="ov-track">
                                <div className="ov-fill ov-fill-bad" style={{ width: `${userBlockedPct}%` }} />
                            </div>
                        </div>

                        <div className="ov-role-split">
                            <div className="ov-role-item">
                                <span className="ov-role-value">{dashboard?.totalCustomers ?? 0}</span>
                                <span className="ov-role-label">Customers</span>
                                <div className="ov-mini-track">
                                    <div className="ov-mini-fill ov-mini-violet" style={{ width: `${customersPct}%` }} />
                                </div>
                            </div>
                            <div className="ov-role-item">
                                <span className="ov-role-value">{dashboard?.totalHotelAdmins ?? 0}</span>
                                <span className="ov-role-label">Hotel Admins</span>
                                <div className="ov-mini-track">
                                    <div className="ov-mini-fill ov-mini-teal" style={{ width: `${hotelAdminsPct}%` }} />
                                </div>
                            </div>
                            <div className="ov-role-item">
                                <span className="ov-role-value">{dashboard?.totalSuperAdmins ?? 0}</span>
                                <span className="ov-role-label">Super Admins</span>
                                <div className="ov-mini-track">
                                    <div className="ov-mini-fill ov-mini-amber" style={{ width: `${superAdminsPct}%` }} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Rooms Panel */}
                    <div className="ov-panel">
                        <div className="ov-panel-head">
                            <h4 className="ov-panel-title">
                                <BedDouble size={19} strokeWidth={2.2} className="ov-panel-icon" />
                                Rooms Overview
                            </h4>
                        </div>

                        <div className="ov-metric">
                            <div className="ov-metric-row">
                                <span className="ov-metric-label">Available</span>
                                <span className="ov-metric-value ov-good">{dashboard?.availableRooms ?? 0} · {roomsAvailablePct}%</span>
                            </div>
                            <div className="ov-track">
                                <div className="ov-fill ov-fill-good" style={{ width: `${roomsAvailablePct}%` }} />
                            </div>
                        </div>

                        <div className="ov-metric">
                            <div className="ov-metric-row">
                                <span className="ov-metric-label">Occupied</span>
                                <span className="ov-metric-value ov-info">{dashboard?.occupiedRooms ?? 0} · {roomsOccupiedPct}%</span>
                            </div>
                            <div className="ov-track">
                                <div className="ov-fill ov-fill-info" style={{ width: `${roomsOccupiedPct}%` }} />
                            </div>
                        </div>

                        <div className="ov-metric">
                            <div className="ov-metric-row">
                                <span className="ov-metric-label">Maintenance</span>
                                <span className="ov-metric-value ov-warn">{dashboard?.maintenanceRooms ?? 0} · {roomsMaintenancePct}%</span>
                            </div>
                            <div className="ov-track">
                                <div className="ov-fill ov-fill-warn" style={{ width: `${roomsMaintenancePct}%` }} />
                            </div>
                        </div>

                        <div className="ov-metric ov-metric-last">
                            <div className="ov-metric-row">
                                <span className="ov-metric-label">Inactive</span>
                                <span className="ov-metric-value ov-muted-text">{dashboard?.inactiveRooms ?? 0} · {roomsInactivePct}%</span>
                            </div>
                            <div className="ov-track">
                                <div className="ov-fill ov-fill-muted" style={{ width: `${roomsInactivePct}%` }} />
                            </div>
                        </div>
                    </div>

                    {/* Bookings Panel */}
                    <div className="ov-panel">
                        <div className="ov-panel-head">
                            <h4 className="ov-panel-title">
                                <CalendarCheck2 size={19} strokeWidth={2.2} className="ov-panel-icon" />
                                Bookings Overview
                            </h4>
                        </div>

                        <div className="ov-metric">
                            <div className="ov-metric-row">
                                <span className="ov-metric-label">Completed</span>
                                <span className="ov-metric-value ov-good">{dashboard?.completedBookings ?? 0} · {bookingCompletedPct}%</span>
                            </div>
                            <div className="ov-track">
                                <div className="ov-fill ov-fill-good" style={{ width: `${bookingCompletedPct}%` }} />
                            </div>
                        </div>

                        <div className="ov-metric">
                            <div className="ov-metric-row">
                                <span className="ov-metric-label">Pending</span>
                                <span className="ov-metric-value ov-warn">{dashboard?.pendingBookings ?? 0} · {bookingPendingPct}%</span>
                            </div>
                            <div className="ov-track">
                                <div className="ov-fill ov-fill-warn" style={{ width: `${bookingPendingPct}%` }} />
                            </div>
                        </div>

                        <div className="ov-metric ov-metric-last">
                            <div className="ov-metric-row">
                                <span className="ov-metric-label">Cancelled</span>
                                <span className="ov-metric-value ov-bad">{dashboard?.cancelledBookings ?? 0} · {bookingCancelledPct}%</span>
                            </div>
                            <div className="ov-track">
                                <div className="ov-fill ov-fill-bad" style={{ width: `${bookingCancelledPct}%` }} />
                            </div>
                        </div>
                    </div>

                    {/* Reviews Panel - full width */}
                    <div className="ov-panel ov-panel-wide">
                        <div className="ov-panel-head">
                            <h4 className="ov-panel-title">
                                <Star size={19} strokeWidth={2.2} className="ov-panel-icon" />
                                Reviews Overview
                            </h4>
                        </div>

                        <div className="ov-reviews-row">

                            <div className="ov-reviews-stat">
                                <span className="ov-reviews-number">{dashboard?.totalReviews ?? 0}</span>
                                <span className="ov-reviews-caption">Total Reviews</span>
                            </div>

                            <div className="ov-reviews-rating">
                                <div className="ov-metric-row">
                                    <span className="ov-metric-label">
                                        <Star size={13} strokeWidth={2.3} /> Platform Rating
                                    </span>
                                    <span className="ov-metric-value ov-warn">
                                        {dashboard?.averagePlatformRating || "0.0"} / 5.0
                                    </span>
                                </div>
                                <div className="ov-track">
                                    <div className="ov-fill ov-fill-warn" style={{ width: `${ratingPct}%` }} />
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

            </div>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');

                .ad-root {
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
                .ad-hero {
                    position: relative;
                    overflow: hidden;
                    background: linear-gradient(150deg, var(--violet-deep) 0%, var(--violet) 45%, #3E8FBD 78%, var(--teal) 100%);
                    padding-bottom: 2.6rem;
                }

                .ad-hero-bg {
                    position: absolute;
                    inset: 0;
                    overflow: hidden;
                }

                .ad-blob {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(60px);
                    opacity: 0.5;
                }

                .ad-blob-a {
                    width: 340px; height: 340px;
                    top: -140px; left: -80px;
                    background: radial-gradient(circle, rgba(255,255,255,0.35), transparent 70%);
                }

                .ad-blob-b {
                    width: 300px; height: 300px;
                    bottom: -160px; right: -60px;
                    background: radial-gradient(circle, rgba(35,196,168,0.5), transparent 70%);
                }

                .ad-hero-inner {
                    position: relative;
                    z-index: 1;
                    padding-top: 2.8rem;
                    color: #FFFFFF;
                    animation: ad-rise 0.6s cubic-bezier(.22,1,.36,1) both;
                }

                .ad-badge-tag {
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

                .ad-title {
                    display: flex;
                    align-items: center;
                    gap: 0.65rem;
                    font-family: 'Space Grotesk', sans-serif;
                    font-weight: 700;
                    font-size: 2.2rem;
                    margin: 0 0 0.4rem;
                    text-shadow: 0 2px 20px rgba(0,0,0,0.15);
                }

                .ad-title-icon { flex-shrink: 0; }

                .ad-subtext {
                    font-size: 0.98rem;
                    color: rgba(255,255,255,0.82);
                    margin: 0;
                }

                @keyframes ad-rise {
                    from { opacity: 0; transform: translateY(12px); }
                    to   { opacity: 1; transform: translateY(0); }
                }

                /* CONTAINER */
                .ad-container {
                    padding: 2.6rem 1rem 4rem;
                }

                .ad-loading { text-align: center; padding: 6rem 1rem; }

                .ad-spinner {
                    width: 28px;
                    height: 28px;
                    border: 3px solid var(--line);
                    border-top-color: var(--violet);
                    border-radius: 50%;
                    margin: 0 auto 1rem;
                    animation: ad-spin 0.8s linear infinite;
                }

                @keyframes ad-spin { to { transform: rotate(360deg); } }

                .ad-loading-text { color: var(--muted); font-size: 0.9rem; }

                /* KPI CARDS */
                .kpi-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 1.2rem;
                    margin-bottom: 2rem;
                }

                .kpi-card {
                    background: #FFFFFF;
                    border-radius: 18px;
                    padding: 1.5rem 1.5rem 1.4rem;
                    box-shadow: 0 18px 40px -26px rgba(30,20,70,0.3);
                    transition: transform 0.22s ease, box-shadow 0.22s ease;
                }

                .kpi-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 26px 50px -22px rgba(30,20,70,0.38);
                }

                .kpi-icon-wrap {
                    width: 42px;
                    height: 42px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 1rem;
                }

                .kpi-icon-violet { background: rgba(109,91,208,0.12); color: var(--violet); }
                .kpi-icon-teal   { background: rgba(35,196,168,0.12); color: var(--teal); }
                .kpi-icon-amber  { background: rgba(217,164,65,0.14); color: var(--amber); }
                .kpi-icon-rose   { background: rgba(194,79,92,0.12); color: var(--rose); }

                .kpi-value {
                    font-family: 'Space Grotesk', sans-serif;
                    font-weight: 700;
                    font-size: 2rem;
                    color: var(--ink);
                    line-height: 1.1;
                }

                .kpi-label {
                    font-size: 0.86rem;
                    color: var(--muted);
                    font-weight: 500;
                    margin-top: 0.25rem;
                }

                .kpi-trend {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.3rem;
                    font-size: 0.78rem;
                    font-weight: 700;
                    margin-top: 0.85rem;
                    padding: 0.3rem 0.6rem;
                    border-radius: 999px;
                }

                .kpi-trend-good {
                    color: var(--teal);
                    background: rgba(35,196,168,0.1);
                }

                .kpi-trend-neutral {
                    color: var(--amber);
                    background: rgba(217,164,65,0.12);
                }

                /* OVERVIEW PANELS */
                .panel-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1.2rem;
                }

                .ov-panel {
                    background: #FFFFFF;
                    border-radius: 18px;
                    padding: 1.6rem 1.7rem 1.5rem;
                    box-shadow: 0 18px 40px -26px rgba(30,20,70,0.3);
                    border: 1px solid var(--line);
                }

                .ov-panel-wide {
                    grid-column: 1 / -1;
                }

                .ov-panel-head {
                    margin-bottom: 1.2rem;
                }

                .ov-panel-title {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-family: 'Space Grotesk', sans-serif;
                    font-weight: 600;
                    font-size: 1.05rem;
                    color: var(--ink);
                    margin: 0;
                }

                .ov-panel-icon { color: var(--violet); flex-shrink: 0; }

                .ov-metric {
                    margin-bottom: 1.1rem;
                }

                .ov-metric-last {
                    margin-bottom: 0;
                }

                .ov-metric-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 0.45rem;
                }

                .ov-metric-label {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.35rem;
                    font-size: 0.86rem;
                    color: var(--ink-soft);
                    font-weight: 500;
                }

                .ov-metric-value {
                    font-size: 0.86rem;
                    font-weight: 700;
                }

                .ov-good { color: var(--teal); }
                .ov-warn { color: var(--amber); }
                .ov-bad { color: var(--rose); }
                .ov-info { color: var(--violet); }
                .ov-muted-text { color: var(--muted); }

                .ov-track {
                    width: 100%;
                    height: 8px;
                    border-radius: 999px;
                    background: var(--line);
                    overflow: hidden;
                }

                .ov-fill {
                    height: 100%;
                    border-radius: 999px;
                    transition: width 0.5s ease;
                }

                .ov-fill-good { background: var(--teal); }
                .ov-fill-warn { background: var(--amber); }
                .ov-fill-bad { background: var(--rose); }
                .ov-fill-info { background: var(--violet); }
                .ov-fill-muted { background: var(--muted); }

                /* Role split (Users panel) */
                .ov-role-split {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 0.9rem;
                    margin-top: 1.4rem;
                    padding-top: 1.2rem;
                    border-top: 1px solid var(--line);
                }

                .ov-role-item {
                    display: flex;
                    flex-direction: column;
                }

                .ov-role-value {
                    font-family: 'Space Grotesk', sans-serif;
                    font-weight: 700;
                    font-size: 1.15rem;
                    color: var(--ink);
                }

                .ov-role-label {
                    font-size: 0.74rem;
                    color: var(--muted);
                    margin: 0.1rem 0 0.5rem;
                }

                .ov-mini-track {
                    width: 100%;
                    height: 5px;
                    border-radius: 999px;
                    background: var(--line);
                    overflow: hidden;
                }

                .ov-mini-fill {
                    height: 100%;
                    border-radius: 999px;
                    transition: width 0.5s ease;
                }

                .ov-mini-violet { background: var(--violet); }
                .ov-mini-teal { background: var(--teal); }
                .ov-mini-amber { background: var(--amber); }

                /* Reviews wide panel */
                .ov-reviews-row {
                    display: grid;
                    grid-template-columns: 180px 1fr;
                    gap: 2rem;
                    align-items: center;
                }

                .ov-reviews-stat {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    padding-right: 1.5rem;
                    border-right: 1px solid var(--line);
                }

                .ov-reviews-number {
                    font-family: 'Space Grotesk', sans-serif;
                    font-weight: 700;
                    font-size: 2.4rem;
                    color: var(--ink);
                    line-height: 1;
                }

                .ov-reviews-caption {
                    font-size: 0.82rem;
                    color: var(--muted);
                    margin-top: 0.4rem;
                }

                .ov-reviews-rating { width: 100%; }

                /* RESPONSIVE */
                @media (max-width: 1100px) {
                    .kpi-grid { grid-template-columns: repeat(2, 1fr); }
                }

                @media (max-width: 900px) {
                    .panel-grid { grid-template-columns: 1fr; }
                    .ov-panel-wide { grid-column: 1 / -1; }
                }

                @media (max-width: 600px) {
                    .ad-title { font-size: 1.8rem; }
                    .kpi-grid { grid-template-columns: 1fr; }
                    .ov-reviews-row { grid-template-columns: 1fr; }
                    .ov-reviews-stat { border-right: none; border-bottom: 1px solid var(--line); padding-right: 0; padding-bottom: 1rem; }
                }
            `}</style>

        </div>
    );
}

export default AdminDashboardPage;