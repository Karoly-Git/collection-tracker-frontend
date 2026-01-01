import StatusBadge from "../statusBadge/StatusBadge";
import { BsInfoCircle as InfoIco } from "react-icons/bs";
import { RiDeleteBin2Line as BinIco } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { deleteLorryById } from "../../../state/lorry/lorrySlice";
import "./LorryTableRow.css";

export default function LorryTableRow({ lorry }) {
    const dispatch = useDispatch();
    const userLoggedIn = true;

    const {
        lorryId,
        materialName,
        customerName,
        collectionRefNum,
        currentStatus,
    } = lorry;

    function handleInfoClick(lorryId) {
        console.log("Info clicked for lorry:", lorryId);
    }

    function handleDeleteClick(lorryId) {
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
