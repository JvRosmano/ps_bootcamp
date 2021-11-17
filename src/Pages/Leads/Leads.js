import { React, useState, useEffect } from "react";
import styled from "styled-components";
import { Header, Panel } from "../../Components/index";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export default function Leads() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const columns = [
    { id: 1, title: "Cliente em Potencial" },
    { id: 2, title: "Dados Confirmados" },
    { id: 3, title: "Reunião Agendada" },
  ];
  useEffect(() => {
    let data = localStorage.getItem("leads");
    data = JSON.parse(data);
    setLeads(data);
  }, []);

  function handleClick() {
    navigate("/leads/cadastro");
  }
  return (
    <>
      <Header Page="Painel de Leads" />
      <LeadsWrapper>
        <SButton type="primary" onClick={handleClick}>
          Novo Lead (+)
        </SButton>
        <Panel columns={columns} leads={leads} />
      </LeadsWrapper>
    </>
  );
}

const LeadsWrapper = styled.div`
  padding: 2vw;
  display: flex;
  flex-direction: column;
`;

const SButton = styled(Button)`
  width: 35vw;
`;
