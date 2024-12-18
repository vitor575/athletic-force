import Logo from "../../img/logo.png";
import user from "../../img/user.png";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./estiloNav.css";
import BootstrapModal from "../Modal";
import Form from "../../components/Modal/Form";

function Navbar() {
  const [isModalOpen, setModalOpen] = useState(false);

  const local = useLocation();

  return (
    <nav className={local.pathname.startsWith("/clientHome") ? "navbar-off" : "navbar"}>
      <img src={Logo} alt="logo" />

      <ul className="nav-links">
        <a href="#home">Home</a>
        <a href="#sobre">Sobre</a>
        <a href="#services">Serviços</a>
        <a href="#contact">Contato</a>
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
