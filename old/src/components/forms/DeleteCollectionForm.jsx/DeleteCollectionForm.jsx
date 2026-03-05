import "../FormStyle.scss";
import "./DeleteCollectionForm.scss";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "../../ui/button/Button";
import Spinner from "../../ui/Spinner/Spinner";

import { deleteCollectionById } from "../../../state/collection/collectionSlice";

import { FaCheck, FaExclamationTriangle } from "react-icons/fa";
import { BsFillQuestionCircleFill } from "react-icons/bs";

const AUTO_CLOSE_SECONDS = 10;

export default function DeleteCollectionForm({ onCancel }) {
    const dispatch = useDispatch();

    /* ---------- Local state ---------- */
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [error, setError] = useState(null);
    const [secondsLeft, setSecondsLeft] = useState(AUTO_CLOSE_SECONDS);

    /* ---------- Redux state ---------- */
    const collectionId = useSelector((state) => state.modal.clickedCollectionId);

    const { loading, collections } = useSelector((state) => state.collections);

    const collection = collections.find((c) => c.id === collectionId);

    const isBusy = isSubmitting || loading;

    /* ---------- Auto close after success ---------- */
    useEffect(() => {
        if (!isDeleted) return;

        setSecondsLeft(AUTO_CLOSE_SECONDS);

        const interval = setInterval(() => {
            setSecondsLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [isDeleted]);

    useEffect(() => {
        if (secondsLeft <= 0 && isDeleted) {
            onCancel();
        }
    }, [secondsLeft, isDeleted, onCancel]);

    /* ---------- Submit ---------- */
    async function handleSubmit(e) {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);
        setError(null);

        try {
            await dispatch(deleteCollectionById(collectionId)).unwrap();
            setIsDeleted(true);
        } catch (err) {
            console.error("Delete failed:", err);

            // ✅ CHANGED: show real thunk error message if available
            setError(err || "Failed to delete the collection. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    const materialName = collection?.materialName;
    const collectionRefNum = collection?.collectionRefNum;

    /* ---------- Header content ---------- */
    const renderHeader = () => {
        if (isDeleted) {
            return (
                <>
                    <FaCheck className="icon success" />
                    <span>Collection deleted successfully</span>
                </>
            );
        }

        if (error) {
            return (
                <>
                    <FaExclamationTriangle className="icon warning" />
                    <span>{error}</span>
                </>
            );
        }

        if (isBusy) {
            return (
                <>
                    <Spinner size={26} inline />
                    <span>Deleting collection… Please wait</span>
                </>
            );
        }

        return (
            <>
                <BsFillQuestionCircleFill className="icon warning" />
                <span>Are you sure you want to delete this collection?</span>
            </>
        );
    };

    return (
        <form className="form delete-collection-form" onSubmit={handleSubmit}>
            <div className="form-header">
                <h2
                    className={`warning-text ${isDeleted ? "success" : error ? "error" : ""}`}
                    aria-live="polite"
                >
                    {renderHeader()}
                </h2>

                {isDeleted && (
                    <p className="auto-close-text">
                        (Auto closing in <strong>{secondsLeft}</strong> second
                        {secondsLeft !== 1 ? "s" : ""})
                    </p>
                )}
            </div>

            {/* Identifier (only when idle or error) */}
            {!isDeleted && !isBusy && (
                <div className="identifier">
                    <div className="identifier-row">
                        <span className="label">Material:</span>
                        <span className="value">{materialName}</span>
                    </div>

                    <div className="identifier-row">
                        <span className="label">Reference:</span>
                        <span className="value">{collectionRefNum}</span>
                    </div>
                </div>
            )}

            <div className="actions">
                {isDeleted && (
                    <Button type="button" text="Close" className="btn accept" onClick={onCancel} />
                )}

                {!isDeleted && !isBusy && (
                    <>
                        <Button
                            type="button"
                            text="Cancel"
                            className="btn reject"
                            onClick={onCancel}
                        />

                        <Button
                            type="submit"
                            text={error ? "Retry Delete" : "Delete Collection"}
                            className={`btn delete ${isBusy ? "disabled" : ""}`} // ✅ CHANGED
                            disabled={isBusy} // ✅ CHANGED
                        />
                    </>
                )}
            </div>
        </form>
    );
}
