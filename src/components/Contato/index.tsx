import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import FotoContato from "./fotoContato";
import logocontato from "../../img/logo3.png"

interface FormContact {
  email: string;
  nome: string;
  numero: string;
  textmensage: string;
}

const Contato: React.FC = () => {
  const [formContatoState, setFormContato] = useState<FormContact>({
    nome: "",
    email: "",
    numero: "",
    textmensage: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormContato({ ...formContatoState, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dados enviados:", formContatoState);
  };

  return (
    <Box >
      <FotoContato />
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          borderRadius: 3,
          boxShadow: "0px 4px 60px rgba(177, 177, 177, 0.973)",
          width: "65%",
          margin: "0 auto",
          mt: -10,
          position: "relative",
          top: "-200px",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <img src={logocontato} alt="logocontato" style={{ width: "20%", animation: "imgLogo 4s ease-in-out infinite" }} />
        </Box>
        <Typography variant="h3" fontWeight={600} textAlign="center" color="error" gutterBottom>
          CONTATO COM <span style={{ background: "linear-gradient(20deg, #fff, #ff0000)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>ZENFIT</span>
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Nome"
            name="nome"
            value={formContatoState.nome}
            onChange={handleChange}
            required
            margin="normal"
          />
          <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
            <TextField
              fullWidth
              type="email"
              label="E-mail"
              name="email"
              value={formContatoState.email}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              label="Número"
              name="numero"
              value={formContatoState.numero}
              onChange={handleChange}
              required
            />
          </Box>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Mensagem"
            name="textmensage"
            value={formContatoState.textmensage}
            onChange={handleChange}
            required
            margin="normal"
          />
          <Box sx={{ display: "flex", justifyContent: "end", mt: 2 }}>
            <Button type="submit" variant="contained" color="error" sx={{ fontWeight: "bold", padding: "12px 24px" }}>
              Enviar mensagem
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default Contato;
