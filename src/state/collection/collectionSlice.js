import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    getAllCollections,
    deleteCollection,
    updateCollectionStatus,
    addCommentUnderStatus,
} from "../../api/api";

const initialState = {
    items: [],
    loading: false,
    error: null,
};

/**
 * Fetch all collections
 */
export const fetchAllCollections = createAsyncThunk(
    "collection/fetchAllCollections",
    async (_, { rejectWithValue }) => {
        try {
            return await getAllCollections();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

/**
 * Delete collection by ID
 */
export const deleteCollectionById = createAsyncThunk(
    "collection/deleteCollectionById",
    async (collectionId, { rejectWithValue }) => {
        try {
            await deleteCollection(collectionId);
            return collectionId;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

/**
 * Update collection status
 */
export const updateCollectionStatusById = createAsyncThunk(
    "collection/updateCollectionStatus",
    async (
        { collectionId, newStatus, userId, comment },
        { rejectWithValue }
    ) => {
        try {
            const updatedCollection = await updateCollectionStatus({
                collectionId,
                newStatus,
                userId,
                comment,
            });

            return updatedCollection;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

/**
 * Add comment to status
 */

const collectionSlice = createSlice({
    name: "collections",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            /* ---------------- Fetch all ---------------- */
            .addCase(fetchAllCollections.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllCollections.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchAllCollections.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to load lorries";
            })

            /* ---------------- Delete ---------------- */
            .addCase(deleteCollectionById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCollectionById.fulfilled, (state, action) => {
                state.loading = false;
                state.items = state.items.filter(
                    (collection) => collection.collectionId !== action.payload
                );
            })
            .addCase(deleteCollectionById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to delete collection";
            })

            /* ---------------- Update status ---------------- */
            .addCase(updateCollectionStatusById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCollectionStatusById.fulfilled, (state, action) => {
                state.loading = false;

                const updatedCollection = action.payload;

                const index = state.items.findIndex(
                    (c) => c.id === updatedCollection.id
                );

                if (index !== -1) {
                    state.items[index] = updatedCollection;
                }
            })
            .addCase(updateCollectionStatusById.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.payload || "Failed to update collection status";
            })

        /* ---------------- Add comment ---------------- */
    },
});

export default collectionSlice.reducer;
