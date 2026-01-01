import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LorryTableRow from "../LorryTableRow/LorryTableRow";
import { fetchLorries } from "../../../state/lorries.slice";
import "./LorryTable.css";

export default function LorryTable() {
    const dispatch = useDispatch();

    const { items: lorriesData, loading, error } = useSelector(
        (state) => state.lorries
    );

    useEffect(() => {
        dispatch(fetchLorries());
    }, [dispatch]);

    if (loading) return <p>Loading lorries…</p>;
    if (error) return <p>{error}</p>;

    return (
        <table>
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
