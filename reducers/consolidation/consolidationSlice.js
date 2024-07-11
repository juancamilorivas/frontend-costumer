import { createSlice } from "@reduxjs/toolkit";
 
const initialState = {
  shipmentNumbers: [],
};

export const consolidationSlice = createSlice({
  name: "consolidation",
  initialState,
  reducers: {
    setConsolidation: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    unsetConsolidation: (state) => {
      state.shipmentNumbers = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { setConsolidation, unsetConsolidation } = consolidationSlice.actions;

export const shipmentNumbers = (state) => state.consolidation.shipmentNumbers;

export default consolidationSlice.reducer;

