import React from "react";
import "./CardPagamento.css";

const CardPagamento = () => {
    return (
        <div className="card-pag-container">
            <div className="container-info">
                <p>Pendente</p>
                <div className="vencimento-container">
                    <h4>Vence em 20/11</h4>
                    <p>Fatura de setembro</p>
                </div>
            </div>
            <div className="valor-container">
                <div className="valor">
                    <p><span>R$</span>100,00</p>
                    <button className="pay">Pagar</button>
                </div>
            </div>
        </div>
    )
};

export default CardPagamento;