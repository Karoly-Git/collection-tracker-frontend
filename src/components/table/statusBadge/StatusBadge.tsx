import type { Lorry } from "../../../types/lorry";
import { useState } from "react";

interface StatusBadgeProps {
    currentStatus: Lorry["currentStatus"];
}

export default function StatusBadge({ currentStatus }: StatusBadgeProps) {
    const formatedBadgeText = (value: string): string =>
        value
            .toLowerCase()
            .split("_")
            .join(" ");

    return (
        <td className="current-status">
            <span className="status-badge">{formatedBadgeText(currentStatus)}</span>
        </td>
    );
}
