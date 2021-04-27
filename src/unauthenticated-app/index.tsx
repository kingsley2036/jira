import { useState } from "react";
import { RegisterScreen } from "./register";
import { LoginScreen } from "./login";
import { Button, Card } from "antd";
import styled from "@emotion/styled";

export const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);
  return (
    <Container>
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
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;
