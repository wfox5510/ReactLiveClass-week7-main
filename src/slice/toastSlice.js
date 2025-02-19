import { createSlice } from "@reduxjs/toolkit";

const toastSlice = createSlice({
  name: "Toast",
  initialState: {
    message: [],
  },
  reducers: {
    setMessage(state, action) {
      state.message.push({
        id: new Date().getTime(),
        toastMessage: action.payload.message.join(","),
        state: action.payload.state,
      });
      console.log(state.message);
    },
  },
});

export const { setMessage } = toastSlice.actions;

export default toastSlice.reducer;
