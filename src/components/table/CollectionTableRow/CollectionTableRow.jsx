// React
import { useDispatch } from "react-redux";

// Redux slices
import {
    openModal,
    setClickedCollectionId,
} from "../../../state/collection/modalSlice";

// Icons
import { BsInfoCircle as InfoIcon } from "react-icons/bs";
import { RiDeleteBin2Line as BinIcon } from "react-icons/ri";

// Utils
import { formatTime } from "../../../utils/formatTime";

// UI Components
import Button from "../../ui/button/Button";
import StatusBadge from "../StatusBadge/StatusBadge";

// Styles
import "./CollectionTableRow.css";

const userLoggedIn = true;

export default function CollectionTableRow({ collection }) {
    const dispatch = useDispatch();

    const handleOpenModal = (name, collectionId) => {
        dispatch(setClickedCollectionId(collectionId));
        dispatch(openModal({ name }));
    };

    const {
        id,
        materialName,
        customerName,
        collectionRefNum,
        checkedInAt,
        currentStatus,
    } = collection;

    return (
        <tr className="collection-table-row">
            <td>
                <button className="cell-btn material-name">
                    <div>{id} {materialName}</div>
                </button>

                <div className="time-checked-in">
                    {formatTime(checkedInAt)}
                </div>
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
                onClick={() => handleOpenModal("status", id)}
            />

            <td className="action">
                <Button
                    icon={InfoIcon}
                    className="icon-btn info"
                    onClick={() => handleOpenModal("info", id)}
                />

                {userLoggedIn && (
                    <Button
                        icon={BinIcon}
                        className="icon-btn delete"
                        onClick={() => handleOpenModal("delete", id)}
                    />
                )}
            </td>
        </tr>
    );
}
