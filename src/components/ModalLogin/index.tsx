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
  const { authenticate, loginError } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await authenticate(email, senha);
      onClose();
    } catch (e) {
      console.error("Login failed:", e);
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
          width: "90%",
          maxWidth: 500,
          mx: "auto",
          mt: 8,
          p: 4,
          border: `3px solid ${colors.blueAccent[600]}`,
          bgcolor: colors.primary[500],
          borderRadius: 4,
          animation: `${slideDownFadeIn} 0.5s ease-out`,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{
            pb: 1,
            borderBottom: `2px solid ${colors.blueAccent[400]}`,
            color: colors.grey[100],
            fontWeight: "bold",
          }}
        >
          Efetuar login
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            my: 2,
          }}
        >
          <Box
            component="img"
            src={logo}
            sx={{
              width: 120,
              p: 1,
              border: `2px solid ${colors.blueAccent[400]}`,
              borderRadius: "20%",
            }}
          />
        </Box>

        {loginError && (
          <Typography
            color="error"
            variant="body2"
            align="center"
            sx={{
              bgcolor: "rgba(255, 0, 0, 0.1)",
              p: 1,
              borderRadius: 1,
              border: "1px solid red",
            }}
          >
            {loginError}
          </Typography>
        )}

        <TextField
          variant="filled"
          label="Email"
          name="email"
          type="email"
          fullWidth
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            "& .MuiInputBase-input": { color: "white" },
            "& .MuiInputLabel-root": { color: colors.grey[400] },
          }}
        />

        <TextField
          variant="filled"
          label="Senha"
          name="password"
          type="password"
          fullWidth
          required
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          sx={{
            "& .MuiInputBase-input": { color: "white" },
            "& .MuiInputLabel-root": { color: colors.grey[400] },
          }}
        />

        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{
            mt: 2,
            py: 1.5,
            bgcolor: colors.blueAccent[600],
            "&:hover": {
              bgcolor: colors.blueAccent[700],
            },
            fontWeight: "bold",
            fontSize: "1rem",
          }}
        >
          {loading ? (
            <CircularProgress size={24} sx={{ color: "white" }} />
          ) : (
            "Entrar"
          )}
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalLogin;
