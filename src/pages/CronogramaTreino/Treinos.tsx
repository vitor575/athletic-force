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
    Alert, // Adicionado para feedback de erro/sucesso
} from "@mui/material";
import { useNextTraining } from "../../services/querrys/useNextTraining";
import { tokens } from "../../tema";
import img from "../../img/supino.jpg";
import { FINISH_TRAINING } from "../../services/mutations/finishTraining";
import { useMutation } from "@apollo/client";

// Estilo para o modal
const modalStyle = {
    position: "absolute" as "absolute", // Necessário para 'top', 'left', 'transform'
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper", // Use theme palette
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    width: { xs: "90%", sm: "70%", md: "50%" }, // Responsividade
    maxHeight: "90vh", // Para evitar que o modal seja muito grande em telas pequenas
    overflowY: "auto", // Adiciona scroll se o conteúdo for maior que a tela
};

const Treinos: React.FC = () => {
    // Interfaces - movidas para fora do componente se forem reutilizáveis
    interface Exercise {
        id: string;
        name: string;
        muscleGroup: string;
        qtdSets: number;
        qtdReps: number;
        time: number;
    }

    // Ajustado para números, pois você vai parsear para number no submit
    interface ExerciseFormData {
        [exerciseId: string]: {
            peso: number | null; // Usar null para representar "vazio" para números
            series: number | null;
            repeticoes: number | null;
            tempo: number | null;
        };
    }

    const { nextTraining, loading, error } = useNextTraining();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // Mutation hook
    const [finishTraining] = useMutation(FINISH_TRAINING);

    // State para o modal
    const [openModal, setOpenModal] = useState(false);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState<ExerciseFormData>({});
    const [submitMessage, setSubmitMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    // Efeito para popular o formulário quando o treino é carregado
    useEffect(() => {
        if (nextTraining?.exercises) {
            const initialData: ExerciseFormData = {};
            nextTraining.exercises.forEach((exercise: Exercise) => {
                initialData[exercise.id] = {
                    peso: null, // Inicializa como null para facilitar validação
                    series: exercise.qtdSets || null,
                    repeticoes: exercise.qtdReps || null,
                    tempo: exercise.time || null,
                };
            });
            setFormData(initialData);
        }
    }, [nextTraining]);

    // Atualiza os inputs do formulário
    const handleInputChange = (exerciseId: string, field: keyof ExerciseFormData[string], value: string) => {
        const parsedValue = value === "" ? null : parseFloat(value); // Converte para número ou null

        setFormData(prevData => ({
            ...prevData,
            [exerciseId]: {
                ...prevData[exerciseId],
                [field]: parsedValue,
            },
        }));
    };

    // Formata os dados para o backend
    const formatTrainingData = () => {
        return {
            trainingId: nextTraining?.id,
            exercises: nextTraining?.exercises.map((exercise: Exercise) => ({
                exerciseId: exercise.id,
                series: [
                    {
                        // Garante que sejam números, usando 0 se for null ou NaN
                        repetitions: formData[exercise.id]?.repeticoes ?? 0,
                        weight: formData[exercise.id]?.peso ?? 0,
                    }
                ],
                cardioTime: formData[exercise.id]?.tempo ?? 0, // Garante que seja número
            })),
        };
    };

    // Validação básica do formulário antes de enviar
    const validateForm = () => {
        if (!nextTraining?.exercises) return false; // Não há exercícios para validar

        for (const exercise of nextTraining.exercises) {
            const data = formData[exercise.id];
            // Verifica se todos os campos importantes estão preenchidos ou são válidos
            if (data?.peso === null || isNaN(data.peso) ||
                data?.series === null || isNaN(data.series) ||
                data?.repeticoes === null || isNaN(data.repeticoes)) {
                return false; // Retorna falso se algum campo obrigatório não estiver preenchido/válido
            }
        }
        return true;
    };

    // Envia o treino finalizado
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitMessage(null); // Limpa mensagens anteriores

        if (!validateForm()) {
            setSubmitMessage({ type: "error", text: "Por favor, preencha todos os campos de peso, séries e repetições." });
            return;
        }

        setSaving(true);

        try {
            const trainingData = formatTrainingData();

            const { data } = await finishTraining({
                variables: { trainingFinished: trainingData }
            });

            console.log("Treino finalizado com sucesso:", data.finishTraining.message);
            setSubmitMessage({ type: "success", text: "Treino finalizado com sucesso!" });

            setSaving(false);
            // Fechar modal após um pequeno atraso para o usuário ver a mensagem de sucesso
            setTimeout(() => {
                setOpenModal(false);
            }, 1500);
        } catch (err: any) { // Usar any para o erro para facilitar o tratamento inicial
            console.error("Erro ao finalizar treino:", err);
            // Tentativa de obter uma mensagem de erro mais específica
            const errorMessage = err.graphQLErrors?.[0]?.message || err.message || "Erro desconhecido ao finalizar treino.";
            setSubmitMessage({ type: "error", text: `Erro ao finalizar treino: ${errorMessage}` });
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <Backdrop sx={{ color: "#fff", zIndex: theme.zIndex.drawer + 1 }} open>
                <CircularProgress color="inherit" />
            </Backdrop>
        );
    }

    if (error) {
        return (
            <Box
                sx={{
                    padding: 2,
                    margin: 4,
                    bgcolor: colors.redAccent[500],
                    borderRadius: 2,
                    color: "#fff",
                    textAlign: "center",
                }}
            >
                <Typography variant="h6" gutterBottom>
                    Erro ao carregar o treino. Por favor, tente novamente mais tarde.
                </Typography>
                <Typography variant="body2">{error.message}</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ padding: { xs: 2, md: 4 }, color: colors.grey[900] }}>
            <Typography variant="h3" gutterBottom sx={{ color: colors.greenAccent[500] }}>
                Cronograma de Treino
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, flexDirection: { xs: "column", md: "row" } }}>
                <Typography variant="h6">Próximo Treino</Typography>
                <Typography sx={{ fontSize: ".8em", color: colors.greenAccent[500] }}>
                    ID: {nextTraining?.id || "N/A"}
                </Typography>
            </Box>

            {nextTraining ? (
                <Paper
                    sx={{
                        padding: 1,
                        bgcolor: colors.primary[300],
                        color: "#fff",
                        display: "flex",
                        gap: 3,
                        flexDirection: { xs: "column", md: "row" },
                        alignItems: "center",
                    }}
                >
                    <Box
                        component="img"
                        src={nextTraining.imageUrl || img}
                        alt={`Imagem do treino ${nextTraining.name}`}
                        sx={{ width: 70, height: 70, borderRadius: 1, objectFit: "cover" }}
                    />

                    <Box sx={{ flex: 1, textAlign: { xs: "center", md: "left" } }}>
                        <Typography variant="h6">{nextTraining.name}</Typography>
                        <Typography>{nextTraining.description}</Typography>
                    </Box>

                    <Button
                        variant="contained"
                        sx={{
                            bgcolor: colors.greenAccent[500],
                            ":hover": { bgcolor: colors.greenAccent[600] },
                            marginRight: { xs: 0, md: 2 }, // Ajuste para mobile
                            width: { xs: "100%", md: "auto" } // Ajuste para mobile
                        }}
                        onClick={() => setOpenModal(true)}
                    >
                        Iniciar treino
                    </Button>
                </Paper>
            ) : (
                <Typography>Nenhum treino encontrado ou disponível no momento.</Typography>
            )}

            {/* Modal de Inputs */}
            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ ...modalStyle, bgcolor: colors.primary[500], color: colors.grey[100] }}
                >
                    {submitMessage && (
                        <Alert severity={submitMessage.type} sx={{ mb: 2 }}>
                            {submitMessage.text}
                        </Alert>
                    )}

                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 2 }}>
                        <Box
                            component="img"
                            src={nextTraining?.imageUrl || img}
                            alt={`Imagem do treino ${nextTraining?.name}`}
                            sx={{ width: 200, height: 200, borderRadius: "50%", objectFit: "cover", p: 1, border: `2px solid ${colors.greenAccent[500]}` }}
                        />
                        {/* Exibir o nome do treino e descrição principal aqui */}
                        <Typography variant="h5" sx={{ mt: 1, color: colors.greenAccent[500] }}>
                            {nextTraining?.name}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2, color: colors.grey[900] }}>
                            {nextTraining?.description}
                        </Typography>
                    </Box>

                    {nextTraining?.exercises.map((exercise: Exercise) => (
                        <Paper key={exercise.id} sx={{ mb: 2, p: 2, bgcolor: colors.primary[400], color: colors.grey[100] }}>
                            <Typography variant="h6" sx={{ mb: 1, color: colors.greenAccent[400] }}>
                                {exercise.name} - ({exercise.muscleGroup})
                            </Typography>
                            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }, gap: 2 }}>
                                <TextField
                                    fullWidth
                                    label="Peso (kg)"
                                    type="number"
                                    margin="dense" 
                                    value={formData[exercise.id]?.peso ?? ""} // Usar nullish coalescing para ""
                                    onChange={(e) => handleInputChange(exercise.id, 'peso', e.target.value)}
                                    InputLabelProps={{ style: { color: colors.grey[100] } }} // Cor da label
                                    InputProps={{ style: { color: colors.grey[100] } }} // Cor do texto digitado
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            "& fieldset": { borderColor: colors.grey[700] },
                                            "&:hover fieldset": { borderColor: colors.grey[500] },
                                            "&.Mui-focused fieldset": { borderColor: colors.greenAccent[500] },
                                        },
                                        "& .MuiInputBase-input": { color: colors.grey[100] },
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    label="Séries"
                                    type="number"
                                    margin="dense"
                                    value={formData[exercise.id]?.series ?? ""}
                                    onChange={(e) => handleInputChange(exercise.id, 'series', e.target.value)}
                                    InputLabelProps={{ style: { color: colors.grey[100] } }}
                                    InputProps={{ style: { color: colors.grey[100] } }}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            "& fieldset": { borderColor: colors.grey[700] },
                                            "&:hover fieldset": { borderColor: colors.grey[500] },
                                            "&.Mui-focused fieldset": { borderColor: colors.greenAccent[500] },
                                        },
                                        "& .MuiInputBase-input": { color: colors.grey[100] },
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    label="Repetições"
                                    type="number"
                                    margin="dense"
                                    value={formData[exercise.id]?.repeticoes ?? ""}
                                    onChange={(e) => handleInputChange(exercise.id, 'repeticoes', e.target.value)}
                                    InputLabelProps={{ style: { color: colors.grey[100] } }}
                                    InputProps={{ style: { color: colors.grey[100] } }}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            "& fieldset": { borderColor: colors.grey[700] },
                                            "&:hover fieldset": { borderColor: colors.grey[500] },
                                            "&.Mui-focused fieldset": { borderColor: colors.greenAccent[500] },
                                        },
                                        "& .MuiInputBase-input": { color: colors.grey[100] },
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    type="time"
                                    margin="dense"
                                    value={formData[exercise.id]?.tempo ?? ""}
                                    onChange={(e) => handleInputChange(exercise.id, 'tempo', e.target.value)}
                                    InputLabelProps={{ style: { color: colors.grey[100] } }}
                                    InputProps={{ style: { color: colors.grey[100] } }}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            "& fieldset": { borderColor: colors.grey[700] },
                                            "&:hover fieldset": { borderColor: colors.grey[500] },
                                            "&.Mui-focused fieldset": { borderColor: colors.greenAccent[500] },
                                        },
                                        "& .MuiInputBase-input": { color: colors.grey[100] },
                                    }}
                                />
                            </Box>
                        </Paper>
                    ))}

                    <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
                        <Button type="submit" variant="contained" disabled={saving}
                            sx={{
                                bgcolor: colors.greenAccent[500],
                                ":hover": { bgcolor: colors.greenAccent[600] },
                            }}
                        >
                            {saving ? (
                                <CircularProgress size={24} sx={{ color: "#fff" }} />
                            ) : (
                                "Finalizar treino"
                            )}
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
};

export default Treinos;