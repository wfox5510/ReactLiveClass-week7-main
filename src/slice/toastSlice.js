import { createSlice } from "@reduxjs/toolkit";

const toastSlice = createSlice({
  name: "Toast",
  initialState: {
    message: [],
  },
  reducers: {
    setMessage(state, action) {
      const { message, status } = action.payload;
      state.message.push({
        id: new Date().getTime(),
        toastMessage: message,
        status: status,
      });
    },
    delMessage(state, action) {
      const index = state.message.findIndex(
        (messageItem) => messageItem.id === action.payload
      );
      index !== -1 && state.message.splice(index, 1);
    },
  },
});

export const { setMessage,delMessage } = toastSlice.actions;

export default toastSlice.reducer;
