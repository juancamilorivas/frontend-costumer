import { createSlice } from "@reduxjs/toolkit";
 
const initialState = {
  divideNumber: "",
  divideInstructions: "",
  shipmentNumber: "",
};

export const divideSlice = createSlice({
  name: "divide",
  initialState,
  reducers: {
    setDivide: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    unsetDivide: (state) => {
      state.divideNumber = "";
      state.divideInstructions = "";
      state.shipmentNumber = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { setDivide, unsetDivide } = divideSlice.actions;

export const divideNumber = (state) => state.divide.divideNumber;
export const divideInstructions = (state) => state.divide.divideInstructions;
export const shipmentNumber = (state) => state.divide.shipmentNumber;

export default divideSlice.reducer;

