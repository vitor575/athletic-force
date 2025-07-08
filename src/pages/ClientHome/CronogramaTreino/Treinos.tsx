import React, { useState, useEffect } from "react";
import {
    Backdrop,
    Box,
    CircularProgress,
    Typography,
    Paper,
    TextField,
    Button,
    Modal,
    useTheme,
    Alert,
} from "@mui/material";
import { useNextTraining } from "../../../services/querrys/useNextTraining";
import { tokens } from "../../../tema";
import img from "../../../img/supino.jpg";
import { FINISH_TRAINING } from "../../../services/mutations/finishTraining";
import { useMutation } from "@apollo/client";

const modalStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 3,
    borderRadius: 2,
    width: { xs: "90%", sm: "70%", md: "50%" },
    maxHeight: "90vh",
    overflowY: "auto",
};

interface Exercise {
    id: string;
    name: string;
    muscleGroup: string;
    qtdSets: number;
    qtdReps: number;
    time: number;
}

interface ExerciseFormData {
    [exerciseId: string]: {
        peso: number | null;
        series: number | null;
        repeticoes: number | null;
        tempo: string | null;
    };
}


const Treinos: React.FC = () => {
    const { nextTraining, loading, error } = useNextTraining();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [finishTraining] = useMutation(FINISH_TRAINING);

    const [openModal, setOpenModal] = useState(false);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState<ExerciseFormData>({});
    const [submitMessage, setSubmitMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);

    useEffect(() => {
        if (nextTraining?.exercises) {
            const initialData: ExerciseFormData = {};
            nextTraining.exercises.forEach((exercise: Exercise) => {
                initialData[exercise.id] = {
                    peso: null,
                    series: exercise.qtdSets || null,
                    repeticoes: exercise.qtdReps || null,
                    tempo: null,
                };
            });
            setFormData(initialData);
        }
    }, [nextTraining]);

    const handleInputChange = (exerciseId: string, field: keyof ExerciseFormData[string], value: string) => {
        const finalValue = field === 'tempo' ? value : (value === "" ? null : parseFloat(value));
        setFormData(prevData => ({
            ...prevData,
            [exerciseId]: {
                ...prevData[exerciseId],
                [field]: finalValue as any,
            },
        }));
    };

    const handleNext = () => {
        if (nextTraining && currentExerciseIndex < nextTraining.exercises.length - 1) {
            setCurrentExerciseIndex(prev => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentExerciseIndex > 0) {
            setCurrentExerciseIndex(prev => prev - 1);
        }
    };

    const handleOpenModal = () => {
        setCurrentExerciseIndex(0);
        setSubmitMessage(null);
        setOpenModal(true);
    };

    const formatTrainingData = () => {
        return {
            trainingId: nextTraining?.id,
            exercises: nextTraining?.exercises.map((exercise: Exercise) => {
                const timeString = formData[exercise.id]?.tempo;
                let cardioMinutes = 0;
                if (timeString && typeof timeString === 'string') {
                    const [hours, minutes] = timeString.split(':').map(Number);
                    if (!isNaN(hours) && !isNaN(minutes)) {
                        cardioMinutes = (hours * 60) + minutes;
                    }
                }
                return {
                    exerciseId: exercise.id,
                    series: [{
                        repetitions: formData[exercise.id]?.repeticoes ?? 0,
                        weight: formData[exercise.id]?.peso ?? 0,
                    }],
                    cardioTime: cardioMinutes,
                }
            }),
        };
    };

    const validateForm = () => {
        if (!nextTraining?.exercises) return false;
        for (const exercise of nextTraining.exercises) {
            const data = formData[exercise.id];
            if (data?.peso === null || isNaN(data.peso) ||
                data?.series === null || isNaN(data.series) ||
                data?.repeticoes === null || isNaN(data.repeticoes)) {
                return false;
            }
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitMessage(null);
        if (!validateForm()) {
            setSubmitMessage({ type: "error", text: "Por favor, preencha todos os campos de peso, séries e repetições de todos os exercícios." });
            return;
        }
        setSaving(true);
        try {
            const trainingData = formatTrainingData();
            const { data } = await finishTraining({ variables: { trainingFinished: trainingData } });
            console.log("Treino finalizado com sucesso:", data.finishTraining.message);
            setSubmitMessage({ type: "success", text: "Treino finalizado com sucesso!" });
            setSaving(false);
            setTimeout(() => { setOpenModal(false); }, 1500);
        } catch (err: any) {
            console.error("Erro ao finalizar treino:", err);
            const errorMessage = err.graphQLErrors?.[0]?.message || err.message || "Erro desconhecido.";
            setSubmitMessage({ type: "error", text: `Erro: ${errorMessage}` });
            setSaving(false);
        }
    };

    if (loading) return <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open><CircularProgress color="inherit" /></Backdrop>;
    if (error) return <Box sx={{ p: 2, m: "40px 100px 0", bgcolor: colors.greenAccent[500], borderRadius: 2, color: "#fff", textAlign: "center" }}><Typography variant="h6">Sem treinos disponíveis.</Typography></Box>;

    const exercise = nextTraining?.exercises[currentExerciseIndex];
    const totalExercises = nextTraining?.exercises.length || 0;

    return (
        <Box sx={{ p: { xs: 2, md: 4 }, color: colors.grey[900] }}>
            <Typography variant="h3" gutterBottom sx={{ color: colors.greenAccent[500] }}>Cronograma de Treino</Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, flexDirection: { xs: "column", md: "row" } }}>
                <Typography variant="h6">Próximo Treino</Typography>
                <Typography sx={{ fontSize: ".8em", color: colors.greenAccent[500] }}>ID: {nextTraining?.id || "N/A"}</Typography>
            </Box>
            {nextTraining ? (
                <Paper sx={{ p: 1, bgcolor: colors.primary[300], color: "#fff", display: "flex", gap: 3, flexDirection: { xs: "column", md: "row" }, alignItems: "center" }}>
                    <Box component="img" src={nextTraining.imageUrl || img} alt={`Treino ${nextTraining.name}`} sx={{ width: 70, height: 70, borderRadius: 1, objectFit: "cover" }} />
                    <Box sx={{ flex: 1, textAlign: { xs: "center", md: "left" } }}>
                        <Typography variant="h6">{nextTraining.name}</Typography>
                        <Typography>{nextTraining.description}</Typography>
                    </Box>
                    <Button variant="contained" sx={{ bgcolor: colors.greenAccent[500], ":hover": { bgcolor: colors.greenAccent[600] }, mr: { xs: 0, md: 2 }, width: { xs: "100%", md: "auto" } }} onClick={handleOpenModal}>
                        Iniciar treino
                    </Button>
                </Paper>
            ) : (<Typography>Nenhum treino encontrado.</Typography>)}

            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <Box component="form" onSubmit={handleSubmit} sx={{ ...modalStyle, bgcolor: colors.primary[500], color: colors.grey[100] }}>
                    {submitMessage && (<Alert severity={submitMessage.type} sx={{ mb: 2 }}>{submitMessage.text}</Alert>)}
                    {exercise && (
                        <Box key={exercise.id}>
                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 2 }}>
                                <Box component="img" src={nextTraining?.imageUrl || img} alt="Imagem do treino" sx={{ width: 150, height: 150, borderRadius: "50%", objectFit: "cover", p: 1, border: `2px solid ${colors.greenAccent[500]}` }} />
                                <Typography variant="h6" sx={{ mt: 2, color: colors.grey[900] }}>
                                    Exercício {currentExerciseIndex + 1} de {totalExercises}
                                </Typography>
                                <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>{exercise.name}</Typography>
                            </Box>
                            <Paper sx={{ mb: 2, p: 2, bgcolor: colors.primary[400], color: colors.grey[100] }}>
                                <Typography variant="h6" sx={{ mb: 1, color: colors.greenAccent[400] }}>
                                    {exercise.name} - ({exercise.muscleGroup})
                                </Typography>
                                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }, gap: 2 }}>
                                    <TextField fullWidth label="Peso (kg)" type="number" margin="dense" value={formData[exercise.id]?.peso ?? ""} onChange={(e) => handleInputChange(exercise.id, 'peso', e.target.value)} InputLabelProps={{ style: { color: colors.grey[100] } }} InputProps={{ style: { color: colors.grey[100] } }} sx={{ "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: colors.grey[700] }, "&:hover fieldset": { borderColor: colors.grey[500] }, "&.Mui-focused fieldset": { borderColor: colors.greenAccent[500] } }, "& .MuiInputBase-input": { color: colors.grey[100] }, }} />
                                    <TextField fullWidth label="Séries" type="number" margin="dense" value={formData[exercise.id]?.series ?? ""} onChange={(e) => handleInputChange(exercise.id, 'series', e.target.value)} InputLabelProps={{ style: { color: colors.grey[100] } }} InputProps={{ style: { color: colors.grey[100] } }} sx={{ "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: colors.grey[700] }, "&:hover fieldset": { borderColor: colors.grey[500] }, "&.Mui-focused fieldset": { borderColor: colors.greenAccent[500] } }, "& .MuiInputBase-input": { color: colors.grey[100] }, }} />
                                    <TextField fullWidth label="Repetições" type="number" margin="dense" value={formData[exercise.id]?.repeticoes ?? ""} onChange={(e) => handleInputChange(exercise.id, 'repeticoes', e.target.value)} InputLabelProps={{ style: { color: colors.grey[100] } }} InputProps={{ style: { color: colors.grey[100] } }} sx={{ "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: colors.grey[700] }, "&:hover fieldset": { borderColor: colors.grey[500] }, "&.Mui-focused fieldset": { borderColor: colors.greenAccent[500] } }, "& .MuiInputBase-input": { color: colors.grey[100] }, }} />
                                    <TextField fullWidth type="time" margin="dense" value={formData[exercise.id]?.tempo ?? ""} onChange={(e) => handleInputChange(exercise.id, 'tempo', e.target.value)} InputLabelProps={{ style: { color: colors.grey[100] }, shrink: true }} InputProps={{ style: { color: colors.grey[100] } }} sx={{ "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: colors.grey[700] }, "&:hover fieldset": { borderColor: colors.grey[500] }, "&.Mui-focused fieldset": { borderColor: colors.greenAccent[500] } }, "& .MuiInputBase-input": { color: colors.grey[100] }, }} />
                                </Box>
                            </Paper>
                        </Box>
                    )}
                    {/* Botões com a correção aplicada */}
                    <Box mt={3} display="flex" justifyContent="flex-end" alignItems="center" gap={2}>
                        {currentExerciseIndex > 0 && (
                            <Button
                                type="button" // Correção
                                variant="contained"
                                onClick={handlePrevious}
                                sx={{ bgcolor: colors.greenAccent[500], ":hover": { bgcolor: colors.greenAccent[600] } }}
                            >
                                Anterior
                            </Button>
                        )}
                        {currentExerciseIndex < totalExercises - 1 ? (
                            <Button
                                type="button" // Correção
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
            </Modal>
        </Box>
    );
};

export default Treinos;