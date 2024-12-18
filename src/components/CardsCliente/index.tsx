import React from "react";
import "./Cards.css";
import { Link } from "react-router-dom";

interface CardProps  {
    titulo : string,
    imagem : string,
    destino : string
}

const Card = ({titulo, imagem, destino}: CardProps) => {

    return(
        <div className="card-container">
            <div className="card-logo">
                <img src={imagem} alt={titulo}/> 
            </div>
            <div className="card-titulo">
                <p>{titulo}</p>
            </div>
            <div className="card-button">
                <Link to={destino} className="navegacao">Acessar</Link>
            </div>
        </div>
    )
}

export default Card;;