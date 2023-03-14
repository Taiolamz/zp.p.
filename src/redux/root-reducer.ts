import { combineReducers } from "@reduxjs/toolkit";
import { loginSliceReducer, authSliceReducer } from "./slice";

const rootReducer = combineReducers({
  login: loginSliceReducer,
  auth: authSliceReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
