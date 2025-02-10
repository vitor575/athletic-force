import { Link } from "react-router-dom";
import "./ConfiguracaoNav.css";
import { FaSignOutAlt } from "react-icons/fa";

const configuracaoNav = () => {
  return (
    <nav className="config__nav__container">
      <ul>
        <li className="config-links">Editar senha</li>
        <li className="config-links">Mudar forma de pagamento</li>
        <li className="config-links">
          <Link to="/clientHome" className="link-style">
            <FaSignOutAlt /> Voltar
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default configuracaoNav;
