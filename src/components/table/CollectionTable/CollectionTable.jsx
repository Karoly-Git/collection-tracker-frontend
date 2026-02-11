// React & Redux
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

// State
import { fetchAllCollections } from "../../../state/collection/collectionSlice";

// Components
import CollectionTableRow from "../CollectionTableRow/CollectionTableRow";
import SystemMessage from "../../ui/SystemMessage/SystemMessage";

// Icons
import { IoSearchSharp as SearchIcon } from "react-icons/io5";
import { LuArrowDownAZ as AscAbcIcon } from "react-icons/lu";
import { LuArrowUpAZ as DescAbcIcon } from "react-icons/lu";
import { RiSortNumberAsc as AscNumIcon } from "react-icons/ri";
import { RiSortNumberDesc as DescNumIcon } from "react-icons/ri";

import { RiSortNumberDesc as Icon } from "react-icons/ri";
import { SiMaterialdesignicons as MaterialIcon } from "react-icons/si";
import { LuTimer as TimerIcon } from "react-icons/lu";
import { MdOutlineCorporateFare as CustomerIcon } from "react-icons/md";
import { AiOutlineFieldNumber } from "react-icons/ai";
import { TbNumber as RefIcon } from "react-icons/tb";
import { GrStatusInfo as StatusIcon } from "react-icons/gr";

// Styles
import "./CollectionTable.scss";

export default function CollectionTable({
    searchValue,
    showTodayOnly,
    activeStatuses,
}) {
    const dispatch = useDispatch();

    const {
        collections: collectionsList,
        loading,
        error,
    } = useSelector((state) => state.collections);

    /** 🔃 SORT STATE */
    const [sortConfig, setSortConfig] = useState({
        key: "checkedInAt", // Default ordering: "checkedInAt", "materialName", etc.
        direction: "desc", // "asc" or "desc"
    });

    useEffect(() => {
        dispatch(fetchAllCollections());
    }, [dispatch]);

    const isToday = (dateString) => {
        const today = new Date();
        const date = new Date(dateString);

        return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        );
    };

    /** 🔍 FILTER */
    const filteredCollections = useMemo(() => {
        return collectionsList.filter((collection) => {
            const searchLower = searchValue.toLowerCase();

            const searchMatch =
                collection.materialName.toLowerCase().includes(searchLower) ||
                collection.customerName.toLowerCase().includes(searchLower) ||
                collection.collectionRefNum.toLowerCase().includes(searchLower);

            if (showTodayOnly && !isToday(collection.checkedInAt)) {
                return false;
            }

            if (
                activeStatuses &&
                !activeStatuses[collection.currentStatus]
            ) {
                return false;
            }

            return searchMatch;
        });
    }, [collectionsList, searchValue, showTodayOnly, activeStatuses]);

    /** 🔃 SORT (TEXT + DATE SAFE) */
    const sortedCollections = useMemo(() => {
        if (!sortConfig.key) return filteredCollections;

        return [...filteredCollections].sort((a, b) => {
            let aValue;
            let bValue;

            // ⏱ TIMER (DATE)
            if (sortConfig.key === "checkedInAt") {
                aValue = new Date(a.checkedInAt).getTime();
                bValue = new Date(b.checkedInAt).getTime();
            } else {
                // 🔤 TEXT
                aValue = a[sortConfig.key]?.toLowerCase?.() ?? "";
                bValue = b[sortConfig.key]?.toLowerCase?.() ?? "";
            }

            if (aValue < bValue)
                return sortConfig.direction === "asc" ? -1 : 1;
            if (aValue > bValue)
                return sortConfig.direction === "asc" ? 1 : -1;
            return 0;
        });
    }, [filteredCollections, sortConfig]);

    /** 🖱 SORT HANDLER */
    const handleSort = (key) => {
        setSortConfig((prev) => {
            if (prev.key === key) {
                return {
                    key,
                    direction: prev.direction === "asc" ? "desc" : "asc",
                };
            }
            return { key, direction: "asc" };
        });
    };

    /** 🔼🔽 ICON RENDERER (RESERVED SPACE) */
    const renderSortIcon = (key) => {
        const isTimer = key === "checkedInAt";

        // Placeholder icon (keeps width stable)
        if (sortConfig.key !== key) {
            return isTimer ? (
                <AscNumIcon className="icon-placeholder" />
            ) : (
                <AscAbcIcon className="icon-placeholder" />
            );
        }

        // Active sort icon
        if (isTimer) {
            return sortConfig.direction === "asc" ? (
                <AscNumIcon />
            ) : (
                <DescNumIcon />
            );
        }

        return sortConfig.direction === "asc" ? (
            <AscAbcIcon />
        ) : (
            <DescAbcIcon />
        );
    };


    /** ✅ FILTER ACTIVITY CHECKS */
    const isSearchActive = searchValue.trim().length > 0;

    const isStatusFilterActive =
        activeStatuses &&
        Object.values(activeStatuses).some((v) => v === false);

    const isAnyFilterActive =
        isSearchActive || showTodayOnly || isStatusFilterActive;

    if (loading) {
        return (
            <SystemMessage
                variant="loading"
                title="Loading collections"
                message={<>Checking for the latest collections…</>}
            />
        );
    }

    if (error) {
        return (
            <SystemMessage
                variant="error"
                title="Failed to load collections"
                message={
                    <>
                        We couldn't load collections from the server.
                        Please check your connection or try again.
                    </>
                }
                actionLabel="Retry"
                onAction={() => dispatch(fetchAllCollections())}
            />
        );
    }

    return (
        <>
            {/* NO COLLECTIONS */}
            {collectionsList.length === 0 && (
                <SystemMessage
                    variant="error"
                    title="No collections on site"
                    message="All clear for now. New arrivals will appear here."
                />
            )}

            {/* NO RESULTS */}
            {collectionsList.length > 0 &&
                sortedCollections.length === 0 &&
                isAnyFilterActive && (
                    <SystemMessage
                        variant="empty"
                        icon={<SearchIcon />}
                        title="No results found"
                        message="No collections match your search criteria. Try adjusting your filters or search terms."
                    />
                )}

            {/* TABLE */}
            {sortedCollections.length > 0 && (
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
                                    <span className="content-icon" />
                                    <span className="sort-icon">
                                        {renderSortIcon("customerName")}
                                    </span>
                                </span>
                            </th>

                            <th onClick={() => handleSort("collectionRefNum")}>
                                <span className="th-content">
                                    <RefIcon className="content-icon ref-icon" />

                                    <span className="content-text">Reference</span>
                                    <span className="content-icon" />
                                    <span className="sort-icon">
                                        {renderSortIcon("collectionRefNum")}
                                    </span>
                                </span>
                            </th>

                            <th onClick={() => handleSort("currentStatus")}>
                                <span className="th-content">
                                    <StatusIcon className="content-icon" />

                                    <span className="content-text">Status</span>
                                    <span className="content-icon" />
                                    <span className="sort-icon">
                                        {renderSortIcon("currentStatus")}
                                    </span>
                                </span>
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {sortedCollections.map((collection) => (
                            <CollectionTableRow
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
