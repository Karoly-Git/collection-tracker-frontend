import { configureStore } from "@reduxjs/toolkit";
import lorriesReducer from "./lorry/lorrySlice";

export const store = configureStore({
    reducer: {
        lorries: lorriesReducer,
    },
});
