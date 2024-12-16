import React from "react";
import Logo from "./img/3.png";
import user from "./img/user.png";
import { Link } from "react-router-dom";

function Navbar() {
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
          <Link to="/contato">Contato</Link>
        </li>
      </ul>
      
      <button className="login">
        <img src={user} alt="logo" />
      </button>
    </nav>
  );
}

export default Navbar;
