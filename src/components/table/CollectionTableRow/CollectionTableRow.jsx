// React
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

// Redux slices
import {
    openModal,
    setClickedCollectionId,
} from "../../../state/collection/modalSlice";

// Icons
import { BsInfoCircle as InfoIcon } from "react-icons/bs";
import { RiDeleteBin2Line as BinIcon } from "react-icons/ri";

// Utils
import { formatDateTime } from "../../../utils/formatDateTime";
import { getDurationWithColor } from "../../../utils/getDurationWithColor";

// Constants
import { COLLECTION_STATUSES } from "../../../constants/collection-statuses";

// UI Components
import Button from "../../ui/button/Button";
import StatusBadge from "../StatusBadge/StatusBadge";

// Styles
import "./CollectionTableRow.css";

const userLoggedIn = true;

/**
 * Check if ISO date is today (UTC-safe)
 */
const isToday = (isoDate) => {
    const d = new Date(isoDate);
    const now = new Date();

    return (
        d.getUTCFullYear() === now.getUTCFullYear() &&
        d.getUTCMonth() === now.getUTCMonth() &&
        d.getUTCDate() === now.getUTCDate()
    );
};

export default function CollectionTableRow({ collection }) {
    const dispatch = useDispatch();

    const handleOpenModal = (name, collectionId) => {
        dispatch(setClickedCollectionId(collectionId));
        dispatch(openModal({ name }));
    };

    const {
        id,
        materialName,
        customerName,
        collectionRefNum,
        checkedInAt,
        currentStatus,
    } = collection;

    /**
     * Show live timer ONLY when:
     *  - today
     *  - NOT LOADED
     *  - NOT CHECKED_OUT
     */
    const showLiveTimer =
        isToday(checkedInAt) &&
        currentStatus !== COLLECTION_STATUSES.LOADED &&
        currentStatus !== COLLECTION_STATUSES.CHECKED_OUT;

    /* ─────────────────────────────
       LIVE TIMER STATE
    ───────────────────────────── */

    const [{ time, color }, setDuration] = useState(() =>
        showLiveTimer
            ? getDurationWithColor(checkedInAt)
            : { time: "--:--", color: null }
    );

    /* ─────────────────────────────
       UPDATE TIMER EVERY MINUTE
    ───────────────────────────── */

    useEffect(() => {
        if (!showLiveTimer) {
            setDuration({ time: "--:--", color: null });
            return;
        }

        // Initial sync (important if mounted mid-minute)
        setDuration(getDurationWithColor(checkedInAt));

        const intervalId = setInterval(() => {
            setDuration(getDurationWithColor(checkedInAt));
        }, 60_000); // 1 minute

        return () => clearInterval(intervalId);
    }, [checkedInAt, showLiveTimer]);

    const indicatorStyle = { backgroundColor: color };

    return (
        <tr className="collection-table-row">
            {/* Timer */}
            <td>
                <div className="cell-content timer">
                    {showLiveTimer && (
                        <span
                            className="indicator"
                            style={indicatorStyle}
                        ></span>
                    )}
                    <span className={`time ${!showLiveTimer ? "muted" : ""}`}>
                        {time}
                    </span>
                </div>
            </td>

            {/* Material */}
            <td>
                <div className="cell-content material-name">
                    {id} {materialName}
                </div>

                <div className="time-checked-in">
                    {formatDateTime(checkedInAt, {
                        date: true,
                        time: true,
                    })}
                </div>
            </td>

            {/* Customer */}
            <td>
                <div className="cell-content customer-name">
                    {customerName}
                </div>
            </td>

            {/* Reference */}
            <td>
                <div className="cell-content collection-ref-number">
                    {collectionRefNum}
                </div>
            </td>

            {/* Status */}
            <StatusBadge
                currentStatus={currentStatus}
                onClick={() => handleOpenModal("status", id)}
            />

            {/* Actions */}
            <td className="action">
                <Button
                    icon={InfoIcon}
                    className="icon-btn info"
                    onClick={() => handleOpenModal("info", id)}
                />

                {userLoggedIn && (
                    <Button
                        icon={BinIcon}
                        className="icon-btn delete"
                        onClick={() => handleOpenModal("delete", id)}
                    />
                )}
            </td>
        </tr>
    );
}
