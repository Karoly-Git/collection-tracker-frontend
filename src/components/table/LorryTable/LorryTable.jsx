import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LorryTableRow from "../LorryTableRow/LorryTableRow";
import { fetchAllLorries } from "../../../state/lorry/lorrySlice";
import "./LorryTable.css";

export default function LorryTable() {
    const dispatch = useDispatch();

    const { items: lorriesData, loading, error } = useSelector(
        (state) => state.lorries
    );

    useEffect(() => {
        dispatch(fetchAllLorries());
    }, [dispatch]);

    if (loading) return <p>Loading lorries…</p>;
    if (error) return <p>{error}</p>;

    return (
        <table className="lorry-table">
            <thead>
                <tr>
                    <th>Material</th>
                    <th>Customer</th>
                    <th>Ref number</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {lorriesData.map((lorry) => (
                    <LorryTableRow
                        key={lorry.lorryId}
                        lorry={lorry}
                    />
                ))}
            </tbody>
        </table>
    );
}
