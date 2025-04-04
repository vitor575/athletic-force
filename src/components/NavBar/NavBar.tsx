import Logo from "../../img/logo.png";
import PersonIcon from "@mui/icons-material/Person";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./estiloNav.css";
import ModalLogin from "../ModalLogin";

function Navbar() {
  const [isModalOpen, setModalOpen] = useState(false);

  const local = useLocation();

  return (
    <nav className={local.pathname === "/" ? "navbar" : "navbar-off"}>
      <img src={Logo} alt="logo" />

      <ul className="nav-links">
        <a href="#home">Home</a>
        <a href="#sobre">Sobre </a>
        <a href="#treinadores">Treinadores</a>
        <a href="#contato">Contato</a>
      </ul>

      <button className="login" onClick={() => setModalOpen(!isModalOpen)}>
        <PersonIcon
          sx={{
            fontSize: "64px",
            bgcolor: "white",
            border: "3px solid black",
            borderRadius: "100px",
          }}
        />
      </button>

      <ModalLogin open={isModalOpen} onClose={() => setModalOpen(false)} />
    </nav>
  );
}

export default Navbar;
