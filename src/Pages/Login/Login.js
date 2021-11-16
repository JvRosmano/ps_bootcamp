import { React, useState } from "react";
import styled from "styled-components";
import { Input, Form, Button, Checkbox, message } from "antd";
import { useNavigate, Link } from "react-router-dom";
const bcrypt = require("bcryptjs");

export default function Login() {
  const [inputs, setInputs] = useState([]);
  const navigate = useNavigate();
  function handleChange(e) {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  }

  function handleLogin() {
    let users = localStorage.getItem("users");
    users = JSON.parse(users);

    users?.forEach((user) => {
      if (
        user["username"] === inputs["username"] &&
        bcrypt.compareSync(inputs["password"], user["password"])
      ) {
        inputs["password"] = user["password"];
        let loggedUsers = localStorage.getItem("loggedUsers");
        if (loggedUsers) loggedUsers = JSON.parse(loggedUsers);
        else loggedUsers = [];
        loggedUsers.push(inputs);
        localStorage.setItem("loggedUsers", JSON.stringify(loggedUsers));
        navigate("/dashboard");
      }
    });

    if (!localStorage.getItem("loggedUsers")) {
      message.error("Usuário ou senha incorretos, tente novamente.");
    }
  }
  return (
    <LoginWrapper>
      <FormWrapper>
        <Simg src={"/images/logo.png"} alt="logo" />
        <Form initialValues={{ remember: true }} layout="vertical">
          <Form.Item
            label="Usuário"
            name="username"
            rules={[
              { required: true, message: "Preencha o seu nome de usuário!" },
            ]}
          >
            <Input name="username" onChange={handleChange} />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Preencha a sua senha!" }]}
          >
            <Input.Password name="password" onChange={handleChange} />
          </Form.Item>
          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Lembre-se de mim</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button size="large" onClick={handleLogin}>
              Fazer Login
            </Button>
          </Form.Item>
          <Form.Item label="Não possui login?" name="link">
            <Link to="/cadastro">Ir para cadastro</Link>
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
  padding: 3vw;
`;

const Simg = styled.img`
  max-width: 40vw;
  margin-bottom: 2vw;
`;

const FormWrapper = styled.div`
  border: 2px solid black;
  padding: 1vw;
`;
