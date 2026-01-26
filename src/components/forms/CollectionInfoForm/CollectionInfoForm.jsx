import { useState } from 'react';
import "../FormStyle.css";
import './CollectionInfoForm.css';
import AddCommentForm from '../AddCommentForm/AddCommentForm';
import Button from "../../ui/button/Button";

import { FaCommentMedical as AddCommentIcon } from 'react-icons/fa6';
import { FaCommentSlash as DontAddCommentIcon } from 'react-icons/fa6';
import { formatText } from '../../../utils/formatText';
import { formatDateTime } from '../../../utils/formatDateTime';
import StatusBadge from '../../table/StatusBadge/StatusBadge';

export default function CollectionInfoForm({ collection, onCancel }) {
    if (!collection) return null;

    const [isAddingComment, setIsAddingComment] = useState(false);

    const {
        id,
        materialName,
        customerName,
        collectionRefNum,
        lorryRegNum,
        checkedInAt,
        checkedOutAt,
        currentStatus,
        statusHistory
    } = collection;

    // store which status entry has the comment form open
    const [activeStatusTimestamp, setActiveStatusTimestamp] = useState(null);

    const toggleCommentForStatus = (timestamp) => {
        setActiveStatusTimestamp((prev) =>
            prev === timestamp ? null : timestamp
        );
    };

    return (
        <section className="form collection-info-form">
            <header className="collection-header">
                <h2>{materialName} • {customerName} • {id}</h2>

                <div className="collection-details">
                    <p>
                        <strong>Material</strong>
                        <span>{materialName}</span>
                    </p>
                    <p>
                        <strong>Customer</strong>
                        <span>{customerName}</span>
                    </p>
                    <p>
                        <strong>Reference number</strong>
                        <span>{collectionRefNum}</span>
                    </p>
                    <p>
                        <strong>Vehicle reg number</strong>
                        <span>{lorryRegNum}</span>
                    </p>
                    <p>
                        <strong>Current status</strong>
                        <span>{formatText(currentStatus)}</span>
                    </p>
                    <p>
                        <strong>Checked in at</strong>
                        <span>{checkedInAt ? formatDateTime(checkedInAt, { date: true, time: true }) : '-'}</span>
                    </p>
                    <p>
                        <strong>Checked out at</strong>
                        <span>{checkedOutAt ? formatDateTime(checkedOutAt, { date: true, time: true }) : '-'}</span>
                    </p>
                </div>
            </header>

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
                                    {/*formatText(entry.status)*/}
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
                                    onClick={() =>
                                        toggleCommentForStatus(entry.timestamp)
                                    }
                                    aria-label={
                                        isOpen
                                            ? 'Cancel add comment'
                                            : 'Add comment'
                                    }
                                >
                                    {isOpen ? (
                                        <DontAddCommentIcon />
                                    ) : (
                                        <AddCommentIcon />
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
                                            userId={entry.updatedBy?.userId || 'System'}
                                            onCancel={() => setActiveStatusTimestamp(null)}
                                            onSubmittingChange={setIsAddingComment}
                                        />
                                    </li>
                                )
                                }

                                {entry.comments
                                    .toReversed()
                                    .map((comment) => (
                                        <li
                                            key={comment.id}
                                        >
                                            <em>{comment.text}</em>
                                            <div className="comment-meta">
                                                {comment.userId} •{' '}
                                                {formatDateTime(comment.timestamp, { time: true })}
                                            </div>
                                        </li>
                                    ))}
                            </ul>
                        </li>
                    );
                })}
            </ul>
            {!isAddingComment && (
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
