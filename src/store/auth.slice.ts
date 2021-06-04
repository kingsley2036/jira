import { User } from "../screens/project-list/search-panel";
import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "./index";
import * as auth from "auth-provider";
import { authForm, bootstrapUser } from "../context/auth-context";
interface State {
  user: User | null;
}
const initialState: State = {
  user: null,
};
export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});
const { setUser } = authSlice.actions;
export const selectUser = (state: RootState) => state.auth.user; // just as vuex getters
// async actions
// 使用的时候不需要传入dispatch,只需要用吧异步action传入dispatch就可以了
export const login = (form: authForm) => (dispatch: AppDispatch) =>
  auth.login(form).then((res) => {
    dispatch(setUser(res));
  });

export const register = (form: authForm) => (dispatch: AppDispatch) => {
  auth.register(form).then((res) => {
    dispatch(setUser(res));
  });
};

export const logout = () => (dispatch: AppDispatch) =>
  auth.logout().then(() => {
    dispatch(setUser(null));
  });

export const bootstrap = () => (dispatch: AppDispatch) =>
  bootstrapUser().then((res) => {
    dispatch(setUser(res));
  });
