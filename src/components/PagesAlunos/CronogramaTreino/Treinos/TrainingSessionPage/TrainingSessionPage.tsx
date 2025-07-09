// src/components/TrainingSessionPage/TrainingSessionPage.tsx
import React, { useState, useEffect } from "react";

import {
    Backdrop,
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
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

import { tokens } from "../../../../../tema";
import img from "../../../../../img/supino.jpg"; // Imagem padrão, se trainingData.imageUrl não existir
import { FINISH_TRAINING } from "../../../../../services/mutations/finishTraining";
import { useMutation } from "@apollo/client";

// Interface para individual exercise data received from the backend
interface Exercise {
    id: string;
    name: string;
    muscleGroup: string;
    qtdSets: number;
    qtdReps: number;
    time: number;
    recommendedSets?: string; // Adicione se sua API fornece
    recommendedReps?: string; // Adicione se sua API fornece
    recommendedLoad?: number; // Adicione se sua API fornece
}

// Interface para o dado COMPLETO do treino, que virá via props
interface TrainingData {
    id: string;
    name: string;
    description: string;
    imageUrl?: string; // Pode ser opcional
    exercises: Exercise[];
}

// Interface for data specific to a single series (set)
interface SerieData {
    peso: number | null;
    repeticoes: number | null;
    completed: boolean;
}

// Interface for form data that applies to the entire exercise (e.g., total time for cardio)
interface ExerciseFormData {
    [exerciseId: string]: {
        tempo: string | null;
    };
}

// Interface for storing all series data, keyed by exercise ID
interface ExerciseSeriesData {
    [exerciseId: string]: SerieData[];
}

// DEFINIR AS PROPS QUE ESTE COMPONENTE VAI RECEBER
interface TrainingSessionPageProps {
    trainingData: TrainingData; // Agora recebe o OBJETO COMPLETO do treino
    onTrainingFinished: () => void; // Função de callback para notificar o pai
}

// O componente agora recebe as props
const TrainingSessionPage: React.FC<TrainingSessionPageProps> = ({ trainingData, onTrainingFinished }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [finishTraining] = useMutation(FINISH_TRAINING);

    const [formData, setFormData] = useState<ExerciseFormData>({});
    const [exerciseSeriesData, setExerciseSeriesData] = useState<ExerciseSeriesData>({});
    const [submitMessage, setSubmitMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (trainingData?.exercises) {
            const initialFormData: ExerciseFormData = {};
            const initialSeriesData: ExerciseSeriesData = {};

            trainingData.exercises.forEach((exercise: Exercise) => {
                initialFormData[exercise.id] = {
                    tempo: null,
                };

                // Initialize series data based on qtdSets and qtdReps from the exercise
                initialSeriesData[exercise.id] = Array.from({ length: exercise.qtdSets }, () => ({
                    peso: null,
                    repeticoes: exercise.qtdReps || null, // Use qtdReps for initial value
                    completed: false,
                }));
            });
            setFormData(initialFormData);
            setExerciseSeriesData(initialSeriesData);
            setCurrentExerciseIndex(0); // Reset to first exercise when new training data loads
        }
    }, [trainingData]);

    const handleExerciseInputChange = (exerciseId: string, field: keyof ExerciseFormData[string], value: string) => {
        setFormData(prevData => ({
            ...prevData,
            [exerciseId]: {
                ...prevData[exerciseId],
                [field]: value === "" ? null : value,
            },
        }));
    };

    const handleSeriesInputChange = (exerciseId: string, serieIndex: number, field: keyof Omit<SerieData, 'completed'>, value: string) => {
        setExerciseSeriesData(prevData => {
            const newSeriesData = [...prevData[exerciseId]];
            newSeriesData[serieIndex] = {
                ...newSeriesData[serieIndex],
                [field]: value === "" ? null : parseFloat(value),
            };
            return {
                ...prevData,
                [exerciseId]: newSeriesData,
            };
        });
    };

    const handleToggleSerieCompleted = (exerciseId: string, serieIndex: number) => {
        setExerciseSeriesData(prevData => {
            const newSeriesData = [...prevData[exerciseId]];
            newSeriesData[serieIndex] = {
                ...newSeriesData[serieIndex],
                completed: !newSeriesData[serieIndex].completed,
            };
            return {
                ...prevData,
                [exerciseId]: newSeriesData,
            };
        });
    };

    const handleAddSerie = (exerciseId: string) => {
        setExerciseSeriesData(prevData => ({
            ...prevData,
            [exerciseId]: [
                ...prevData[exerciseId],
                { peso: null, repeticoes: null, completed: false },
            ],
        }));
    };

    const handleNext = () => {
        if (trainingData && currentExerciseIndex < trainingData.exercises.length - 1) {
            setCurrentExerciseIndex(prev => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentExerciseIndex > 0) {
            setCurrentExerciseIndex(prev => prev - 1);
        }
    };

    const formatTrainingData = () => {
        if (!trainingData) {
            console.error("trainingData is null in formatTrainingData");
            return { trainingId: '', exercises: [] };
        }
        return {
            trainingId: trainingData.id,
            exercises: trainingData.exercises.map((exercise: Exercise) => {
                const timeString = formData[exercise.id]?.tempo;
                let cardioMinutes = 0;
                if (timeString && typeof timeString === 'string') {
                    const [hours, minutes] = timeString.split(':').map(Number);
                    if (!isNaN(hours) && !isNaN(minutes)) {
                        cardioMinutes = (hours * 60) + minutes;
                    }
                }

                const seriesForExercise = exerciseSeriesData[exercise.id]?.map(serie => ({
                    repetitions: serie.repeticoes ?? 0,
                    weight: serie.peso ?? 0,
                })) || [];

                return {
                    exerciseId: exercise.id,
                    series: seriesForExercise,
                    cardioTime: cardioMinutes,
                };
            }),
        };
    };

    const validateForm = () => {
        if (!trainingData?.exercises) return false;

        for (const exercise of trainingData.exercises) {
            const seriesData = exerciseSeriesData[exercise.id];

            if (!seriesData || seriesData.length === 0) {
                console.log(`Validation failed: No series data for exercise ${exercise.id}`);
                return false;
            }

            for (const serie of seriesData) {
                // Only require peso/repeticoes if it's not a cardio-only exercise (time > 0 and no sets/reps)
                // Assuming that if qtdSets > 0, then peso/repeticoes are required.
                // If it's a "time" based exercise (like cardio), peso/repeticoes might not be relevant for series.
                // This logic might need adjustment based on how your 'time' exercises are structured.
                if (exercise.qtdSets > 0 && (serie.peso === null || isNaN(serie.peso) || serie.repeticoes === null || isNaN(serie.repeticoes))) {
                    console.log(`Validation failed: Missing peso or repeticoes in a series for exercise ${exercise.id}`);
                    return false;
                }
            }
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitMessage(null);

        if (!validateForm()) {
            setSubmitMessage({ type: "error", text: "Por favor, preencha todos os campos obrigatórios de peso e repetições para todas as séries dos exercícios de força." });
            return;
        }

        setSaving(true);
        try {
            const dataToSubmit = formatTrainingData();
            if (!dataToSubmit.trainingId) {
                throw new Error("ID do treino não disponível para finalizar.");
            }
            const { data } = await finishTraining({ variables: { trainingFinished: dataToSubmit } });
            console.log("Treino finalizado com sucesso:", data.finishTraining.message);
            setSubmitMessage({ type: "success", text: "Treino finalizado com sucesso!" });
            setSaving(false);

            setTimeout(() => { onTrainingFinished(); }, 1500);
        } catch (err: any) {
            console.error("Erro ao finalizar treino:", err);
            const errorMessage = err.graphQLErrors?.[0]?.message || err.message || "Erro desconhecido.";
            setSubmitMessage({ type: "error", text: `Erro: ${errorMessage}` });
            setSaving(false);
        }
    };

    // No need for Backdrop for initial loading/error, as parent handles `trainingData` loading.
    if (!trainingData || !trainingData.exercises || trainingData.exercises.length === 0) {
        return (
            <Box sx={{ p: 2, m: "40px 100px 0", bgcolor: colors.redAccent[700], borderRadius: 2, color: "#fff", textAlign: "center" }}>
                <Typography variant="h6">Dados do treino não disponíveis ou inválidos.</Typography>
                <Button onClick={onTrainingFinished} sx={{ mt: 2, bgcolor: colors.greenAccent[500], ":hover": { bgcolor: colors.greenAccent[600] } }}>Voltar ao Cronograma</Button>
            </Box>
        );
    }

    const exercise = trainingData.exercises[currentExerciseIndex];
    const totalExercises = trainingData.exercises.length || 0;

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ px:2, color: colors.grey[900], margin: "auto" }}>
            <Typography variant="h3" gutterBottom sx={{ color: colors.greenAccent[500], mb: 3 }}>
                Treino Iniciado
            </Typography>

            {submitMessage && (<Alert severity={submitMessage.type} sx={{ mb: 1 }}>{submitMessage.text}</Alert>)}
            <Box key={exercise.id} sx={{ display: "flex", gap: 5 }}>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center",justifyContent:"center", mb: 2 }}>
                    <Box component="img" src={trainingData.imageUrl || img} alt="Imagem do treino" sx={{ width: 250, height: 250, borderRadius: "50%", objectFit: "cover", p: 1, border: `2px solid ${colors.greenAccent[500]}` }} />
                    <Typography variant="h6" sx={{ mt: 2, color: colors.grey[900] }}>
                        Exercício {currentExerciseIndex + 1} de {totalExercises}
                    </Typography>
                    <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>{exercise.name}</Typography>
                </Box>
                <Paper sx={{ mb: 2, p: 2, bgcolor: colors.primary[400], color: colors.grey[100], width: "100%" }}>
                    <Typography variant="h6" sx={{ mb: 1, color: colors.greenAccent[400] }}>
                        {exercise.name} - ({exercise.muscleGroup})
                    </Typography>

                    {/* Seção de Recomendado (como na imagem image_1c9468.png) */}
                    {exercise.recommendedSets && (
                        <Typography variant="body2" sx={{ mb: 2, color: colors.grey[200] }}>
                            Recomendado: {exercise.recommendedSets} {exercise.recommendedReps ? `x ${exercise.recommendedReps}` : ''} {exercise.recommendedLoad ? `(${exercise.recommendedLoad} Carga)` : ''}
                        </Typography>
                    )}

                    {/* Cabeçalho da Tabela de Séries */}
                    <Box sx={{ display: "grid", gridTemplateColumns: "0.5fr 1fr 1fr 0.5fr", gap: 1, mb: 1, fontWeight: "bold", borderBottom: `1px solid ${colors.grey[600]}`, pb: 0.5 }}>
                        <Typography variant="body2" sx={{ color: colors.grey[100] }}>Série</Typography>
                        <Typography variant="body2" sx={{ color: colors.grey[100] }}>Repet.</Typography>
                        <Typography variant="body2" sx={{ color: colors.grey[100] }}>Carga</Typography>
                        <Typography variant="body2" sx={{ color: colors.grey[100] }}></Typography> {/* Para o ícone de check */}
                    </Box>

                    {/* Linhas da Tabela de Séries */}
                    {exerciseSeriesData[exercise.id]?.map((serie, index) => (
                        <Box key={index} sx={{
                            display: "grid",
                            gridTemplateColumns: "0.5fr 1fr 1fr 0.5fr",
                            gap: 1,
                            alignItems: "center",
                            mb: 1,
                        }}>
                            <Typography variant="body2" sx={{ color: colors.grey[100] }}>{index + 1}ª</Typography>
                            <TextField
                                fullWidth
                                type="number"
                                size="small"
                                value={serie.repeticoes ?? ""}
                                onChange={(e) => handleSeriesInputChange(exercise.id, index, 'repeticoes', e.target.value)}
                                InputLabelProps={{ style: { color: colors.grey[100] } }}
                                InputProps={{ style: { color: colors.grey[100] } }}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": { borderColor: colors.grey[700] },
                                        "&:hover fieldset": { borderColor: colors.grey[500] },
                                        "&.Mui-focused fieldset": { borderColor: colors.greenAccent[500] }
                                    },
                                    "& .MuiInputBase-input": { color: colors.grey[100] },
                                }}
                            />
                            <TextField
                                fullWidth
                                type="number"
                                size="small"
                                value={serie.peso ?? ""}
                                onChange={(e) => handleSeriesInputChange(exercise.id, index, 'peso', e.target.value)}
                                InputLabelProps={{ style: { color: colors.grey[100] } }}
                                InputProps={{ style: { color: colors.grey[100] } }}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": { borderColor: colors.grey[700] },
                                        "&:hover fieldset": { borderColor: colors.grey[500] },
                                        "&.Mui-focused fieldset": { borderColor: colors.greenAccent[500] }
                                    },
                                    "& .MuiInputBase-input": { color: colors.grey[100] },
                                }}
                            />
                            <IconButton onClick={() => handleToggleSerieCompleted(exercise.id, index)}>
                                {serie.completed ? (
                                    <CheckCircleOutlineIcon sx={{ color: colors.greenAccent[500] }} />
                                ) : (
                                    <RadioButtonUncheckedIcon sx={{ color: colors.grey[400] }} />
                                )}
                            </IconButton>
                        </Box>
                    ))}

                    <Button
                        variant="outlined"
                        onClick={() => handleAddSerie(exercise.id)}
                        sx={{ mt: 3, color: colors.greenAccent[400], borderColor: colors.greenAccent[400], "&:hover": { borderColor: colors.greenAccent[600], color: colors.greenAccent[600] } }}
                    >
                        Adicionar Série
                    </Button>
                </Paper>
            </Box>
            <Box display="flex" justifyContent="flex-end" alignItems="center" gap={2}>
                {currentExerciseIndex > 0 && (
                    <Button
                        type="button"
                        variant="contained"
                        onClick={handlePrevious}
                        sx={{ bgcolor: colors.greenAccent[500], ":hover": { bgcolor: colors.greenAccent[600] } }}
                    >
                        Anterior
                    </Button>
                )}
                {currentExerciseIndex < totalExercises - 1 ? (
                    <Button
                        type="button"
                        variant="contained"
                        onClick={handleNext}
                        sx={{ bgcolor: colors.greenAccent[500], ":hover": { bgcolor: colors.greenAccent[600] } }}
                    >
                        Próximo
                    </Button>
                ) : (
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={saving}
                        sx={{ bgcolor: colors.greenAccent[500], ":hover": { bgcolor: colors.greenAccent[600] } }}
                    >
                        {saving ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Finalizar Treino"}
                    </Button>
                )}
            </Box>
        </Box>
    );
};

export default TrainingSessionPage;