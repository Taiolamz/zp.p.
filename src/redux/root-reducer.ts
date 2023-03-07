import { combineReducers } from "@reduxjs/toolkit";
import { loginSliceReducer } from "./slice";

const rootReducer = combineReducers({
  login: loginSliceReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
