import { useMemo, useState } from 'react';
import { formatText } from '../../../../utils/formatText';
import { formatTime } from '../../../../utils/formatTime';
import Modal from '../Modal';
import './LorryInfo.css';
import AddCommentForm from '../../../forms/AddCommentForm/AddCommentForm';

export default function LorryInfo({ lorry }) {
    if (!lorry) return null;

    const {
        lorryId,
        regNum,
        materialName,
        customerName,
        collectionRefNum,
        checkedInAt,
        checkedOutAt,
        currentStatus,
        statusHistory
    } = lorry;

    const [isAddCommentModalOpen, setIsAddCommentModalOpen] = useState(false);

    const handCommentClose = () => setIsAddCommentModalOpen(false);

    return (
        <section className="lorry-info">
            <header className="lorry-header">
                <h2>Collection Info</h2>

                <div className="lorry-details">
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
                        <strong>Registration number</strong>
                        <span>{regNum}</span>
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
                {[...statusHistory].reverse().map((entry) => (
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
                                onClick={() => setIsAddCommentModalOpen(true)}
                            >
                                <span aria-hidden>✎</span>
                                <span>Add comment</span>
                            </button>
                        </div>

                        {/* Comments */}
                        {entry.comments?.length > 0 && (
                            <ul className="comments">
                                {[...entry.comments].toReversed().map((comment) => (
                                    <li key={comment.id + comment.timestamp}>
                                        <em>{comment.text}</em>
                                        <div className="comment-meta">
                                            {comment.userId} •{' '}
                                            {formatTime(comment.timestamp)}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>

            <Modal isOpen={isAddCommentModalOpen} onClose={handCommentClose}>
                <AddCommentForm lorryId={lorryId} onCancel={handCommentClose} />
            </Modal>
        </section>
    );
}
