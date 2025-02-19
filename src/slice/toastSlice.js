import { createSlice } from "@reduxjs/toolkit";

const toastSlice = createSlice({
  name: "Toast",
  initialState: {
    message: [],
  },
  reducers: {
    setMessage(state, action) {
      const {message ,status } = action.payload;
      state.message.push({
        id: new Date().getTime(),
        toastMessage: message.join(","),
        status: status,
      });
    },
  },
});

export const { setMessage } = toastSlice.actions;

export default toastSlice.reducer;
