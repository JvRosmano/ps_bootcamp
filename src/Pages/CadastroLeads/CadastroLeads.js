import { React, useState, useEffect } from "react";
import { Header } from "../../Components/index";
import { useNavigate } from "react-router";
import { Form, Input, Button, Checkbox, Divider, message } from "antd";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

export default function CadastroLeads() {
  const navigate = useNavigate();
  const options = ["RPA", "Produto Digital", "Analytics", "BPM"];
  const defaultOptions = [];
  const [lead, setLead] = useState([]);
  const [selected, setSelected] = useState(defaultOptions);
  const [checkAll, setCheckAll] = useState(false);

  useEffect(() => {}, [selected]);
  function handleChange(e) {
    setLead({ ...lead, [e.target.name]: e.target.value });
  }

  function handleSelect(selecteds) {
    setSelected(selecteds);
    setCheckAll(selecteds.length === options.length);
    setLead({ ...lead, oportunities: selecteds });
  }

  function handleCheckAll(e) {
    setSelected(e.target.checked ? options : []);
    setCheckAll(e.target.checked);
    setLead({ ...lead, oportunities: e.target.checked ? options : [] });
  }

  function validate() {
    if (lead["name"] === undefined || lead["name"] === "") {
      message.error("Preencha o nome do lead!");
      return 0;
    } else if (lead["email"] === undefined || lead["email"] === "") {
      message.error("Preencha o e-mail do lead!");
      return 0;
    } else if (lead["phone"] === undefined || lead["phone"] === "") {
      message.error("Preencha o telefone do lead!");
      return 0;
    } else return 1;
  }
  function handleSubmit() {
    if (validate()) {
      lead["id"] = uuidv4();
      lead["status"] = "Cliente em Potencial";
      let leads = localStorage.getItem("leads");
      if (leads) {
        leads = JSON.parse(leads);
      } else leads = [];
      leads.push(lead);
      localStorage.setItem("leads", JSON.stringify(leads));
      navigate("/leads");
    }
  }
  return (
    <>
      <Header Page="Cadastro de Leads" />
      <ColumnsWrapper>
        <LeftWrapper>
          <Form layout="vertical">
            <Form.Item name="text">
              <h2>Preencha os dados do Lead</h2>
            </Form.Item>
            <Form.Item
              label="Nome"
              name="name"
              rules={[{ required: true, message: "Preencha o nome do lead!" }]}
            >
              <Input name="name" onChange={handleChange} />
            </Form.Item>
            <Form.Item
              label="Telefone"
              name="phone"
              rules={[
                { required: true, message: "Preencha o telefone do lead!" },
              ]}
            >
              <Input name="phone" onChange={handleChange} />
            </Form.Item>
            <Form.Item
              label="E-mail"
              name="email"
              rules={[{ required: true, message: "Preencha o email do lead!" }]}
            >
              <Input name="email" onChange={handleChange} />
            </Form.Item>
          </Form>
        </LeftWrapper>
        <RightWrapper>
          <Form layout="vertical">
            <Form.Item name="text">
              <h2>Oportunidades</h2>
            </Form.Item>
            <Form.Item>
              <Checkbox onChange={handleCheckAll} checked={checkAll}>
                Marcar todos
              </Checkbox>
              <Divider />
              <Checkbox.Group
                options={options}
                name="oportunities"
                value={selected}
                onChange={handleSelect}
              />
            </Form.Item>
            <Form.Item>
              <SButton type="primary" onClick={handleSubmit}>
                Salvar
              </SButton>
            </Form.Item>
            <Form.Item>
              <h4>Não sabe o que está fazendo aqui?</h4>
              <SButton
                danger
                onClick={() => {
                  navigate("/leads");
                }}
              >
                Ir para Paínel de Leads
              </SButton>
            </Form.Item>
          </Form>
        </RightWrapper>
      </ColumnsWrapper>
    </>
  );
}

const ColumnsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 650px) {
    flex-direction: column;
  }
`;
const LeftWrapper = styled.div`
  width: 35vw;
  padding-left: 5vw;
`;

const RightWrapper = styled.div`
  width: 35vw;
  padding-right: 5vw;
  align-items: center;
`;

const SButton = styled(Button)`
  margin-left: 5vw;
  width: 15vw;
`;
