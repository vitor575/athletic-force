import React from "react";
import "./Pagamento.css";
import CardPagamento from "../../components/CardPagamento";
import CardAssinatura from "../../components/CardAssinatura";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Pagamento = () => {
    const planos = [
        "Plano básico R$100,00",
        "Plano médio R$140,00",
        "Plano ultra R$180,00",
    ];

    const navigate = useNavigate();

    const handleExit = () => {
        navigate("/clientHome");
    };

    return (
        <main className="pagamento-container">
            <button className="exit-button" onClick={handleExit}>
                <FaSignOutAlt />Voltar
            </button>
            <div className="card-pay-container">
                <h1>Detalhes do Pagamento</h1>
                <CardPagamento />
                <CardPagamento />
                <CardPagamento />
            </div>
            <aside className="assinatura-container">
                <h2>Assinatura</h2>
                {planos.length ? (
                    planos.map((plano, index) => (
                        <CardAssinatura key={index} plano={plano} />
                    ))
                ) : (
                    <p>Nenhum plano disponível</p>
                )}
                <button className="trocar-plano">Trocar plano</button>
            </aside>
        </main>
    );
};

export default Pagamento;
