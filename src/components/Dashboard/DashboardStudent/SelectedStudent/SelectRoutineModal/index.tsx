import React, {useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Snackbar,
  Typography,
  useTheme,
  Alert,
} from "@mui/material";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { tokens } from "../../../../../tema";
import { useRoutinesData } from "../../../../../services/querrys/useRoutinesData";
import { ASSIGN_ROUTINE } from "../../../../../services/mutations/userMutations";
import { useMutation } from "@apollo/client";

interface SelectRoutineModalProps {
  open: boolean;
  handleClose: () => void;
  userId: string;
}

const SelectRoutineModal: React.FC<SelectRoutineModalProps> = ({
  open,
  handleClose,
  userId,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { routines, loading: loadingRoutines } = useRoutinesData();
  const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>([]);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  const [assignRoutine, { loading: assigning }] = useMutation(
    ASSIGN_ROUTINE,
    { refetchQueries: ["GetUserTrainings"], awaitRefetchQueries: true }
  );

  const handleAssign = async () => {
    if (selectionModel.length !== 1) {
      setSnackbar({
        open: true,
        message: "Selecione exatamente uma rotina.",
        severity: "error",
      });
      return;
    }
    try {
      const routineId = selectionModel[0];
      const { data } = await assignRoutine({
        variables: { userId, routineId },
      });
      setSnackbar({
        open: true,
        message: data.assignTrainingRoutineToUser.message,
        severity: "success",
      });
      handleClose();
    } catch (err: any) {
      setSnackbar({
        open: true,
        message: "Erro ao associar rotina: " + err.message,
        severity: "error",
      });
    }
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "name", headerName: "Nome", flex: 1 },
    { field: "description", headerName: "Descrição", flex: 2 },
    {
      field: "isActive",
      headerName: "Ativa?",
      width: 100,
      renderCell: (params) => (params.value ? "✔️" : "❌"),
    },
  ];

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        component="form"
        sx={{
          position: "absolute" as const,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          height: 500,
          bgcolor: colors.primary[500],
          p: 3,
          borderRadius: 2,
          border: `2px solid ${colors.blueAccent[600]}`,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h6" color={colors.grey[100]} mb={2}>
          Selecionar rotina para o aluno
        </Typography>

        <Box flex={1} sx={{ mb: 2 }}>
          <DataGrid
            rows={routines}
            columns={columns}
            disableColumnResize={true}
            getRowId={(row) => row.id}
            checkboxSelection
            rowSelectionModel={selectionModel}
            onRowSelectionModelChange={(newModel) =>
              setSelectionModel(newModel)
            }
            loading={loadingRoutines}
            sx={{
              "& .MuiDataGrid-columnHeader": {
                backgroundColor: colors.blueAccent[700],
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400],
              },
            }}
          />
        </Box>

        <Box display="flex" gap={2} justifyContent="flex-end">
          <Button
            variant="outlined"
            onClick={handleClose}
            sx={{ color: colors.grey[100], borderColor: colors.grey[100] }}
            disabled={assigning}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={handleAssign}
            sx={{
              backgroundColor: colors.greenAccent[600],
              "&:hover": { backgroundColor: colors.greenAccent[500] },
            }}
            disabled={assigning}
          >
            {assigning ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Associar"
            )}
          </Button>
        </Box>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
        </Snackbar>
      </Box>
    </Modal>
  );
};

export default SelectRoutineModal;
