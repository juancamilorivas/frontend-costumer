import { createSlice } from "@reduxjs/toolkit";
 
const initialState = {
  docId: "",
};

export const consolidatedServiceHistorySlice = createSlice({
  name: "consolidatedServiceHistory",
  initialState,
  reducers: {
    setConsolidatedServiceHistory: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    unsetConsolidatedServiceHistory: (state) => {
      state.docId = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { setConsolidatedServiceHistory, unsetConsolidatedServiceHistory } = consolidatedServiceHistorySlice.actions;

export const docId = (state) => state.consolidatedServiceHistory.docId;


export default consolidatedServiceHistorySlice.reducer;

