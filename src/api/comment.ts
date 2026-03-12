const API_URL = import.meta.env.API_URL;

export const addComment = async ({ collectionId, statusKey, userId, text, timestamp }) => {
    const response = await fetch(
        `${API_URL}/comments/collection/${collectionId}/status/${statusKey}/comment`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId, // REQUIRED
                text, // REQUIRED
                timestamp // REQUIRED
            }),
        }
    );

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to add comment");
    }

    return response.json();
};
