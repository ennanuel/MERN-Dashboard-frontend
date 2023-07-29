import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/dist/query"
import { api } from "./api"
import globalReducer from './globalSlice'

export const store = configureStore({
    reducer: {
      global: globalReducer,
      [api.reducerPath]: api.reducer
    },
    middleware: (getDefault) => getDefault().concat(api.middleware)
})

setupListeners(store.dispatch)

// Type of store state

export type RootState = ReturnType<typeof store.getState>


// Type of store dispatch

export type AppDispatch = typeof store.dispatch