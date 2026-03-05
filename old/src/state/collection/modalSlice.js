import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    activeModal: null,        // 'info' | 'status' | 'delete'
    modalProps: {},           // optional data for modals
    clickedCollectionId: null,  // <-- global value
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.activeModal = action.payload.name;
            state.modalProps = action.payload.props || {};
        },
        closeModal: (state) => {
            state.activeModal = null;
            state.modalProps = {};
        },
        setClickedCollectionId: (state, action) => {
            state.clickedCollectionId = action.payload;
        },
        clearClickedCollectionId: (state) => {
            state.clickedCollectionId = null;
        },
    },
});

export const {
    openModal,
    closeModal,
    setClickedCollectionId,
    clearClickedCollectionId,
} = modalSlice.actions;

export default modalSlice.reducer;
