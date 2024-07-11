import { createSlice } from "@reduxjs/toolkit";
 
const initialState = {
  name: "",
  surname: "",
  cellPhone: "",
  destinationAddress: "",
  destinyDaneCode: "",
  prefix: "+57",
  quantity: 1,
  width: 0,
  large: 0,
  height: 0,
  weight: 0,
  forbiddenProduct: true,
  declaredValue: 0,
  declaredValueDian: 0,
  channel: "Nowbox",
  criteria: "price",
  description: "",
  paymentType: 101,
  valueCollection: 0,
  adminTransactionData: 0,
  locationName: "",
  shipmentNumber: "",
  recogeEnBodega: false,

};

export const receiverSlice = createSlice({
  name: "receiver",
  initialState,
  reducers: {
    setReceiver: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    unsetReceiver: (state) => {
      state.name = "";
      state.surname = "";
      state.cellPhone = "";
      state.destinationAddress = "";
      state.destinyDaneCode = "";
      state.prefix = "+57";
      state.quantity = 1;
      state.width = 0;
      state.large = 0;
      state.height = 0;
      state.weight = 0;
      state.forbiddenProduct = true;
      state.declaredValue = 0;
      state.declaredValueDian = 0;
      state.channel = "Nowbox";
      state.criteria = "price";
      state.description = "";
      state.paymentType = 101;
      state.valueCollection = 0;
      state.adminTransactionData = 0;
      state.locationName = "";
      state.shipmentNumber = "";
      state.recogeEnBodega = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setReceiver, unsetReceiver } = receiverSlice.actions;

export const name = (state) => state.receiver.name;
export const surname = (state) => state.receiver.surname;
export const cellPhone = (state) => state.receiver.cellPhone;
export const destinationAddress = (state) => state.receiver.destinationAddress;
export const locationName = (state) => state.receiver.locationName;
export const destinyDaneCode = (state) => state.receiver.destinyDaneCode;
export const prefix = (state) => state.receiver.prefix;
export const quantity = (state) => state.receiver.quantity;
export const width = (state) => state.receiver.width;
export const large = (state) => state.receiver.large;
export const height = (state) => state.receiver.height;
export const weight = (state) => state.receiver.weight;
export const forbiddenProduct = (state) => state.receiver.forbiddenProduct;
export const declaredValue = (state) => state.receiver.declaredValue;
export const declaredValueDian = (state) => state.receiver.declaredValueDian;
export const channel = (state) => state.receiver.channel;
export const criteria = (state) => state.receiver.criteria;
export const description = (state) => state.receiver.description;
export const paymentType = (state) => state.receiver.paymentType;
export const valueCollection = (state) => state.receiver.valueCollection;
export const adminTransactionData = (state) => state.receiver.adminTransactionData;
export const shipmentNumber = (state) => state.receiver.shipmentNumber;
export const recogeEnBodega = (state) => state.receiver.recogeEnBodega;

export default receiverSlice.reducer;

