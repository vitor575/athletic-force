import Logo from "../../img/logo.png";
import user from "../../img/user.png";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./estiloNav.css";
import BootstrapModal from "../ModalLogin";
import Form from "../ModalLogin/FormLogin";

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
        <img src={user} alt="logo" />
      </button>

      <BootstrapModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="Login"
        size="lg"
      >
        <Form />
      </BootstrapModal>
    </nav>
  );
}

export default Navbar;
