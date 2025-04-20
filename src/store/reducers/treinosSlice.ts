import { createSlice } from "@reduxjs/toolkit";
import supino from "../../img/supino.jpg"
import Crucifixo from "../../img/Crucifixo.jpg"
import flexao from "../../img/flexao.jpg"
import Agachamento from "../../img/Agachamento.jpg"
import ExtensãoeDePernas from "../../img/Extensão dePernas.jpg"
import LegPress from "../../img/LegPress.jpg"
import RoscaDireta from "../../img/RoscaDireta.jpg"
import RoscaAlternada  from "../../img/Roscaalternada.jpg"
import RoscaMartelo  from "../../img/RoscaMartelo.jpg"
import PuxadaFrontal  from "../../img/PuxadaFrontal.jpg"
import RemadaBaixa  from "../../img/RemadaBaixa.jpg"
import LevantamentoTerra  from "../../img/LevantamentoTerra.jpg"
import DesenvolvimentoComBarra  from "../../img/DesenvolvimentoComBarra.jpg"
import ElevaçãoLateral  from "../../img/ElevaçãoLateral.jpg"
import EncolhimentoComBarra  from "../../img/EncolhimentoComBarra.jpg"

interface treinosTypes {
    imgem: string,
    diaSemana: string,
    nome: string,
    repeticoes: string
}

interface treinos {
    treinos: treinosTypes[];
}

const initialState: treinos = {
    treinos : [
        { 
            imgem: supino,
            diaSemana: 'Segunda-feira',
            nome: 'Supino reto', 
            repeticoes: '3x12' 
        },
        { 
            imgem: Crucifixo,
            diaSemana: 'Segunda-feira',
            nome: 'Crucifixo com halteres', 
            repeticoes: '3x12'
        },
        { 
            imgem: flexao,
            diaSemana: 'Segunda-feira',
            nome: 'Flexão de braço', 
            repeticoes: '3x15' 
        },
        { 
            imgem: Agachamento,
            diaSemana: 'Terça-feira', 
            nome: 'Agachamento', 
            repeticoes: '4x10' 
        },
        { 
            imgem: LegPress,
            diaSemana: 'Terça-feira', 
            nome: 'Leg press', 
            repeticoes: '3x12' 
        },
        { 
            imgem: ExtensãoeDePernas,
            diaSemana: 'Terça-feira', 
            nome: 'Extensão de pernas', 
            repeticoes: '3x15' 
        },
        { 
            imgem: RoscaDireta,
            diaSemana: 'Quarta-feira',
            nome: 'Rosca direta', 
            repeticoes: '3x12' 
        },
        { 
            imgem: RoscaAlternada,
            diaSemana: 'Quarta-feira',
            nome: 'Rosca alternada', 
            repeticoes: '3x12' 
        },
        { 
            imgem: RoscaMartelo,
            diaSemana: 'Quarta-feira',
            nome: 'Rosca martelo', 
            repeticoes: '3x12' 
        },
        { 
            imgem: PuxadaFrontal,
            diaSemana: 'Quinta-feira',
            nome: 'Puxada frontal', 
            repeticoes: '3x12' 
        },
        { 
            imgem: RemadaBaixa,
            diaSemana: 'Quinta-feira',
            nome: 'Remada baixa', 
            repeticoes: '3x12' 
        },
        { 
            imgem: LevantamentoTerra,
            diaSemana: 'Quinta-feira',
            nome: 'Levantamento terra', 
            repeticoes: '4x8' 
        },
        { 
            imgem: DesenvolvimentoComBarra,
            diaSemana: 'Sexta-feira', 
            nome: 'Desenvolvimento com barra', 
            repeticoes: '3x12' 
        },
        { 
            imgem: ElevaçãoLateral,
            diaSemana: 'Sexta-feira', 
            nome: 'Elevação lateral', 
            repeticoes: '3x15' 
        },
        { 
            imgem: EncolhimentoComBarra,
            diaSemana: 'Sexta-feira', 
            nome: 'Encolhimento com barra', 
            repeticoes: '3x15' 
        },
    ],
}

const treinosSlice = createSlice({
    name: "treinos",
    initialState,
    reducers : {

    }
})

export default treinosSlice.reducer;
