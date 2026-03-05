import { configureStore } from "@reduxjs/toolkit";
import collectionReducer from "./collection/collectionSlice";
import modalReducer from "./collection/modalSlice";

export const store = configureStore({
    reducer: {
        collections: collectionReducer,
        modal: modalReducer
    },
});
