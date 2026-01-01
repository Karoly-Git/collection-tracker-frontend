import "./StatusBadge.css";

export default function StatusBadge({ currentStatus, lorryId }) {
    const formattedStatusText = currentStatus
        .toLowerCase()
        .split("_")
        .join(" ");

    const statusClass = currentStatus.toLowerCase();

    function handleBadgeClick(lorryId) {
        console.log("Badge clicked for lorry:", lorryId);
    }

    return (
        <td className="current-status">
            <button
                type="button"
                className={`status-badge ${statusClass}`}
                onClick={() => handleBadgeClick(lorryId)}
            >
                {formattedStatusText}
            </button>
        </td>
    );
}
