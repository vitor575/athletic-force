import React, { useState } from "react";
import { Box, Button, Typography, useTheme, Backdrop, CircularProgress } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { tokens } from "../../../tema";
import FitnessCenterOutlinedIcon from "@mui/icons-material/FitnessCenterOutlined";
import AddIcon from "@mui/icons-material/Add";
import { useExercisesData } from "../../../services/querrys/useExercisesData";
import ModalExercise from "./ModalExercise";

const DashboardExercises: React.FC = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { data, loading, refetch } = useExercisesData();
  const exercicios = data?.getAllExercises || [];

  const [openModal, setOpenModal] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<any>(null);
  

  const handleOpenModalForCreate = () => {
    setSelectedExercise(null);
    setOpenModal(true);
  };

  const handleOpenModalForEdit = (exercise: any) => {
    setSelectedExercise(exercise);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedExercise(null);
  };

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
        Adicionar Exercício
      </Button>
    </Box>
  );

  const colunas: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Nome", flex: 1 },
    { field: "muscleGroup", headerName: "Grupo Muscular", flex: 1 },
    {
      field: "gerenciar",
      headerName: "Gerenciar",
      flex: 1,
      renderCell: (params: any) => (
        <Button
          sx={{
            backgroundColor: colors.greenAccent[600],
            color: colors.grey[100],
          }}
          variant="contained"
          onClick={() => handleOpenModalForEdit(params.row)}
        >
          <FitnessCenterOutlinedIcon />
          <Typography ml="5px">Editar</Typography>
        </Button>
      ),
    },
  ];

  return (
    <Box m="10px">
      <Backdrop sx={{ color: "#fff", zIndex: theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Typography variant="h3" fontSize="32px" m="0 0 0 10px">
        Exercícios
      </Typography>
      <Typography variant="h4" fontSize="16px" m="10px 0 0 10px" color={colors.greenAccent[500]}>
        Todos exercícios cadastrados até o momento.
      </Typography>

      <Box m="10px 0 0 0" height="75vh" sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { border: "none" },
          "& .MuiDataGrid-columnHeader": { backgroundColor: colors.blueAccent[700], borderBottom: "none" },
          "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400] },
          "& .MuiDataGrid-footerContainer": { borderTop: "none", backgroundColor: colors.blueAccent[700] },
        }}>
        <DataGrid rows={exercicios} columns={colunas} slots={{ toolbar: CustomToolbar }} />
      </Box>

      <ModalExercise
        open={openModal}
        handleClose={() => {
          refetch();
          handleCloseModal();
        }}
        exercise={selectedExercise} 
      />
    </Box>
  );
};

export default DashboardExercises;
