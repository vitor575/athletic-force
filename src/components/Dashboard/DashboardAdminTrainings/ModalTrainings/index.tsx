import React, { useState } from "react";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Modal,
  Snackbar,
  TextField,
  Typography,
  useTheme,
  Alert,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { tokens } from "../../../../tema";
import { CREATE_TRAINING } from "../../../../services/mutations/cadastratTreinos";
import { useMutation } from "@apollo/client";

interface ModalExerciseProps {
  open: boolean;
  handleClose: () => void;
}

const ModalExercise: React.FC<ModalExerciseProps> = ({ open, handleClose }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    exercisesId: "",
  });

  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  const [createTraining, { loading }] = useMutation(CREATE_TRAINING);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setSnackbarMessage("");
  };

  const handleAddExercise = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !formData.exercisesId) {
      setSnackbarMessage("É necessário preencher o formulário.");
      setOpenSnackbar(true);
      return;
    }

    try {
      const response = await createTraining({ variables: formData });
      setSnackbarMessage(response.data.createExercise.message);
      setOpenSnackbar(true);
    } catch (err: any) {
      setSnackbarMessage("Erro ao criar exercício: " + err.message);
      setOpenSnackbar(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        component="form"
        onSubmit={handleAddExercise}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: colors.primary[500],
          p: 4,
          borderRadius: 2,
          border: `2px solid ${colors.blueAccent[600]}`,
        }}
      >
        <Typography variant="h6" mb={2} color={colors.grey[100]}>
          Adicionar Treino
        </Typography>

        <TextField
          label="Nome do Treino"
          name="name"
          fullWidth
          margin="normal"
          value={formData.name}
          onChange={handleChange}
          required
          slotProps={{
            inputLabel: {
              sx: {
                color: colors.grey[100],
                "&.Mui-focused": { color: colors.blueAccent[200] },
              },
            },
          }}
        />

        <TextField
          label="Descrição do treino"
          name="description"
          fullWidth
          margin="normal"
          value={formData.description}
          onChange={handleChange}
          required
          slotProps={{
            inputLabel: {
              sx: {
                color: colors.grey[100],
                "&.Mui-focused": { color: colors.blueAccent[200] },
              },
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            mt: 2,
            backgroundColor: colors.greenAccent[600],
            color: colors.grey[100],
          }}
        >
          Salvar
        </Button>

        <Backdrop
          open={loading}
          sx={{ color: "#fff", zIndex: theme.zIndex.drawer + 9999 }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbarMessage.includes("Erro") ? "error" : "success"}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Modal>
  );
};

export default ModalExercise;
