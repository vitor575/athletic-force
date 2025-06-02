import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  useTheme,
  Backdrop,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import { tokens } from "../../../tema";
import { useRoutinesData } from "../../../services/querrys/useRoutinesData";
import ModalRoutines from "./ModalRoutines";
import { useMutation } from "@apollo/client";
import { DEACTIVATE_ROUTINE } from "../../../services/mutations/routineMutations";
import { ROUTINES_QUERY } from "../../../services/querrys/useRoutinesData";

const DashboardRoutines: React.FC = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { routines, loading, refetch } = useRoutinesData();

  const [openModal, setOpenModal] = useState(false);
  const [selectedRoutine, setSelectedRoutine] = useState<any>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  const [deactivateRoutine, { loading: toggling }] = useMutation(
    DEACTIVATE_ROUTINE,
    {
      refetchQueries: [{ query: ROUTINES_QUERY }],
      awaitRefetchQueries: true,
    }
  );

  const handleOpenModalForCreate = () => {
    setSelectedRoutine(null);
    setOpenModal(true);
  };

  const handleOpenModalForEdit = (routine: any) => {
    setSelectedRoutine(routine);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedRoutine(null);
  };

  const handleRoutineSaved = () => {
    refetch();
  };

  const handleToggleActive = async (id: string, currentlyActive: boolean) => {
    try {
      const { data } = await deactivateRoutine({
        variables: { id, isActive: !currentlyActive },
      });
      setSnackbar({
        open: true,
        message: data.deactivatedRoutine.message,
        severity: "success",
      });
    } catch (err: any) {
      setSnackbar({
        open: true,
        message: "Erro ao alterar status: " + err.message,
        severity: "error",
      });
    }
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Nome", flex: 1 },
    { field: "description", headerName: "Descrição", flex: 1 },
    {
      field: "isActive",
      headerName: "Ativa?",
      width: 100,
      renderCell: (params: any) => (params.value ? "✔️" : "❌"),
    },
    {
      field: "actions",
      headerName: "Gerenciar",
      flex: 1,
      renderCell: (params: any) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            width: "100%",
            height: "100%",
          }}
        >
          <Button
            variant="contained"
            size="small"
            onClick={() =>
              handleToggleActive(params.row.id, params.row.isActive)
            }
            sx={{
              backgroundColor: params.row.isActive
                ? colors.redAccent[600]
                : colors.greenAccent[600],
              "&:hover": {
                backgroundColor: params.row.isActive
                  ? colors.redAccent[700]
                  : colors.greenAccent[700],
              },
            }}
          >
            {params.row.isActive ? "Desativar" : "Ativar"}
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => handleOpenModalForEdit(params.row)}
            sx={{
              backgroundColor: colors.blueAccent[600],
              "&:hover": { backgroundColor: colors.blueAccent[700] },
            }}
          >
            Editar
          </Button>
        </Box>
      ),
    },
  ];

  const CustomToolbar = () => (
    <Box sx={{ p: "10px 0" }}>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleOpenModalForCreate}
        sx={{
          width: "25%",
          backgroundColor: colors.greenAccent[600],
          "&:hover": { backgroundColor: colors.greenAccent[500] },
        }}
      >
        Adicionar Rotina
      </Button>
    </Box>
  );

  return (
    <Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: theme.zIndex.drawer + 1 }}
        open={loading || toggling}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Typography variant="h3" fontSize="32px" m="0 0 0 10px">
        Rotinas
      </Typography>
      <Typography
        variant="h4"
        fontSize="16px"
        m="10px 0 0 10px"
        color={colors.greenAccent[500]}
      >
        Todas as rotinas cadastradas até o momento.
      </Typography>

      <Box
        m="10px 0 0 0"
        height="75vh"
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
          rows={routines}
          columns={columns}
          disableColumnResize={true}
          getRowId={(row) => row.id}
          slots={{ toolbar: CustomToolbar }}
        />
      </Box>

      <ModalRoutines
        open={openModal}
        handleClose={() => {
          handleCloseModal();
          refetch();
        }}
        routine={selectedRoutine}
        onRoutineSaved={handleRoutineSaved}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DashboardRoutines;
