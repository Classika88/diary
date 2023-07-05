import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  status: null,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ username, password }) => {
    try {
      const { data } = await axios.post("http://localhost:3002/api/auth/register", {
        username,
        password,
      });
      if (data.token) {
        window.localStorage.setItem("token", data.token)
      }
      console.log(data)
      return data;
    } catch (err) {
      console.log(err);
    }
  }
);

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ username, password }) => {
      try {
        const { data } = await axios.post("http://localhost:3002/api/auth/login", {
          username,
          password,
        });
        if (data.token) {
          window.localStorage.setItem("token", data.token);
        }
        return data;
      } catch (err) {
        console.log(err);
      }
    }
  );

  export const getMe = createAsyncThunk(
    "auth/me",
    async () => {
      try {
        const { data } = await axios.get("http://localhost:3002/api/auth/me");
        return data;
      } catch (err) {
        console.log(err);
      }
    }
  );

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
        state.user = null
        state.token = null
        state.isLoading = false
        state.status = null
    }
  },
  extraReducers:  {
    //Register user
    [registerUser.pending]: (state) => {
      state.isLoading = true
      state.status = null
    },
    [registerUser.fulfilled]: (state, action) => {
      state.isLoading = false
      console.log(action)
      state.status = action.payload.message
      state.user = action.payload.user
      state.token = action.payload.token
    },
    [registerUser.rejectWithValue]: (state, action) => {
      state.status = action.payload.message
      state.isLoading = false
    },
    //Login user
    [loginUser.pending]: (state) => {
        state.isLoading = true
        state.status = null
      },
      [loginUser.fulfilled]: (state, action) => {
        state.isLoading = false
        state.status = action.payload.message
        state.user = action.payload.user
        state.token = action.payload.token
      },
      [loginUser.rejectWithValue]: (state, action) => {
        state.status = action.payload.message
        state.isLoading = false
      },
      //Get me (перевірка авторизації)
    [getMe.pending]: (state) => {
        state.isLoading = true
        state.status = null
      },
      [getMe.fulfilled]: (state, action) => {
        state.isLoading = false
        state.status = null
        state.user = action.payload?.user
        state.token = action.payload?.token
      },
      [getMe.rejectWithValue]: (state, action) => {
        state.status = action.payload.message
        state.isLoading = false
      },
  },
});

export const checkIsAuth = state => Boolean(state.auth.token)
export const { logout} = authSlice.actions
export default authSlice.reducer;
