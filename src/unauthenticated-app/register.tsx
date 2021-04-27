import { useAuth } from "context/auth-context";
import React, { FormEvent } from "react";
import { Form, Input, Button } from "antd";

export const RegisterScreen = () => {
  const { register, user } = useAuth();

  const handleSubmit = (values: { username: string; password: string }) => {
    const { username, password } = values;
    register({
      username,
      password,
    });
  };
  return (
    <Form onFinish={handleSubmit} labelAlign={"left"}>
      <Form.Item
        name="username"
        label="用户名"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input type="text" id="userName" />
      </Form.Item>
      <Form.Item
        name={"password"}
        label={"密码"}
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input type="password" id="password" />
      </Form.Item>
      <Button htmlType="submit">注册</Button>
    </Form>
  );
};
