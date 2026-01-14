import { formatText } from "../../../utils/formatText";
import { STATUS_ICONS } from "../../../constants/status-icons";
import "./StatusBadge.css";

export default function StatusBadge({ currentStatus, onClick }) {
    const Icon = STATUS_ICONS[currentStatus];

    return (
        <td className="current-status">
            <button
                type="button"
                className={`status-badge ${currentStatus.toLowerCase()}`}
                onClick={onClick}
            >
                <Icon className="status-icon" /> {formatText(currentStatus)}
            </button>
        </td>
    );
}
