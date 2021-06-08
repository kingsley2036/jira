import { createContext, useContext, ReactNode } from "react";
import * as auth from "auth-provider";
import { User } from "screens/project-list/search-panel";
import { http } from "../utils/http";
import { useMount } from "../utils";
import { useAsync } from "../utils/use-async";
import { FullPageError, FullpageLoading } from "../components/lib";
import { useQueryClient } from "react-query";
const AuthContext = createContext<
  | {
      user: User | null;
      login: (form: authForm) => Promise<void>;
      register: (form: authForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = "AuthContext";
interface authForm {
  username: string;
  password: string;
}
const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // const [user, setUser] = useState<User | null>(null);
  const {
    data: user,
    setData: setUser,
    isIdle,
    isLoading,
    isError,
    run,
    error,
  } = useAsync<null | User>();
  useMount(() => {
    // useEffect会默认在每次渲染之后时候执行
    run(bootstrapUser());
  });
  const queryClient = useQueryClient();
  const login = (form: authForm) => {
    return auth.login(form).then((res) => {
      setUser(res);
    });
  };
  const register = (form: authForm) => {
    return auth.register(form).then((res) => {
      setUser(res);
    });
  };
  const logout = () => {
    return auth.logout().then((_) => {
      queryClient.clear();
      setUser(null);
    });
  };
  if (isIdle || isLoading) {
    return <FullpageLoading />;
  }
  if (isError) {
    return <FullPageError error={error} />;
  }
  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthContext不存在");
  }
  return context;
};
