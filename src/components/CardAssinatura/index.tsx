import React from "react";
import "./CardAssinatura.css";

interface cardAssinaturaProps {
    plano: string
}

const CardAssinatura = ({plano}:cardAssinaturaProps) => {

    return (
        <main className="card-assinatura">
            <div className="plano-nome">
                <p>{plano}</p>    
            </div>
            <div className="detalhes-container">
                <button>Detalhes</button>
            </div>
        </main>
    )
}

export default CardAssinatura;