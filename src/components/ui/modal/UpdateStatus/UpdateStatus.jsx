import { useState } from "react";
import { LORRY_STATUSES } from "../../../../constants/lorry-statuses";
import "./UpdateStatus.css";
import { formatText } from "../../../../utils/formatText";

export default function UpdateStatus({ lorry, onCancel, onUpdate }) {
    const [status, setStatus] = useState(lorry?.currentStatus ?? "");

    const historyStatuses =
        lorry?.statusHistory.map((entry) => entry.status) || [];

    const statusOptions = Object.values(LORRY_STATUSES).filter(
        (s) => !historyStatuses.includes(s)
    );

    function handleSubmit(e) {
        e.preventDefault();
        if (!status || status === lorry?.currentStatus) return;
        onUpdate?.(status);
    }

    return (
        <form className="update-status" onSubmit={handleSubmit}>
            <h3>Update lorry status</h3>

            <label htmlFor="status-select">Plese select a new status</label>
            <select
                id="status-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
            >
                <option value="" disabled>
                    Select status
                </option>

                {statusOptions.map((option) => (
                    <option key={option} value={option}>
                        {formatText(option)}
                    </option>
                ))}
            </select>

            <div className="actions">
                <button
                    type="button"
                    className="btn cancel"
                    onClick={onCancel}
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    className="btn update"
                    disabled={status === lorry?.currentStatus}
                >
                    Update
                </button>
            </div>
        </form>
    );
}

