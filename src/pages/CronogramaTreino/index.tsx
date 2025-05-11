import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Box, Button, Typography, IconButton, Paper, useTheme } from "@mui/material";
import { FaArrowLeft, FaArrowRight, FaSignOutAlt } from "react-icons/fa";
import { tokens } from "../../tema";

const CronogramaTreino: React.FC = () => {
  const diaSemana = ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira"];
  const navigate = useNavigate();
  const [diaAtual, setDiaAtual] = useState(0);

  const handleExit = () => navigate("/clientHome");

  const handlePrevious = () => {
    const newIndex = diaAtual === 0 ? diaSemana.length - 1 : diaAtual - 1;
    setDiaAtual(newIndex);
    navigate(`/clientHome/cronograma/${diaSemana[newIndex]}`);
  };

  const handleNext = () => {
    const newIndex = diaAtual === diaSemana.length - 1 ? 0 : diaAtual + 1;
    setDiaAtual(newIndex);
    navigate(`/clientHome/cronograma/${diaSemana[newIndex]}`);
  };



  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: colors.primary[500],
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ padding: "20px 20px 0 20px", display: "flex", justifyContent: "space-between"}}>
        <Button
          variant="contained"
          color="error"
          startIcon={<FaSignOutAlt />}
          onClick={handleExit}
          sx={{ bgcolor: colors.blueAccent[300], "&:hover": { bgcolor: colors.blueAccent[400] } }}
        >
          Voltar
        </Button>
        <Button sx={{ bgcolor: colors.blueAccent[300], "&:hover": { bgcolor: colors.blueAccent[400] }, color: "#fff" }}>
          Historico de Treinos
        </Button>

      </Box>
      <Paper
        elevation={4}
        sx={{
          width: "100%",
          height: "90vh",
          display: "flex",

          flexDirection: "column",
          gap: .5,
          p: 2,
          bgcolor: colors.primary[500],
        }}
      >
        {/* Conteúdo dos treinos (Outlet) */}
        <Paper
          elevation={3}
          sx={{
            p: 2,
            borderRadius: 2,
            flex: 1,
            overflowY: "auto",
          }}
        >
          <Outlet />
        </Paper>
        <Paper
          elevation={2}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 1,
            borderRadius: 2,
            bgcolor: colors.blueAccent[300],
            flexShrink: 0,
            flexWrap: "wrap",
            gap: 2,
            width: "100%",
          }}
        >
          <IconButton
            onClick={handlePrevious}
            sx={{
              bgcolor: colors.primary[500],
              color: "#fff",
              fontSize: 28,
              "&:hover": {
                bgcolor: colors.primary[600],
              },
            }}
          >
            <FaArrowLeft />
          </IconButton>

          <Typography
            variant="h4"
            fontWeight="bold"
            color={colors.blueAccent[900]}
            textAlign="center"
            sx={{ flex: 1 }}
          >
            {diaSemana[diaAtual]}
          </Typography>

          <IconButton
            onClick={handleNext}
            sx={{
              bgcolor: colors.primary[500],
              color: "#fff",
              fontSize: 28,
              "&:hover": {
                bgcolor: colors.primary[600],
              },
            }}
          >
            <FaArrowRight />
          </IconButton>
        </Paper>
      </Paper>
    </Box>

  );
};

export default CronogramaTreino;
