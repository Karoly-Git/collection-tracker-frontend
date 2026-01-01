import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Lorry } from "../types/lorry";
import { getAllLorries, deleteLorry } from "../api/lorries.api";

interface LorriesState {
    items: Lorry[];
    loading: boolean;
    error: string | null;
}

const initialState: LorriesState = {
    items: [],
    loading: false,
    error: null,
};

export const fetchLorries = createAsyncThunk(
    "lorries/fetchAll",
    async () => {
        return await getAllLorries(); // return all lorries
    }
);

export const deleteLorryById = createAsyncThunk(
    "lorries/delete",
    async (lorryId: string) => {
        await deleteLorry(lorryId);
        return lorryId; // return ID only
    }
);

const lorriesSlice = createSlice({
    name: "lorries",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            // fetch
            .addCase(fetchLorries.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchLorries.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchLorries.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? "Failed to load lorries";
            })

            // delete
            .addCase(deleteLorryById.fulfilled, (state, action) => {
                state.items = state.items.filter(
                    lorry => lorry.lorryId !== action.payload
                );
            });
    },
});

export default lorriesSlice.reducer;
