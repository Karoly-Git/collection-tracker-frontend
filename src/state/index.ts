import { configureStore } from "@reduxjs/toolkit";
import lorriesReducer from "./lorries.slice";

export const store = configureStore({
    reducer: {
        lorries: lorriesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
