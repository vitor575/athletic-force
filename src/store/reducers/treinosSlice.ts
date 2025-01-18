import { createSlice } from "@reduxjs/toolkit";

interface treinosTypes {
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
            diaSemana: 'Segunda-feira',
            nome: 'Supino reto', 
            repeticoes: '3x12' 
        },
        { 
            diaSemana: 'Segunda-feira',
            nome: 'Crucifixo com halteres', 
            repeticoes: '3x12'
         },
        { 
            diaSemana: 'Segunda-feira',
            nome: 'Flexão de braço', 
            repeticoes: '3x15' 
        },
        { 
            diaSemana: 'Terça-feira', 
            nome: 'Agachamento', 
            repeticoes: '4x10' 
        },
        { 
            diaSemana: 'Terça-feira', 
            nome: 'Leg press', 
            repeticoes: '3x12' 
        },
        { 
            diaSemana: 'Terça-feira', 
            nome: 'Extensão de pernas', 
            repeticoes: '3x15' 
        },
        { 
            diaSemana: 'Quarta-feira',
            nome: 'Rosca direta', 
            repeticoes: '3x12' 
        },
        { 
            diaSemana: 'Quarta-feira',
            nome: 'Rosca alternada', 
            repeticoes: '3x12' 
        },
        { 
            diaSemana: 'Quarta-feira',
            nome: 'Rosca martelo', 
            repeticoes: '3x12' 
        },
        { 
            diaSemana: 'Quinta-feira',
            nome: 'Puxada frontal', 
            repeticoes: '3x12' 
        },
        { 
            diaSemana: 'Quinta-feira',
            nome: 'Remada baixa', 
            repeticoes: '3x12' 
        },
        { 
            diaSemana: 'Quinta-feira',
            nome: 'Levantamento terra', 
            repeticoes: '4x8' 
        },
        { 
            diaSemana: 'Sexta-feira', 
            nome: 'Desenvolvimento com barra', 
            repeticoes: '3x12' 
        },
        { 
            diaSemana: 'Sexta-feira', 
            nome: 'Elevação lateral', 
            repeticoes: '3x15' 
        },
        { 
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