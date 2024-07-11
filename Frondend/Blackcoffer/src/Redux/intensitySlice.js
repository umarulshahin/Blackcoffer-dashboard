import { createSlice } from "@reduxjs/toolkit";

const intensitySlice = createSlice({
  name: "intensity",
  initialState: {
    data: {},
  },
  reducers: {
    addintensity: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { addintensity } = intensitySlice.actions;

export default intensitySlice.reducer;
