import { useState } from "react";
import StatusBadge from "../statusBadge/StatusBadge";
import type { Lorry } from "../../../types/lorry";
import "./LorryTableRow.css";
import { BsInfoCircle as InfoIco } from "react-icons/bs";
import { RiDeleteBin2Line as BinIco } from "react-icons/ri";

interface LorryTableRowProps {
    lorry: Lorry;
}

export default function LorryTableRow({ lorry }: LorryTableRowProps) {
    const [userLoggedIn, setUserLoggedIn] = useState<boolean>(true);

    const {
        materialName,
        customerName,
        collectionRefNum,
        currentStatus
    } = lorry;

    function handleInfoClick(lorryId: string): void {
        console.log("Info clicked for lorry:", lorryId);
    }

    function handleDeleteClick(lorryId: string): void {
        console.log("Delete clicked for lorry:", lorryId);
    }

    return (
        <tr className="lorry-table-row">
            <td className="material-name">{materialName}</td>
            <td className="customer-name">{customerName}</td>
            <td className="collection-ref-number">{collectionRefNum}</td>

            <StatusBadge
                currentStatus={currentStatus}
                lorryId={lorry.lorryId}
            />

            <td className="action">
                <button
                    className="icon-btn info"
                    aria-label="View details"
                    onClick={() => handleInfoClick(lorry.lorryId)}
                >
                    <InfoIco />
                </button>

                {userLoggedIn && (
                    <button
                        className="icon-btn delete"
                        aria-label="Delete lorry"
                        onClick={() => handleDeleteClick(lorry.lorryId)}
                    >
                        <BinIco />
                    </button>
                )}
            </td>
        </tr>
    );
}
