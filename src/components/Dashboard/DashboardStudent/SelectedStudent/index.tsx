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
import { tokens } from "../../../../tema";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate, useParams } from "react-router-dom";
import { useStudentTrainings } from "../../../../services/querrys/useStudentData";
import SelectRoutineModal from "./SelectRoutineModal";

const SelectedStudent: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { id: userId } = useParams<{ id: string }>();

  const { user, routines, loading, error, refetch } = useStudentTrainings(
    userId!
  );

  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 80, resizable: false },
    { field: "name", headerName: "Treino", flex: 1, resizable: false },
    {
      field: "description",
      headerName: "Descrição",
      flex: 2,
      resizable: false,
    },
    {
      field: "actions",
      headerName: "Ações",
      flex: 1,
      renderCell: (params: any) => (
        <Button
          variant="contained"
          sx={{
            backgroundColor: colors.blueAccent[600],
            "&:hover": { backgroundColor: colors.blueAccent[700] },
          }}
          onClick={() =>
            navigate(`/EmpregadoDashboard/treinos/${params.row.id}`)
          }
        >
          Ver detalhes
        </Button>
      ),
    },
  ];

  if (error) return <Typography>Erro: {error.message}</Typography>;

  return (
    <Box m="10px">
      <Backdrop
        sx={{ color: "#fff", zIndex: theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Typography variant="h3" fontSize="32px" m="0 0 0 10px" mb={1}>
        Aluno: {user?.name}
      </Typography>
      <Typography
        variant="h4"
        fontSize="16px"
        m="10px 0 10px 10px"
        color={colors.greenAccent[500]}
      >
        Treinos associados
      </Typography>

      <Box mb={3}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenModal}
          sx={{
            backgroundColor: colors.greenAccent[600],
            "&:hover": { backgroundColor: colors.greenAccent[500] },
          }}
        >
          Associar rotina
        </Button>
      </Box>

      {!loading && routines.length === 0 ? (
        <Typography
          variant="body1"
          sx={{ color: colors.grey[300], textAlign: "center", mt: 4 }}
        >
          Associe rotinas para este estudante.
        </Typography>
      ) : (
        <Box height="60vh">
          <DataGrid
            rows={routines}
            columns={columns}
            disableColumnResize={true}
            getRowId={(row) => row.id}
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
      )}

      <SelectRoutineModal
        open={openModal}
        userId={userId!}
        handleClose={() => {
          handleCloseModal();
          refetch();
        }}
      />
    </Box>
  );
};

export default SelectedStudent;
