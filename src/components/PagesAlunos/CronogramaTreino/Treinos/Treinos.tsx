// src/components/Treinos/Treinos.tsx
import React, { useState, useEffect } from "react"; // Adicione useEffect
import {
    Backdrop,
    Box,
    CircularProgress,
    Typography,
    Paper,
    Button,
    useTheme,
    CssBaseline,
} from "@mui/material";
import { useNextTraining } from "../../../../services/querrys/useNextTraining"; // Seu hook existente
import { tokens } from "../../../../tema";
import img from "../../../../img/supino.jpg";
import TrainingSessionPage from "./TrainingSessionPage/TrainingSessionPage";

// Defina uma interface para o tipo de treino que você espera de useNextTraining
interface TrainingDetails {
    id: string;
    name: string;
    description: string;
    imageUrl?: string; // Pode ser opcional, dependendo da sua API
    exercises: Array<{
        id: string;
        name: string;
        muscleGroup: string;
        qtdSets: number;
        qtdReps: number;
        time: number;
    }>;
}

const Treinos: React.FC = () => {
    // Não é necessário o 'refetch' aqui, pois o 'refetchQueries' da mutação lidará com isso.
    const { nextTraining, loading, error,refetch } = useNextTraining();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [isTrainingActive, setIsTrainingActive] = useState(false);
    const [activeTrainingData, setActiveTrainingData] = useState<TrainingDetails | null>(null);

    // Adicione um useEffect para observar as mudanças em nextTraining
    // Isso é útil para depuração e para entender o fluxo de dados.
    useEffect(() => {
        console.log("Treinos - Estado do useNextTraining:", { nextTraining, loading, error });
        // Se a sessão de treino estiver ativa e nextTraining mudar para null (por exemplo,
        // se o backend indicar que não há mais treinos), você pode querer voltar para a tela inicial.
        // No entanto, para o fluxo de "próximo treino", você geralmente só se importa com a atualização.
    }, [nextTraining, loading, error]);


    // Função para iniciar o treino e mudar a visualização
    const handleStartTraining = () => {
        if (nextTraining?.id) {
            setActiveTrainingData(nextTraining); // Passa o objeto completo
            setIsTrainingActive(true); // Ativa a visualização da sessão de treino
        } else {
            alert("Não foi possível iniciar o treino: ID do treino não encontrado ou treino não disponível.");
        }
    };

    // Função de callback para quando a sessão de treino é finalizada
    const handleTrainingFinished = () => {
        setIsTrainingActive(false); // Volta para a visualização do cronograma
        setActiveTrainingData(null); // Limpa o treino ativo
        // REMOVIDO: refetch(); // O refetchQueries na mutação já cuidará disso.
                              // Chamar refetch() aqui pode ser redundante ou causar problemas de timing.
    };

    // Renderiza a tela da sessão de treino se isTrainingActive for true
    // Passamos o activeTrainingData completo para TrainingSessionPage
    if (isTrainingActive && activeTrainingData) {
        return (
            <TrainingSessionPage
                trainingData={activeTrainingData} // Passa o OBJETO COMPLETO
                onTrainingFinished={handleTrainingFinished}
            />
        );
    }

    // Se estiver carregando, mostra o Backdrop
    if (loading) {
        return (
            <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
                <CircularProgress color="inherit" />
            </Backdrop>
        );
    }

    // SE HOUVER UM ERRO (INCLUINDO "Training not found" vindo do backend como erro GraphQL)
    if (error) {
        const isNotFound = error.message.includes("Training not found");

        let displayMessage: string;
        let showRefreshButton: boolean;

        if (isNotFound) {
            displayMessage = "Você não tem treino agendado no momento. Por favor, fale com seu instrutor.";
            showRefreshButton = false;
        } else {
            displayMessage = "Ocorreu um erro ao carregar seus treinos. Por favor, tente novamente.";
            showRefreshButton = true;
        }

        return (
            <Box sx={{ p: 2, m: "40px 100px 0", borderRadius: 2, color: "#fff", textAlign: "center" }}>
                <Typography variant="h6">{displayMessage}</Typography>
                {showRefreshButton && (
                    // O botão de "Tentar Novamente" ainda pode usar refetch() para tentar de novo
                    <Button onClick={() => refetch()} sx={{ mt: 2, bgcolor: colors.greenAccent[500], color: "#fff" }}>
                        Tentar Novamente
                    </Button>
                )}
            </Box>
        );
    }

    // Se não há erro, mas nextTraining é null/undefined (e não está carregando)
    if (!nextTraining) {
        return (
            <Box sx={{ p: 2, m: "40px 100px 0", bgcolor: colors.grey[800], borderRadius: 2, color: "#fff", textAlign: "center" }}>
                <Typography variant="h6">Nenhum treino disponível no momento.</Typography>
                <Button onClick={() => refetch()} sx={{ mt: 2, bgcolor: colors.grey[700], color: "#fff" }}>
                    Atualizar
                </Button>
            </Box>
        );
    }

    return (
        <Box sx={{ color: colors.grey[900], p: 2 }}>
            <CssBaseline />
            <Typography variant="h3" gutterBottom sx={{ color: colors.greenAccent[500] }}>Cronograma de Treino</Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, flexDirection: { xs: "column", md: "row" } }}>
                <Typography variant="h6">Confira os detalhes do seu próximo treino e prepare-se para começar!</Typography>
                <Typography sx={{ fontSize: ".8em", color: colors.greenAccent[500] }}>ID: {nextTraining?.id || "N/A"}</Typography>
            </Box>
            <Paper sx={{ p: 1, bgcolor: colors.primary[300], color: "#fff", display: "flex", gap: 3, flexDirection: { xs: "column", md: "row" }, alignItems: "center" }}>
                <Box component="img" src={nextTraining.imageUrl || img} alt={`Treino ${nextTraining.name}`} sx={{ width: 70, height: 70, borderRadius: 1, objectFit: "cover" }} />
                <Box sx={{ flex: 1, textAlign: { xs: "center", md: "left" } }}>
                    <Typography variant="h6">{nextTraining.name}</Typography>
                    <Typography>{nextTraining.description}</Typography>
                </Box>
                <Button variant="contained" sx={{ bgcolor: colors.greenAccent[500], ":hover": { bgcolor: colors.greenAccent[600] }, mr: { xs: 0, md: 2 }, width: { xs: "100%", md: "auto" } }} onClick={handleStartTraining}>
                    Iniciar treino
                </Button>
            </Paper>
        </Box>
    );
};

export default Treinos;