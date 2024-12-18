import React from "react";
import "./CardPagamento.css";

const CardPagamento = () => {
    return (
        <div className="card-pag-container">
            <div className="container-info">
                <p>Pendente</p>
                <div className="vencimento-container">
                    <p>Vence em 20/11</p>
                    <p>Fatura de setembro</p>
                </div>
            </div>
            <div className="valor-container">
                <div className="valor">
                    <p>R$100,00</p>
                    <button>pagar</button>
                </div>
            </div>
        </div>
    )
};

export default CardPagamento;