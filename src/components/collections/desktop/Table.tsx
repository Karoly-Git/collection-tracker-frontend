import { useState, useMemo } from "react";

import type { Collection } from "@/types/collection";

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
import Message from "../../ui/message/Message";

type TableProps = {
    collections: Collection[];
};

export default function Table({ collections }: TableProps) {

    const [sortKey, setSortKey] =
        useState<keyof Collection | null>("checkedInAt");

    const [sortDirection, setSortDirection] =
        useState<"asc" | "desc">("asc");

    const handleSort = (key: keyof Collection): void => {

        if (sortKey === key) {
            setSortDirection(prev =>
                prev === "asc" ? "desc" : "asc"
            );
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

            // Special case for dates
            if (sortKey === "checkedInAt") {

                const aTime = new Date(aValue as string).getTime();
                const bTime = new Date(bValue as string).getTime();

                return sortDirection === "asc"
                    ? bTime - aTime
                    : aTime - bTime;
            }

            // Handle nulls
            if (aValue === null || aValue === undefined) return 1;
            if (bValue === null || bValue === undefined) return -1;

            if (aValue === bValue) return 0;

            if (sortDirection === "asc") {
                return aValue > bValue ? 1 : -1;
            }

            return aValue < bValue ? 1 : -1;

        });

    }, [collections, sortKey, sortDirection]);

    return (
        <>
            {!sortedCollections.length ? (
                <Message
                    title="No collections match your current search or filter"
                    message="Try adjusting the filters or clearing the search."
                />
            ) : (
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

                            <th
                                className="customer-column"
                                onClick={() => handleSort("customerName")}
                            >
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

                            <th>
                                <span className="th-content">
                                    <span className="content-text">-</span>
                                </span>
                            </th>

                        </tr>
                    </thead>

                    <tbody>
                        {sortedCollections.map(collection => (
                            <TableRow
                                key={collection.id}
                                collection={collection}
                            />
                        ))}
                    </tbody>

                </table>
            )}
        </>
    );
}