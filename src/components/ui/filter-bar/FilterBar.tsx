import type { Dispatch, SetStateAction } from "react";

import "./FilterBar.scss";

import { IoMdClose as ResetIcon } from "react-icons/io";
import { IoTodaySharp as TodayIcon } from "react-icons/io5";

import { COLLECTION_STATUSES } from "@/constants/collection-statuses";

import { formatText } from "@/utils/formatText";
import Button from "@/components/ui/button/Button";


type FilterBarProps = {
    filtersList: string[];
    setFiltersList: Dispatch<SetStateAction<string[]>>;
};

export default function FilterBar({ filtersList, setFiltersList }: FilterBarProps) {
    const statusKeys = Object.keys(COLLECTION_STATUSES) as (keyof typeof COLLECTION_STATUSES)[];

    const toggleFilter = (key: string): void => {
        setFiltersList(prev =>
            prev.includes(key)
                ? prev.filter(e => e !== key)
                : [...prev, key]
        );
    };

    const resetFilters = (): void => {
        setFiltersList([...Object.keys(COLLECTION_STATUSES), "TODAY"]);
    };

    return (
        <div className="filter-bar">
            {/* Today filter */}
            <Button
                variant={`filter-btn ${filtersList.includes("TODAY") ? "active-filter" : ""}`}
                icon={TodayIcon}
                text="Today"
                onClick={() => toggleFilter("TODAY")}
            />

            {/* Status filters */}
            {statusKeys.map(status => {
                return (
                    <Button
                        key={status}
                        variant={`filter-btn ${filtersList.includes(status) ? "active-filter" : ""}`}
                        icon={COLLECTION_STATUSES[status].icon}
                        text={formatText(status)}
                        onClick={() => toggleFilter(status)}
                    />
                );
            })}

            {/* Reset filters */}
            {filtersList.length !== 5 && (
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