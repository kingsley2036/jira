import { useState } from "react";
import { RegisterScreen } from "./register";
import { LoginScreen } from "./login";
import { Button, Card } from "antd";

export const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card style={{}}>
        {isRegister ? <LoginScreen /> : <RegisterScreen />}
        <Button
          style={{ marginTop: "10px" }}
          onClick={() => {
            setIsRegister(!isRegister);
          }}
        >
          切换到{isRegister ? "注册" : "登录"}
        </Button>
      </Card>
    </div>
  );
};
