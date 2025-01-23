import React, { useState } from "react";
import { Outlet, useNavigate } from 'react-router-dom';
import "./CronogramaTreino.css";
import { FaArrowLeft, FaArrowRight} from "react-icons/fa";

const CronogramaTreino: React.FC = () => {

  const diaSemana = ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira"]

  const navigate = useNavigate();

  const [diaAtual, setDiaAtual] = useState(0);

  const handleExit = () => {
    navigate("/clientHome");
};

  const handlePrevious = () => {
    const newIndex = diaAtual === 0 ? diaSemana.length - 1 : diaAtual - 1;
    setDiaAtual(newIndex);
    navigate(`/clientHome/cronograma/${diaSemana[newIndex]}`);
  };

  const handleNext = () => {
    const newIndex = diaAtual === diaSemana.length - 1 ? 0 : diaAtual + 1;
    setDiaAtual(newIndex);
    navigate(`/clientHome/cronograma/${diaSemana[newIndex]}`);
  };

  return (
    <main className="cronograma">
      <button className="exit-button" onClick={handleExit}>Sair</button>
      <div className="cronograma-container">
        <div className="semana-container">
          <button className="voltar__dia" onClick={handlePrevious}><FaArrowLeft/></button>
          <h1>{diaSemana[diaAtual]}</h1>
          <button className="avancar__dia" onClick={handleNext}><FaArrowRight/></button>
        </div>
      
        <div className="outlet-container">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default CronogramaTreino;
