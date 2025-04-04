import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";

const CardPagamento = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        width: "90%",
        height: "23%",
        padding: "0.5rem 1.4rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: "30px",
      }}
    >
      <Box sx={{ width: "50%", display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
        <Typography
          sx={{
            backgroundColor: "grey.500",
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
          <Typography variant="h6" fontWeight="bold">
            Vence em 20/11
          </Typography>
          <Typography color="grey.600" fontWeight="bold">
            Fatura de setembro
          </Typography>
        </Box>
      </Box>
      <Box sx={{ width: "50%", display: "flex", flexDirection: "column", justifyContent: "space-around", alignItems: "flex-end" }}>
        <Typography variant="h3">
          <Typography component="span" color="green">
            R$
          </Typography>
          100,00
        </Typography>
        <Button
          variant="contained"
          color="error"
          sx={{
            borderRadius: "100px",
            fontSize: "1.2rem",
            padding: "0.5rem 1rem",
          }}
        >
          Pagar
        </Button>
      </Box>
    </Paper>
  );
};

export default CardPagamento;