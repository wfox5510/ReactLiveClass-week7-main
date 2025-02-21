import { createSlice } from "@reduxjs/toolkit";

const loadingFullSlice = createSlice({
  name:"loadingFull",
  initialState:{
    isLoading:false,
  },
  reducers:{
    setIsLoading(state,action){
      state.isLoading = action.payload;
    }
  }
})

export const {setIsLoading} = loadingFullSlice.actions;

export default loadingFullSlice.reducer;