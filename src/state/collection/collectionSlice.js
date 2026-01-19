import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    getAllCollections,
    deleteCollection,
    updateCollectionStatus,
    addCommentUnderStatus,
    addCollection, // 👈 NEW
} from "../../api/api";

const initialState = {
    collections: [],
    loading: false,
    error: null,

    addCommentLoading: false,
    addCommentError: null,

    addCollectionLoading: false, // 👈 optional
    addCollectionError: null,    // 👈 optional
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
            // ⏳ simulate slow API
            await new Promise((resolve) => setTimeout(resolve, 3000));

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
            if (error.response?.status === 404) {
                return collectionId; // already deleted
            }
            return rejectWithValue(error.message);
        }
    }
);

/**
 * Add comment to status
 */
export const addCommentToCollectionStatus = createAsyncThunk(
    "collection/addCommentToCollectionStatus",
    async (
        { collectionId, statusKey, userId, text },
        { rejectWithValue }
    ) => {
        try {
            // ⏳ simulate slow API (3 seconds)
            await new Promise((resolve) => setTimeout(resolve, 3000));

            // ❌ simulate failure (50% chance)
            if (Math.random() < 0.5) {
                throw new Error("Simulated error: comment could not be added");
            }

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

/**
 * Add new collection
 */
export const addNewCollection = createAsyncThunk(
    "collection/addNewCollection",
    async (payload, { rejectWithValue }) => {
        try {
            // ⏳ optional delay to match your other thunks
            await new Promise((resolve) => setTimeout(resolve, 1000));

            const newCollection = await addCollection(payload);
            return newCollection;
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
                state.collections = action.payload;
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
                state.collections = state.collections.filter(
                    (collection) => collection.id !== action.payload
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

                const index = state.collections.findIndex(
                    (c) => c.id === updatedCollection.id
                );

                if (index !== -1) {
                    state.collections[index] = updatedCollection;
                }
            })
            .addCase(updateCollectionStatusById.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.payload || "Failed to update collection status";
            })

            /* ---------------- Add comment ---------------- */
            .addCase(addCommentToCollectionStatus.pending, (state) => {
                state.addCommentLoading = true;
                state.addCommentError = null;
            })
            .addCase(addCommentToCollectionStatus.fulfilled, (state, action) => {
                state.addCommentLoading = false;

                const updatedCollection = action.payload;
                const index = state.collections.findIndex(
                    (c) => c.id === updatedCollection.id
                );

                if (index !== -1) {
                    state.collections[index] = updatedCollection;
                }
            })
            .addCase(addCommentToCollectionStatus.rejected, (state, action) => {
                state.addCommentLoading = false;
                state.addCommentError =
                    action.payload || "Something went wrong while adding the comment.";
            })
            /* ---------------- Add collection ---------------- */
            .addCase(addNewCollection.pending, (state) => {
                state.addCollectionLoading = true;
                state.addCollectionError = null;
            })
            .addCase(addNewCollection.fulfilled, (state, action) => {
                state.addCollectionLoading = false;
                state.collections.push(action.payload); // 👈 append new collection
            })
            .addCase(addNewCollection.rejected, (state, action) => {
                state.addCollectionLoading = false;
                state.addCollectionError =
                    action.payload || "Failed to add collection";
            });
    },
});

export default collectionSlice.reducer;
