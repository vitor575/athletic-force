import { Box, Button, Typography, Stack, Paper, useTheme } from "@mui/material";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CardPagamento from "./CardPagamento";
import CardAssinatura from "./CardAssinatura";
import { tokens } from "../../../tema";

const Pagamento = () => {
    const planos = [
        "Plano básico R$100,00",
        "Plano médio R$140,00",
        "Plano ultra R$180,00",
    ];

    const navigate = useNavigate();

    const handleExit = () => {
        navigate("/clientHome");
    };

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "space-around",
                gap: 2,
                p: 2,
                bgcolor: colors.primary[500],
            }}
        >


            <Paper
                elevation={6}
                sx={{
                    width: "70%",
                    height: { xs: "auto", md: "95vh" },
                    p: 3,
                    borderRadius: 4,
                    border: `2px solid ${colors.blueAccent[600]}`,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2,
                    transition: "0.3s",

                }}
            >
                <Box sx={{ display: "flex", }}>
                    <Box sx={{ position: "absolute", left: 40 }}>
                        <Button
                            variant="contained"
                            color="error"
                            startIcon={<FaSignOutAlt />}
                            onClick={handleExit}
                            sx={{ bgcolor: colors.blueAccent[300], "&:hover": { bgcolor: colors.blueAccent[400] } }}
                        >
                            Voltar
                        </Button>
                    </Box>
                    <Typography variant="h5" fontWeight="bold" textTransform="uppercase" sx={{ mb: 3 }}>
                        Central de faturas
                    </Typography>
                </Box>
                <CardPagamento />
                <CardPagamento />
                <CardPagamento />
                <Box sx={{ display: "flex", justifyContent: "flex-start", width: "100%", py: 2 }} >
                    <Button sx={{ fontWeight: "bold", borderRadius: "10px", p: "10px", bgcolor: colors.blueAccent[300], color: "white", "&:hover": { bgcolor: colors.blueAccent[400] }
                    }} color="error">
                        Histórico de faturas
                    </Button>
                </Box>
            </Paper>

            <Paper
                elevation={6}
                sx={{
                    width: { xs: "85%", md: "30%" },
                    p: 2,
                    borderRadius: 4,
                    border: `2px solid ${colors.blueAccent[600]}`,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-around",
                    gap: 2,
                    transition: "0.3s",
                }}
            >
                <Typography variant="h5" fontWeight="bold" textTransform="uppercase">
                    Assinatura
                </Typography>
                <Stack spacing={2} alignItems="center" width="100%">
                    {planos.length ? (
                        planos.map((plano, index) => (
                            <CardAssinatura key={index} plano={plano} />
                        ))
                    ) : (
                        <Typography>Nenhum plano disponível</Typography>
                    )}
                </Stack>
                <Button
                    variant="contained"
                    color="error"
                    sx={{
                        mt: 2,
                        borderRadius: "10px",
                        px: 3,
                        py: "10px",
                        fontWeight: "bold",
                        textTransform: "none",
                        transition: "0.3s",
                        bgcolor: colors.blueAccent[300],
                        "&:hover": { bgcolor: colors.blueAccent[400] },
                    }}
                >
                    TROCAR PLANO
                </Button>
            </Paper>
        </Box>
    );
};

export default Pagamento;
