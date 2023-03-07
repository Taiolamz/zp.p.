import { loginSliceReducer } from "./slice";
const state = {
  login: loginSliceReducer,
};

export const testAppSelector = (f: any) => f(state);
