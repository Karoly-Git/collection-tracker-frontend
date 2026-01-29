import { useEffect, useMemo, useState } from "react";
import "../FormStyle.css";
import "./InfoForm.css";
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

import { COLLECTION_STATUSES } from "../../../constants/collection-statuses";
import { CUSTOMER_NAMES } from "../../../constants/customer-names";
import { MATERIAL_NAMES } from "../../../constants/material-names";

export default function InfoForm({ collection, onCancel }) {
    const dispatch = useDispatch();

    const [isAddingComment, setIsAddingComment] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    // store which status entry has the comment form open
    const [activeStatusTimestamp, setActiveStatusTimestamp] = useState(null);

    // helper: create draft from backend collection data
    const buildDraftFromCollection = (c) => ({
        materialName: c.materialName,
        customerName: c.customerName,
        collectionRefNum: c.collectionRefNum,
        lorryRegNum: c.lorryRegNum || "",
        checkedInAt: c.checkedInAt,
        startedLoadingAt: c.startedLoadingAt,
        finishedLoadingAt: c.finishedLoadingAt,
        checkedOutAt: c.checkedOutAt,
        currentStatus: c.currentStatus,
    });

    // local draft (editable fields)
    const [draft, setDraft] = useState(() =>
        collection ? buildDraftFromCollection(collection) : null
    );

    // keep draft in sync when a *different* collection is opened
    useEffect(() => {
        if (!collection) return;
        setDraft(buildDraftFromCollection(collection));
        setIsEditing(false);
        setActiveStatusTimestamp(null);
        dispatch(resetAddCommentState());
    }, [collection, dispatch]);

    // early return after hooks (important!)
    if (!collection || !draft) return null;

    // only destructure what should remain fixed (not editable)
    const { id, statusHistory } = collection;

    // status order (rules)
    const STATUS_ORDER = useMemo(
        () => [
            COLLECTION_STATUSES.CHECKED_IN,
            COLLECTION_STATUSES.LOADING,
            COLLECTION_STATUSES.LOADED,
            COLLECTION_STATUSES.CHECKED_OUT,
        ],
        []
    );

    // map status -> timestamp field in draft
    const STATUS_TIMESTAMP_FIELD = useMemo(
        () => ({
            [COLLECTION_STATUSES.CHECKED_IN]: "checkedInAt",
            [COLLECTION_STATUSES.LOADING]: "startedLoadingAt",
            [COLLECTION_STATUSES.LOADED]: "finishedLoadingAt",
            [COLLECTION_STATUSES.CHECKED_OUT]: "checkedOutAt",
        }),
        []
    );

    // dropdown should show 1 before/current/1 after
    const currentStatusIndex = STATUS_ORDER.indexOf(draft.currentStatus);

    const allowedStatuses = STATUS_ORDER.filter((_, idx) => {
        return Math.abs(idx - currentStatusIndex) <= 1;
    });

    const toggleCommentForStatus = (timestamp) => {
        dispatch(resetAddCommentState());
        setActiveStatusTimestamp((prev) => (prev === timestamp ? null : timestamp));
    };

    const handleChange = (field, value) => {
        setDraft((prev) => {
            if (!prev) return prev;

            // normal field update
            if (field !== "currentStatus") {
                return { ...prev, [field]: value };
            }

            // status update
            const now = new Date().toISOString();
            const updated = { ...prev, currentStatus: value };

            const newIndex = STATUS_ORDER.indexOf(value);
            const oldIndex = STATUS_ORDER.indexOf(prev.currentStatus);

            // set timestamp for new status ONLY if missing
            const tsField = STATUS_TIMESTAMP_FIELD[value];
            if (tsField && !updated[tsField]) {
                updated[tsField] = now;
            }

            // if moving backwards, clear timestamps after new status
            if (newIndex < oldIndex) {
                for (let i = newIndex + 1; i < STATUS_ORDER.length; i++) {
                    const statusToClear = STATUS_ORDER[i];
                    const fieldToClear = STATUS_TIMESTAMP_FIELD[statusToClear];
                    updated[fieldToClear] = null;
                }
            }

            return updated;
        });
    };

    const handleCancelEdit = () => {
        setDraft(buildDraftFromCollection(collection));
        setIsEditing(false);
    };

    const handleSaveEdit = () => {
        console.log("Saving edited collection details:", draft);
        setIsEditing(false);

        // Later:
        // dispatch(updateCollectionThunk({ id, ...draft }))
    };

    return (
        <section className="form collection-info-form">
            {/* =========================
          COLLECTION DETAILS
      ========================== */}
            <header className="collection-header">
                <div className="collection-title-row">
                    <h2>
                        {draft.materialName} • {draft.customerName} • {id}
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
                            <select
                                value={draft.materialName}
                                onChange={(e) => handleChange("materialName", e.target.value)}
                            >
                                {Object.entries(MATERIAL_NAMES).map(([key, value]) => (
                                    <option key={key} value={value}>
                                        {value}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <span>{draft.materialName}</span>
                        )}
                    </p>

                    <p>
                        <strong>Customer</strong>
                        {isEditing ? (
                            <select
                                value={draft.customerName}
                                onChange={(e) => handleChange("customerName", e.target.value)}
                            >
                                {Object.entries(CUSTOMER_NAMES).map(([key, value]) => (
                                    <option key={key} value={value}>
                                        {value}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <span>{draft.customerName}</span>
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
                            <span>{draft.collectionRefNum}</span>
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
                            <span>{draft.lorryRegNum || "-"}</span>
                        )}
                    </p>

                    <p>
                        <strong>Current status</strong>
                        {isEditing ? (
                            <select
                                value={draft.currentStatus}
                                onChange={(e) => handleChange("currentStatus", e.target.value)}
                            >
                                {allowedStatuses.map((status) => (
                                    <option key={status} value={status}>
                                        {formatText(status)}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <span>{formatText(draft.currentStatus)}</span>
                        )}
                    </p>

                    <p>
                        <strong>Checked in at</strong>
                        <span>
                            {draft.checkedInAt
                                ? formatDateTime(draft.checkedInAt, { date: true, time: true })
                                : "-"}
                        </span>
                    </p>

                    <p>
                        <strong>Started loading at</strong>
                        <span>
                            {draft.startedLoadingAt
                                ? formatDateTime(draft.startedLoadingAt, {
                                    date: true,
                                    time: true,
                                })
                                : "-"}
                        </span>
                    </p>

                    <p>
                        <strong>Finished loading at</strong>
                        <span>
                            {draft.finishedLoadingAt
                                ? formatDateTime(draft.finishedLoadingAt, {
                                    date: true,
                                    time: true,
                                })
                                : "-"}
                        </span>
                    </p>

                    <p>
                        <strong>Checked out at</strong>
                        <span>
                            {draft.checkedOutAt
                                ? formatDateTime(draft.checkedOutAt, { date: true, time: true })
                                : "-"}
                        </span>
                    </p>
                </div>

                {/* Save / Cancel only while editing */}
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
                                    disabled={isAddingComment || isEditing}
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
