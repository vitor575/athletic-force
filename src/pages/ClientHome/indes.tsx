import React from "react";
import Logo from "../../img/logo.png";
import Client from "../../img/client.png";
import "./ClientHome.css";
import { FaSignOutAlt, FaWhatsapp } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import CardCliente from "../../components/CardsCliente";
import Calendario from '../../img/calendario.png';
import Pagamento from '../../img/pagamento.png';
import Configuracao from '../../img/configuracao.png';
import { useNavigate } from "react-router-dom";

const ClientHome = () => {
    const navigate = useNavigate();

    const handleExit = () => {
        navigate("/")
    };

    return (
        <main className="client-page">
            <div className="header-container">
                <div className="container-logo">
                    <img src={Logo} alt="Logo"/>
                    <div className="social-links">
                        <ul>
                            <li><FaWhatsapp /></li>
                            <li><FaFacebook /></li>
                            <li><FaInstagram /></li>
                        </ul>
                    </div>
                </div>
                <div className="client-container">
                    <img src={Client} alt="Sua imagem"/>
                    <div className="client-text">
                        <h2>Olá, seja bem vindo.</h2>
                        <button className="exit-button" onClick={handleExit}><FaSignOutAlt />Sair</button>
                    </div>
                </div>
            </div>
            <div className="cards-container">
                <CardCliente titulo="Cronograma de treinos" imagem={Calendario} destino="/clientHome/cronograma/Segunda-feira" />
                <CardCliente titulo="Pagamentos pendentes" imagem={Pagamento} destino="/clientHome/pagamentos" />
                <CardCliente titulo="Configuração da conta" imagem={Configuracao} destino="/clientHome/configuration" />
            </div>
        </main>
    )
}

export default ClientHome;