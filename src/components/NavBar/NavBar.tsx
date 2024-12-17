import React from "react";
import Logo from "../../img/logo.png";
import user from "../../img/user.png";
import { Link, useNavigate } from "react-router-dom";
import './estiloNav.css'

function Navbar() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/login"); // Caminho para onde você quer navegar
  }


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

      <button className="login" onClick={handleNavigate}>
        <img src={user} alt="logo" />
      </button>
    </nav>
  );
}

export default Navbar;
