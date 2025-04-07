import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { tokens } from "../../../tema";
import { useTheme } from "@mui/material";
const CaixaTxt = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const textsobre = {
    textAlign: "left",
    fontWeight: 600,
    fontSize: "1.2em",
    color: "rgb(85, 85, 85)",
    width: "80%",
    textAlignLast: "justifyContent",

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
          backgroundColor: "rgb(238, 238, 238)",
          padding: "20px",
          borderRadius: "20px",
          width: "120%",
          boxShadow: "30px 5px 30px rgba(36, 36, 36, 0.184)",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontWeight: 600,
            fontSize: "2.5em",
            color: colors.primary?.[500],
            margin: "5px 0 10px",
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
              background: `linear-gradient(20deg, #fff,  ${colors.primary?.[500]})`,
              backgroundSize: "400% 100%",
              animation: "degrade 1500ms linear infinite alternate",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              outline: "none",
              marginLeft: "15px",
              fontSize: ".9em",
              fontWeight: 600,
            }}
          >
            Athletic
          </Typography>
        </Typography>

        <Typography sx={textsobre}>
          ZenFit fundada em 2015, a Academia Zenfit tem a missão de promover
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
