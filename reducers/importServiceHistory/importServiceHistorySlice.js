import { createSlice } from "@reduxjs/toolkit";
 
const initialState = {
  docId: "",
  destinationAddress: "",
  cellPhone: "",
  locationName: "",
  country: "",
  receiverName: "",
  receiverSurname: "",
};

export const importServiceHistorySlice = createSlice({
  name: "importServiceHistory",
  initialState,
  reducers: {
    setImportServiceHistory: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    unsetImportServiceHistory: (state) => {
      state.docId = "";
      state.destinationAddress = "";
      state.cellPhone = "";
      state.locationName = "";
      state.country = "";
      state.receiverName = "";
      state.receiverSurname = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { setImportServiceHistory, unsetImportServiceHistory } = importServiceHistorySlice.actions;

export const docId = (state) => state.importServiceHistory.docId;
export const destinationAddress = (state) => state.importServiceHistory.destinationAddress;
export const cellPhone = (state) => state.importServiceHistory.cellPhone;
export const locationName = (state) => state.importServiceHistory.locationName;
export const country = (state) => state.importServiceHistory.country;
export const receiverName = (state) => state.importServiceHistory.receiverName;
export const receiverSurname = (state) => state.importServiceHistory.receiverSurname;


export default importServiceHistorySlice.reducer;

