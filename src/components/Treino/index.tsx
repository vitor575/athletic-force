import React from 'react'
import "./Treino.css"
import { useAppSelector } from '../../store';
import { useParams } from 'react-router-dom';

const Treino = () => {
    const {dia} = useParams();   
    
    const treinos = useAppSelector((state) => state.treinos.treinos); 
    const treinoDoDia = treinos.filter((treino) => treino.diaSemana === dia);
    

  return (
    <section className='treino-container'>
        <div className=''>
            <ul className='treinos'>
                {treinoDoDia.map((treino, index) => (
                    <li key={index}>
                        <h2 className='treino'>{treino.nome} - {treino.repeticoes} repetições</h2>
                    </li>
                ))}
            </ul>
        </div>
    </section>
  )
}

export default Treino;
