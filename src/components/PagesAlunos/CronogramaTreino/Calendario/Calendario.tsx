import React, { useState } from "react";
import { Box, Typography, useTheme, Tooltip, IconButton, CssBaseline } from "@mui/material";
import { tokens } from "../../../../tema";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

const horarios = {
    aberto: true,
    horarioDiaUtil: "06:00 - 22:00",
    horarioSabado: "08:00 - 18:00",
    fechado: false,
};

const gerarDiasMes = (ano: number, mes: number) => {
    const dias: Array<{ dia: number; diaSemana: number }> = [];
    const totalDias = new Date(ano, mes + 1, 0).getDate();

    for (let i = 1; i <= totalDias; i++) {
        const data = new Date(ano, mes, i);
        dias.push({ dia: i, diaSemana: data.getDay() });
    }
    return dias;
};

const nomeMeses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
];

const Calendario: React.FC = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const hoje = new Date();
    const [mesAtual, setMesAtual] = useState(hoje.getMonth());
    const [anoAtual, setAnoAtual] = useState(hoje.getFullYear());

    const diasMes = gerarDiasMes(anoAtual, mesAtual);

    const handleMesAnterior = () => {
        if (mesAtual === 0) {
            setMesAtual(11);
            setAnoAtual((a) => a - 1);
        } else {
            setMesAtual((m) => m - 1);
        }
    };

    const handleMesProximo = () => {
        if (mesAtual === 11) {
            setMesAtual(0);
            setAnoAtual((a) => a + 1);
        } else {
            setMesAtual((m) => m + 1);
        }
    };

    const handleAnoAnterior = () => setAnoAtual((a) => a - 1);
    const handleAnoProximo = () => setAnoAtual((a) => a + 1);

    return (
        <Box sx={{ m: 1.5, p: 3, backgroundColor: "#fff", borderRadius: 2 }}>
            <CssBaseline />
            <Box sx={{display:"flex", justifyContent:"space-between"}}>

                <Typography variant="h4" gutterBottom sx={{ color: colors.greenAccent[500] }}>
                    Calendário - Horário da Academia
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        gap: 1,
                        marginBottom: 2,
                        flexWrap: "wrap",
                        fontSize: "0.9rem",
                    }}
                >
                    {/* Botões ano */}
                    <IconButton
                        onClick={handleAnoAnterior}
                        aria-label="Ano anterior"
                        size="small"
                        sx={{ color: colors.primary[500] }}
                    >
                        <ArrowBackIosNewIcon fontSize="small" />
                    </IconButton>
                    <Typography
                        variant="subtitle2"
                        sx={{ minWidth: 50, textAlign: "center", userSelect: "none" }}
                    >
                        {anoAtual}
                    </Typography>
                    <IconButton
                        onClick={handleAnoProximo}
                        aria-label="Próximo ano"
                        size="small"
                        sx={{ color: colors.primary[500] }}
                    >
                        <ArrowForwardIosIcon fontSize="small" />
                    </IconButton>

                    {/* Espaço entre ano e mês */}
                    <Box sx={{ width: 12 }} />

                    {/* Botões mês */}
                    <IconButton
                        onClick={handleMesAnterior}
                        aria-label="Mês anterior"
                        size="small"
                        sx={{ color: colors.primary[500] }}
                    >
                        <ArrowBackIosNewIcon fontSize="small" />
                    </IconButton>
                    <Typography
                        variant="subtitle2"
                        sx={{ minWidth: 80, textAlign: "center", userSelect: "none" }}
                    >
                        {nomeMeses[mesAtual]}
                    </Typography>
                    <IconButton
                        onClick={handleMesProximo}
                        aria-label="Próximo mês"
                        size="small"
                        sx={{ color: colors.primary[500] }}
                    >
                        <ArrowForwardIosIcon fontSize="small" />
                    </IconButton>
                </Box>
            </Box>

            {/* Controles de navegação alinhados à direita e menores */}


            {/* Cabeçalho dos dias da semana */}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(7, 1fr)",
                    textAlign: "center",
                    fontWeight: "bold",
                    color: colors.grey[600],
                    marginBottom: 1,
                }}
            >
                {diasSemana.map((d) => (
                    <Box key={d}>{d}</Box>
                ))}
            </Box>

            {/* Grade com os dias do mês */}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(7, 1fr)",
                    gap: 2,
                }}
            >
                {/* Preenchendo os espaços vazios do começo do mês */}
                {(() => {
                    const primeiroDiaSemana = new Date(anoAtual, mesAtual, 1).getDay();
                    return [...Array(primeiroDiaSemana).keys()].map((_, idx) => (
                        <Box key={"empty-" + idx} />
                    ));
                })()}

                {/* Dias do mês */}
                {diasMes.map(({ dia, diaSemana }) => {
                    const isDomingo = diaSemana === 0;
                    const isSabado = diaSemana === 6;

                    // Define cor e status
                    let bgColor = "#fff"; // cinza claro
                    let color = colors.primary[600];
                    let status = "Aberto";
                    let horario = horarios.horarioDiaUtil;

                    if (isDomingo) {
                        bgColor = "#ffe6e6"; // vermelho claro
                        color = colors.redAccent[500];
                        status = "Fechado";
                        horario = "";
                    } else if (isSabado) {
                        bgColor = "#e6f0ff"; // azul claro
                        color = colors.blueAccent[500];
                        horario = horarios.horarioSabado;
                    }

                    // Destaca o dia atual se for do mês e ano atuais
                    const isHoje =
                        dia === hoje.getDate() &&
                        mesAtual === hoje.getMonth() &&
                        anoAtual === hoje.getFullYear();

                    return (
                        <Tooltip
                            key={dia}
                            title={
                                status === "Fechado"
                                    ? "Academia fechada"
                                    : `Aberto das ${horario}`
                            }
                            arrow
                        >
                            <Box
                                sx={{
                                    backgroundColor: bgColor,
                                    color: color,
                                    borderRadius: 2,
                                    padding: 2,
                                    textAlign: "center",
                                    fontWeight: "600",
                                    cursor: "default",
                                    userSelect: "none",
                                    boxShadow: isHoje
                                        ? `0 0 10px 3px ${colors.blueAccent[600]}`
                                        : "0 1px 5px rgba(0, 0, 0, 0.51)",
                                    transition: "transform 0.15s ease-in-out",
                                    "&:hover": {
                                        transform: status !== "Fechado" ? "scale(1.05)" : undefined,
                                    },
                                }}
                            >
                                {dia}
                            </Box>
                        </Tooltip>
                    );
                })}
            </Box>

            <Box
                sx={{
                    marginTop: 2,
                    color: colors.primary[500],
                    fontStyle: "italic",
                    textAlign: "center",
                    userSelect: "none",
                }}
            >
                <Typography>Domingos a academia está fechada para manutenção.</Typography>
                <Typography>
                    Horários: Segunda a Sexta 06:00 - 22:00 | Sábados 08:00 - 18:00
                </Typography>
            </Box>
        </Box>
    );
};

export default Calendario;
