import { configureStore } from "@reduxjs/toolkit";
import toastReducer from "./src/slice/toastSlice";
import loadingFullReducer from "./src/slice/loadingFullSlice";
export default configureStore({
  reducer: {
    toast: toastReducer,
    loadingFull: loadingFullReducer,
  },
});
