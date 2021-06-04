import { ReactNode } from "react";
import * as auth from "auth-provider";
import { User } from "screens/project-list/search-panel";
import { http } from "../utils/http";
import { useMount } from "../utils";
import { useAsync } from "../utils/use-async";
import { FullPageError, FullpageLoading } from "../components/lib";
import { bootstrap, selectUser } from "../store/auth.slice";
import { useDispatch, useSelector } from "react-redux";
import * as authStore from "../store/auth.slice";

export interface authForm {
  username: string;
  password: string;
}

export const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { isIdle, isLoading, isError, run, error } = useAsync<null | User>();
  // dispatch是一个返回promise
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch(); // 这个操作不太懂啊
  useMount(() => {
    // useEffect会默认在每次渲染之后时候执行
    run(dispatch(bootstrap()));
  });

  if (isIdle || isLoading) {
    return <FullpageLoading />;
  }
  if (isError) {
    return <FullPageError error={error} />;
  }
  return <div>{children}</div>;
};

export const useAuth = () => {
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch(); // 这个操作不太懂啊
  const user = useSelector(selectUser);
  const login = (form: authForm) => {
    return dispatch(authStore.login(form));
  };
  const register = (form: authForm) => {
    return dispatch(authStore.register(form));
  };
  const logout = () => {
    return dispatch(authStore.logout());
  };
  return {
    user,
    login,
    register,
    logout,
  };
};
