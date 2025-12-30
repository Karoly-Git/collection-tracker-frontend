import type { Lorry } from "../types/lorry";
import { API_URL } from "./config";

export const getAllLorries = async (): Promise<Lorry[]> => {
    const response = await fetch(`${API_URL}/lorries`);

    if (!response.ok) {
        throw new Error(`Failed to fetch lorries (${response.status})`);
    }

    return response.json();
};

export const getLorryById = async (id: string): Promise<Lorry> => {
    const response = await fetch(`${API_URL}/lorries/${id}`);

    if (!response.ok) {
        throw new Error(`Failed to fetch lorry with ID ${id} (${response.status})`);
    }

    return response.json();
};

export const deleteLorry = async (id: string): Promise<Lorry> => {
    const response = await fetch(`${API_URL}/lorries/${id}/delete`);

    if (!response.ok) {
        throw new Error(`Failed to delete lorry with ID ${id} (${response.status})`);
    }

    return response.json();
};
