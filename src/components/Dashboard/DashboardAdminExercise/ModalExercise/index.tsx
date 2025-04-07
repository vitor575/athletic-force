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
import { CREATE_EXERCISE } from "../../../../services/mutations/cadastrarExercicio";
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
    muscleGroup: "",
    qtdSets: 3,
    time: 0,
  });

  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  const [createExercise, { loading }] = useMutation(CREATE_EXERCISE);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setSnackbarMessage("");
  };

  const handleAddExercise = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.muscleGroup) {
      setSnackbarMessage("É necessário preencher o formulário.");
      setOpenSnackbar(true);
      return;
    }

    try {
      const response = await createExercise({ variables: formData });
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
      [name]: name === "time" ? Number(value) : value,
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
          Adicionar Exercício
        </Typography>

        <FormControl component="fieldset" margin="normal">
          <FormLabel
            component="legend"
            sx={{
              color: colors.grey[100],
              "&.Mui-focused": { color: colors.blueAccent[200] },
            }}
          >
            Selecione o grupo muscular
          </FormLabel>
          <RadioGroup
            row
            name="muscleGroup"
            value={formData.muscleGroup}
            onChange={handleChange}
          >
            <FormControlLabel
              value="SUPERIORS"
              control={
                <Radio
                  sx={{
                    "&.Mui-checked": { color: colors.greenAccent[400] },
                  }}
                />
              }
              label="Superior"
            />
            <FormControlLabel
              value="LOWER"
              control={
                <Radio
                  sx={{
                    "&.Mui-checked": { color: colors.greenAccent[400] },
                  }}
                />
              }
              label="Inferior"
            />
            <FormControlLabel
              value="CARDIO"
              control={
                <Radio
                  sx={{
                    "&.Mui-checked": { color: colors.greenAccent[400] },
                  }}
                />
              }
              label="Cardio"
            />
          </RadioGroup>
        </FormControl>
        <TextField
          label="Nome do Exercício"
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
        {formData.muscleGroup === "CARDIO" && (
          <TextField
            label="Tempo (segundos)"
            name="time"
            type="number"
            fullWidth
            margin="normal"
            value={formData.time}
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
        )}
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
