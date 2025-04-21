import React from "react";
import { Box, Typography, Button , useTheme } from "@mui/material";
import { tokens } from "../../../tema";





const CaixaTxt: React.FC = () =>{
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const textsobre = {
    textAlign: "center",
    fontWeight: 600,
    fontSize: "1.2em",
    color: "rgb(85, 85, 85)",
    width: "100%",

  };
  return (
    <Box
      sx={{
        position: "relative",
        right: 140,
      }}
    >
      <Box
        sx={{
          backgroundColor: "rgb(255, 255, 255)",
          padding: "10px",
          borderRadius: "20px",
          width: "145%",
          boxShadow: "30px 5px 30px rgba(36, 36, 36, 0.184)",
          height: "300px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between"
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
          }}
        >
          Conheça a história da
          <Typography
            component="span"
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              display: "inline-block",
              textTransform: "uppercase",
              color: colors.primary?.[500],
              outline: "none",
              fontSize: ".9em",
              fontWeight: 600,
              padding: "0 10px",
            }}
          >
            Athletic 
          </Typography>
        </Typography>

        <Typography sx={textsobre}>
          Athletic fundada em 2015, a Academia Athletic tem a missão de promover
          saúde e bem-estar em um ambiente acolhedor e inspirador.Com profissionais qualificados e estrutura moderna, buscamos
          transformar vidas através da atividade física e do autocuidado. Venha fazer parte dessa jornada!
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            sx={{
              padding: "10px 30px",
              fontSize: "1.1em",
              borderRadius: "10px",
              backgroundColor: colors.primary?.[500],
              color: "#ffffff",
              border: "none",
              "&:hover": {
                backgroundColor: colors.blueAccent[400],
                transform: "scale(1.1)",
                transition: "300ms",
              },
            }}
          >
            Saiba Mais
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CaixaTxt;
