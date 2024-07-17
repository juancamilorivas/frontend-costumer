import { createSlice } from "@reduxjs/toolkit";
 
const initialState = {
  shipmentNumbers: [],
  consolidated: true,
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
      state.consolidated = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setConsolidation, unsetConsolidation } = consolidationSlice.actions;

export const shipmentNumbers = (state) => state.consolidation.shipmentNumbers;
export const consolidated = (state) => state.consolidation.consolidated;

export default consolidationSlice.reducer;

