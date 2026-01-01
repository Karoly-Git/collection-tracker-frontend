import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllLorries, deleteLorry } from "../api/lorries.api";

const initialState = {
    items: [],
    loading: false,
    error: null,
};

export const fetchLorries = createAsyncThunk(
    "lorries/fetchAll",
    async () => {
        return await getAllLorries();
    }
);

export const deleteLorryById = createAsyncThunk(
    "lorries/delete",
    async (lorryId) => {
        await deleteLorry(lorryId);
        return lorryId;
    }
);

const lorriesSlice = createSlice({
    name: "lorries",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLorries.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchLorries.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchLorries.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to load lorries";
            })
            .addCase(deleteLorryById.fulfilled, (state, action) => {
                state.items = state.items.filter(
                    (lorry) => lorry.lorryId !== action.payload
                );
            });
    },
});

export default lorriesSlice.reducer;
