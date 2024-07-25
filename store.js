import { configureStore } from '@reduxjs/toolkit'

//USER REDUCERS
import userReducer from './reducers/user/userSlice'
import createTrackingReducer from './reducers/createTrakcing/createTrackingSlice'
import createReceiverReducer from './reducers/receiver/receiverSlice'
import importServiceHistoryReducer from './reducers/importServiceHistory/importServiceHistorySlice';
import createConsolidationReducer from './reducers/consolidation/consolidationSlice'
import consolidatedServiceHistoryReducer from './reducers/consolidatedServiceHistory/consolidatedServiceHistorySlice';
import dividedServiceHistoryReducer from './reducers/dividedServiceHistory/dividedServiceHistorySlice';
import createDivideReducer from './reducers/divide/divideSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    createTracking: createTrackingReducer,
    receiver: createReceiverReducer,
    importServiceHistory: importServiceHistoryReducer,
    consolidatedServiceHistory: consolidatedServiceHistoryReducer,
    dividedServiceHistory: dividedServiceHistoryReducer,
    consolidation: createConsolidationReducer,
    divide: createDivideReducer,
  },
})