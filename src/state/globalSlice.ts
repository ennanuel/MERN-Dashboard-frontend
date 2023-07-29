import { createSlice } from "@reduxjs/toolkit";

type AppState = {
    mode: 'light' | 'dark'
    userId: string
}

const initialState = {
    mode: "dark",
    userId: "63701cc1f03239b7f70000e"
} as AppState;

export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light'
        }
    }
});

export const { setMode } = globalSlice.actions;

export default globalSlice.reducer;