import Logo from "../../img/logo.png";
import user from "../../img/user.png";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import './estiloNav.css'
import BootstrapModal from "../Modal";
import Form from "../Form";

function Navbar() {

  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <nav className="navbar">
      <img src={Logo} alt="logo" />

      <ul className="nav-links">
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/sobre">Sobre Nós</Link>
        </li>
        <li>
          <Link to="/treino">Treino</Link>
        </li>
        <li>
          <Link to="/modalidades">Modalidades</Link>
        </li>
        <li>
          <Link to="/login">Contato</Link>
        </li>
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
