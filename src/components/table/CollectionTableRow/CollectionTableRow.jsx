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
import { formatDateTime } from "../../../utils/formatDateTime";

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
                <div className="cell-content material-name">
                    <div>{id} {materialName}</div>
                </div>

                <div className="time-checked-in">
                    {formatDateTime(checkedInAt, { date: true, time: true })}
                </div>
            </td>

            <td>
                <div className="cell-content customer-name">
                    {customerName}
                </div>
            </td>

            <td>
                <div className="cell-content collection-ref-number">
                    {collectionRefNum}
                </div>
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
