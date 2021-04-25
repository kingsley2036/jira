import { useAuth } from "context/auth-context";
import React, { FormEvent } from "react";

export const LoginScreen = () => {
  // 这个是登录页面组件,不是登录方法
  const { login, user } = useAuth();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = (event.currentTarget.elements[0] as HTMLFormElement).value;
    const password = (event.currentTarget.elements[1] as HTMLFormElement).value;
    login({
      username,
      password,
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      {user ? <div>{user.name}</div> : null}
      <div>
        <label>用户名</label>
        <input type="text" id="userName" />
      </div>
      <div>
        <label>密码</label>
        <input type="password" id="password" />
      </div>
      <button type="submit">登录</button>
    </form>
  );
};
