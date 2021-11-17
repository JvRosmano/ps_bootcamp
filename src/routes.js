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
            <Route path="/login" element={<Leads />} />
            <Route path="/" element={<Leads />} />
            <Route path="/cadastro" element={<Leads />} />
            <Route exact path="/leads/cadastro" element={<CadastroLeads />} />
            <Route path="/leads" element={<Leads />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Login />} />
            <Route exact path="/cadastro" element={<Cadastro />} />
            <Route path="/leads" element={<Login />} />
            <Route path="/leads/cadastro" element={<Login />} />
          </>
        )}
      </Routes>
    </Router>
  );
}
