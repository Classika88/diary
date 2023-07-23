import { configureStore } from '@reduxjs/toolkit'
import authSlice from './features/auth/authSlice'
import postSlice from './features/post/postSlice'

export const store = configureStore({
    reducer: {
        auth: authSlice,
        post: postSlice,
    },
})

// import { configureStore } from '@reduxjs/toolkit';
// import authReducer from './features/auth/authSlice';

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//   },
// });
