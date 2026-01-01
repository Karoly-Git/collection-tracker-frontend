import StatusBadge from "../statusBadge/StatusBadge";
import type { Lorry } from "../../../types/lorry";
import { BsInfoCircle as InfoIco } from "react-icons/bs";
import { RiDeleteBin2Line as BinIco } from "react-icons/ri";
import { useAppDispatch } from "../../../state/hooks";
import { deleteLorryById } from "../../../state/lorries.slice";
import "./LorryTableRow.css";

interface LorryTableRowProps {
    lorry: Lorry;
}

export default function LorryTableRow({ lorry }: LorryTableRowProps) {
    const dispatch = useAppDispatch();
    const userLoggedIn = true;

    const {
        lorryId,
        materialName,
        customerName,
        collectionRefNum,
        currentStatus
    } = lorry;

    function handleInfoClick(lorryId: string): void {
        console.log("Info clicked for lorry:", lorryId);
    }

    function handleDeleteClick(lorryId: string): void {
        dispatch(deleteLorryById(lorryId));
    }

    return (
        <tr className="lorry-table-row">
            <td>
                <button className="cell-btn material-name">
                    {materialName}
                </button>
            </td>

            <td>
                <button className="cell-btn customer-name">
                    {customerName}
                </button>
            </td>

            <td>
                <button className="cell-btn collection-ref-number">
                    {collectionRefNum}
                </button>
            </td>

            <StatusBadge
                currentStatus={currentStatus}
                lorryId={lorryId}
            />

            <td className="action">
                <button
                    className="icon-btn info"
                    aria-label="View details"
                    onClick={() => handleInfoClick(lorryId)}
                >
                    <InfoIco />
                </button>

                {userLoggedIn && (
                    <button
                        className="icon-btn delete"
                        aria-label="Delete lorry"
                        onClick={() => handleDeleteClick(lorryId)}
                    >
                        <BinIco />
                    </button>
                )}
            </td>
        </tr>
    );
}
