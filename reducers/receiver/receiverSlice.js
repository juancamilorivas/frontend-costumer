import { createSlice } from "@reduxjs/toolkit";
 
const initialState = {
  name: "",
  surname: "",
  cellPhone: "",
  destinationAddress: "",
  destinyDaneCode: "",
  prefix: "+57",
  quantity: 1,
  width: null,
  large: null,
  height: null,
  weight: null,
  forbiddenProduct: true,
  declaredValue: null,
  declaredValueDian: null,
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
      state.width = null;
      state.large = null;
      state.height = null;
      state.weight = null;
      state.forbiddenProduct = true;
      state.declaredValue = null;
      state.declaredValueDian = null;
      state.destinyDaneCode = 11001000;
      state.channel = "Nowbox";
      state.criteria = "price";
      state.description = "";
      state.paymentType = 101;
      state.valueCollection = 0;
      state.adminTransactionData = 0;
      state.locationName = "";
      state.shipmentNumber = "";
      state.shipmentNumber = false;
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




// import { createSlice } from '@reduxjs/toolkit'


// const initialState = {
//     "name": "",
//     "surname": "",
//     "cellPhone": "",
//     "destinationAddress": "",
//     "destinyDaneCode": "",
//     "prefix": "+57",
//     "email": "",
//     "nit": "",
//     "nitType": "CC",
// }
  

// export const receiverSlice = createSlice({
//   name: 'receiver',
//   initialState,
//   reducers: {
//     setReceiver: (state, action) => {
//         state.name = action.payload.name
//         state.surname = action.payload.surname
//         state.cellPhone = action.payload.cellPhone
//         state.email = action.payload.email   
//         state.nit = action.payload.nit   
//         state.destinationAddress = action.payload.destinationAddress   
//         state.destinyDaneCode = action.payload.destinyDaneCode   
//     },
//     unsetReceiver: (state ) => {
//         state.name = '';
//         state.surname = '';
//         state.cellPhone = '';
//         state.email = '';
//         state.nit = '';
//         state.destinationAddress = '';
//         state.destinyDaneCode = '';
//       },
//   },
// })

// // Action creators are generated for each case reducer function
// export const { setReceiver, unsetReceiver } = receiverSlice.actions


// export const name = (state) => state.receiver.name;
// export const surname = (state) => state.receiver.surname;
// export const cellPhone = (state) => state.receiver.cellPhone;
// export const email = (state) => state.receiver.email;
// export const nit = (state) => state.receiver.nit;
// export const destinationAddress = (state) => state.receiver.destinationAddress;
// export const destinyDaneCode = (state) => state.receiver.destinyDaneCode;



// export default receiverSlice.reducer