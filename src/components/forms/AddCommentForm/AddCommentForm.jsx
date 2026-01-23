import { useState, useEffect, useRef } from "react";
import "../FormStyle.css";

import { useDispatch, useSelector } from "react-redux";

import Button from "../../ui/button/Button";
import Spinner from "../../ui/Spinner/Spinner";

import { addCommentToCollectionStatus } from "../../../state/collection/collectionSlice";

export default function AddCommentForm({
    collectionId,
    statusKey,
    userId,
    onCancel,
}) {
    const dispatch = useDispatch();

    /* ---------- Redux state ---------- */
    const { addCommentLoading, addCommentError } = useSelector(
        (state) => state.collections
    );

    /* ---------- Local state ---------- */
    const [text, setText] = useState("");

    const textareaRef = useRef(null);

    /* ---------- Auto focus ---------- */
    useEffect(() => {
        textareaRef.current?.focus();
    }, []);

    /* ---------- Submit ---------- */
    async function handleSubmit(e) {
        e.preventDefault();
        e.stopPropagation();

        if (!text.trim() || addCommentLoading) return;

        try {
            await dispatch(
                addCommentToCollectionStatus({
                    collectionId,
                    statusKey,
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
            {addCommentLoading && (
                <div className="form-header">
                    <Spinner size={22} inline />
                    <span>Adding comment… Please wait</span>
                </div>
            )}

            {addCommentError && !addCommentLoading && (
                <div className="form-header error">
                    <span>❌ {addCommentError}</span>
                </div>
            )}

            {/* ---------- Textarea ---------- */}
            <textarea
                ref={textareaRef}
                placeholder="Write your comment here..."
                value={text}
                disabled={addCommentLoading}
                onChange={(e) => setText(e.target.value)}
            />

            {/* ---------- Actions ---------- */}
            <div className="actions">
                {/*<Button
                    type="button"
                    text="Cancel"
                    className="btn reject"
                    onClick={onCancel}
                    disabled={addCommentLoading}
                />*/}

                <Button
                    type="submit"
                    text={addCommentLoading ? "Adding…" : "Add Comment"}
                    className={`btn accept ${!text.trim() || addCommentLoading ? "disabled" : ""
                        }`}
                    disabled={!text.trim() || addCommentLoading}
                />
            </div>
        </form>
    );
}
