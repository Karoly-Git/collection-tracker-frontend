import { useState } from 'react';
import "../FormStyle.css";
import './CollectionInfoForm.css';
import AddCommentForm from '../AddCommentForm/AddCommentForm';
import Button from "../../ui/button/Button";

import { FaCommentMedical as AddCommentIcon } from 'react-icons/fa6';
import { FaCommentSlash as DontAddCommentIcon } from 'react-icons/fa6';
import { formatText } from '../../../utils/formatText';
import { formatTime } from '../../../utils/formatTime';

export default function CollectionInfoForm({ collection, onCancel }) {
    if (!collection) return null;

    const {
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
                <h2>Collection Info</h2>

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
                        <span>{checkedInAt ? formatTime(checkedInAt) : '-'}</span>
                    </p>
                    <p>
                        <strong>Checked out at</strong>
                        <span>{checkedOutAt ? formatTime(checkedOutAt) : '-'}</span>
                    </p>
                </div>
            </header>

            <h3>Status History</h3>

            <ul className="status-history">
                {[...statusHistory].reverse().map((entry) => {
                    const isOpen = activeStatusTimestamp === entry.timestamp;

                    return (
                        <li
                            key={entry.timestamp}
                            className={`status-entry ${entry.status}`}
                        >
                            {/* Status header */}
                            <div className="status-header">
                                <strong className="status-title">
                                    {formatText(entry.status)}
                                </strong>
                                <span className="timestamp">
                                    {formatTime(entry.timestamp)}
                                </span>
                            </div>

                            {/* Meta row */}
                            <div className="updated-by">
                                <span>
                                    Updated by {entry.updatedBy?.userId ?? 'System'}
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
                                            onCancel={() =>
                                                setActiveStatusTimestamp(null)
                                            }
                                        />
                                    </li>
                                )
                                }

                                {[...entry.comments]
                                    .toReversed()
                                    .map((comment) => (
                                        <li
                                            key={
                                                comment.id +
                                                comment.timestamp
                                            }
                                        >
                                            <em>{comment.text}</em>
                                            <div className="comment-meta">
                                                {comment.userId} •{' '}
                                                {formatTime(
                                                    comment.timestamp
                                                )}
                                            </div>
                                        </li>
                                    ))}
                            </ul>
                        </li>
                    );
                })}
            </ul>
            <div className="actions">
                <Button
                    type="button"
                    text="Close"
                    className="btn reject"
                    onClick={onCancel}
                />
            </div>
        </section>
    );
}
