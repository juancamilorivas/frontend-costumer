import { configureStore } from '@reduxjs/toolkit'

//USER REDUCERS
import userReducer from './reducers/user/userSlice'
import createTrackingReducer from './reducers/createTrakcing/createTrackingSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    createTracking: createTrackingReducer,
  },
})