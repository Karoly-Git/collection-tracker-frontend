import { useState, useEffect } from "react";
import type { Lorry } from "../../../types/lorry";
import "./StatusBadge.css";

interface StatusBadgeProps {
    currentStatus: Lorry["currentStatus"];
    lorryId: Lorry["lorryId"]
}


export default function StatusBadge({ currentStatus, lorryId }: StatusBadgeProps) {
    const formattedStatusText = currentStatus.toLowerCase().split("_").join(" ");

    const statusClass = currentStatus.toLowerCase();

    function handleBadgeClick(lorryId: string): void {
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
