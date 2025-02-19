import { configureStore } from "@reduxjs/toolkit";
import toastReducer from "./src/slice/toastSlice";

export default configureStore({
  reducer: {
    toast: toastReducer,
  },
});
