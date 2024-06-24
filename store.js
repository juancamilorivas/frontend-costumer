import { configureStore } from '@reduxjs/toolkit'

//USER REDUCERS
import userReducer from './reducers/user/userSlice'
import createTrackingReducer from './reducers/createTrakcing/createTrackingSlice'
import createReceiverReducer from './reducers/receiver/receiverSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    createTracking: createTrackingReducer,
    receiver: createReceiverReducer,
  },
})