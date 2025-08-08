import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
  name: "config",
  initialState: {
    lang: "en",
  },
  reducers: {
    changeLanguage: (state, action) => {
      console.log("Changing language to:", action.payload);
      state.lang = action.payload;
    },
  },
});
export default configSlice.reducer;
export const { changeLanguage } = configSlice.actions;
