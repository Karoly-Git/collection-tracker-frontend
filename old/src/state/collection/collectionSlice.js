import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    getAllCollections,
    deleteCollection,
    updateCollectionStatus,
    addNewComment,
    addCollection,
} from "../../api/api";

const delayTimeMs = 0 // ms

const initialState = {
    collections: [],
    loading: false,
    error: null,

    addCommentLoading: false,
    addCommentError: null,

    // ✅ NEW: track which status comment form is submitting / errored
    // so loading + error messages show only on the correct AddCommentForm
    addCommentTarget: null, // ✅ NEW

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
            await new Promise((resolve) => setTimeout(resolve, delayTimeMs));

            // ❌ simulate failure (50% chance)
            // if (Math.random() < 0.5) {
            //     throw new Error("Simulated error: collection could not be deleted");
            // }

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
            await new Promise((resolve) => setTimeout(resolve, delayTimeMs));

            // ❌ simulate failure (50% chance)
            // if (Math.random() < 0.5) {
            //     throw new Error("Simulated error: status could not be updated");
            // }

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
export const addComment = createAsyncThunk(
    "collection/addComment",
    async (
        {
            collectionId,
            statusKey,

            // ✅ NEW: identify the exact status entry being commented on
            // (used only for UI scoping)
            statusTimestamp, // ✅ NEW

            userId,
            text,
            timestamp,
        },
        { rejectWithValue }
    ) => {
        try {
            // ⏳ simulate slow API (3 seconds)
            await new Promise((resolve) => setTimeout(resolve, delayTimeMs));

            // ❌ simulate failure (50% chance)
            // if (Math.random() < 0.5) {
            //     throw new Error("Simulated error: comment could not be added");
            // }

            const updatedCollection = await addNewComment({
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
            await new Promise((resolve) => setTimeout(resolve, delayTimeMs));

            // ❌ simulate failure (50% chance)
            // if (Math.random() < 0.5) {
            //     throw new Error("Simulated error: collection could not be added");
            // }

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
        // ✅ NEW
        resetAddCommentState: (state) => {
            state.addCommentLoading = false;
            state.addCommentError = null;
            state.addCommentTarget = null;
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
            .addCase(addComment.pending, (state, action) => {
                state.addCommentLoading = true;
                state.addCommentError = null;

                // ✅ NEW: store which form should show the spinner/error
                state.addCommentTarget = {
                    collectionId: action.meta.arg.collectionId,
                    statusKey: action.meta.arg.statusKey,
                    statusTimestamp: action.meta.arg.statusTimestamp,
                };
            })
            .addCase(addComment.fulfilled, (state, action) => {
                state.addCommentLoading = false;

                // ✅ NEW: clear target on success
                state.addCommentTarget = null;

                const updatedCollection = action.payload;
                const index = state.collections.findIndex(
                    (c) => c.id === updatedCollection.id
                );

                if (index !== -1) {
                    state.collections[index] = updatedCollection;
                }
            })
            .addCase(addComment.rejected, (state, action) => {
                state.addCommentLoading = false;
                state.addCommentError =
                    action.payload ||
                    "Something went wrong while adding the comment.";

                // ✅ NOTE: DO NOT clear addCommentTarget here
                // We want the error to show on the correct form
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
    resetAddCommentState,
} = collectionSlice.actions;

export default collectionSlice.reducer;
