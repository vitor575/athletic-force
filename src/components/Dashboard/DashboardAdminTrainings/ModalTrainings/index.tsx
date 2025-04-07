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
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { tokens } from "../../../../tema";
import { CREATE_TRAINING } from "../../../../services/mutations/cadastratTreinos";
import { useMutation } from "@apollo/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useExercisesData } from "../../../../services/querrys/useExercisesData";

interface ModalTrainingsProps {
  open: boolean;
  handleClose: () => void;
  onTrainingCreated: () => void;
}

const ModalTrainings: React.FC<ModalTrainingsProps> = ({
  open,
  handleClose,
  onTrainingCreated,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { data } = useExercisesData();
  const exercicios = data?.getAllExercises || [];
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const colunas: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Nome", flex: 1 },
    { field: "muscleGroup", headerName: "Grupo Muscular", flex: 1 },
    {
      field: "gerenciar",
      headerName: "Selecionar",
      flex: 1,
      renderCell: (params: any) => {
        const isSelected = selectedIds.includes(params.row.id);
        return (
          <Button
            sx={{
              backgroundColor: colors.greenAccent[600],
              color: colors.grey[100],
              marginRight: "5px",
            }}
            variant="contained"
            onClick={() => {
              setSelectedIds((prev) =>
                isSelected
                  ? prev.filter((id) => id !== params.row.id)
                  : [...prev, params.row.id]
              );
            }}
          >
            Selecionar{" "}
            {isSelected ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
          </Button>
        );
      },
    },
  ];

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  const [createTraining, { loading }] = useMutation(CREATE_TRAINING);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setSnackbarMessage("");
  };

  const handleAddTraining = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.description || selectedIds.length === 0) {
      setSnackbarMessage(
        "É necessário preencher o formulário e selecionar ao menos um exercício."
      );
      setOpenSnackbar(true);
      return;
    }

    try {
      const response = await createTraining({
        variables: {
          name: formData.name,
          description: formData.description,
          exerciseIds: selectedIds,
        },
      });

      setSnackbarMessage(response.data.createTraining.message);
      setOpenSnackbar(true);

      onTrainingCreated();
      handleClose();
    } catch (err: any) {
      console.error("Erro ao criar treino:", err);
      setSnackbarMessage("Erro ao criar treino. Tente novamente.");
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
        onSubmit={handleAddTraining}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "70vw",
          height: "90vh",
          bgcolor: colors.primary[500],
          p: 4,
          borderRadius: 2,
          border: `2px solid ${colors.blueAccent[600]}`,
        }}
      >
        <Typography variant="h6" mb={1} color={colors.grey[100]}>
          Adicionar Treino
        </Typography>

        <Box display="flex" gap={2}>
          <TextField
            label="Nome do Treino"
            name="name"
            sx={{ flex: 1 }}
            fullWidth
            margin="normal"
            value={formData.name}
            onChange={handleChange}
            required
            InputLabelProps={{
              sx: {
                color: colors.grey[100],
                "&.Mui-focused": { color: colors.blueAccent[200] },
              },
            }}
          />

          <TextField
            label="Descrição do treino"
            name="description"
            sx={{ flex: 1 }}
            fullWidth
            margin="normal"
            value={formData.description}
            onChange={handleChange}
            required
            InputLabelProps={{
              sx: {
                color: colors.grey[100],
                "&.Mui-focused": { color: colors.blueAccent[200] },
              },
            }}
          />
        </Box>

        <Box
          m="10px 0 0 0"
          height="55vh"
          sx={{
            "& .MuiDataGrid-root": { border: "none" },
            "& .MuiDataGrid-cell": { border: "none" },
            "& .MuiDataGrid-columnHeader": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
          }}
        >
          <DataGrid
            rows={exercicios}
            columns={colunas}
            getRowId={(row) => row.id}
          />
        </Box>

        <Button
          type="submit"
          variant="contained"
          sx={{
            mt: 2,
            backgroundColor: colors.greenAccent[600],
            color: colors.grey[100],
          }}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={24} sx={{ color: "white" }} />
          ) : (
            "Salvar"
          )}
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

export default ModalTrainings;
