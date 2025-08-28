import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  useTheme,
  TextField,
} from "@mui/material";
import { tokens } from "../../tema";
import { useAuth } from "../../services/authentication/useAuth";
import logo from "../../img/logo3.png";
import { CircularProgress } from "@mui/material";
import { keyframes } from "@mui/system";

interface ModalLoginProps {
  open: boolean;
  onClose: () => void;
}

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(-360deg); }
`;

const slideDownFadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ModalLogin: React.FC<ModalLoginProps> = ({ open, onClose }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const { authenticate } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await authenticate(email, senha);
      onClose();
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: 700,
          height: 500,
          mx: "auto",
          mt: 8,
          p: 3,
          border: `3px solid ${colors.blueAccent[600]}`,
          bgcolor: colors.primary[500],
          borderRadius: 2,
          animation: `${slideDownFadeIn} 0.5s ease-out`,
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          paddingBottom={1}
          borderBottom={`2px solid ${colors.blueAccent[400]}`}
          color={colors.grey[800]}
        >
          Efetuar login
        </Typography>
        <Box
          component="img"
          src={logo}
          sx={{
            width: 150,
            margin: "10px 250px",
            border: `3px solid ${colors.blueAccent[400]}`,
            borderRadius: 5,
          }}
        />
        <TextField
          variant="filled"
          label="Email"
          name="email"
          type="email"
          fullWidth
          sx={{
            "& .MuiInputBase-input": {
              color: "white",
            },
            "& .MuiInputLabel-root": {
              color: colors.grey[900],
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: colors.grey[700],
            },
          }}
          slotProps={{
            inputLabel: {
              sx: {
                color: colors.grey[900],
                "&.Mui-focused": { color: colors.grey[700] },
              },
            },
          }}
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          variant="filled"
          label="Senha"
          name="password"
          type="password"
          fullWidth
          sx={{
            "& .MuiInputBase-input": {
              color: "white",
            },
            "& .MuiInputLabel-root": {
              color: colors.grey[900],
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: colors.grey[700],
            },
          }}
          slotProps={{
            inputLabel: {
              sx: {
                color: colors.grey[900],
                "&.Mui-focused": { color: colors.grey[700] },
              },
            },
          }}
          margin="normal"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        {loading ? (
          <Button
            type="submit"
            variant="contained"
            disabled
            sx={{
              mt: 4,
              bgcolor: colors.blueAccent[500],
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress size={24} sx={{ color: "white" }} />
          </Button>
        ) : (
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 4, bgcolor: colors.blueAccent[500] }}
          >
            Entrar
          </Button>
        )}

      </Box>
    </Modal>
  );
};

export default ModalLogin;
