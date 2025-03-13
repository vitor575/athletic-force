import React from "react";
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

const EditTrainingModal: React.FC<EditTrainingModalProps> = ({ open, handleClose }) => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const styles = {
    position: "relative" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: colors.grey[600],
    bgcolor: colors.grey[600],
    margin : "30px 0 0 0"
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
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
        <form>
          <TextField
            label="Treino"
            variant="outlined"
            fullWidth
            margin="normal"
            name="treino"
            sx={styles}
         
          />
          <TextField
            label="Repetições"
            variant="outlined"
            fullWidth
            margin="normal"
            name="repeticoes"
            sx={styles}
            
          />
          <TextField
            label="Carga"
            variant="outlined"
            fullWidth
            margin="normal"
            name="carga"
            sx={styles}
           
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
