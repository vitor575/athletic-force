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
import { tokens } from "../../../tema";
import AddIcon from "@mui/icons-material/Add";
import { useExercisesData } from "../../../services/querrys/useExercisesData";
import ModalExercise from "./ModalExercise";
import { useMutation } from "@apollo/client";
import { DELETE_EXERCISE } from "../../../services/mutations/exerciseMutations"; 
import { EXERCISE_QUERY } from "../../../services/querrys/useExercisesData";

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

  const [deleteExercise, { loading: deleting }] = useMutation(DELETE_EXERCISE, {
    refetchQueries: [{ query: EXERCISE_QUERY }],
    awaitRefetchQueries: true,
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleDelete = async (id: string) => {
    try{
        await deleteExercise({variables: { id }});
        setSnackbarMessage("Exercício excluído com sucesso !");
        setOpenSnackbar(true);
    } catch (e) {
      console.log(e);
      setSnackbarMessage("Erro ao excluir exercício.");
      setOpenSnackbar(true);
    }
    
  }

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
        <Box display="flex" gap={1} mt={1}>
          <Button
            sx={{
              backgroundColor: colors.greenAccent[600],
              color: colors.grey[100],
            }}
            variant="contained"
            onClick={() => handleOpenModalForEdit(params.row)}
          >
            <Typography ml="5px">Editar</Typography>
          </Button>
          <Button
            disabled={deleting}
            onClick={() => handleDelete(params.row.id)}
            sx={{ backgroundColor: colors.redAccent[600], color: "#fff" }}
          >
            Excluir
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: theme.zIndex.drawer + 1 }}
        open={loading || deleting}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Typography variant="h3" fontSize="32px" m="0 0 0 10px">
        Exercícios
      </Typography>
      <Typography
        variant="h4"
        fontSize="16px"
        m="10px 0 0 10px"
        color={colors.greenAccent[500]}
      >
        Todos exercícios cadastrados até o momento.
      </Typography>

      <Box
        m="10px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { border: "none" },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400 ],
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
          disableColumnResize={true}
          slots={{ toolbar: CustomToolbar }}
        />
      </Box>

      <ModalExercise
        open={openModal}
        handleClose={() => {
          refetch();
          handleCloseModal();
        }}
        exercise={selectedExercise}
      />
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
  );
};

export default DashboardExercises;
