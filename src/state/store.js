import { configureStore } from "@reduxjs/toolkit";
import lorriesReducer from "./lorries.slice";

export const store = configureStore({
    reducer: {
        lorries: lorriesReducer,
    },
});
