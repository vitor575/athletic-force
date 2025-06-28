import React, { useState } from "react";
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
} from "@mui/material";
import { useNextTraining } from "../../services/querrys/useNextTraining";
import { tokens } from "../../tema";
import img from "../../img/supino.jpg"; // Imagem padrão

const Treinos: React.FC = () => {

    const { nextTraining, loading, error } = useNextTraining();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    // Modal
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    // Inputs do usuário
    const [peso, setPeso] = useState("");
    const [series, setSeries] = useState("");
    const [repeticoes, setRepeticoes] = useState("");
    const [saving, setSaving] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        // Simula salvar os dados
        setTimeout(() => {
            console.log("Dados salvos:", { peso, series, repeticoes });

            // Limpa inputs se quiser
            setPeso("");
            setSeries("");
            setRepeticoes("");

            setSaving(false);
            handleCloseModal(); // Fecha modal
        }, 2000);
    };

    if (loading) {
        return (
            <Backdrop sx={{ color: "#fff", zIndex: theme.zIndex.drawer + 1 }} open>
                <CircularProgress color="inherit" />
            </Backdrop>
        );
    }

    return (
        <Box sx={{ padding: 4, color: colors.grey[900] }}>
            <Typography variant="h3" gutterBottom sx={{ color: colors.greenAccent[500] }}>
                Cronograma de Treino
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Typography variant="h6">Próximo Treino</Typography>
                <Typography sx={{ fontSize: ".8em", color: colors.greenAccent[500] }}>
                    ID: {nextTraining?.id}
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

                    <Box sx={{ flex: 1 }}>
                        <Typography variant="h6">{nextTraining.name}</Typography>
                        <Typography>{nextTraining.description}</Typography>
                    </Box>

                    <Button
                        variant="contained"
                        sx={{
                            bgcolor: colors.greenAccent[500],
                            ":hover": { bgcolor: colors.greenAccent[600] },
                            marginRight: 2
                        }}
                        onClick={handleOpenModal}
                    >
                        Iniciar treino
                    </Button>
                </Paper>
            ) : (
                <Typography>Nenhum treino encontrado.</Typography>
            )}

            {/* Modal de Inputs */}
            <Modal open={openModal} onClose={handleCloseModal}>

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: colors.primary[500],
                        color: colors.grey[100],
                        boxShadow: 24,
                        p: 2,
                        borderRadius: 2,
                        alignItems: "center",
                        width: "50%",
                        height: "90vh",
                        gap: 2,
                    }}
                >

                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Box
                            component="img"
                            src={nextTraining.imageUrl || img}
                            alt={`Imagem do treino ${nextTraining.name}`}
                            sx={{ width: 275, height: 275, borderRadius: 100, objectFit: "cover" }}
                        />
                    </Box>
                    <Box>
                        <TextField
                            fullWidth
                            label="Peso (kg)"
                            type="number"
                            margin="normal"
                            value={peso}
                            onChange={(e) => setPeso(e.target.value)}
                            InputLabelProps={{ style: { color: colors.blueAccent[500] } }}
                            sx={{
                                "& .MuiInputBase-root": {
                                    height: "50px", // altura do input
                                    fontSize: "0.8rem", // tamanho da fonte do input
                                    color: "#fff",
                                },
                                "& .MuiInputLabel-root": {
                                    fontSize: "0.75rem", // tamanho da label
                                }
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Séries"
                            type="number"
                            margin="normal"
                            value={series}
                            onChange={(e) => setSeries(e.target.value)}
                            InputLabelProps={{ style: { color: colors.blueAccent[500] } }}
                            sx={{
                                "& .MuiInputBase-root": {
                                    height: "50px", // altura do input
                                    fontSize: "0.8rem", // tamanho da fonte do input
                                    color: "#fff",
                                },
                                "& .MuiInputLabel-root": {
                                    fontSize: "0.75rem", // tamanho da label
                                }
                            }}
                        />
                        <TextField
                            fullWidth
                            label="Repetições"
                            type="number"
                            margin="normal"
                            value={repeticoes}
                            onChange={(e) => setRepeticoes(e.target.value)}
                            InputLabelProps={{ style: { color: colors.blueAccent[500] } }}
                            sx={{
                                "& .MuiInputBase-root": {
                                    height: "50px", // altura do input
                                    fontSize: "0.8rem", // tamanho da fonte do input
                                    color: "#fff",
                                },
                                "& .MuiInputLabel-root": {
                                    fontSize: "0.75rem", // tamanho da label
                                }
                            }}
                        />


                        <Box mt={2} display="flex" justifyContent="end">
                            <Button type="submit" variant="contained" disabled={saving}>
                                {saving ? "Salvando..." : "Proximo treino "}
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
};

export default Treinos;