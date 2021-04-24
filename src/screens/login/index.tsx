import React, { FormEvent, FormEventHandler } from "react";
const apiUrl = process.env.REACT_APP_API_RUL;
export const Login = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const login = (param: { username: string; password: string }) => {
      fetch(`${apiUrl}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(param),
      }).then(async (res) => {
        if (res.ok) {
          console.log("ok :>> ");
        }
      });
    };
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
      <div>
        <label>用户名</label>
        <input type="text" id="userName"></input>
      </div>
      <div>
        <label>密码</label>
        <input type="password" id="password"></input>
      </div>
      <button type="submit">登录</button>
    </form>
  );
};
