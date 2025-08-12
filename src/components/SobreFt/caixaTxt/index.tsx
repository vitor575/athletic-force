import React from "react";
import { Box, Typography, Button, useTheme } from "@mui/material";
import { tokens } from "../../../tema";





const CaixaTxt: React.FC = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const textsobre = {
    textAlign: "justify",
    fontWeight: 600,
    fontSize: "1.2em",
    color: "rgb(85, 85, 85)",
    width: "100%",
    [theme.breakpoints.down("lg")]: {
      fontSize: "1.9em",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "1.4em",
    },

  };
  return (
    <Box
      sx={{
        position: "relative",
        right: 140,
        [theme.breakpoints.down("md")]: {
          right: 0,

        },
      }}
    >
      <Box
        sx={{
          backgroundColor: "rgb(255, 255, 255)",
          borderRadius: "20px",
          width: "145%",
          boxShadow: "30px 5px 30px rgba(36, 36, 36, 0.184)",
          height: "300px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 3,
          p: 4,
          [theme.breakpoints.down("md")]: {
            gap: 1,
            width: "100%",
            height: "100%",
            p: 3
          },

        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontWeight: 600,
            fontSize: "2.5em",
            color: colors.primary?.[500],
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            [theme.breakpoints.down("lg")]: {
              fontSize: "2.6em",
            },
            [theme.breakpoints.down("md")]: {
              fontSize: "1.6em",
            },


          }}
        >
          Sobre a ATHLETIC
        </Typography>

        <Typography sx={textsobre}>
          Athletic fundada em 2015, a Academia Athletic tem a missão de promover
          saúde e bem-estar em um ambiente acolhedor e inspirador.Com profissionais qualificados e estrutura moderna, buscamos
          transformar vidas através da atividade física e do autocuidado. Venha fazer parte dessa jornada!
        </Typography>
      </Box>
    </Box>
  );
};

export default CaixaTxt;
