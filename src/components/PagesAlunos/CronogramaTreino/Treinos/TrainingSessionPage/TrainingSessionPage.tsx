// src/components/TrainingSessionPage/TrainingSessionPage.tsx

import React, { useState, useEffect } from "react";
import {
    Box,
    CircularProgress,
    Typography,
    Paper,
    TextField,
    Button,
    useTheme,
    Alert,
    IconButton,
} from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import { tokens } from "../../../../../tema";
import { FINISH_TRAINING } from "../../../../../services/mutations/finishTraining";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

// Interfaces
interface Exercise {
    id: string;
    name: string;
    muscleGroup: string;
    qtdSets: number;
    qtdReps: number;
    time: number;
    recommendedSets?: string;
    recommendedReps?: string;
    recommendedLoad?: number;
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

interface TrainingSessionPageProps {
    trainingData: TrainingData;
    onTrainingFinished: () => void;
}

const TrainingSessionPage: React.FC<TrainingSessionPageProps> = ({ trainingData, onTrainingFinished }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [finishTraining] = useMutation(FINISH_TRAINING);

    const [exerciseSeriesData, setExerciseSeriesData] = useState<ExerciseSeriesData>({});
    const [submitMessage, setSubmitMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const [saving, setSaving] = useState(false);
    const navigate = useNavigate();

    const handleExit = () => {
        navigate("/clientHome");
    };

    useEffect(() => {
        if (trainingData?.exercises) {
            const initialSeriesData: ExerciseSeriesData = {};
            trainingData.exercises.forEach((exercise: Exercise) => {
                initialSeriesData[exercise.id] = Array.from({ length: exercise.qtdSets }, () => ({
                    peso: null,
                    repeticoes: exercise.qtdReps || null,
                    completed: false,
                }));
            });
            setExerciseSeriesData(initialSeriesData);
        }
    }, [trainingData]);

    const handleSeriesInputChange = (exerciseId: string, serieIndex: number, field: keyof Omit<SerieData, 'completed'>, value: string) => {
        setExerciseSeriesData(prevData => {
            const newSeriesData = [...(prevData[exerciseId] || [])];
            newSeriesData[serieIndex] = {
                ...newSeriesData[serieIndex],
                [field]: value === "" ? null : parseFloat(value),
            };
            return { ...prevData, [exerciseId]: newSeriesData };
        });
    };

    const handleToggleSerieCompleted = (exerciseId: string, serieIndex: number) => {
        setExerciseSeriesData(prevData => {
            const newSeriesData = [...(prevData[exerciseId] || [])];
            newSeriesData[serieIndex] = {
                ...newSeriesData[serieIndex],
                completed: !newSeriesData[serieIndex].completed,
            };
            return { ...prevData, [exerciseId]: newSeriesData };
        });
    };

    const handleAddSerie = (exerciseId: string) => {
        setExerciseSeriesData(prevData => ({
            ...prevData,
            [exerciseId]: [
                ...(prevData[exerciseId] || []),
                { peso: null, repeticoes: null, completed: false },
            ],
        }));
    };

    const handleRemoveSerie = (exerciseId: string, serieIndex: number) => {
        setExerciseSeriesData(prevData => {
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
        const currentExerciseId = trainingData.exercises[currentExerciseIndex].id;
        const seriesData = exerciseSeriesData[currentExerciseId];
        if (!seriesData) return false;
        for (const serie of seriesData) {
            if (serie.peso === null || isNaN(serie.peso) || serie.repeticoes === null || isNaN(serie.repeticoes)) {
                return false;
            }
        }
        return true;
    };

    const validateForm = (): boolean => {
        for (const exercise of trainingData.exercises) {
            const seriesData = exerciseSeriesData[exercise.id];
            if (!seriesData) {
                setSubmitMessage({ type: 'error', text: `Dados não encontrados para o exercício: ${exercise.name}.` });
                return false;
            }
            for (const serie of seriesData) {
                if (serie.peso === null || isNaN(serie.peso) || serie.repeticoes === null || isNaN(serie.repeticoes)) {
                    setSubmitMessage({ type: 'error', text: `Por favor, preencha todos os campos no exercício: ${exercise.name}.` });
                    return false;
                }
            }
        }
        return true;
    };

    const handlePrevious = () => {
        if (currentExerciseIndex > 0) {
            setCurrentExerciseIndex(prev => prev - 1);
        }
    };

    const handleNext = () => {
        if (validateCurrentExercise()) {
            setSubmitMessage(null);
            if (currentExerciseIndex < trainingData.exercises.length - 1) {
                setCurrentExerciseIndex(prev => prev + 1);
            }
        } else {
            setSubmitMessage({
                type: "error",
                text: "Preencha todos os campos de peso e repetições para avançar.",
            });
        }
    };

    const formatTrainingDataForApi = () => {
        return {
            trainingId: trainingData.id,
            exercises: trainingData.exercises.map(exercise => ({
                exerciseId: exercise.id,
                series: exerciseSeriesData[exercise.id]?.map(serie => ({
                    repetitions: serie.repeticoes ?? 0,
                    weight: serie.peso ?? 0,
                })) || [],
            })),
        };
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitMessage(null);

        if (!validateForm()) return;

        setSaving(true);
        try {
            const dataToSubmit = formatTrainingDataForApi();
            const { data } = await finishTraining({
                variables: { trainingFinished: dataToSubmit },
                refetchQueries: ['GetTrainingHistory']
            });

            setSubmitMessage({ type: "success", text: data.finishTraining.message || "Treino finalizado com sucesso!" });
            setSaving(false);

            setTimeout(() => {
                onTrainingFinished();
            }, 2000);

        } catch (err: any) {
            console.error("Erro ao finalizar treino:", err);
            const errorMessage = err.graphQLErrors?.[0]?.message || "Ocorreu um erro. Tente novamente.";
            setSubmitMessage({ type: "error", text: `Erro: ${errorMessage}` });
            setSaving(false);
        }
    };

    if (!trainingData || !trainingData.exercises || trainingData.exercises.length === 0) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <Typography variant="h6">Nenhum dado de treino disponível.</Typography>
            </Box>
        );
    }

    const exercise = trainingData.exercises[currentExerciseIndex];
    const totalExercises = trainingData.exercises.length;

    const columns: GridColDef[] = [
        {
            field: 'serie', headerName: 'Série', width: 70, flex: 0.5,
            sortable: false, align: 'center', headerAlign: 'center',
            renderCell: (params: GridRenderCellParams) => (
                params.row.isAddButtonRow ? null : (
                    <Typography sx={{ color: colors.grey[900], fontWeight: "bold" }}>{params.row.id + 1}ª</Typography>
                )
            )
        }
        ,
        {
            field: 'repeticoes', headerName: 'Repetições', width: 290, flex: 1,
            sortable: false,
            renderCell: (params: GridRenderCellParams) =>
                params.row.isAddButtonRow ? null : (
                    <TextField
                        fullWidth type="number" size="small"
                        value={params.value ?? ""}
                        onChange={(e) => handleSeriesInputChange(exercise.id, params.row.id, 'repeticoes', e.target.value)}
                        sx={{ "& .MuiInputBase-input": { color: colors.grey[100], bgcolor: colors.grey[900], borderRadius: 1.5 } }}
                    />
                )
        },
        {
            field: 'peso', headerName: 'Peso (kg)', width: 290, flex: 1,
            sortable: false,
            renderCell: (params: GridRenderCellParams) =>
                params.row.isAddButtonRow ? null : (
                    <TextField
                        fullWidth type="number" size="small"
                        value={params.value ?? ""}
                        onChange={(e) => handleSeriesInputChange(exercise.id, params.row.id, 'peso', e.target.value)}
                        sx={{ "& .MuiInputBase-input": { color: colors.grey[100], bgcolor: colors.grey[900], borderRadius: 1.5 } }}
                    />
                )
        }
        ,
        {
            field: 'status', headerName: 'Status', width: 100, flex: 0.5,
            sortable: false, align: 'center', headerAlign: 'center',
            renderCell: (params: GridRenderCellParams) =>
                params.row.isAddButtonRow ? null : (
                    <IconButton onClick={() => handleToggleSerieCompleted(exercise.id, params.row.id)}>
                        {params.row.completed ? (
                            <CheckCircleOutlineIcon sx={{ color: colors.greenAccent[500] }} />
                        ) : (
                            <RadioButtonUncheckedIcon sx={{ color: colors.grey[900] }} />
                        )}
                    </IconButton>
                )
        }
        ,
        {
            field: 'actions', headerName: 'Ações', width: 100, flex: .5,
            sortable: false, align: 'center', headerAlign: 'center',
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
                        <IconButton onClick={() => handleRemoveSerie(exercise.id, params.row.id)} size="small">
                            <DeleteIcon sx={{ color: colors.blueAccent[500] }} />
                        </IconButton>
                    );
                }
            }
        }

    ];

    const paginationModel = { page: 0, pageSize: 6 };
    const series = exerciseSeriesData[exercise.id] || [];
    const rows = [
        ...series.map((serie, index) => ({
            id: index,
            peso: serie.peso,
            repeticoes: serie.repeticoes,
            completed: serie.completed,
            isAddButtonRow: false
        })),
        { id: series.length, isAddButtonRow: true } // Essa é a linha do botão
    ];

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ px: 1.5, color: colors.grey[900], bgcolor: colors.primary[500] }}>
            {submitMessage && (
                <Alert severity={submitMessage.type} sx={{ mb: 1 , width: "97%"}}>
                    {submitMessage.text}
                </Alert>
            )}
            <Box key={exercise.id} sx={{ width: "97%", bgcolor: colors.primary[500] }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: 'center', my: 2 }}>
                    <Typography variant="h5" sx={{ color: colors.grey[900] }}>
                        {exercise.name} - ({exercise.muscleGroup})
                    </Typography>
                    <Button variant="contained" size="medium" sx={{ bgcolor: colors.blueAccent[400] }}>Ver Imagem</Button>
                </Box>
                <Box sx={{
                    height: 'auto', width: '100%', mt: 2, bgcolor: colors.primary[600],
                    "& .MuiDataGrid-columnHeader": { backgroundColor: colors.blueAccent[300] },
                    "& .MuiDataGrid-columnHeaderTitle": { color: colors.grey[900], fontWeight: "bold", fontSize: "0.9rem" },
                    "& .MuiDataGrid-footerContainer": { borderTop: "none", backgroundColor: colors.blueAccent[300], color: colors.grey[900], fontWeight: "bold" },
                    "& .MuiTablePagination-root": { color: colors.grey[900], fontWeight: "bold" },
                }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{ pagination: { paginationModel } }}
                        pageSizeOptions={[6, 10]}
                        rowHeight={48}
                        sx={{
                            width: "100%",
                            color: colors.grey[100],
                            '& .MuiDataGrid-cell': {
                                borderBottom: `1px solid ${colors.grey[700]}`,
                                display: "flex",
                                alignItems: "center",
                            },
                            '& .MuiDataGrid-columnHeaderText': {
                                color: colors.grey[900],
                            },
                        }}
                    />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2, gap: 4 }}>
                    <Box>
                        <Button color="error" variant="contained" onClick={handleExit}>
                            Cancelar
                        </Button>
                    </Box>
                    <Box sx={{ display: "flex", gap: 4 }}>
                        <Box display="flex" justifyContent="flex-end" alignItems="center" gap={2}>
                            {currentExerciseIndex > 0 && (
                                <Button type="button" variant="contained" onClick={handlePrevious} sx={{ bgcolor: colors.blueAccent[600], ":hover": { bgcolor: colors.blueAccent[500] } }}>
                                    Treino Anterior
                                </Button>
                            )}
                            {currentExerciseIndex < totalExercises - 1 ? (
                                <Button type="button" variant="contained" onClick={handleNext} sx={{ bgcolor: colors.blueAccent[400], ":hover": { bgcolor: colors.blueAccent[500] } }}>
                                    Próximo treino
                                </Button>
                            ) : (
                                <Button type="submit" variant="contained" disabled={saving} sx={{ bgcolor: colors.greenAccent[500], ":hover": { bgcolor: colors.greenAccent[600] } }}>
                                    {saving ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Finalizar Treino"}
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
