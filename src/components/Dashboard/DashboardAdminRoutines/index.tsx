// src/components/DashboardRoutines/DashboardRoutines.tsx
import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  useTheme,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import { tokens } from "../../../tema";
import { useRoutinesData } from "../../../services/querrys/useRoutinesData";
import ModalRoutines from "./ModalRoutines";

const DashboardRoutines: React.FC = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // hook que busca todas as rotinas
  const { routines, loading, refetch } = useRoutinesData();

  // estados para controlar modal e rotina selecionada
  const [openModal, setOpenModal] = useState(false);
  const [selectedRoutine, setSelectedRoutine] = useState<any>(null);

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

  // colunas idênticas ao estilo do Dashboard de Treinos
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
        <Button
          variant="contained"
          sx={{
            backgroundColor: colors.greenAccent[600],
            color: colors.grey[100],
            "&:hover": { backgroundColor: colors.greenAccent[500] },
          }}
          onClick={() => handleOpenModalForEdit(params.row)}
        >
          Editar
        </Button>
      ),
    },
  ];

  // toolbar com botão "Adicionar Rotina"
  const CustomToolbar = () => (
    <Box sx={{ p: "10px 0" }}>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleOpenModalForCreate}
        sx={{
          width: "25%",
          backgroundColor: colors.greenAccent[600],
          color: colors.grey[100],
          "&:hover": { backgroundColor: colors.greenAccent[500] },
        }}
      >
        Adicionar Rotina
      </Button>
    </Box>
  );

  return (
    <Box m="10px">
      <Backdrop
        sx={{ color: "#fff", zIndex: theme.zIndex.drawer + 1 }}
        open={loading}
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
    </Box>
  );
};

export default DashboardRoutines;
