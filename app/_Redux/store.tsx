import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loggedReducer from './Features/loggedSlice';

const rootReducer = combineReducers({
  logged: loggedReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})