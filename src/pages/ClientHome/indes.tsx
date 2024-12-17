import React from "react";
import Logo from "../../img/logo.png";
import Client from "../../img/client.png";
import "./ClientHome.css";
import { FaWhatsapp } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import Card from "../../components/Cards";
import Calendario from '../../img/calendario.png';
import Pagamento from '../../img/pagamento.png';
import Configuracao from '../../img/configuracao.png';

const ClientHome = () => {
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
                        <button className="exit-button">Sair</button>
                    </div>
                </div>
            </div>
            <div className="cards-container">
                <Card titulo="Cronograma de treinos" imagem={Calendario} />
                <Card titulo="Pagamentos pendentes" imagem={Pagamento} />
                <Card titulo="Configuração da conta" imagem={Configuracao} />
            </div>
        </main>
    )
}

export default ClientHome;