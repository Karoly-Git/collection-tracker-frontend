import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllLorries, deleteLorry } from "../../api/lorry.api";

const initialState = {
    items: [],
    loading: false,
    error: null,
};

export const fetchAllLorries = createAsyncThunk(
    "lorries/fetchAllLorries",
    async () => {
        return await getAllLorries();
    }
);

export const deleteLorryById = createAsyncThunk(
    "lorries/deleteLorryById",
    async (lorryId) => {
        await deleteLorry(lorryId);
        return lorryId;
    }
);

const lorriesSlice = createSlice({
    name: "lorry",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllLorries.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllLorries.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchAllLorries.rejected, (state, action) => {
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
