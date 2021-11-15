import { React, useState } from "react";
import styled from "styled-components";
import { Input, Form, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
const bcrypt = require("bcryptjs");

export default function Cadastro() {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }
  function validate() {
    if (undefined === user["password"] || user["password"].length < 8) {
      message.error("A senha precisa ter no mínimo 8 caracteres.");
      return false;
    }
    let check = /\W|_/g;
    let check2 = /[a-z]/gi;
    let check3 = /[0-9]/g;
    if (
      !check.test(user["password"]) ||
      !check2.test(user["password"]) ||
      !check3.test(user["password"])
    ) {
      message.error(`
        A senha precisa conter pelo menos um caracter especial, um digito e um caracter alfanúmerico
      `);
      return false;
    }
    if (user["password"] !== user["confirmpassword"]) {
      message.error("As senhas digitadas estão diferentes.");
      return false;
    }

    message.success("Cadastro realizado com sucesso!");
    return true;
  }
  function handleSubmit() {
    if (validate()) {
      user["id"] = uuidv4();
      user["password"] = bcrypt.hashSync(
        user["password"],
        bcrypt.genSaltSync()
      );
      delete user["confirmpassword"];
      let users = localStorage.getItem("users");
      if (users) {
        users = JSON.parse(users);
      } else users = [];
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));
      navigate("/login");
    }
  }
  return (
    <CadastroWrapper>
      <FormWrapper>
        <Simg src={"/images/logo.png"} alt="logo" />
        <Form initialValues={{ remember: true }} layout="vertical">
          <Form.Item name="text">
            <h1>Se cadastre!</h1>
          </Form.Item>
          <Form.Item
            label="Usuário"
            name="username"
            rules={[
              { required: true, message: "Preencha o seu nome de usuário!" },
            ]}
          >
            <Input name="user" onChange={handleChange} />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Preencha a sua senha!" }]}
          >
            <Input.Password name="password" onChange={handleChange} />
          </Form.Item>
          <Form.Item
            label="Confirme sua Password"
            name="checkpassword"
            rules={[{ required: true, message: "Confirme a senha!" }]}
          >
            <Input.Password name="confirmpassword" onChange={handleChange} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button size="large" onClick={handleSubmit}>
              Fazer Cadastro
            </Button>
          </Form.Item>
          <Form.Item label="Já possui login?" name="link">
            <Link to="/login">Ir para login</Link>
          </Form.Item>
        </Form>
      </FormWrapper>
    </CadastroWrapper>
  );
}

const CadastroWrapper = styled.div`
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
