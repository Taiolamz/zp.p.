import { loginSliceReducer, authSliceReducer } from "./slice";
const state = {
  login: loginSliceReducer,
  auth: authSliceReducer,
};

export const testAppSelector = (f: any) => f(state);
