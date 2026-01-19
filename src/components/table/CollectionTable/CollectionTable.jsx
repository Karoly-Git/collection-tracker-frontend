// React & Redux
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// State
import { fetchAllCollections } from "../../../state/collection/collectionSlice";

// Components
import CollectionTableRow from "../CollectionTableRow/CollectionTableRow";
import ErrorState from "../../ui/error/ErrorState";
import LoadingState from "../../ui/loading/LoadingState";

// Styles
import "./CollectionTable.css";

import { IoSearchSharp as SearchIcon } from "react-icons/io5";

export default function CollectionTable({ searchValue }) {
    const dispatch = useDispatch();

    const { collections: collectionsList, loading, error } = useSelector(
        (state) => state.collections
    );

    const filteredCollections = collectionsList.filter((collection) => {

        const searchLower = searchValue.toLowerCase();
        return (
            collection.materialName.toLowerCase().includes(searchLower) ||
            collection.customerName.toLowerCase().includes(searchLower) ||
            collection.collectionRefNum.toLowerCase().includes(searchLower)
        );
    });

    useEffect(() => {
        dispatch(fetchAllCollections());
    }, [dispatch]);

    if (loading) {
        return (
            <LoadingState
                title="Loading collections"
                message="Checking for the latest collections…"
            />
        );
    }
    if (error) {
        return (
            <ErrorState
                title="Failed to load collections"
                message="We couldn't load collections from the server. Please check your connection or try again."
                actionLabel="Retry"
                onAction={() => dispatch(fetchAllCollections())}
            />
        );
    }

    return (
        <>
            {/* No collections at all */}
            {collectionsList.length === 0 && !loading && !error && (
                <div className="no-collection-msg">
                    <div className="icon">🚚</div>
                    <h2>No collections on site</h2>
                    <p>All clear for now. New arrivals will appear here.</p>
                </div>
            )}

            {/* No search results */}
            {collectionsList.length > 0 && filteredCollections.length === 0 && searchValue && (
                <div className="no-collection-msg">
                    <SearchIcon className="icon" />
                    <h2>No results found</h2>
                    <p>
                        No collections match "<strong>{searchValue}</strong>"
                    </p>
                </div>
            )}

            {/* Table */}
            {filteredCollections.length > 0 && (
                <table className="collection-table">
                    <thead>
                        <tr>
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
