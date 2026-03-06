import { useState } from 'react';

import './FilterBar.scss';

import { RxReset as ResetFiltersIcon } from "react-icons/rx";
import { IoTodaySharp as TodayIcon } from "react-icons/io5";

import { COLLECTION_STATUSES } from '@/constants/status-config';
import { STATUS_ICONS } from '@/constants/status-icons';

import { formatText } from '@/utils/formatText';
import Button from '@/components/ui/button/Button';

type Status = typeof COLLECTION_STATUSES[keyof typeof COLLECTION_STATUSES];

const createDefaultStatusFilters = (): Record<Status, boolean> =>
    Object.values(COLLECTION_STATUSES).reduce((acc, status) => {
        acc[status as Status] = true;
        return acc;
    }, {} as Record<Status, boolean>);

export default function FilterBar() {
    const [showTodayOnly, setShowTodayOnly] = useState<boolean>(true);

    const [statusFilters, setStatusFilters] =
        useState<Record<Status, boolean>>(createDefaultStatusFilters);

    const isStatusFilterActive = Object.values(statusFilters).some(
        (checked) => checked === false
    );

    const isAnyFilterApplied = !showTodayOnly || isStatusFilterActive;

    const resetFilters = () => {
        setShowTodayOnly(true);
        setStatusFilters(createDefaultStatusFilters());
    };

    const handleStatusToggle = (status: Status) => {
        setStatusFilters((prev) => ({
            ...prev,
            [status]: !prev[status],
        }));
    };

    return (
        <div className="filter-bar">
            {/* Today only chip */}

            <label
                className={`status-chip ${showTodayOnly ? "active" : ""}`}
            >
                <input
                    type="checkbox"
                    checked={showTodayOnly}
                    onChange={(e) => setShowTodayOnly(e.target.checked)}
                />

                <span className="chip-label">
                    <TodayIcon className="chip-icon" />
                    <span className="chip-text">Today</span>
                </span>
            </label>

            {Object.values(COLLECTION_STATUSES).map((status) => {
                const Icon = STATUS_ICONS[status as Status];

                return (
                    <label
                        key={status}
                        className={`status-chip status-${status.toLowerCase()} ${statusFilters[status as Status] ? "active" : ""
                            }`}
                    >
                        <input
                            type="checkbox"
                            checked={statusFilters[status as Status]}
                            onChange={() => handleStatusToggle(status as Status)}
                        />

                        <span className="chip-label">
                            {Icon && <Icon className="chip-icon" />}
                            <span className="chip-text">
                                {formatText(status)}
                            </span>
                        </span>
                    </label>
                );
            })}

            {/* RESET FILTERS */}

            {isAnyFilterApplied && (
                <Button
                    type="button"
                    icon={ResetFiltersIcon}
                    className="icon-btn"
                    onClick={resetFilters}
                />
            )}
        </div>
    );
}