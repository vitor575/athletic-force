import React, { useState, useEffect } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  TextField,
  Button,
  useTheme,
  Alert,
  IconButton,
  Paper,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { FINISH_TRAINING } from "../../../../../services/mutations/finishTraining";
import { GET_MY_NEXT_TRAINING } from "../../../../../services/querrys/useNextTraining";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../../../../tema";

interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  qtdSets: number;
  qtdReps: number;
  time: number;
}

interface TrainingData {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  exercises: Exercise[];
}

interface SerieData {
  peso: number | null;
  repeticoes: number | null;
  completed: boolean;
}

interface ExerciseSeriesData {
  [exerciseId: string]: SerieData[];
}

interface Execution {
  exerciseId: string;
  sets: {
    reps: number;
    weight: number;
  }[];
  time?: number;
}

interface TrainingSessionPageProps {
  trainingData: TrainingData;
  executionsHistory?: Execution[];
  onTrainingFinished: () => void;
}

const TrainingSessionPage: React.FC<TrainingSessionPageProps> = ({
  trainingData,
  executionsHistory,
  onTrainingFinished,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [finishTraining, { loading }] = useMutation(FINISH_TRAINING);
  const [exerciseSeriesData, setExerciseSeriesData] =
    useState<ExerciseSeriesData>({});
  const [cardioTimes, setCardioTimes] = useState<{
    [exerciseId: string]: number | null;
  }>({});
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const navigate = useNavigate();

  const handleExit = () => {
    navigate("/clientHome/cronograma");
  };

  useEffect(() => {
    if (trainingData?.exercises) {
      const initialSeriesData: ExerciseSeriesData = {};
      const initialCardioTimes: { [exerciseId: string]: number | null } = {};
      trainingData.exercises.forEach((exercise: Exercise) => {
        initialSeriesData[exercise.id] = Array.from(
          { length: exercise.qtdSets },
          () => ({
            peso: null,
            repeticoes: exercise.qtdReps || null,
            completed: false,
          }),
        );
        initialCardioTimes[exercise.id] = exercise.time || null;
      });
      setExerciseSeriesData(initialSeriesData);
      setCardioTimes(initialCardioTimes);
    }
  }, [trainingData]);

  const handleSeriesInputChange = (
    exerciseId: string,
    serieIndex: number,
    field: keyof Omit<SerieData, "completed">,
    value: string,
  ) => {
    setExerciseSeriesData((prevData) => {
      const newSeriesData = [...(prevData[exerciseId] || [])];
      newSeriesData[serieIndex] = {
        ...newSeriesData[serieIndex],
        [field]: value === "" ? null : parseFloat(value),
      };
      return { ...prevData, [exerciseId]: newSeriesData };
    });
  };

  const handleCardioTimeChange = (exerciseId: string, value: string) => {
    setCardioTimes((prev) => ({
      ...prev,
      [exerciseId]: value === "" ? null : parseInt(value, 10),
    }));
  };

  const handleToggleSerieCompleted = (
    exerciseId: string,
    serieIndex: number,
  ) => {
    setExerciseSeriesData((prevData) => {
      const newSeriesData = [...(prevData[exerciseId] || [])];
      newSeriesData[serieIndex] = {
        ...newSeriesData[serieIndex],
        completed: !newSeriesData[serieIndex].completed,
      };
      return { ...prevData, [exerciseId]: newSeriesData };
    });
  };

  const handleAddSerie = (exerciseId: string) => {
    setExerciseSeriesData((prevData) => ({
      ...prevData,
      [exerciseId]: [
        ...(prevData[exerciseId] || []),
        { peso: null, repeticoes: null, completed: false },
      ],
    }));
  };

  const handleRemoveSerie = (exerciseId: string, serieIndex: number) => {
    setExerciseSeriesData((prevData) => {
      const series = prevData[exerciseId] || [];
      if (series.length <= 1) return prevData;
      return {
        ...prevData,
        [exerciseId]: series.filter((_, index) => index !== serieIndex),
      };
    });
  };

  const validateCurrentExercise = (): boolean => {
    const exercise = trainingData.exercises[currentExerciseIndex];
    if (
      exercise.time > 0 &&
      (cardioTimes[exercise.id] === null || isNaN(cardioTimes[exercise.id]!))
    )
      return false;
    const seriesData = exerciseSeriesData[exercise.id];
    if (!seriesData) return false;
    return seriesData.every(
      (s) =>
        s.peso !== null &&
        !isNaN(s.peso) &&
        s.repeticoes !== null &&
        !isNaN(s.repeticoes),
    );
  };

  const handlePrevious = () => {
    if (currentExerciseIndex > 0) setCurrentExerciseIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    if (validateCurrentExercise()) {
      setSubmitMessage(null);
      if (currentExerciseIndex < trainingData.exercises.length - 1) {
        setCurrentExerciseIndex((prev) => prev + 1);
      }
    } else {
      setSubmitMessage({
        type: "error",
        text: "Preencha todos os campos de peso e repetições para avançar.",
      });
    }
  };

  const handleSubmit = async (event?: React.SyntheticEvent) => {
    if (event) event.preventDefault();
    setSubmitMessage(null);

    const dataToSubmit = {
      trainingId: trainingData.id,
      exercises: trainingData.exercises.map((exercise) => ({
        exerciseId: exercise.id,
        series:
          exerciseSeriesData[exercise.id]?.map((serie) => ({
            repetitions: Number(serie.repeticoes) || 0,
            weight: Number(serie.peso) || 0,
          })) || [],
        cardioTime: cardioTimes[exercise.id] || 0,
      })),
    };

    try {
      const result = await finishTraining({
        variables: { trainingFinished: dataToSubmit },
        refetchQueries: [{ query: GET_MY_NEXT_TRAINING }],
      });

      if (result.data) {
        setSubmitMessage({
          type: "success",
          text: "Treino finalizado com sucesso!",
        });
        onTrainingFinished();
      }
    } catch (e) {
      setSubmitMessage({ type: "error", text: "Erro ao salvar o treino." });
    }
  };

  const exercise = trainingData.exercises[currentExerciseIndex];
  const totalExercises = trainingData.exercises.length;
  const series = exerciseSeriesData[exercise.id] || [];

  const getPreviousSetInfo = (exId: string, setIndex: number) => {
    const prevExec = executionsHistory?.find((e) => e.exerciseId === exId);
    if (!prevExec || !prevExec.sets || !prevExec.sets[setIndex]) return "-";
    const set = prevExec.sets[setIndex];
    return `${set.weight}kg x ${set.reps}`;
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        bgcolor: colors.primary[500],
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          flex: 1,
          px: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            flex: 1,
            bgcolor: colors.primary[500],
            borderRadius: "16px",
            border: `2px solid ${colors.blueAccent[300]}`,
            p: 1.5,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            mb: 0.5,
          }}
        >
          <Box sx={{ mb: 1, flexShrink: 0 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
              <IconButton
                onClick={onTrainingFinished}
                size="small"
                sx={{
                  color: colors.primary[900],
                  bgcolor: colors.primary[600],
                  borderRadius: "8px",
                  p: 0.6,
                  mr: 1,
                  "&:hover": { bgcolor: colors.primary[400], color: "#fff" },
                }}
              >
                <ArrowBackIcon sx={{ fontSize: 18 }} />
              </IconButton>

              <Box sx={{ flex: 1, textAlign: "center" }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: colors.blueAccent[300],
                    fontWeight: "900",
                    fontSize: "0.7rem",
                    textTransform: "uppercase",
                    letterSpacing: 1.2,
                  }}
                >
                  {exercise.muscleGroup}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "900",
                    color: "#fff",
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    mb: 0.2,
                  }}
                >
                  {exercise.name}
                </Typography>
              </Box>

              <Box sx={{ width: 34 }} />
            </Box>

            <Box
              sx={{
                mt: 0.5,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 0,
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: colors.primary[900],
                  fontWeight: "900",
                  fontSize: "0.6rem",
                  textTransform: "uppercase",
                }}
              >
                Tempo de Descanso
              </Typography>
              <Box
                sx={{
                  bgcolor: colors.primary[600],
                  px: 2.5,
                  py: 0.6,
                  borderRadius: "12px",
                  border: `2px solid ${colors.blueAccent[600]}`,
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  cursor: "pointer",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{ fontWeight: "900", color: "#fff" }}
                >
                  3:00
                </Typography>
                <Box
                  component="span"
                  sx={{ fontSize: "0.7rem", color: colors.blueAccent[300] }}
                >
                  ▼
                </Box>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              px: 0.5,
              mt: 1,
              "&::-webkit-scrollbar": { width: "6px" },
              "&::-webkit-scrollbar-track": { bgcolor: "transparent" },
              "&::-webkit-scrollbar-thumb": {
                bgcolor: colors.primary[400],
                borderRadius: "10px",
                "&:hover": { bgcolor: colors.primary[300] },
              },
            }}
          >
            <Box sx={{ display: "flex", mb: 1, px: 1, gap: 1.5 }}>
              <Typography
                variant="caption"
                sx={{
                  width: 35,
                  color: colors.primary[900],
                  fontWeight: "900",
                  textAlign: "center",
                  fontSize: "0.75rem",
                  letterSpacing: 1,
                }}
              >
                SET
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  flex: 1,
                  textAlign: "center",
                  color: colors.primary[900],
                  fontWeight: "900",
                  fontSize: "0.75rem",
                  letterSpacing: 1,
                }}
              >
                ANTERIOR
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  flex: 1,
                  textAlign: "center",
                  color: colors.primary[900],
                  fontWeight: "900",
                  fontSize: "0.75rem",
                  letterSpacing: 1,
                }}
              >
                KG
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  flex: 1,
                  textAlign: "center",
                  color: colors.primary[900],
                  fontWeight: "900",
                  fontSize: "0.75rem",
                  letterSpacing: 1,
                }}
              >
                REPS
              </Typography>
              <Box sx={{ width: 88 }} />
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {series.map((serie, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    py: 0.5,
                    px: 1,
                    gap: 1.5,
                    bgcolor: serie.completed
                      ? `${colors.blueAccent[200]}`
                      : colors.primary[600],
                    borderRadius: "16px",
                    border: `2px solid ${serie.completed ? colors.blueAccent[100] : colors.blueAccent[500]}`,
                    transition: "all 0.3s ease",
                  }}
                >
                  <Typography
                    sx={{
                      width: 35,
                      fontWeight: "900",
                      color: "#fff",
                      fontSize: "0.95rem",
                      textAlign: "center",
                    }}
                  >
                    {index + 1}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      flex: 1,
                      textAlign: "center",
                      color: colors.primary[900],
                      fontWeight: "900",
                      fontSize: "0.9rem",
                    }}
                  >
                    {getPreviousSetInfo(exercise.id, index).split("kg")[0] ||
                      "-"}
                  </Typography>

                  <Box
                    sx={{ flex: 1, display: "flex", justifyContent: "center" }}
                  >
                    <TextField
                      variant="outlined"
                      size="small"
                      placeholder="-"
                      value={serie.peso ?? ""}
                      onChange={(e) =>
                        handleSeriesInputChange(
                          exercise.id,
                          index,
                          "peso",
                          e.target.value,
                        )
                      }
                      sx={{
                        width: "100%",
                        maxWidth: 80,
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "10px",
                          bgcolor: colors.primary[500],
                          height: 40,
                          "& fieldset": { border: "none" },
                          "& input": {
                            textAlign: "center",
                            fontWeight: "900",
                            color: colors.primary[900],
                            p: 0,
                            fontSize: "1rem",
                          },
                        },
                      }}
                    />
                  </Box>

                  <Box
                    sx={{ flex: 1, display: "flex", justifyContent: "center" }}
                  >
                    <TextField
                      variant="outlined"
                      size="small"
                      placeholder="-"
                      value={serie.repeticoes ?? ""}
                      onChange={(e) =>
                        handleSeriesInputChange(
                          exercise.id,
                          index,
                          "repeticoes",
                          e.target.value,
                        )
                      }
                      sx={{
                        width: "100%",
                        maxWidth: 80,
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "10px",
                          bgcolor: colors.primary[500],
                          height: 40,
                          "& fieldset": { border: "none" },
                          "& input": {
                            textAlign: "center",
                            fontWeight: "900",
                            color: colors.primary[900],
                            p: 0,
                            fontSize: "1rem",
                          },
                        },
                      }}
                    />
                  </Box>

                  <Box sx={{ display: "flex", gap: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() => handleRemoveSerie(exercise.id, index)}
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: "10px",
                        bgcolor: colors.primary[500],
                        color: colors.primary[900],
                        "&:hover": {
                          bgcolor: "#ff444422",
                          color: "#ff4444",
                        },
                      }}
                    >
                      <DeleteIcon sx={{ fontSize: "1.2rem" }} />
                    </IconButton>

                    <IconButton
                      onClick={() =>
                        handleToggleSerieCompleted(exercise.id, index)
                      }
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: "10px",
                        bgcolor: serie.completed
                          ? colors.blueAccent[500]
                          : colors.primary[500],
                        color: "#fff",
                        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                        "&:hover": {
                          bgcolor: serie.completed
                            ? colors.blueAccent[600]
                            : colors.primary[400],
                        },
                      }}
                    >
                      <CheckCircleOutlineIcon sx={{ fontSize: "1.4rem" }} />
                    </IconButton>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>

          <Button
            fullWidth
            startIcon={<AddIcon />}
            onClick={() => handleAddSerie(exercise.id)}
            sx={{
              mt: 0.5,
              py: 0.4,
              bgcolor: colors.primary[600],
              color: "#fff",
              textTransform: "none",
              fontWeight: "900",
              borderRadius: "14px",
              fontSize: "0.9rem",
              "&:hover": { bgcolor: colors.primary[400] },
              border: `1px dashed ${colors.primary[300]}`,
            }}
          >
            Adicionar série
          </Button>
        </Paper>
      </Box>

      <Box sx={{ px: 2, pb: 1.5, flexShrink: 0 }}>
        <Box sx={{ display: "flex", gap: 1, mb: 1.5 }}>
          {Array.from({ length: totalExercises }).map((_, i) => (
            <Box
              key={i}
              sx={{
                height: 5,
                flex: 1,
                bgcolor:
                  i < currentExerciseIndex
                    ? colors.blueAccent[400]
                    : colors.primary[600],
                borderRadius: "2.5px",
              }}
            />
          ))}
        </Box>

        <Box sx={{ display: "flex", gap: 1.5 }}>
          <Button
            variant="contained"
            fullWidth
            onClick={handlePrevious}
            disabled={currentExerciseIndex === 0}
            sx={{
              bgcolor: colors.primary[600],
              color: "#fff",
              py: 1.8,
              borderRadius: "14px",
              fontWeight: "900",
              fontSize: "0.9rem",
              textTransform: "none",
              border: `1px solid ${colors.primary[400]}`,
              "&:hover": { bgcolor: colors.primary[500] },
            }}
          >
            Anterior
          </Button>

          <Button
            variant="contained"
            fullWidth
            onClick={
              currentExerciseIndex === totalExercises - 1
                ? () => handleSubmit()
                : handleNext
            }
            sx={{
              bgcolor: colors.blueAccent[400],
              color: "#fff",
              py: 1.8,
              borderRadius: "14px",
              fontWeight: "900",
              fontSize: "0.95rem",
              textTransform: "none",
              boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
              "&:hover": { bgcolor: colors.blueAccent[500] },
            }}
          >
            {currentExerciseIndex === totalExercises - 1 ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CheckCircleOutlineIcon sx={{ fontSize: 20 }} />
                Completar atividade
              </Box>
            ) : (
              "Próximo exercício"
            )}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default TrainingSessionPage;
