import { useState } from "react";
import "../FormStyle.css";
import "./CollectionInfoForm.css";
import AddCommentForm from "../AddCommentForm/AddCommentForm";
import Button from "../../ui/button/Button";

import { FaCommentMedical as AddCommentIcon } from "react-icons/fa6";
import { FaCommentSlash as DontAddCommentIcon } from "react-icons/fa6";
import { MdEdit as EditIcon } from "react-icons/md";

import { formatText } from "../../../utils/formatText";
import { formatDateTime } from "../../../utils/formatDateTime";
import StatusBadge from "../../table/StatusBadge/StatusBadge";

import { useDispatch } from "react-redux";
import { resetAddCommentState } from "../../../state/collection/collectionSlice";

export default function CollectionInfoForm({ collection, onCancel }) {
    if (!collection) return null;

    const dispatch = useDispatch();

    const [isAddingComment, setIsAddingComment] = useState(false);

    const {
        id,
        materialName,
        customerName,
        collectionRefNum,
        lorryRegNum,
        checkedInAt,
        startedLoadingAt,
        finishedLoadingAt,
        checkedOutAt,
        currentStatus,
        statusHistory,
    } = collection;

    // ✅ store which status entry has the comment form open
    const [activeStatusTimestamp, setActiveStatusTimestamp] = useState(null);

    const toggleCommentForStatus = (timestamp) => {
        dispatch(resetAddCommentState());
        setActiveStatusTimestamp((prev) => (prev === timestamp ? null : timestamp));
    };

    // ✅ NEW: Edit mode for collection details
    const [isEditing, setIsEditing] = useState(false);

    // ✅ Local draft (editable fields)
    const [draft, setDraft] = useState({
        materialName,
        customerName,
        collectionRefNum,
        lorryRegNum: lorryRegNum || "",
    });

    const handleChange = (field, value) => {
        setDraft((prev) => ({ ...prev, [field]: value }));
    };

    const handleCancelEdit = () => {
        setDraft({
            materialName,
            customerName,
            collectionRefNum,
            lorryRegNum: lorryRegNum || "",
        });
        setIsEditing(false);
    };

    const handleSaveEdit = () => {
        // ✅ Later: dispatch update thunk here
        console.log("Saving edited collection details:", draft);

        setIsEditing(false);
    };

    return (
        <section className="form collection-info-form">
            {/* =========================
          COLLECTION DETAILS
      ========================== */}
            <header className="collection-header">
                <div className="collection-title-row">
                    <h2>
                        {materialName} • {customerName} • {id}
                    </h2>

                    {!isEditing && (
                        <button
                            type="button"
                            className="edit-details-btn"
                            onClick={() => setIsEditing(true)}
                            disabled={isAddingComment}
                            aria-label="Edit collection details"
                            title="Edit collection details"
                        >
                            <EditIcon className="edit-icon" />
                            Edit details
                        </button>
                    )}
                </div>

                <div className="collection-details">
                    <p>
                        <strong>Material</strong>
                        {isEditing ? (
                            <input
                                value={draft.materialName}
                                onChange={(e) => handleChange("materialName", e.target.value)}
                            />
                        ) : (
                            <span>{materialName}</span>
                        )}
                    </p>

                    <p>
                        <strong>Customer</strong>
                        {isEditing ? (
                            <input
                                value={draft.customerName}
                                onChange={(e) => handleChange("customerName", e.target.value)}
                            />
                        ) : (
                            <span>{customerName}</span>
                        )}
                    </p>

                    <p>
                        <strong>Reference number</strong>
                        {isEditing ? (
                            <input
                                value={draft.collectionRefNum}
                                onChange={(e) =>
                                    handleChange("collectionRefNum", e.target.value)
                                }
                            />
                        ) : (
                            <span>{collectionRefNum}</span>
                        )}
                    </p>

                    <p>
                        <strong>Vehicle reg number</strong>
                        {isEditing ? (
                            <input
                                value={draft.lorryRegNum}
                                onChange={(e) => handleChange("lorryRegNum", e.target.value)}
                            />
                        ) : (
                            <span>{lorryRegNum || "-"}</span>
                        )}
                    </p>

                    <p>
                        <strong>Current status</strong>
                        <span>{formatText(currentStatus)}</span>
                    </p>

                    <p>
                        <strong>Checked in at</strong>
                        <span>
                            {checkedInAt
                                ? formatDateTime(checkedInAt, { date: true, time: true })
                                : "-"}
                        </span>
                    </p>

                    <p>
                        <strong>Started loading at</strong>
                        <span>
                            {startedLoadingAt
                                ? formatDateTime(startedLoadingAt, { date: true, time: true })
                                : "-"}
                        </span>
                    </p>

                    <p>
                        <strong>Finished loading at</strong>
                        <span>
                            {finishedLoadingAt
                                ? formatDateTime(finishedLoadingAt, { date: true, time: true })
                                : "-"}
                        </span>
                    </p>

                    <p>
                        <strong>Checked out at</strong>
                        <span>
                            {checkedOutAt
                                ? formatDateTime(checkedOutAt, { date: true, time: true })
                                : "-"}
                        </span>
                    </p>
                </div>

                {/* ✅ Save / Cancel only while editing */}
                {isEditing && (
                    <div className="actions">
                        <Button
                            type="button"
                            text="Cancel"
                            className="btn reject"
                            onClick={handleCancelEdit}
                            disabled={isAddingComment}
                        />
                        <Button
                            type="button"
                            text="Save"
                            className="btn accept"
                            onClick={handleSaveEdit}
                            disabled={isAddingComment}
                        />
                    </div>
                )}
            </header>

            {/* =========================
          STATUS HISTORY
      ========================== */}
            <h3>Status History</h3>

            <ul className="status-history">
                {statusHistory.toReversed().map((entry) => {
                    const isOpen = activeStatusTimestamp === entry.timestamp;

                    return (
                        <li
                            key={`${id}-${entry.status}-${entry.timestamp}`}
                            className={`status-entry ${entry.status}`}
                        >
                            {/* Status header */}
                            <div className="status-header">
                                <strong className="status-title">
                                    <StatusBadge currentStatus={entry.status} isDiv={true} />
                                </strong>

                                <span className="timestamp">
                                    {formatDateTime(entry.timestamp, { time: true })}
                                </span>
                            </div>

                            {/* Meta row */}
                            <div className="updated-by">
                                <span>
                                    Status updated by: <strong>{entry.updatedByUserId}</strong>
                                </span>

                                <button
                                    type="button"
                                    onClick={() => toggleCommentForStatus(entry.timestamp)}
                                    aria-label={isOpen ? "Cancel add comment" : "Add comment"}
                                    disabled={isAddingComment || isEditing} // ✅ disable while editing too
                                >
                                    {isOpen ? (
                                        !isAddingComment && <DontAddCommentIcon />
                                    ) : (
                                        !isAddingComment && <AddCommentIcon />
                                    )}
                                </button>
                            </div>

                            {/* Comments */}
                            <ul className="comments">
                                {isOpen && (
                                    <li>
                                        <AddCommentForm
                                            collectionId={id}
                                            statusKey={entry.status}
                                            statusTimestamp={entry.timestamp}
                                            userId={entry.updatedBy?.userId || "System"}
                                            onCancel={() => {
                                                dispatch(resetAddCommentState());
                                                setActiveStatusTimestamp(null);
                                            }}
                                            onSubmittingChange={setIsAddingComment}
                                        />
                                    </li>
                                )}

                                {entry.comments.toReversed().map((comment) => (
                                    <li key={comment.id}>
                                        <em>{comment.text}</em>
                                        <div className="comment-meta">
                                            {comment.userId} •{" "}
                                            {formatDateTime(comment.timestamp, { time: true })}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    );
                })}
            </ul>

            {/* =========================
          CLOSE BUTTON
      ========================== */}
            {!isAddingComment && !isEditing && (
                <div className="actions">
                    <Button
                        type="button"
                        text="Close"
                        className="btn reject"
                        onClick={onCancel}
                    />
                </div>
            )}
        </section>
    );
}
