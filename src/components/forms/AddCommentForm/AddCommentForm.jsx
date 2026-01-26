import { useState, useEffect, useRef } from "react";
import "../FormStyle.css";

import { useDispatch, useSelector } from "react-redux";

import Button from "../../ui/button/Button";
import Spinner from "../../ui/Spinner/Spinner";

import { addCommentToCollectionStatus, resetAddCommentState } from "../../../state/collection/collectionSlice";

export default function AddCommentForm({
    collectionId,
    statusKey,
    statusTimestamp, // ✅ NEW
    userId,
    onCancel,
    onSubmittingChange,
}) {
    const dispatch = useDispatch();

    /* ---------- Redux state ---------- */
    const { addCommentLoading, addCommentError, addCommentTarget } = useSelector(
        (state) => state.collections
    );

    /* ---------- Local state ---------- */
    const [text, setText] = useState("");

    const textareaRef = useRef(null);

    /* ---------- Auto focus ---------- */
    useEffect(() => {
        textareaRef.current?.focus();
    }, []);

    // ✅ check if this is the form that is submitting / errored
    const isThisFormTarget =
        addCommentTarget?.collectionId === collectionId &&
        addCommentTarget?.statusKey === statusKey &&
        addCommentTarget?.statusTimestamp === statusTimestamp;

    /* ---------- Inform parent when redux loading changes ---------- */
    useEffect(() => {
        // Only hide Close while THIS form is actively submitting
        onSubmittingChange?.(addCommentLoading && isThisFormTarget);

        return () => {
            onSubmittingChange?.(false);
        };
    }, [addCommentLoading, isThisFormTarget, onSubmittingChange]);

    /* ---------- Submit ---------- */
    async function handleSubmit(e) {
        e.preventDefault();
        e.stopPropagation();

        if (!text.trim() || (addCommentLoading && isThisFormTarget)) return;

        try {
            await dispatch(
                addCommentToCollectionStatus({
                    collectionId,
                    statusKey,
                    statusTimestamp, // ✅ NEW
                    userId,
                    text,
                    timestamp: new Date().toISOString(),
                })
            ).unwrap();

            setText("");
            onCancel(); // ✅ only on success
        } catch {
            // error handled in Redux state
        }
    }

    return (
        <form className="form add-comment-form" onSubmit={handleSubmit}>
            {/* ---------- Status header ---------- */}
            {addCommentLoading && isThisFormTarget && (
                <div className="form-header">
                    <Spinner size={22} inline />
                    <span>Adding comment… Please wait</span>
                </div>
            )}

            {addCommentError && !addCommentLoading && isThisFormTarget && (
                <div className="form-header error">
                    <span>❌ {addCommentError}</span>
                </div>
            )}

            {/* ---------- Textarea ---------- */}
            <textarea
                ref={textareaRef}
                placeholder="Write your comment here..."
                value={text}
                disabled={addCommentLoading && isThisFormTarget}
                onChange={(e) => {
                    // ✅ Clear the error as soon as user types again
                    if (addCommentError) {
                        dispatch(resetAddCommentState());
                    }

                    setText(e.target.value);
                }}
            />

            {/* ---------- Actions ---------- */}
            <div className="actions">
                <Button
                    type="submit"
                    text={
                        addCommentLoading && isThisFormTarget
                            ? "Adding comment…"
                            : addCommentError && isThisFormTarget
                                ? "Retry Add Comment"
                                : "Add Comment"
                    }
                    className={`btn accept ${!text.trim() || (addCommentLoading && isThisFormTarget) ? "disabled" : ""
                        }`}
                    disabled={!text.trim() || (addCommentLoading && isThisFormTarget)}
                />
            </div>
        </form>
    );
}
