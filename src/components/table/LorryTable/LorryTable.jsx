import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LorryTableRow from "../LorryTableRow/LorryTableRow";
import { fetchAllLorries } from "../../../state/lorry/lorrySlice";
import "./LorryTable.css";

export default function LorryTable() {
    const dispatch = useDispatch();

    const { items: lorriesList, loading, error } = useSelector(
        (state) => state.lorries
    );

    useEffect(() => {
        dispatch(fetchAllLorries());
    }, [dispatch]);

    if (loading) return <p>Loading lorries…</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            {lorriesList.length === 0 && (
                <div className="no-lorry-msg">
                    <div className="icon">🚚</div>
                    <h2>No lorries on site</h2>
                    <p>All clear for now. New arrivals will appear here.</p>
                </div>
            )}
            {lorriesList.length !== 0 && (
                <table className="lorry-table" >
                    <thead>
                        <tr>
                            <th>Material</th>
                            <th>Customer</th>
                            <th>Reference</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>

                        {lorriesList.map((lorry) => (
                            <LorryTableRow
                                key={lorry.lorryId}
                                lorry={lorry}
                            />
                        ))}
                    </tbody>
                </table >
            )}
        </>
    );
}
