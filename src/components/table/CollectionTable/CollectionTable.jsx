// React & Redux
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// State
import { fetchAllCollections } from "../../../state/collection/collectionSlice";

// Components
import CollectionTableRow from "../CollectionTableRow/CollectionTableRow";

// Styles
import "./CollectionTable.css";

export default function CollectionTable() {
    const dispatch = useDispatch();

    const { items: collectionsList, loading, error } = useSelector(
        (state) => state.collections
    );

    useEffect(() => {
        dispatch(fetchAllCollections());
    }, [dispatch]);

    if (loading) return <p>Loading collections…</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            {collectionsList.length === 0 && (
                <div className="no-collection-msg">
                    <div className="icon">🚚</div>
                    <h2>No collections on site</h2>
                    <p>All clear for now. New arrivals will appear here.</p>
                </div>
            )}
            {collectionsList.length !== 0 && (
                <table className="collection-table" >
                    <thead>
                        <tr>
                            <th>Material</th>
                            <th>Customer</th>
                            <th>Reference</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>

                        {collectionsList.map((collection) => (
                            <CollectionTableRow
                                key={collection.id}
                                collection={collection}
                            />
                        ))}
                    </tbody>
                </table >
            )}
        </>
    );
}
