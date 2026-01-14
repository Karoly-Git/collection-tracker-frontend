import { formatText } from "../../../utils/formatText";
import "./StatusBadge.css";

export default function StatusBadge({ currentStatus, onClick }) {
    return (
        <td className="current-status">
            <button
                type="button"
                className={`status-badge ${currentStatus.toLowerCase()}`}
                onClick={onClick}
            >
                {formatText(currentStatus)}
            </button>
        </td>
    );
}
