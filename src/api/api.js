import { API_URL } from "./config";

export const getAllCollections = async () => {
    const response = await fetch(`${API_URL}/collections`, {
        method: "GET",
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch collections (${response.status})`);
    }

    return response.json();
};

export const getCollectionById = async (id) => {
    const response = await fetch(`${API_URL}/collections/${id}`, {
        method: "GET",
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch collection with ID ${id} (${response.status})`);
    }

    return response.json();
};

export const deleteCollection = async (id) => {
    const response = await fetch(`${API_URL}/collections/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error(`Failed to delete collection with ID ${id} (${response.status})`);
    }

    return response.json();
};

export const updateCollectionStatus = async ({
    collectionId,
    newStatus,
    userId,
    comment,
}) => {
    const response = await fetch(
        `${API_URL}/collections/${collectionId}/status`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                newStatus, // REQUIRED
                updatedByUserId: userId, // REQUIRED
                comment: comment || "", // OPTIONAL
            }),
        }
    );

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update status");
    }

    return response.json();
};

export const addCommentUnderStatus = async ({ collectionId, statusKey, userId, text }) => {
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
            }),
        }
    );

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to add comment");
    }

    return response.json();
}