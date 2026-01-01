import { API_URL } from "./config";

export const getAllLorries = async () => {
    const response = await fetch(`${API_URL}/lorries`, {
        method: "GET",
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch lorries (${response.status})`);
    }

    return response.json();
};

export const getLorryById = async (id) => {
    const response = await fetch(`${API_URL}/lorries/${id}`, {
        method: "GET",
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch lorry with ID ${id} (${response.status})`);
    }

    return response.json();
};

export const deleteLorry = async (id) => {
    const response = await fetch(`${API_URL}/lorries/${id}/delete`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error(`Failed to delete lorry with ID ${id} (${response.status})`);
    }

    return response.json();
};
