import { createSlice } from "@reduxjs/toolkit";
 
const initialState = {
  shipmentNumbers: [],
  postsLenght: 0,
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
      state.postsLenght = 0;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setConsolidation, unsetConsolidation } = consolidationSlice.actions;

export const shipmentNumbers = (state) => state.consolidation.shipmentNumbers;
export const postsLenght = (state) => state.consolidation.postsLenght;

export default consolidationSlice.reducer;

