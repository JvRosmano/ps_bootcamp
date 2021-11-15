import React from "react";
import styled from "styled-components";
import { Input, Form, Button, Checkbox } from "antd";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <LoginWrapper>
      <FormWrapper>
        <Simg src={"/images/logo.png"} alt="logo" />
        <Form initialValues={{ remember: true }}>
          <Form.Item
            label="Usuário"
            name="username"
            rules={[
              { required: true, message: "Preencha o seu nome de usuário!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Preencha a sua senha!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Lembre-se de mim</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button size="large">Fazer Login</Button>
          </Form.Item>
          <Form.Item label="Não possui login?" name="link">
            <Link to="cadastro">Ir para cadastro</Link>
          </Form.Item>
        </Form>
      </FormWrapper>
    </LoginWrapper>
  );
}

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5vw;
`;

const Simg = styled.img`
  max-width: 40vw;
  margin-bottom: 2vw;
`;

const FormWrapper = styled.div`
  border: 2px solid black;
  padding: 2vw;
`;
