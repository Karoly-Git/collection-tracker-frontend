import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    getAllCollections,
    deleteCollection,
    updateCollectionStatus,
    addCommentUnderStatus,
    addCollection,
} from "../../api/api";

const initialState = {
    collections: [],
    loading: false,
    error: null,

    addCommentLoading: false,
    addCommentError: null,

    // ✅ Add collection status
    addCollectionStatus: "idle", // "idle" | "loading" | "succeeded" | "failed"
    addCollectionError: null,
    addCollectionSuccessMessage: null,

    // ✅ Update status state (separate from global loading/error)
    updateStatusStatus: "idle", // "idle" | "loading" | "succeeded" | "failed"
    updateStatusError: null,
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
        { collectionId, newStatus, userId, comment, timestamp },
        { rejectWithValue }
    ) => {
        try {
            // ⏳ simulate slow API (3 seconds)
            await new Promise((resolve) => setTimeout(resolve, 3000));

            // ❌ simulate failure (50% chance)
            if (Math.random() < 0.5) {
                throw new Error("Simulated error: status could not be updated");
            }

            const updatedCollection = await updateCollectionStatus({
                collectionId,
                newStatus,
                userId,
                comment,
                timestamp,
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
        { collectionId, statusKey, userId, text, timestamp },
        { rejectWithValue }
    ) => {
        try {
            // ⏳ simulate slow API (3 seconds)
            await new Promise((resolve) => setTimeout(resolve, 8000));

            // ❌ simulate failure (50% chance)
            if (Math.random() < 0.5) {
                throw new Error("Simulated error: comment could not be added");
            }

            const updatedCollection = await addCommentUnderStatus({
                collectionId,
                statusKey,
                userId,
                text,
                timestamp,
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
            // ⏳ simulate slow API (3 seconds)
            await new Promise((resolve) => setTimeout(resolve, 3000));

            // ❌ simulate failure (50% chance)
            if (Math.random() < 0.5) {
                throw new Error("Simulated error: collection could not be added");
            }

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
    reducers: {
        // ✅ important: reset status when opening/closing the form
        resetAddCollectionState: (state) => {
            state.addCollectionStatus = "idle";
            state.addCollectionError = null;
            state.addCollectionSuccessMessage = null;
        },

        // ✅ reset update-status state
        resetUpdateStatusState: (state) => {
            state.updateStatusStatus = "idle";
            state.updateStatusError = null;
        },
    },
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
                state.error = action.payload || "Failed to load collections";
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

            /* ---------------- Update status ✅ ---------------- */
            .addCase(updateCollectionStatusById.pending, (state) => {
                state.updateStatusStatus = "loading";
                state.updateStatusError = null;
            })
            .addCase(updateCollectionStatusById.fulfilled, (state, action) => {
                state.updateStatusStatus = "succeeded";

                const updatedCollection = action.payload;

                const index = state.collections.findIndex(
                    (c) => c.id === updatedCollection.id
                );

                if (index !== -1) {
                    state.collections[index] = updatedCollection;
                }
            })
            .addCase(updateCollectionStatusById.rejected, (state, action) => {
                state.updateStatusStatus = "failed";
                state.updateStatusError =
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

            /* ---------------- Add collection ✅ ---------------- */
            .addCase(addNewCollection.pending, (state) => {
                state.addCollectionStatus = "loading";
                state.addCollectionError = null;
                state.addCollectionSuccessMessage = null;
            })
            .addCase(addNewCollection.fulfilled, (state, action) => {
                state.addCollectionStatus = "succeeded";
                state.collections.push(action.payload);

                state.addCollectionSuccessMessage = "Collection added successfully!";
            })
            .addCase(addNewCollection.rejected, (state, action) => {
                state.addCollectionStatus = "failed";
                state.addCollectionError = action.payload || "Failed to add collection";
            });
    },
});

export const {
    resetAddCollectionState,
    resetUpdateStatusState,
} = collectionSlice.actions;

export default collectionSlice.reducer;
