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
        <Route
          exact
          path="/"
          element={localStorage.getItem("loggedUser") ? <Leads /> : <Login />}
        />
        <Route
          exact
          path="/login"
          element={localStorage.getItem("loggedUser") ? <Leads /> : <Login />}
        />
        <Route
          exact
          path="/cadastro"
          element={
            localStorage.getItem("loggedUser") ? <Leads /> : <Cadastro />
          }
        />
        <Route
          exact
          path="/leads"
          element={localStorage.getItem("loggedUser") ? <Leads /> : <Login />}
        />
        <Route
          exact
          path="/leads/cadastro"
          element={
            localStorage.getItem("loggedUser") ? <CadastroLeads /> : <Login />
          }
        />
      </Routes>
    </Router>
  );
}
