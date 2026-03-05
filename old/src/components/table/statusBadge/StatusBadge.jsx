import { formatText } from "../../../utils/formatText";
import { STATUS_ICONS } from "../../../constants/status-icons";
import { COLLECTION_STATUSES } from "../../../constants/collection-statuses";
import "./StatusBadge.scss";

export default function StatusBadge({ currentStatus, onClick, isDiv = false, spentTimeInStatus }) {
    const Icon = STATUS_ICONS[currentStatus];

    if (isDiv) {
        return (
            <span className="current-status span-current-status">
                <span
                    className={`status-badge ${currentStatus.toLowerCase()}`}
                >
                    <Icon className="status-icon" />
                    <span className="status-text">{formatText(currentStatus)}</span>
                </span>
            </span>
        );

    }

    return (
        <td className="current-status">
            <button
                type="button"
                className={`status-badge ${currentStatus.toLowerCase()}`}
                onClick={onClick}
            >
                <Icon className="status-icon" />
                <span className="status-text">{formatText(currentStatus)}</span>
            </button>
            {
                currentStatus !== COLLECTION_STATUSES.CHECKED_OUT &&
                <div>{spentTimeInStatus}</div>
            }
        </td>
    );
}
