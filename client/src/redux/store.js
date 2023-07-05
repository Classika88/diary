import { configureStore } from '@reduxjs/toolkit'
import authSlice from './features/auth/authSlice'

export const store = configureStore({
    reducer: {
        auth: authSlice,
    },
})

// import { configureStore } from '@reduxjs/toolkit';
// import authReducer from './features/auth/authSlice';

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//   },
// });
