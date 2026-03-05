// React & Redux
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Constants
import { COLLECTION_STATUSES } from "../../../constants/collection-statuses";

// Utils
import { formatText } from "../../../utils/formatText";

// State
import { updateCollectionStatusById } from "../../../state/collection/collectionSlice";

// UI Components
import Button from "../../ui/button/Button";
import Spinner from "../../ui/Spinner/Spinner";

// Styles
import "../FormStyle.scss";
import "./UpdateStatusForm.scss";

// React Icons
import { FaArrowRightLong } from "react-icons/fa6";
import { FaCheck, FaExclamationTriangle } from "react-icons/fa";

import SystemMessage from "../../ui/SystemMessage/SystemMessage";

const AUTO_CLOSE_SECONDS = 10;

export default function UpdateStatusForm({ onCancel }) {
    const dispatch = useDispatch();

    /* ---------- Local state ---------- */
    const [comment, setComment] = useState("");

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);
    const [error, setError] = useState(null);
    const [secondsLeft, setSecondsLeft] = useState(AUTO_CLOSE_SECONDS);

    /* ---------- Redux state ---------- */
    const clickedCollectionId = useSelector(
        (state) => state.modal.clickedCollectionId
    );

    const collection = useSelector((state) =>
        state.collections.collections.find((c) => c.id === clickedCollectionId)
    );

    if (!collection) {
        return (
            <div className="form update-status-form">
                <Spinner size={26} inline />
                <span>Loading collection…</span>
            </div>
        );
    }

    const { currentStatus } = collection;

    // Find the only valid next status
    const statusFlow = Object.values(COLLECTION_STATUSES);
    const currentIndex = statusFlow.indexOf(currentStatus);
    const nextStatus = currentIndex !== -1 ? statusFlow[currentIndex + 1] : null;

    const isBusy = isSubmitting;

    /* ---------- Auto close after success ---------- */
    useEffect(() => {
        if (!isUpdated) return;

        setSecondsLeft(AUTO_CLOSE_SECONDS);

        const interval = setInterval(() => {
            setSecondsLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [isUpdated]);

    useEffect(() => {
        if (secondsLeft <= 0 && isUpdated) {
            onCancel();
        }
    }, [secondsLeft, isUpdated, onCancel]);

    if (!nextStatus) {
        return (
            <div className="form update-status-form">
                <SystemMessage
                    variant="info"
                    title="Collection has checked out"
                    message="This collection has already reached its final status and cannot be updated further."
                    actionLabel="Close"
                    actionBtnClassName="btn reject"
                    onAction={onCancel}
                />
            </div>
        );
    }

    /* ---------- Submit ---------- */
    async function handleSubmit(e) {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);
        setError(null);

        try {
            await dispatch(
                updateCollectionStatusById({
                    collectionId: clickedCollectionId,
                    newStatus: nextStatus,
                    userId: "User ID", // This will come from auth state later
                    comment: comment,
                    timestamp: new Date().toISOString(),
                })
            ).unwrap();

            setIsUpdated(true);
        } catch (err) {
            console.error("Failed to update collection status:", err);
            setError("Failed to update status. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    /* ---------- Header content ---------- */
    const renderHeader = () => {
        if (isUpdated) {
            return (
                <>
                    <FaCheck className="icon success" />
                    <span>Status updated successfully</span>
                </>
            );
        }

        if (error) {
            return (
                <>
                    <FaExclamationTriangle className="icon warning" />
                    <span>{error}</span>
                </>
            );
        }

        if (isBusy) {
            return (
                <>
                    <Spinner size={26} inline />
                    <span>Updating status… Please wait</span>
                </>
            );
        }

        return null;
    };

    const headerContent = renderHeader();

    return (
        <form className="form update-status-form" onSubmit={handleSubmit}>
            {/* ✅ Header */}
            <div className="form-header">
                {headerContent && (
                    <h2
                        className={`warning-text ${isUpdated ? "success" : error ? "error" : ""
                            }`}
                        aria-live="polite"
                    >
                        {headerContent}
                    </h2>
                )}

                {isUpdated && (
                    <p className="auto-close-text">
                        (Auto closing in <strong>{secondsLeft}</strong> second
                        {secondsLeft !== 1 ? "s" : ""})
                    </p>
                )}
            </div>

            {!isUpdated && !isBusy && (
                <>
                    <h2>Want to update Status?</h2>

                    <div className="status-preview">
                        <div className="status-row">
                            <span className="label">Current</span>
                            <span className={`badge ${currentStatus.toLowerCase()}`}>
                                {formatText(currentStatus)}
                            </span>
                        </div>

                        <div className="arrow">
                            <FaArrowRightLong />
                        </div>

                        <div className="status-row">
                            <span className="label">Next</span>
                            <span className={`badge next ${nextStatus.toLowerCase()}`}>
                                {formatText(nextStatus)}
                            </span>
                        </div>
                    </div>

                    <label>
                        Comment (optional)
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </label>
                </>
            )}

            {/* ✅ Actions */}
            <div className="actions">
                {/* Success */}
                {isUpdated && (
                    <Button
                        type="button"
                        text="Close"
                        className="btn accept"
                        onClick={onCancel}
                    />
                )}

                {/* Idle/Error */}
                {!isUpdated && !isBusy && (
                    <>
                        <Button
                            type="button"
                            text="Cancel"
                            className="btn reject"
                            onClick={onCancel}
                        />

                        <Button
                            type="submit"
                            text={error ? "Retry Update" : "Update Status"}
                            className="btn accept"
                        />
                    </>
                )}
            </div>
        </form>
    );
}
