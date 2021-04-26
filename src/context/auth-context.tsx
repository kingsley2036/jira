import { createContext, useState, useContext, ReactNode } from "react";
import * as auth from "auth-provider";
import { User } from "screens/project-list/search-panel";
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

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
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
      setUser(null);
    });
  };
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
