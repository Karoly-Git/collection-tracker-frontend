import { useEffect } from "react";
import LorryTableRow from "../LorryTableRow/LorryTableRow";
import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import { fetchLorries } from "../../../state/lorries.slice";
import "./LorryTable.css";

export default function LorryTable() {
    const dispatch = useAppDispatch();

    const { items: lorriesData, loading, error } = useAppSelector(
        state => state.lorries
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
                {lorriesData.map(lorry => (
                    <LorryTableRow
                        key={lorry.lorryId}
                        lorry={lorry}
                    />
                ))}
            </tbody>
        </table>
    );
}
