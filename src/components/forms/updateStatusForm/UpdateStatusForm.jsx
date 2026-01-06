import { useDispatch } from "react-redux";
import { LORRY_STATUSES } from "../../../constants/lorry-statuses";
import { formatText } from "../../../utils/formatText";
import { updateLorryStatusById } from "../../../state/lorry/lorrySlice";
import "./UpdateStatusForm.css";

export default function UpdateStatusForm({ lorry, onCancel }) {
    const dispatch = useDispatch();
    const currentStatus = lorry.currentStatus;

    const usedStatuses = lorry.statusHistory.map(
        (entry) => entry.status
    );

    // ✅ Find the only valid next status
    const nextStatus = Object.values(LORRY_STATUSES).find(
        (status) => !usedStatuses.includes(status)
    );

    if (!nextStatus) {
        return (
            <div className="update-status-form">
                <h2>Lorry has checked out</h2>
                <p>No further status updates available.</p>

                <div className="actions">
                    <button
                        type="button"
                        className="btn cancel"
                        onClick={onCancel}
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await dispatch(
                updateLorryStatusById({
                    lorryId: lorry.lorryId,
                    status: nextStatus,
                    userId: "exampleUserId",
                    comment: `Status updated from ${currentStatus} to ${nextStatus}`,
                })
            ).unwrap();

            onCancel();
        } catch (error) {
            console.error("Failed to update lorry status:", error);
            alert("Failed to update status. Please try again.");
        }
    }

    return (
        <form className="update-status-form" onSubmit={handleSubmit}>
            <h2>Update lorry status</h2>

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

            <div className="actions">
                <button
                    type="button"
                    className="btn cancel"
                    onClick={onCancel}
                >
                    Cancel
                </button>

                <button type="submit" className="btn update">
                    Confirm update
                </button>
            </div>
        </form>
    );
}
