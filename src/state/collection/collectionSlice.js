import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    getAllCollections,
    deleteCollection,
    updateCollectionStatus,
    addCommentUnderStatus,
} from "../../api/collection.api";

const initialState = {
    items: [],
    loading: false,
    error: null,
};

/**
 * Fetch all collections
 */
export const fetchAllCollections = createAsyncThunk(
    "lorries/fetchAllCollections",
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
    "lorries/deleteCollectionById",
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
    "collections/updateCollectionStatus",
    async (
        { collectionId, status, userId, comment },
        { rejectWithValue }
    ) => {
        try {
            const updatedCollection = await updateCollectionStatus({
                collectionId,
                status,
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
export const addCommentToStatus = createAsyncThunk(
    "collections/addCommentToStatus",
    async (
        { collectionId, statusKey, text, userId },
        { rejectWithValue }
    ) => {
        try {
            const updatedCollection = await addCommentUnderStatus({
                collectionId,
                statusKey,
                userId,
                text,
            });

            return updatedCollection;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

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
                    (l) => l.collectionId === updatedCollection.collectionId
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
            .addCase(addCommentToStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addCommentToStatus.fulfilled, (state, action) => {
                state.loading = false;

                const updatedCollection = action.payload;

                const index = state.items.findIndex(
                    (l) => l.collectionId === updatedCollection.collectionId
                );

                if (index !== -1) {
                    state.items[index] = updatedCollection;
                }
            })
            .addCase(addCommentToStatus.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.payload || "Failed to add comment to status";
            });
    },
});

export default collectionSlice.reducer;
