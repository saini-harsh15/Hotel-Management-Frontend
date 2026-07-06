import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
    getPendingHotels,
    approveHotel,
    rejectHotel
} from "../services/adminHotelService";
import {
    Building2,
    MapPin,
    Mail,
    Phone,
    PartyPopper,
    CheckCircle2,
    XCircle,
    ArrowLeft,
    ShieldCheck
} from "lucide-react";

import Swal from "sweetalert2";

function PendingHotelsPage() {

    const [hotels, setHotels] =
        useState([]);

    const [loadingHotelId, setLoadingHotelId] = useState(null);

    const fetchHotels =
        async () => {

            try {

                const response =
                    await getPendingHotels();

                setHotels(
                    response.data
                );

            }

            catch (error) {

                console.error(error);

            }

        };

    useEffect(() => {

        fetchHotels();

    }, []);

    const handleApprove = async (hotelId, hotelName) => {

        const result = await Swal.fire({
            title: "Approve Hotel?",
            html: `
        <b>${hotelName}</b><br/>
        This hotel will become visible to customers.
    `,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Approve",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#23C4A8",
            cancelButtonColor: "#9CA3AF",
            reverseButtons: true,
            focusCancel: true,
            customClass: {
                popup: "hotelhub-swal"
            }
        });

        if (!result.isConfirmed) return;

        try {

            setLoadingHotelId(hotelId);

            await approveHotel(hotelId);

            await Swal.fire({
                icon: "success",
                title: "Hotel Approved",
                text: `"${hotelName}" has been approved successfully.`,
                confirmButtonColor: "#23C4A8",
                timer: 1800,
                showConfirmButton: false,
                customClass: {
                    popup: "hotelhub-swal"
                }
            });

            fetchHotels();

        } catch (error) {

            console.error(error);

            Swal.fire({
                icon: "error",
                title: "Approval Failed",
                text:
                    error.response?.data?.message ||
                    "Something went wrong while approving the hotel.",
                confirmButtonColor: "#6D5BD0",
                customClass: {
                    popup: "hotelhub-swal"
                }
            });

        } finally {

            setLoadingHotelId(null);

        }

    };

    const handleReject = async (hotelId, hotelName) => {

        const result = await Swal.fire({
            title: "Reject Hotel?",
            html: `
        <b>${hotelName}</b><br/>
        This action cannot be undone.
    `,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Reject",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#C24F5C",
            cancelButtonColor: "#9CA3AF",
            reverseButtons: true,
            customClass: {
                popup: "hotelhub-swal"
            }
        });

        if (!result.isConfirmed) return;

        if (!confirmed) {
            return;
        }

        try {

            setLoadingHotelId(hotelId);

            await rejectHotel(hotelId);

            await Swal.fire({
                icon: "success",
                title: "Hotel Rejected",
                text: `"${hotelName}" has been rejected.`,
                timer: 1800,
                showConfirmButton: false,
                confirmButtonColor: "#C24F5C",
                customClass: {
                    popup: "hotelhub-swal"
                }
            });

            fetchHotels();

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to reject hotel."
            );

        } finally {

            setLoadingHotelId(null);

        }

    };

    return (

        <div className="pa-root">

            <Navbar />

            <div className="pa-hero">
                <div className="pa-hero-bg" aria-hidden="true">
                    <div className="pa-blob pa-blob-a" />
                    <div className="pa-blob pa-blob-b" />
                </div>
                <div className="container pa-hero-inner">

                    <button
                        className="pa-back-btn"
                        onClick={() => window.history.back()}
                    >
                        <ArrowLeft size={16} strokeWidth={2.4} /> Back
                    </button>

                    <span className="pa-badge-tag">
                        <ShieldCheck size={14} strokeWidth={2.4} /> Platform Control
                    </span>
                    <h2 className="pa-title">
                        <Building2 size={30} strokeWidth={2.2} className="pa-title-icon" />
                        Pending Hotel Approvals
                    </h2>
                    <p className="pa-subtext">
                        {hotels.length} hotel(s) awaiting approval.
                    </p>

                </div>
            </div>

            <div className="container pa-container">

                {

                    hotels.length === 0 ?

                        (

                            <div className="pa-empty-card">

                                <div className="pa-empty-icon">
                                    <PartyPopper size={44} strokeWidth={1.8} />
                                </div>

                                <h3 className="pa-empty-title">
                                    No Pending Hotels
                                </h3>

                                <p className="pa-empty-text">
                                    All submitted hotels have already been reviewed.
                                </p>

                            </div>

                        )

                        :

                        (

                            <div className="pa-grid">

                                {

                                    hotels.map(

                                        hotel => (

                                            <div
                                                key={hotel.id}
                                                className="pa-card"
                                            >

                                                <div className="pa-card-top">

                                                    <h3 className="pa-hotel-name">

                                                        <Building2 size={20} strokeWidth={2.2} className="pa-hotel-icon" />
                                                        {hotel.name}

                                                    </h3>

                                                    <span className="pa-status-badge">
                                                        {hotel.status}
                                                    </span>

                                                </div>

                                                <div className="pa-divider" />

                                                <div className="pa-info-row">

                                                    <strong className="pa-info-label">
                                                        <MapPin size={15} strokeWidth={2.2} /> City
                                                    </strong>

                                                    <div className="pa-info-value">

                                                        {hotel.city}

                                                    </div>

                                                </div>

                                                <div className="pa-info-row">

                                                    <strong className="pa-info-label">
                                                        <Mail size={15} strokeWidth={2.2} /> Email
                                                    </strong>

                                                    <div className="pa-info-value">

                                                        {hotel.email}

                                                    </div>

                                                </div>

                                                <div className="pa-info-row pa-info-row-last">

                                                    <strong className="pa-info-label">
                                                        <Phone size={15} strokeWidth={2.2} /> Contact
                                                    </strong>

                                                    <div className="pa-info-value">

                                                        {hotel.contactNumber}

                                                    </div>

                                                </div>

                                                <div className="pa-actions">

                                                    <button

                                                        className="pa-btn-approve"

                                                        disabled={
                                                            loadingHotelId === hotel.id
                                                        }

                                                        onClick={() =>
                                                            handleApprove(
                                                                hotel.id,
                                                                hotel.name
                                                            )
                                                        }

                                                    >

                                                        {

                                                            loadingHotelId === hotel.id

                                                                ?

                                                                "Approving..."

                                                                :

                                                                (
                                                                    <>
                                                                        <CheckCircle2 size={17} strokeWidth={2.3} /> Approve Hotel
                                                                    </>
                                                                )

                                                        }

                                                    </button>

                                                    <button

                                                        className="pa-btn-reject"

                                                        disabled={
                                                            loadingHotelId === hotel.id
                                                        }

                                                        onClick={() =>
                                                            handleReject(
                                                                hotel.id,
                                                                hotel.name
                                                            )
                                                        }

                                                    >

                                                        {

                                                            loadingHotelId === hotel.id

                                                                ?

                                                                "Rejecting..."

                                                                :

                                                                (
                                                                    <>
                                                                        <XCircle size={17} strokeWidth={2.3} /> Reject Hotel
                                                                    </>
                                                                )

                                                        }

                                                    </button>

                                                </div>

                                            </div>

                                        )

                                    )

                                }

                            </div>

                        )

                }

            </div>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');

                .pa-root {
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
                .pa-hero {
                    position: relative;
                    overflow: hidden;
                    background: linear-gradient(150deg, var(--violet-deep) 0%, var(--violet) 45%, #3E8FBD 78%, var(--teal) 100%);
                    padding-bottom: 2.4rem;
                }

                .pa-hero-bg {
                    position: absolute;
                    inset: 0;
                    overflow: hidden;
                }

                .pa-blob {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(60px);
                    opacity: 0.5;
                }

                .pa-blob-a {
                    width: 320px; height: 320px;
                    top: -140px; left: -80px;
                    background: radial-gradient(circle, rgba(255,255,255,0.35), transparent 70%);
                }

                .pa-blob-b {
                    width: 280px; height: 280px;
                    bottom: -160px; right: -60px;
                    background: radial-gradient(circle, rgba(35,196,168,0.5), transparent 70%);
                }

                .pa-hero-inner {
                    position: relative;
                    z-index: 1;
                    padding-top: 2rem;
                    color: #FFFFFF;
                    animation: pa-rise 0.6s cubic-bezier(.22,1,.36,1) both;
                }

                .pa-back-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.4rem;
                    background: rgba(255,255,255,0.12);
                    border: 1px solid rgba(255,255,255,0.25);
                    color: #FFFFFF;
                    font-size: 0.85rem;
                    font-weight: 600;
                    padding: 0.5rem 1rem;
                    border-radius: 999px;
                    cursor: pointer;
                    margin-bottom: 1.4rem;
                    transition: background 0.15s ease, transform 0.15s ease;
                }

                .pa-back-btn:hover {
                    background: rgba(255,255,255,0.2);
                    transform: translateX(-2px);
                }

                .pa-badge-tag {
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

                .pa-title {
                    display: flex;
                    align-items: center;
                    gap: 0.65rem;
                    font-family: 'Space Grotesk', sans-serif;
                    font-weight: 700;
                    font-size: 2.1rem;
                    margin: 0 0 0.4rem;
                    text-shadow: 0 2px 20px rgba(0,0,0,0.15);
                }

                .pa-title-icon {
                    flex-shrink: 0;
                }

                .pa-subtext {
                    font-size: 1rem;
                    color: rgba(255,255,255,0.85);
                    margin: 0;
                }

                @keyframes pa-rise {
                    from { opacity: 0; transform: translateY(12px); }
                    to   { opacity: 1; transform: translateY(0); }
                }

                /* Container */
                .pa-container { padding: 2.4rem 1rem 4rem; }

                .pa-empty-card {
                    max-width: 480px;
                    margin: 1rem auto 0;
                    background: #FFFFFF;
                    border-radius: 20px;
                    padding: 3.2rem 2rem;
                    text-align: center;
                    box-shadow: 0 20px 44px -26px rgba(30,20,70,0.28);
                    border: 1px solid var(--line);
                }

                .pa-empty-icon {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--amber);
                    margin-bottom: 1rem;
                }

                .pa-empty-title {
                    font-family: 'Space Grotesk', sans-serif;
                    font-weight: 700;
                    font-size: 1.4rem;
                    color: var(--ink);
                    margin: 0 0 0.5rem;
                }

                .pa-empty-text {
                    color: var(--ink-soft);
                    font-size: 0.95rem;
                    margin: 0;
                }

                /* Grid / Cards */
                .pa-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1.4rem;
                }

                .pa-card {
                    background: #FFFFFF;
                    border-radius: 18px;
                    padding: 1.8rem 1.9rem;
                    box-shadow: 0 20px 44px -26px rgba(30,20,70,0.28);
                    border: 1px solid var(--line);
                    border-left: 5px solid var(--amber);
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                }

                .pa-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 28px 54px -22px rgba(30,20,70,0.34);
                }

                .pa-card-top {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    gap: 1rem;
                    flex-wrap: wrap;
                }

                .pa-hotel-name {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-family: 'Space Grotesk', sans-serif;
                    font-weight: 700;
                    font-size: 1.3rem;
                    color: var(--ink);
                    margin: 0;
                }

                .pa-hotel-icon {
                    color: var(--violet);
                    flex-shrink: 0;
                }

                .pa-status-badge {
                    background: var(--amber);
                    color: var(--ink);
                    font-size: 0.76rem;
                    font-weight: 700;
                    letter-spacing: 0.02em;
                    padding: 0.4rem 0.85rem;
                    border-radius: 999px;
                    white-space: nowrap;
                }

                .pa-divider {
                    height: 1px;
                    background: var(--line);
                    margin: 1.2rem 0;
                }

                .pa-info-row {
                    margin-bottom: 0.9rem;
                }

                .pa-info-row-last {
                    margin-bottom: 1.6rem;
                }

                .pa-info-label {
                    display: flex;
                    align-items: center;
                    gap: 0.35rem;
                    font-size: 0.82rem;
                    font-weight: 700;
                    color: var(--ink);
                    margin-bottom: 0.15rem;
                }

                .pa-info-label svg {
                    color: var(--violet);
                    flex-shrink: 0;
                }

                .pa-info-value {
                    color: var(--ink-soft);
                    font-size: 0.94rem;
                }

                .pa-actions {
                    display: flex;
                    flex-direction: column;
                    gap: 0.7rem;
                }

                .pa-btn-approve {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    border: none;
                    border-radius: 12px;
                    padding: 0.8rem;
                    background: linear-gradient(120deg, var(--teal) 0%, #2FB88F 130%);
                    color: #FFFFFF;
                    font-size: 0.96rem;
                    font-weight: 700;
                    cursor: pointer;
                    box-shadow: 0 12px 22px -12px rgba(35, 196, 168, 0.5);
                    transition: filter 0.15s ease, transform 0.15s ease;
                }

                .pa-btn-approve:hover:not(:disabled) {
                    filter: brightness(1.05);
                    transform: translateY(-1px);
                }

                .pa-btn-approve:disabled {
                    opacity: 0.65;
                    cursor: not-allowed;
                }

                .pa-btn-reject {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    border: 1.5px solid var(--rose);
                    border-radius: 12px;
                    padding: 0.8rem;
                    background: #FFFFFF;
                    color: var(--rose);
                    font-size: 0.96rem;
                    font-weight: 700;
                    cursor: pointer;
                    transition: background 0.15s ease, transform 0.15s ease;
                }

                .pa-btn-reject:hover:not(:disabled) {
                    background: #FDF2F3;
                    transform: translateY(-1px);
                }

                .pa-btn-reject:disabled {
                    opacity: 0.65;
                    cursor: not-allowed;
                }

                @media (max-width: 800px) {
                    .pa-grid { grid-template-columns: 1fr; }
                    .pa-title { font-size: 1.8rem; }
                }
            `}</style>

        </div>

    );

}

export default PendingHotelsPage;