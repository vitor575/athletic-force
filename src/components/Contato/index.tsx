import React, { useState } from "react";
import { Box, TextField, Button, Paper, colors, useTheme } from "@mui/material";
import logocontato from "../../img/logo3.png"
import { tokens } from "../../tema";

interface FormContact {
  email: string;
  nome: string;
  numero: string;
  textmensage: string;
}

const Contato: React.FC = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
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
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          borderRadius: 3,
          boxShadow: "0px 4px 60px rgba(177, 177, 177, 0.973)",
          width: "65%",
          margin: "0 auto", 
          justifyContent: "center",

        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <img src={logocontato} alt="logocontato" style={{ width: "20%",  border: `3px solid ${colors.blueAccent[600]}`}} />
        </Box>
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
            <Button type="submit" variant="contained" color="error" sx={{backgroundColor: colors.primary?.[500], fontWeight: "bold", padding: "12px 24px" }}>
              Enviar mensagem
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default Contato;
