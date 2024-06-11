import { createSlice } from '@reduxjs/toolkit'


const initialState = {
trackingNumber: "",
ubicacionEnbodega: "",
locker: "",
peso: "",
alto: "",
largo: "",
ancho: "",
tariffCode: "",
contenido: "",
status: "Ingreso a bodega Miami FL.",
imei: "",
serial: "",
selectedIndex: null,
}

export const createTrackingSlice = createSlice({
  name: 'createTracking',
  initialState,
  reducers: {
    setCreateTracking: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };      
    },
    unsetCreateTracking: (state ) => {
        state.trackingNumber = '';
        state.ubicacionEnbodega = '';
        state.locker = '';
        state.peso = '';
        state.alto = '';
        state.largo = '';
        state.ancho = '';
        state.tariffCode = '';
        state.contenido = '';
        state.status = 'Ingreso a bodega Miami FL.';
        state.imei = '';
        state.serial = '';
        state.selectedIndex = null;

      },
  },
})

// Action creators are generated for each case reducer function
export const { setCreateTracking, unsetCreateTracking } = createTrackingSlice.actions


export const trackingNumber = (state) => state.createTracking.trackingNumber;
export const ubicacionEnbodega = (state) => state.createTracking.ubicacionEnbodega;
export const locker = (state) => state.createTracking.locker;
export const peso = (state) => state.createTracking.peso;
export const alto = (state) => state.createTracking.alto;
export const largo = (state) => state.createTracking.largo;
export const ancho = (state) => state.createTracking.ancho;
export const tariffCode = (state) => state.createTracking.tariffCode;
export const contenido = (state) => state.createTracking.contenido;
export const status = (state) => state.createTracking.status;
export const imei = (state) => state.createTracking.imei;
export const serial = (state) => state.createTracking.serial;
export const selectedIndex = (state) => state.createTracking.selectedIndex;


export default createTrackingSlice.reducer