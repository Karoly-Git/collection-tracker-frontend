import { formatText } from "../../../utils/formatText";
import { STATUS_ICONS } from "../../../constants/status-icons";
import "./StatusBadge.css";

export default function StatusBadge({ currentStatus, onClick, isDiv = false, spentTimeInStatus }) {
    const Icon = STATUS_ICONS[currentStatus];

    if (isDiv) {
        return (
            <span className="current-status span-current-status">
                <span
                    className={`status-badge ${currentStatus.toLowerCase()}`}
                >
                    <Icon className="status-icon" /> {formatText(currentStatus)}
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
                <Icon className="status-icon" /> {formatText(currentStatus)}
            </button>
            <div>{spentTimeInStatus}</div>
        </td>
    );
}
