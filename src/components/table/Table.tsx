import { useState, useMemo, useEffect } from "react";

import type { Collection } from "@/types/collection";

import { getTodayCollections } from "@/api/collection";

import TableRow from "./TableRow";

// Icons
import { SiMaterialdesignicons as MaterialIcon } from "react-icons/si";
import { LuTimer as TimerIcon } from "react-icons/lu";
import { MdOutlineCorporateFare as CustomerIcon } from "react-icons/md";
import { TbNumber as RefIcon } from "react-icons/tb";
import { GrStatusInfo as StatusIcon } from "react-icons/gr";

import { LuArrowDownAZ as AscIcon } from "react-icons/lu";
import { LuArrowUpAZ as DescIcon } from "react-icons/lu";

import "./Table.scss";
import Spinner from "../ui/spinner/Spinner";

type TableProps = {
    searchValue: string;
    filtersList: string[]
}

export default function Table({ searchValue, filtersList }: TableProps) {
    //const collections = data as Collection[];

    const [collections, setCollections] = useState<Collection[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);

    useEffect(() => {
        async function fetchCollections() {
            try {
                const result = await getTodayCollections();
                setCollections(result);
            } catch (error) {
                console.error("Failed to fetch collections:", error);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        }

        fetchCollections();
    }, []);

    const [sortKey, setSortKey] = useState<keyof Collection | null>("checkedInAt");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

    const handleSort = (key: keyof Collection): void => {

        if (sortKey === key) {
            setSortDirection(prev => prev === "asc" ? "desc" : "asc");
        } else {
            setSortKey(key);
            setSortDirection("asc");
        }

    };

    const renderSortIcon = (key: keyof Collection): React.ReactNode => {

        if (sortKey !== key) return null;

        return sortDirection === "asc"
            ? <AscIcon />
            : <DescIcon />;
    };

    const sortedCollections = useMemo(() => {

        if (!sortKey) return collections;

        return [...collections].sort((a, b) => {

            const aValue = a[sortKey];
            const bValue = b[sortKey];

            // Special handling for date sorting
            if (sortKey === "checkedInAt") {

                const aTime = new Date(aValue as string).getTime();
                const bTime = new Date(bValue as string).getTime();

                return sortDirection === "asc"
                    ? bTime - aTime
                    : aTime - bTime;
            }

            // Handle null / undefined values
            if (aValue === null || aValue === undefined) return 1;
            if (bValue === null || bValue === undefined) return -1;

            // Default comparison for strings / numbers
            if (aValue === bValue) return 0;

            if (sortDirection === "asc") {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }

        });

    }, [collections, sortKey, sortDirection]);

    const filteredCollections = useMemo(() => {
        const today = new Date().toDateString();
        const search = searchValue.toLowerCase();

        return sortedCollections.filter((c) => {
            const matchesStatus = filtersList.includes(c.currentStatus);

            const matchesSearch =
                c.materialName.toLowerCase().includes(search) ||
                c.customerName.toLowerCase().includes(search) ||
                String(c.collectionRefNum).toLowerCase().includes(search);

            if (filtersList.includes("TODAY")) {
                const checkedDate = new Date(c.checkedInAt).toDateString();
                const matchesToday = today === checkedDate;

                return matchesStatus && matchesSearch && matchesToday;
            }

            return matchesStatus && matchesSearch;
        });
    }, [sortedCollections, searchValue, filtersList]);

    return (
        isError ? <>Hooops...</> :
            isLoading ?
                <div className="loading-spinner-container">
                    <Spinner />
                </div> :
                <table className="collection-table">
                    <thead>
                        <tr>
                            <th onClick={() => handleSort("checkedInAt")}>
                                <span className="th-content">
                                    <TimerIcon className="content-icon" />
                                    <span className="content-text">Timer</span>
                                    <span className="sort-icon">
                                        {renderSortIcon("checkedInAt")}
                                    </span>
                                </span>
                            </th>

                            <th onClick={() => handleSort("materialName")}>
                                <span className="th-content">
                                    <MaterialIcon className="content-icon material-icon" />
                                    <span className="content-text">Material</span>
                                    <span className="sort-icon">
                                        {renderSortIcon("materialName")}
                                    </span>
                                </span>
                            </th>

                            <th className="customer-column" onClick={() => handleSort("customerName")}>
                                <span className="th-content">
                                    <CustomerIcon className="content-icon" />
                                    <span className="content-text">Customer</span>
                                    <span className="sort-icon">
                                        {renderSortIcon("customerName")}
                                    </span>
                                </span>
                            </th>

                            <th onClick={() => handleSort("collectionRefNum")}>
                                <span className="th-content">
                                    <RefIcon className="content-icon ref-icon" />
                                    <span className="content-text">Reference</span>
                                    <span className="sort-icon">
                                        {renderSortIcon("collectionRefNum")}
                                    </span>
                                </span>
                            </th>

                            <th onClick={() => handleSort("currentStatus")}>
                                <span className="th-content">
                                    <StatusIcon className="content-icon" />
                                    <span className="content-text">Status</span>
                                    <span className="sort-icon">
                                        {renderSortIcon("currentStatus")}
                                    </span>
                                </span>
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredCollections.map((collection) => (
                            <TableRow
                                key={collection.id}
                                collection={collection}
                            />
                        ))}
                    </tbody>
                </table>
    );
}