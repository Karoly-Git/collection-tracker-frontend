import { useState } from "react";
import { useDispatch } from "react-redux";
import "../FormStyle.css";
import Button from "../../ui/button/Button";
import { addCommentToStatus } from "../../../state/collection/collectionSlice";

export default function AddCommentForm({
    collectionId,
    statusKey,
    userId,
    onCancel,
}) {
    const dispatch = useDispatch();
    const [text, setText] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        if (!text.trim()) return;

        console.log(collectionId, statusKey, userId, text);

        const result = dispatch(
            addCommentToStatus({
                collectionId,
                statusKey,
                userId,
                text,
            })
        );

        // Only reset + close if request succeeded
        if (addCommentToStatus.fulfilled.match(result)) {
            setText("");
            onCancel();
        }
    }

    return (
        <form className="form add-comment-form" onSubmit={handleSubmit}>
            <textarea
                placeholder="Write your comment here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            <div className="actions">
                <Button
                    type="button"
                    text="Cancel"
                    className="btn reject"
                    onClick={onCancel}
                />

                <Button
                    type="submit"
                    text="Add Comment"
                    className="btn accept"
                />
            </div>
        </form>
    );
}
