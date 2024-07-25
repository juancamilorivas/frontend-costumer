import { createSlice } from "@reduxjs/toolkit";
 
const initialState = {
  docId: "",
};

export const dividedServiceHistorySlice = createSlice({
  name: "dividedServiceHistory",
  initialState,
  reducers: {
    setDividedServiceHistory: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    unsetDividedServiceHistory: (state) => {
      state.docId = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { setDividedServiceHistory, unsetDividedServiceHistory } = dividedServiceHistorySlice.actions;

export const docId = (state) => state.dividedServiceHistory.docId;


export default dividedServiceHistorySlice.reducer;

