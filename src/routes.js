import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Cadastro from "./Pages/Cadastro/Cadastro";
import Login from "./Pages/Login/Login";
import Leads from "./Pages/Leads/Leads";
import CadastroLeads from "./Pages/CadastroLeads/CadastroLeads";

export default function Rotas() {
  return (
    <Router>
      <Routes>
        {localStorage.getItem("loggedUser") ? (
          <>
            <Route path="/leads/cadastro" element={<CadastroLeads />} />
            <Route path="/leads" element={<Leads />} />
          </>
        ) : (
          <>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/" element={<Login />} />
            <Route exact path="/cadastro" element={<Cadastro />} />
            <Route exact path="/leads" element={<Login />} />
            <Route exact path="/leads/cadastro" element={<Login />} />
          </>
        )}
      </Routes>
    </Router>
  );
}
