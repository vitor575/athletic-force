import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  useTheme,
} from "@mui/material";
import { tokens } from "../../tema";



interface EditTrainingModalProps {
  open: boolean;
  handleClose: () => void;
  initialData: {
    treino: string;
    repeticoes: string;
    carga: string;
  };
  onSave: (data: { treino: string; repeticoes: string; carga: string }) => void;
}

const EditTrainingModal: React.FC<EditTrainingModalProps> = ({ open, handleClose, initialData, onSave }) => {

  const [formData, setFormData] = useState({
    treino: "",
    repeticoes: "",
    carga: "",
  });

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const styles = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: 400,
    width: 800,
    color: colors.grey[600],
    bgcolor: colors.grey[600],
    borderRadius: 4,
    boxShadow: 24,
    p: 4,
    border: `2px solid ${colors.blueAccent[600]}`,
  };

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="edit-training-modal-title"
      aria-describedby="edit-training-modal-description"
    >
      <Box
        sx={{
          position: "absolute" as const,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          height: 400,
          width: 800,
          color: colors.grey[600],
          bgcolor: colors.grey[600],
          borderRadius: 4,
          boxShadow: 24,
          p: 4,
          border: `2px solid ${colors.blueAccent[600]}`,
        }}
      >
        <Typography
          id="edit-training-modal-title"
          variant="h6"
          component="h2"
          color={colors.grey[100]}
        >
          Editar Treino
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Treino"
            variant="outlined"
            fullWidth
            margin="normal"
            name="treino"
            sx={styles}
            value={formData.treino}
            onChange={handleChange}
          />
          <TextField
            label="Repetições"
            variant="outlined"
            fullWidth
            margin="normal"
            name="repeticoes"
            sx={styles}
            value={formData.repeticoes}
            onChange={handleChange}
          />
          <TextField
            label="Carga"
            variant="outlined"
            fullWidth
            margin="normal"
            name="carga"
            sx={styles}
            value={formData.carga}
            onChange={handleChange}
          />
          <Box mt={2} display="flex" justifyContent="flex-end" gap={1}>
            <Button
              variant="contained"
              type="submit"
              sx={{ bgcolor: colors.greenAccent[600], color: colors.grey[100] }}
            >
              Salvar
            </Button>
            <Button
              variant="outlined"
              onClick={handleClose}
              sx={{ bgcolor: colors.primary[700], color: colors.grey[100] }}
            >
              Cancelar
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default EditTrainingModal;
