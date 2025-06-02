import React, { useEffect, useState } from "react";
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
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { tokens } from "../../../../tema";
import {
  CREATE_ROUTINE,
  EDIT_ROUTINE,
} from "../../../../services/mutations/routineMutations";
import { useTrainingsData } from "../../../../services/querrys/useTrainingsData";
import { useMutation } from "@apollo/client";

interface ModalRoutinesProps {
  open: boolean;
  handleClose: () => void;
  onRoutineSaved: () => void;
  routine?: {
    id: string;
    name: string;
    description: string;
    trainings: { id: string }[];
  } | null;
}

const ModalRoutines: React.FC<ModalRoutinesProps> = ({
  open,
  handleClose,
  onRoutineSaved,
  routine,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { data, loading: loadingTrainings } = useTrainingsData();
  const trainings = data?.getAllTrainings || [];

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [createRoutine, { loading: loadingCreate }] = useMutation(CREATE_ROUTINE);
  const [editRoutine, { loading: loadingEdit }] = useMutation(EDIT_ROUTINE);
  const loadingMutation = loadingCreate || loadingEdit;

  useEffect(() => {
    if (routine) {
      setFormData({
        name: routine.name,
        description: routine.description,
      });
      setSelectedIds(routine.trainings.map((t) => t.id));
    } else {
      setFormData({ name: "", description: "" });
      setSelectedIds([]);
    }
  }, [routine]);

  const colunas: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Nome do Treino", flex: 1 },
    { field: "description", headerName: "Descrição", flex: 1 },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.description || selectedIds.length === 0) {
      setSnackbarMessage("Preencha nome, descrição e selecione pelo menos 1 treino.");
      setOpenSnackbar(true);
      return;
    }
    try {
      const variables = {
        name: formData.name,
        desc: formData.description,
        isActive: true,
        trainingIds: selectedIds,
      };
      const response = routine?.id
        ? await editRoutine({ variables: { id: routine.id, ...variables } })
        : await createRoutine({ variables });
      setSnackbarMessage(
        routine
          ? response.data.editRoutine.message
          : response.data.createRoutine.message
      );
      onRoutineSaved();
      handleClose();
    } catch (err: any) {
      console.error("Erro ao salvar rotina:", err);
      setSnackbarMessage("Erro ao salvar rotina: " + err.message);
    } finally {
      setOpenSnackbar(true);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          position: "absolute" as const,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "60vw",
          height: "80vh",
          bgcolor: colors.primary[500],
          p: 4,
          borderRadius: 2,
          border: `2px solid ${colors.blueAccent[600]}`,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h6" color={colors.grey[100]} mb={2}>
          {routine ? "Editar Rotina" : "Criar Rotina"}
        </Typography>

        <Box display="flex" gap={2} mb={2}>
          <TextField
            label="Nome da Rotina"
            name="name"
            fullWidth
            value={formData.name}
            onChange={(e) =>
              setFormData((p) => ({ ...p, name: e.target.value }))
            }
            InputLabelProps={{
              sx: {
                color: colors.grey[100],
                "&.Mui-focused": { color: colors.blueAccent[200] },
              },
            }}
          />
          <TextField
            label="Descrição"
            name="description"
            fullWidth
            value={formData.description}
            onChange={(e) =>
              setFormData((p) => ({ ...p, description: e.target.value }))
            }
            InputLabelProps={{
              sx: {
                color: colors.grey[100],
                "&.Mui-focused": { color: colors.blueAccent[200] },
              },
            }}
          />
        </Box>

        <Box flex={1} mb={2}>
          <DataGrid
            rows={trainings}
            columns={colunas}
            checkboxSelection
            disableColumnResize={true}
            getRowId={(row) => row.id}
            rowSelectionModel={selectedIds as GridRowSelectionModel}
            onRowSelectionModelChange={(newModel) =>
              setSelectedIds(newModel as string[])
            }
            loading={loadingTrainings}
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
          />
        </Box>

        <Box display="flex" gap={2} alignItems="center">
          <Button
            type="submit"
            variant="contained"
            disabled={loadingMutation}
            sx={{
              backgroundColor: colors.greenAccent[600],
              color: colors.grey[100],
              "&:hover": { backgroundColor: colors.greenAccent[700] },
            }}
          >
            {loadingMutation ? <CircularProgress size={20} /> : "Salvar"}
          </Button>
          <Backdrop
            open={loadingMutation}
            sx={{ color: "#fff", zIndex: theme.zIndex.drawer + 1 }}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </Box>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => setOpenSnackbar(false)}
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

export default ModalRoutines;
