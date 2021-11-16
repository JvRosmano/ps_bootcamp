import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Cadastro from "./Pages/Cadastro/Cadastro";
import Login from "./Pages/Login/Login";
import Dashboard from "./Pages/Dashboard/Dashboard";

export default function Rotas() {
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={
            localStorage.getItem("loggedUsers") ? <Dashboard /> : <Login />
          }
        />
        <Route
          exact
          path="/login"
          element={
            localStorage.getItem("loggedUsers") ? <Dashboard /> : <Login />
          }
        />
        <Route
          exact
          path="/cadastro"
          element={
            localStorage.getItem("loggedUsers") ? <Dashboard /> : <Cadastro />
          }
        />
        <Route
          exact
          path="/dashboard"
          element={
            localStorage.getItem("loggedUsers") ? <Dashboard /> : <Login />
          }
        />
      </Routes>
    </Router>
  );
}
