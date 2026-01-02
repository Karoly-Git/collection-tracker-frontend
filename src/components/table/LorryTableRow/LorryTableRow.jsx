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
        checkedInAt,
        currentStatus,
    } = lorry;

    function handleMaterialClick(lorryId) {
        console.log("Material name clicked for lorry:", lorryId);
    }

    function handleCustomerClick(lorryId) {
        console.log("Customer name clicked for lorry:", lorryId);
    }

    function handleRefNumClick(lorryId) {
        console.log("Reference number clicked for lorry:", lorryId);
    }

    function handleInfoClick() {
        console.log("Info clicked for lorry:", lorry);
    }

    function handleDeleteClick(lorryId) {
        dispatch(deleteLorryById(lorryId));
    }

    return (
        <tr className="lorry-table-row">
            <td>
                <button
                    className="cell-btn material-name"
                    aria-label="Change material name"
                    onClick={() => handleMaterialClick(lorryId)}
                >
                    <div>{materialName}</div>
                </button>
                <div className="time-checked-in">
                    {new Date(checkedInAt).toLocaleTimeString('en-GB', { timeStyle: 'short' })}
                </div>
            </td>

            <td>
                <button
                    className="cell-btn customer-name"
                    aria-label="Change customer name"
                    onClick={() => handleCustomerClick(lorryId)}
                >
                    {customerName}
                </button>
            </td>

            <td>
                <button
                    className="cell-btn collection-ref-number"
                    aria-label="Change collection reference number"
                    onClick={() => handleRefNumClick(lorryId)}
                >
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
        </tr >
    );
}
