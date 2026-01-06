import "../FormStyle.css";

export default function DeleteCollectionForm({ lorryId, onCancel }) {

    async function handleSubmit(e) {
        e.preventDefault();
        // Here you would typically gather form data and dispatch an action
        // to add the comment to the lorry with the given lorryId.
        // For example:
        // const comment = e.target.elements.comment.value;
        // await dispatch(addCommentToLorry({ lorryId, comment }));
        onCancel(); // Close the form after submission
    };
    return (
        <form className="form delete-collection-form" onSubmit={handleSubmit}>
            <div className="actions">
                <button
                    type="button"
                    className="btn cancel"
                    onClick={onCancel}
                >
                    Cancel
                </button>

                <button type="submit" className="btn update">
                    Delete
                </button>
            </div>
        </form>
    )
}
