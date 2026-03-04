// src/components/Treinos/TrainingSessionPage/TrainingSessionPage.tsx

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
} from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import { tokens } from "../../../../../tema";
import { FINISH_TRAINING } from "../../../../../services/mutations/finishTraining";
import { GET_MY_NEXT_TRAINING } from "../../../../../services/querrys/useNextTraining"; // Importe a query
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

// Interfaces (mantidas as suas)
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
    navigate("/clientHome");
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
      if (series.length <= 1) {
        setSubmitMessage({
          type: "error",
          text: "Cada exercício deve ter pelo menos uma série.",
        });
        setTimeout(() => setSubmitMessage(null), 3000);
        return prevData;
      }

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
    ) {
      return false;
    }
    const seriesData = exerciseSeriesData[exercise.id];
    if (!seriesData) return false;
    for (const serie of seriesData) {
      if (
        serie.peso === null ||
        isNaN(serie.peso) ||
        serie.repeticoes === null ||
        isNaN(serie.repeticoes)
      ) {
        return false;
      }
    }
    return true;
  };

  const validateForm = (): boolean => {
    for (const exercise of trainingData.exercises) {
      if (
        exercise.time > 0 &&
        (cardioTimes[exercise.id] === null || isNaN(cardioTimes[exercise.id]!))
      ) {
        setSubmitMessage({
          type: "error",
          text: `Por favor, preencha o tempo de cardio para: ${exercise.name}.`,
        });
        return false;
      }
      const seriesData = exerciseSeriesData[exercise.id];
      if (!seriesData) {
        setSubmitMessage({
          type: "error",
          text: `Dados não encontrados para o exercício: ${exercise.name}.`,
        });
        return false;
      }
      for (const serie of seriesData) {
        if (
          serie.peso === null ||
          isNaN(serie.peso) ||
          serie.repeticoes === null ||
          isNaN(serie.repeticoes)
        ) {
          setSubmitMessage({
            type: "error",
            text: `Por favor, preencha todos os campos no exercício: ${exercise.name}.`,
          });
          return false;
        }
      }
    }
    return true;
  };

  const handlePrevious = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex((prev) => prev - 1);
    }
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }

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

    console.log("📤 Enviando para a mutation finishTraining:", dataToSubmit);

    try {
      const result = await finishTraining({
        variables: { trainingFinished: dataToSubmit },
        refetchQueries: [
          { query: GET_MY_NEXT_TRAINING }, // Usar o objeto da query para refetch
        ],
      });

      if (result.data) {
        console.log("✅ Treino finalizado com sucesso:", result.data);
        setSubmitMessage({
          type: "success",
          text: "Treino finalizado com sucesso!",
        });
        onTrainingFinished();
      } else {
        console.error(
          "❌ A API retornou um erro. Verifique a aba 'Network' no dev tools.",
          result,
        );
        setSubmitMessage({
          type: "error",
          text: "Ocorreu um erro no servidor ao salvar o treino.",
        });
      }
    } catch (networkError) {
      console.error("❌ Erro de rede ou outro erro crítico:", networkError);
      setSubmitMessage({
        type: "error",
        text: "Erro de comunicação com o servidor. Tente novamente.",
      });
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

  const columns: GridColDef[] = [
    {
      field: "serie",
      headerName: "Série",
      width: 70,
      flex: 0.4,
      sortable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (params: GridRenderCellParams) =>
        params.row.isAddButtonRow ? null : (
          <Typography sx={{ color: colors.grey[900], fontWeight: "bold" }}>
            {params.row.id + 1}ª
          </Typography>
        ),
    },
    {
      field: "anterior",
      headerName: "Anterior",
      width: 100,
      flex: 0.6,
      sortable: false,
      renderCell: (params: GridRenderCellParams) =>
        params.row.isAddButtonRow ? null : (
          <Typography
            sx={{
              color: colors.blueAccent[500],
              fontWeight: "500",
              fontSize: "0.9rem",
            }}
          >
            {getPreviousSetInfo(exercise.id, params.row.id)}
          </Typography>
        ),
    },
    {
      field: "repeticoes",
      headerName: "Repetições",
      width: 290,
      flex: 1,
      sortable: false,
      renderCell: (params: GridRenderCellParams) =>
        params.row.isAddButtonRow ? null : (
          <TextField
            fullWidth
            type="number"
            size="small"
            value={params.value ?? ""}
            onChange={(e) =>
              handleSeriesInputChange(
                exercise.id,
                params.row.id,
                "repeticoes",
                e.target.value,
              )
            }
            sx={{
              "& .MuiInputBase-input": {
                color: colors.grey[100],
                bgcolor: colors.grey[900],
                borderRadius: 1.5,
              },
            }}
          />
        ),
    },
    {
      field: "peso",
      headerName: "Peso (kg)",
      width: 290,
      flex: 1,
      sortable: false,
      renderCell: (params: GridRenderCellParams) =>
        params.row.isAddButtonRow ? null : (
          <TextField
            fullWidth
            type="number"
            size="small"
            value={params.value ?? ""}
            onChange={(e) =>
              handleSeriesInputChange(
                exercise.id,
                params.row.id,
                "peso",
                e.target.value,
              )
            }
            sx={{
              "& .MuiInputBase-input": {
                color: colors.grey[100],
                bgcolor: colors.grey[900],
                borderRadius: 1.5,
              },
            }}
          />
        ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      flex: 0.5,
      sortable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (params: GridRenderCellParams) =>
        params.row.isAddButtonRow ? null : (
          <IconButton
            onClick={() =>
              handleToggleSerieCompleted(exercise.id, params.row.id)
            }
          >
            {params.row.completed ? (
              <CheckCircleOutlineIcon sx={{ color: colors.greenAccent[500] }} />
            ) : (
              <RadioButtonUncheckedIcon sx={{ color: colors.grey[900] }} />
            )}
          </IconButton>
        ),
    },
    {
      field: "actions",
      headerName: "Ações",
      width: 100,
      flex: 0.5,
      sortable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (params: GridRenderCellParams) => {
        if (params.row.isAddButtonRow) {
          return (
            <IconButton
              aria-label="adicionar série"
              onClick={() => handleAddSerie(exercise.id)}
              sx={{
                bgcolor: colors.greenAccent[500],
                color: colors.grey[900],
                "&:hover": { bgcolor: colors.greenAccent[400] },
                width: 27,
                height: 27,
              }}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          );
        } else {
          return (
            <IconButton
              onClick={() => handleRemoveSerie(exercise.id, params.row.id)}
              size="small"
            >
              <DeleteIcon sx={{ color: colors.blueAccent[500] }} />
            </IconButton>
          );
        }
      },
    },
  ];

  const paginationModel = { page: 0, pageSize: 6 };
  const rows = [
    ...series.map((serie, index) => ({
      id: index,
      peso: serie.peso,
      repeticoes: serie.repeticoes,
      completed: serie.completed,
      isAddButtonRow: false,
    })),
    { id: series.length, isAddButtonRow: true },
  ];

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ px: 1.5, color: colors.grey[900], bgcolor: colors.primary[500] }}
    >
      {submitMessage && (
        <Alert severity={submitMessage.type} sx={{ mb: 1, width: "97%" }}>
          {submitMessage.text}
        </Alert>
      )}
      <Box
        key={exercise.id}
        sx={{ width: "97%", bgcolor: colors.primary[500] }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            my: 2,
          }}
        >
          <Typography variant="h5" sx={{ color: colors.grey[900] }}>
            {exercise.name} - ({exercise.muscleGroup})
          </Typography>
          <Button
            variant="contained"
            size="medium"
            sx={{ bgcolor: colors.blueAccent[400] }}
          >
            Ver Imagem
          </Button>
        </Box>
        {exercise.time > 0 && (
          <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 2 }}>
            <Typography sx={{ color: colors.grey[900], fontWeight: "bold" }}>
              Tempo de Cardio (min):
            </Typography>
            <TextField
              type="number"
              size="small"
              value={cardioTimes[exercise.id] ?? ""}
              onChange={(e) =>
                handleCardioTimeChange(exercise.id, e.target.value)
              }
              sx={{
                width: 100,
                "& .MuiInputBase-input": {
                  color: colors.grey[100],
                  bgcolor: colors.grey[900],
                  borderRadius: 1.5,
                },
              }}
            />
          </Box>
        )}
        <Box
          sx={{
            height: "auto",
            width: "100%",
            mt: 2,
            bgcolor: colors.primary[600],
            "& .MuiDataGrid-columnHeader": {
              backgroundColor: colors.blueAccent[300],
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              color: colors.grey[900],
              fontWeight: "bold",
              fontSize: "0.9rem",
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[300],
              color: colors.grey[900],
              fontWeight: "bold",
            },
            "& .MuiTablePagination-root": {
              color: colors.grey[900],
              fontWeight: "bold",
            },
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[6, 10]}
            rowHeight={48}
            sx={{
              width: "100%",
              color: colors.grey[100],
              "& .MuiDataGrid-cell": {
                borderBottom: `1px solid ${colors.grey[700]}`,
                display: "flex",
                alignItems: "center",
              },
              "& .MuiDataGrid-columnHeaderText": {
                color: colors.grey[900],
              },
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 2,
            gap: 4,
          }}
        >
          <Box>
            <Button color="error" variant="contained" onClick={handleExit}>
              Cancelar
            </Button>
          </Box>
          <Box sx={{ display: "flex", gap: 4 }}>
            <Box
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
              gap={2}
            >
              {currentExerciseIndex > 0 && (
                <Button
                  type="button"
                  variant="contained"
                  onClick={handlePrevious}
                  sx={{
                    bgcolor: colors.blueAccent[400],
                    ":hover": { bgcolor: colors.blueAccent[500] },
                  }}
                >
                  Exercício Anterior
                </Button>
              )}
              {currentExerciseIndex < totalExercises - 1 ? (
                <Button
                  type="button"
                  variant="contained"
                  onClick={handleNext}
                  sx={{
                    bgcolor: colors.blueAccent[400],
                    ":hover": { bgcolor: colors.blueAccent[500] },
                  }}
                >
                  Próximo Exercício
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  sx={{
                    bgcolor: colors.greenAccent[500],
                    ":hover": { bgcolor: colors.greenAccent[700] },
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} sx={{ color: "#fff" }} />
                  ) : (
                    "Finalizar Treino"
                  )}
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TrainingSessionPage;
