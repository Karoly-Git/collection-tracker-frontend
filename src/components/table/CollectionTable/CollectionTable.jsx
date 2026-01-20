// React & Redux
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// State
import { fetchAllCollections } from "../../../state/collection/collectionSlice";

// Components
import CollectionTableRow from "../CollectionTableRow/CollectionTableRow";
import SystemMessage from "../../ui/SystemMessage/SystemMessage";

// Icons
import { IoSearchSharp as SearchIcon } from "react-icons/io5";

// Styles
import "./CollectionTable.css";

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

    const filteredCollections = collectionsList.filter((collection) => {
        const searchLower = searchValue.toLowerCase();

        /** 🔍 SEARCH FILTER */
        const searchMatch =
            collection.materialName.toLowerCase().includes(searchLower) ||
            collection.customerName.toLowerCase().includes(searchLower) ||
            collection.collectionRefNum.toLowerCase().includes(searchLower);

        /** 📅 TODAY FILTER */
        if (showTodayOnly && !isToday(collection.checkedInAt)) {
            return false;
        }

        /** ✅ STATUS FILTER */
        if (
            activeStatuses &&
            !activeStatuses[collection.currentStatus]
        ) {
            return false;
        }

        return searchMatch;
    });

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
            {/* NO COLLECTIONS AT ALL */}
            {collectionsList.length === 0 && (
                <SystemMessage
                    variant="error"
                    title="No collections on site"
                    message={
                        <>All clear for now. New arrivals will appear here.</>
                    }
                />
            )}

            {/* FILTERED BUT NO RESULTS */}
            {collectionsList.length > 0 &&
                filteredCollections.length === 0 &&
                isAnyFilterActive && (
                    <SystemMessage
                        variant="empty"
                        icon={<SearchIcon />}
                        title="No results found"
                        message="No collections match your search criteria. Try adjusting your filters or search terms."
                    />
                )}

            {/* TABLE */}
            {filteredCollections.length > 0 && (
                <table className="collection-table">
                    <thead>
                        <tr>
                            <th>Timer</th>
                            <th>Material</th>
                            <th>Customer</th>
                            <th>Reference</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCollections.map((collection) => (
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
