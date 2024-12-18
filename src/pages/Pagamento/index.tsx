import React from "react";
import "./Pagamento.css";
import CardPagamento from "../../components/CardPagamento";
import CardAssinatura from "../../components/CardAssinatura";


const Pagamento = () => {

    return (
        <main className="pagamento-container">
            <div className="card-pay-container">
                <CardPagamento />
                <CardPagamento />
                <CardPagamento />
            </div>
            <aside className="assinatura-container">
                <h2>Assinatura</h2>
                    <CardAssinatura plano="plano básico R$100,00"/>
                    <CardAssinatura plano="plano médio R$140,00"/>
                    <CardAssinatura plano="plano ultra R$180,00"/>
                <button className="trocar-plano">Trocar plano</button>
            </aside>
        </main>    
    )
};

export default Pagamento;