import React from "react";
import "./Pagamento.css";
import CardPagamento from "../../components/CardPagamento";
import CardAssinatura from "../../components/CardAssinatura";

const Pagamento = () => {
    const planos = [
        "Plano básico R$100,00",
        "Plano médio R$140,00",
        "Plano ultra R$180,00",
    ];

    return (
        <main className="pagamento-container">
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
