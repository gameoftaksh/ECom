
import { configureStore } from "@reduxjs/toolkit";
import MainReducer from "./reducer/MainReducer";

// Create the store using configureStore from Redux Toolkit
const Store = configureStore({
    reducer: MainReducer, // Combine your reducers here
    devTools: true, // Enable Redux DevTools
});

export default Store;