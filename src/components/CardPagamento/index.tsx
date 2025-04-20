
import { Box, Typography, Button, Paper, useTheme, keyframes } from "@mui/material";
import { tokens } from "../../tema";



const CardPagamento = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Animação metálica customizada com keyframes do MUI
  const metallicShine = keyframes`
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0%;
    }
  `;

  return (
    <Paper
      elevation={3}
      sx={{
        width: "100%",
        height: "23%",
        padding: "0.5rem 1.4rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: "10px",
        boxShadow: "5px 5px 15px rgba(102, 102, 102, 0.5)",
      }}
    >
      <Box >
        <Typography
          sx={{
            bgcolor: colors.blueAccent[300],
            color: "white",
            width: "7rem",
            textAlign: "center",
            padding: "0.6rem",
            borderRadius: "100px",
            fontWeight: "bold",
          }}
        >
          Pendente
        </Typography>
        <Box>
          <Typography fontWeight="bold">
            Vence em 20/11
          </Typography>
          <Typography fontWeight="bold">
            Fatura de setembro
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", }}>
        <Typography variant="h4">
          <Typography component="span" color="green">
            R$
          </Typography>
          100,00
        </Typography>
        <Button
          variant="contained"
          color="error"
          sx={{
            borderRadius: "10px",
            fontSize: "1.2rem",
            background: "linear-gradient(135deg, #535ac8, #535ac8, #3e4396, #3e4396, #868dfb)",
            backgroundSize: "200% 200%",
            animation: `${metallicShine} 3s linear infinite`,
            "&:hover": {transform: "scale(1.05)"},
            transition: "0.4s",
          }}
        >
          Pagar
        </Button>
      </Box>
    </Paper>
  );
};

export default CardPagamento;