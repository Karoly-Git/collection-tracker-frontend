// React & Redux
import { useState } from "react";
import { useDispatch } from "react-redux";

// Constants
import { COLLECTION_STATUSES } from "../../../constants/collection-statuses";

// Utils
import { formatText } from "../../../utils/formatText";

// State
import { updateCollectionStatusById } from "../../../state/collection/collectionSlice";

// UI Components
import Button from "../../ui/button/Button";

// Styles
import "../FormStyle.css";
import "./UpdateStatusForm.css";

export default function UpdateStatusForm({ currentStatus, statusHistory, collectionId, onCancel }) {
    const dispatch = useDispatch();
    const [comment, setComment] = useState("");

    // Find the only valid next status
    const statusFlow = Object.values(COLLECTION_STATUSES);

    const currentIndex = statusFlow.indexOf(currentStatus);
    const nextStatus = currentIndex !== -1 ? statusFlow[currentIndex + 1] : null;

    if (!nextStatus) {
        return (
            <div className="form update-status-form">
                <h2>Collection has checked out</h2>
                <p>No further status updates available.</p>

                <div className="actions">
                    <Button
                        type="button"
                        text="Cancel"
                        className="btn reject"
                        onClick={onCancel}
                    />
                </div>
            </div>
        );
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await dispatch(
                updateCollectionStatusById({
                    collectionId,
                    newStatus: nextStatus,
                    userId: "User ID", // This will come from auth state later
                    comment: comment,
                })
            ).unwrap();

            onCancel();
        } catch (error) {
            console.error("Failed to update collection status:", error);
            alert("Failed to update status. Please try again.");
        }
    }

    return (
        <form className="form update-status-form" onSubmit={handleSubmit}>
            <h2>Status Update</h2>

            <div className="status-preview">
                <div className="status-row">
                    <span className="label">Current</span>
                    <span className={`badge ${currentStatus.toLowerCase()}`}>
                        {formatText(currentStatus)}
                    </span>
                </div>

                <div className="arrow">→</div>

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


            <div className="actions">
                <Button
                    type="button"
                    text="Cancel"
                    className="btn reject"
                    onClick={onCancel}
                />

                <Button
                    type="submit"
                    text="Update Status"
                    className="btn accept"
                />
            </div>
        </form>
    );
}