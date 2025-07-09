import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Stack, Alert, useTheme } from "@mui/material";
import { tokens } from "../../../../tema";

const TrocarSenha = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const textFieldStyles = {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: colors.grey[900],
      },
    },
    '& .MuiInputLabel-root': {
      color: colors.grey[900], // Cor da Label (placeholder)
    },
    '& .MuiInputBase-input': {
      color: colors.grey[900], // Cor do texto digitado
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('Todos os campos são obrigatórios.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('A nova senha e a confirmação de senha não correspondem.');
      return;
    }
    if (newPassword.length < 8) {
      setError('A nova senha deve ter pelo menos 8 caracteres.');
      return;
    }
    console.log('Submetendo formulário...');
    console.log({ currentPassword, newPassword });
    setSuccess('Senha alterada com sucesso!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" sx={{ color: colors.greenAccent[500] }}>
        Trocar Senha
      </Typography>
      <Typography variant="body1" sx={{ mb: 6, color: colors.grey[900] }}>
        Use o formulário abaixo para alterar sua senha.
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Stack spacing={3}>
          <TextField
            label="Senha Atual"
            type="password"
            variant="outlined"
            fullWidth
            required
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            sx={textFieldStyles}
          />
          <TextField
            label="Nova Senha"
            type="password"
            variant="outlined"
            fullWidth
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            helperText="A senha deve ter no mínimo 8 caracteres."
            sx={textFieldStyles}
            FormHelperTextProps={{
              sx: { color:colors.grey[700] } // Muda a cor do helperText aqui
            }}
          />
          <TextField
            label="Confirmar Nova Senha"
            type="password"
            variant="outlined"
            fullWidth
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={textFieldStyles}
          />
          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">{success}</Alert>}
          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            sx={{
              mt: 2,
              py: 1.5,
              color: colors.primary[900],
              '&:hover': {
                backgroundColor: colors.blueAccent[400],
              },
            }}
          >
            Alterar Senha
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default TrocarSenha;