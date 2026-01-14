import { useState } from "react";
import "../FormStyle.css";
import Button from "../../ui/button/Button";
import { useDispatch } from "react-redux";
import { addCommentToCollectionStatus } from "../../../state/collection/collectionSlice";

export default function AddCommentForm({
    collectionId,
    statusKey,
    userId, // Will come from login later
    onCancel,
}) {
    const dispatch = useDispatch();
    const [text, setText] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        if (!text.trim()) return;
        await dispatch(
            addCommentToCollectionStatus({
                collectionId,
                statusKey,
                userId,
                text,
            })
        );

        setText("");
        // console.log(text)
        // onCancel();
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
                    className={`btn accept ${!text.trim() ? "disabled" : ""}`}
                />
            </div>
        </form>
    );
}
