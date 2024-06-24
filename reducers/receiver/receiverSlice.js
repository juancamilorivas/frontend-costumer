import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    "name": "",
    "surname": "",
    "cellPhone": "",
    "destinationAddress": "",
    "destinyDaneCode": "",
    "prefix": "+57",
    "email": "",
    "nit": "",
    "nitType": "CC",
}
  

export const receiverSlice = createSlice({
  name: 'receiver',
  initialState,
  reducers: {
    setReceiver: (state, action) => {
        state.name = action.payload.name
        state.surname = action.payload.surname
        state.cellPhone = action.payload.cellPhone
        state.email = action.payload.email   
        state.nit = action.payload.nit   
        state.destinationAddress = action.payload.destinationAddress   
        state.destinyDaneCode = action.payload.destinyDaneCode   
    },
    unsetReceiver: (state ) => {
        state.name = '';
        state.surname = '';
        state.cellPhone = '';
        state.email = '';
        state.nit = '';
        state.destinationAddress = '';
        state.destinyDaneCode = '';
      },
  },
})

// Action creators are generated for each case reducer function
export const { setReceiver, unsetReceiver } = receiverSlice.actions


export const name = (state) => state.receiver.name;
export const surname = (state) => state.receiver.surname;
export const cellPhone = (state) => state.receiver.cellPhone;
export const email = (state) => state.receiver.email;
export const nit = (state) => state.receiver.nit;
export const destinationAddress = (state) => state.receiver.destinationAddress;
export const destinyDaneCode = (state) => state.receiver.destinyDaneCode;



export default receiverSlice.reducer