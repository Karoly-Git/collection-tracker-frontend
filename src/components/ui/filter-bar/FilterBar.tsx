import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";

import "./FilterBar.scss";

import { IoMdClose as ResetIcon } from "react-icons/io";
import { IoTodaySharp as TodayIcon } from "react-icons/io5";

import { COLLECTION_STATUSES } from "@/constants/collection-statuses";

import { formatText } from "@/utils/formatText";
import Button from "@/components/ui/button/Button";


type FilterBarProps = {
    setFiltersList: Dispatch<SetStateAction<string[]>>;
};

export default function FilterBar({ setFiltersList }: FilterBarProps) {
    const statusKeys = Object.keys(COLLECTION_STATUSES) as (keyof typeof COLLECTION_STATUSES)[];

    type FilterKey = "TODAY" | keyof typeof COLLECTION_STATUSES;

    const createInitialFilters = (): Record<FilterKey, boolean> => ({
        TODAY: true,
        ...Object.fromEntries(statusKeys.map(status => [status, true])),
    } as Record<FilterKey, boolean>);

    const [filters, setFilters] = useState<Record<FilterKey, boolean>>(createInitialFilters());

    const toggleFilter = (key: FilterKey): void => {
        setFilters(prev => ({
            ...prev,
            [key]: !prev[key],
        }));

        setFiltersList(prev =>
            prev.includes(key)
                ? prev.filter(e => e !== key)
                : [...prev, key]
        );
    };

    const resetFilters = (): void => {
        setFilters(createInitialFilters());
        setFiltersList([...Object.keys(COLLECTION_STATUSES), "TODAY"]);
    };

    const isAllTrue = Object.values(filters).every(Boolean);

    return (
        <div className="filter-bar">
            {/* Today filter */}
            <Button
                variant={`filter-btn ${filters.TODAY ? "active-filter" : ""}`}
                icon={TodayIcon}
                text="Today"
                onClick={() => toggleFilter("TODAY")}
            />

            {/* Status filters */}
            {statusKeys.map(status => {
                const config = COLLECTION_STATUSES[status];

                return (
                    <Button
                        key={status}
                        variant={`filter-btn ${filters[status] ? "active-filter" : ""}`}
                        icon={config.icon}
                        text={formatText(status)}
                        onClick={() => toggleFilter(status)}
                    />
                );
            })}

            {/* Reset filters */}
            {!isAllTrue && (
                <Button
                    type="button"
                    icon={ResetIcon}
                    variant="only-icon-btn"
                    onClick={resetFilters}
                />
            )}
        </div>
    );
}