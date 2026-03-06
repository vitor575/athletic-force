
import React, { useState, useEffect } from "react";
import {
  Backdrop,
  Box,
  CircularProgress,
  Typography,
  Paper,
  Button,
  useTheme,
  CssBaseline,
  useMediaQuery,
} from "@mui/material";
import { useNextTraining } from "../../../../services/querrys/useNextTraining"; // Seu hook existente
import { tokens } from "../../../../tema";
import { FaDumbbell, FaClock, FaCalendarAlt } from "react-icons/fa";
import img from "../../../../img/supino.jpg";
import TrainingSessionPage from "./TrainingSessionPage/TrainingSessionPage";


interface TrainingDetails {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  exercises: Array<{
    id: string;
    name: string;
    muscleGroup: string;
    qtdSets: number;
    qtdReps: number;
    time: number;
  }>;
}

interface TreinosProps {
  onSessionStateChange?: (isActive: boolean) => void;
}

const Treinos: React.FC<TreinosProps> = ({ onSessionStateChange }) => {
  const { nextTraining, executionsHistory, loading, error, refetch } =
    useNextTraining();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [isTrainingActive, setIsTrainingActive] = useState(false);
  const [activeTrainingData, setActiveTrainingData] =
    useState<TrainingDetails | null>(null);

  const totalSets = nextTraining?.exercises?.reduce(
    (acc: number, ex: any) => acc + (ex.qtdSets || 0),
    0,
  );
  const estimatedTime = nextTraining?.exercises?.reduce(
    (acc: number, ex: any) => acc + (ex.time || 0),
    0,
  );
  const muscleGroups = new Set(
    nextTraining?.exercises?.map((ex: any) => ex.muscleGroup),
  );

  useEffect(() => {
    console.log("Treinos - Estado do useNextTraining:", {
      nextTraining,
      loading,
      error,
    });

  }, [nextTraining, loading, error]);

  useEffect(() => {
    onSessionStateChange?.(isTrainingActive);
  }, [isTrainingActive, onSessionStateChange]);

  const handleStartTraining = () => {
    if (nextTraining?.id) {
      setActiveTrainingData(nextTraining);
      setIsTrainingActive(true);
    } else {
      alert(
        "Não foi possível iniciar o treino: ID do treino não encontrado ou treino não disponível.",
      );
    }
  };

  const handleTrainingFinished = () => {
    setIsTrainingActive(false);
    setActiveTrainingData(null);
    refetch();
  };

  if (isTrainingActive && activeTrainingData) {
    return (
      <TrainingSessionPage
        trainingData={activeTrainingData}
        executionsHistory={executionsHistory}
        onTrainingFinished={handleTrainingFinished}
      />
    );
  }

  if (loading) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  if (error) {
    const isNotFound = error.message.includes("Training not found");

    let displayMessage: string;
    let showRefreshButton: boolean;

    if (isNotFound) {
      displayMessage =
        "Você não tem treino agendado no momento. Por favor, fale com seu instrutor.";
      showRefreshButton = false;
    } else {
      displayMessage =
        "Ocorreu um erro ao carregar seus treinos. Por favor, tente novamente.";
      showRefreshButton = true;
    }

    return (
      <Box
        sx={{
          p: 2,
          m: "40px 100px 0",
          borderRadius: 2,
          color: "#fff",
          textAlign: "center",
        }}
      >
        <Typography variant="h6">{displayMessage}</Typography>
        {showRefreshButton && (
          <Button
            onClick={() => refetch()}
            sx={{ mt: 2, bgcolor: colors.greenAccent[500], color: "#fff" }}
          >
            Tentar Novamente
          </Button>
        )}
      </Box>
    );
  }

  if (!nextTraining) {
    return (
      <Box
        sx={{
          p: 2,
          m: "40px 100px 0",
          bgcolor: colors.grey[800],
          borderRadius: 2,
          color: "#fff",
          textAlign: "center",
        }}
      >
        <Typography variant="h6">
          Nenhum treino disponível no momento.
        </Typography>
        <Button
          onClick={() => refetch()}
          sx={{ mt: 2, bgcolor: colors.grey[700], color: "#fff" }}
        >
          Atualizar
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        color: "#fff",
        p: { xs: 1, md: 2 },
        bgcolor: "transparent",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <CssBaseline />

      <Box sx={{ mb: 1, flexShrink: 0 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: "900",
            color: "#fff",
            mb: 0.2,
            fontSize: { xs: "1.2rem", md: "1.4rem" },
          }}
        >
          Próxima Rotina
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: colors.primary[900],
            fontWeight: "900",
            letterSpacing: 1,
            fontSize: "0.65rem",
          }}
        >
          PREPARE SEU CORPO PARA O DESAFIO DE HOJE.
        </Typography>
      </Box>

      <Paper
        elevation={0}
        sx={{
          flex: 1,
          p: 0,
          bgcolor: colors.primary[500],
          borderRadius: "20px",
          overflow: "hidden",
          border: `2px solid ${colors.blueAccent[300]}`,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            bgcolor: colors.primary[600],
            alignItems: "center",
            p: { xs: 1.5, md: 2 },
            borderBottom: `1px solid ${colors.primary[600]}`,
            flexShrink: 0,
          }}
        >
          <Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "900",
                color: "#fff",
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              {nextTraining.name}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: colors.primary[900],
                fontWeight: "700",
                letterSpacing: 0.5,
                mt: 0.1,
              }}
            >
              PREPARE SEU CORPO PARA O DESAFIO
            </Typography>
          </Box>
        </Box>

        {/* Scrollable Content Area */}
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            p: { xs: 1.5, md: 2 },
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 2, md: 4 },
            // Custom scrollbar
            "&::-webkit-scrollbar": { width: "6px" },
            "&::-webkit-scrollbar-track": { bgcolor: "transparent" },
            "&::-webkit-scrollbar-thumb": {
              bgcolor: colors.primary[400],
              borderRadius: "10px",
              "&:hover": { bgcolor: colors.primary[300] },
            },
          }}
        >
          {/* Main Content (Left) */}
          <Box sx={{ flex: 1.2 }}>
            <Typography
              sx={{
                color: "#fff",
                mb: 3,
                lineHeight: 1.6,
                fontSize: "0.95rem",
                fontWeight: "600",
              }}
            >
              {nextTraining.description}
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Typography
                variant="caption"
                sx={{
                  color: colors.primary[900],
                  fontWeight: "900",
                  mb: 1,
                  display: "block",
                  textTransform: "uppercase",
                  letterSpacing: 2,
                  fontSize: "0.65rem",
                }}
              >
                Lista de Exercícios:
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 0.7 }}>
                {nextTraining.exercises.map((ex: any, i: number) => (
                  <Box
                    key={i}
                    sx={{
                      p: 1.2,
                      bgcolor: colors.primary[600],
                      borderRadius: "10px",
                      border: `1px solid ${colors.blueAccent[600]}`,
                      fontSize: "0.85rem",
                      color: "#fff",
                      fontWeight: "900",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    {ex.name}
                    <Typography
                      variant="caption"
                      sx={{
                        color: colors.blueAccent[300],
                        fontSize: "0.7rem",
                      }}
                    >
                      {ex.muscleGroup}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
          {/* Sidebar (Right) */}
          <Box
            sx={{
              flex: { xs: 1, md: 0.8 },
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {/* Stats Row Compact */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                bgcolor: colors.primary[600],
                p: 2,
                borderRadius: "16px",
                border: `1px solid ${colors.primary[400]}`,
              }}
            >
              <Box sx={{ textAlign: "center", flex: 1 }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: colors.primary[900],
                    fontWeight: "900",
                    fontSize: "0.65rem",
                  }}
                >
                  EXE
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "900",
                    color: colors.blueAccent[300],
                    fontSize: "1.1rem",
                  }}
                >
                  {nextTraining.exercises.length}
                </Typography>
              </Box>
              <Box sx={{ textAlign: "center", flex: 1 }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: colors.primary[900],
                    fontWeight: "900",
                    fontSize: "0.65rem",
                  }}
                >
                  SETS
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "900",
                    color: colors.blueAccent[300],
                    fontSize: "1.1rem",
                  }}
                >
                  {totalSets}
                </Typography>
              </Box>
              <Box sx={{ textAlign: "center", flex: 1 }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: colors.primary[900],
                    fontWeight: "900",
                    fontSize: "0.65rem",
                  }}
                >
                  MIN
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "900",
                    color: colors.blueAccent[300],
                    fontSize: "1.1rem",
                  }}
                >
                  {estimatedTime}
                </Typography>
              </Box>
            </Box>

            {/* Muscle Map Compact */}
            <Box
              sx={{
                p: 2,
                borderRadius: "16px",
                bgcolor: colors.primary[600],
                border: `1px solid ${colors.primary[400]}`,
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  fontWeight: "900",
                  mb: 1.5,
                  display: "block",
                  color: colors.primary[900],
                  textTransform: "uppercase",
                  fontSize: "0.65rem",
                }}
              >
                MÚSCULOS ALVOS
              </Typography>

              <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    bgcolor: colors.primary[500],
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.3rem",
                    border: `1px solid ${colors.blueAccent[600]}`,
                  }}
                >
                  💪
                </Box>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.8 }}>
                  {Array.from(muscleGroups as Set<string>).map(
                    (muscle: string) => (
                      <Box
                        key={muscle}
                        sx={{
                          px: 1.2,
                          py: 0.5,
                          bgcolor: colors.blueAccent[200],
                          borderRadius: "8px",
                          fontSize: "0.65rem",
                          fontWeight: "900",
                          color: colors.primary[900],
                          border: `1px solid ${colors.blueAccent[100]}`,
                        }}
                      >
                        {muscle}
                      </Box>
                    ),
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Paper Footer - Fixed */}
        <Box
          sx={{
            p: 2,
            borderTop: `1px solid ${colors.primary[600]}`,
            bgcolor: colors.primary[600],
            flexShrink: 0,
          }}
        >
          <Button
            variant="contained"
            fullWidth
            sx={{
              bgcolor: colors.blueAccent[400],
              color: "#fff",
              ":hover": { bgcolor: colors.blueAccent[500] },
              py: 1.8,
              borderRadius: "14px",
              fontWeight: "900",
              fontSize: "1rem",
              textTransform: "none",
              boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
            }}
            onClick={handleStartTraining}
          >
            {isMobile ? "Começar Treino" : "Iniciar Sessão"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Treinos;
