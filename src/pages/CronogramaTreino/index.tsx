import React from "react";
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import "./CronogramaTreino.css";

interface Horario {
  hora: string;
  atividades: string[];
}

const diasSemana = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

const horarios: Horario[] = [
  { hora: "06:10", atividades: ["Spinning (45 min)", "", "", "", "", ""] },
  { hora: "07:10", atividades: ["RPM (45 min)", "", "", "", "", ""] },
  { hora: "08:10", atividades: ["", "", "", "", "", ""] },
  { hora: "09:10", atividades: ["", "", "Spinning (45 min)", "", "", ""] },
  { hora: "10:10", atividades: ["", "", "", "", "", ""] },
  { hora: "11:10", atividades: ["", "", "", "", "", ""] },
  { hora: "17:10", atividades: ["", "", "", "", "", ""] },
  { hora: "19:10", atividades: ["", "", "", "Cardio (1 hora)", "", ""] },
];

const CronogramaTreino: React.FC = () => {

    const navigate = useNavigate();

    const handleExit = () => {
        navigate('/clientHome');
      };

  return (
    <div className="cronograma-container">
      <h1>Cronograma de Treino</h1>
      <button className="exit-button" onClick={handleExit}>
        <FaSignOutAlt /> Sair
      </button>

      <table className="cronograma-tabela">
        <thead>
          <tr>
            <th></th>
            {diasSemana.map((dia, index) => (
              <th key={index}>{dia}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {horarios.map((horario, index) => (
            <tr key={index}>
              <td className="horario">{horario.hora}</td>
              {horario.atividades.map((atividade, idx) => (
                <td key={idx} className={atividade ? "atividade-preenchida" : "atividade-vazia"}>{atividade}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CronogramaTreino;
