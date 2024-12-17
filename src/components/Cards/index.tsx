import React from "react";
import "./Cards.css";

interface CardProps  {
    titulo : string,
    imagem : string
}

const Card = ({titulo, imagem}: CardProps) => {

    return(
        <div className="card-container">
            <div className="card-logo">
                <img src={imagem} alt={titulo}/> 
            </div>
            <div className="card-titulo">
                <p>{titulo}</p>
            </div>
            <div className="card-button">
                <button>acessar</button>
            </div>
        </div>
    )
}

export default Card;;