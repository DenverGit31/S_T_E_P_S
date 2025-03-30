import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../helpers/axios";

export const maritesAuth = createAsyncThunk(
  "auth/login",
  async (userCred, { rejectWithValue }) => {
    try {
      const response = await axiosInstance().post("/api/login", {
        username: userCred.username,
        password: userCred.password,
      });
      const res = await response.data.data;
      return res;
    } catch (error) {
      console.log("ERROR", error);
      const errorMessage = error.response?.data || error.response?.message;
      console.log("error.response? ;>>> ", error.response);
      //   if (error.response.status === 429) {
      //     console.log("🔥 Too many login attempts: ", errorMessage);
      //   }
      return rejectWithValue(errorMessage);
    }
  }
);

const loginAuth = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: null,
    status: "idle",
    error: null,
    logOut: false,
  },
  reducers: {
    logout: (state, action) => {
      localStorage.removeItem(`isAuth${action.payload}`);
      localStorage.removeItem(`userInfo`);
      state.logOut = true;
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(maritesAuth.pending, (state, action) => {
        (state.status = "loading"), (state.error = null);
      })
      .addCase(maritesAuth.fulfilled, (state, action) => {
        (state.status = "succeeded"),
          (state.isAuthenticated = true),
          (state.user = action.payload);
      })
      .addCase(maritesAuth.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setAuth, logout } = loginAuth.actions;
export default loginAuth.reducer;
