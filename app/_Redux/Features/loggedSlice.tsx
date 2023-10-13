"use client"
import { createSlice } from "@reduxjs/toolkit"

const initial = false;

export const loggedSlice = createSlice({
  name: "logged",
  initialState: { value: initial },
  reducers: {
    login:(state, actions) => {
      state.value = actions.payload;
    },
    logout:(state, actions) => {
      state.value = actions.payload;
    }
  }
});

export const { login, logout } = loggedSlice.actions;
export default loggedSlice.reducer;
