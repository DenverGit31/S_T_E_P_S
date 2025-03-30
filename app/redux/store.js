import { configureStore } from "@reduxjs/toolkit";
import loginAuth from "./authSlice";

export const store = configureStore({
  reducer: {
    auth: loginAuth,
  },
});
