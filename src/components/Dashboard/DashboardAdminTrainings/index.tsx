import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  useTheme,
  Backdrop,
  CircularProgress,
  Alert,
  Snackbar,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { tokens } from "../../../tema";
import AddIcon from "@mui/icons-material/Add";
import {
  GET_ALL_TRAININGS,
  useTrainingsData,
} from "../../../services/querrys/useTrainingsData";
import ModalTrainings from "./ModalTrainings";
import { DELETE_TRAINING } from "../../../services/mutations/trainingMutations";
import { useMutation } from "@apollo/client";

const DashboardExercises: React.FC = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { data, loading, refetch } = useTrainingsData();
  const treinos = data?.getAllTrainings || [];

  const [openModal, setOpenModal] = useState(false);
  const [selectedTraining, setSelectedTraining] = useState<any>(null);

  const [deleteTraining, { loading: deleting }] = useMutation(DELETE_TRAINING, {
    refetchQueries: [{ query: GET_ALL_TRAININGS }],
    awaitRefetchQueries: true,
  });

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    msg: string;
    sev: "success" | "error";
  }>({
    open: false,
    msg: "",
    sev: "success",
  });

  const handleOpenModalForCreate = () => {
    setSelectedTraining(null);
    setOpenModal(true);
  };

  const handleOpenModalForEdit = (training: any) => {
    setSelectedTraining(training);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedTraining(null);
  };

  const handleTrainingCreated = () => {
    refetch();
  };

  const handleDelete = async (id: string) => {
    try {
      const { data } = await deleteTraining({ variables: { id } });
      setSnackbar({
        open: true,
        msg: data.deleteTraining.message,
        sev: "success",
      });
    } catch (err: any) {
      setSnackbar({ open: true, msg: "Erro ao excluir treino.", sev: "error" });
    }
  };

  const colunas: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Nome", flex: 1 },
    { field: "description", headerName: "Descrição", flex: 1 },
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
            variant="contained"
            sx={{ backgroundColor: colors.redAccent[600], color: "#fff" }}
            onClick={() => handleDelete(params.row.id)}
          >
            Excluir
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
          color: colors.grey[100],
          "&:hover": { backgroundColor: colors.greenAccent[500] },
        }}
      >
        Adicionar treino
      </Button>
    </Box>
  );

  return (
    <Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: theme.zIndex.drawer + 1 }}
        open={loading || deleting}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Typography variant="h3" fontSize="32px" m="0 0 0 10px">
        Treinos
      </Typography>
      <Typography
        variant="h4"
        fontSize="16px"
        m="10px 0 0 10px"
        color={colors.greenAccent[500]}
      >
        Todos os treinos cadastrados até o momento.
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
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
        }}
      >
        <DataGrid
          rows={treinos}
          columns={colunas}
          disableColumnResize={true}
          slots={{ toolbar: CustomToolbar }}
        />
      </Box>

      <ModalTrainings
        open={openModal}
        handleClose={() => {
          handleCloseModal();
          refetch();
        }}
        onTrainingCreated={handleTrainingCreated}
        training={selectedTraining}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={snackbar.sev} sx={{ width: "100%" }}>
          {snackbar.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DashboardExercises;
