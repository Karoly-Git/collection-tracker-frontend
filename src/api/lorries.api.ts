import type { Lorry } from "../types/lorry";

const API_URL = "http://localhost:8000";

const getAllLorries = async (): Promise<Lorry[]> => {
    const response = await fetch(`${API_URL}/lorries`);

    if (!response.ok) {
        throw new Error(`Failed to fetch lorries (${response.status})`);
    }

    return response.json();
};


export default getAllLorries;