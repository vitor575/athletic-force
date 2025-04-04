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
import { tokens } from "../../../tema";
import FitnessCenterOutlinedIcon from "@mui/icons-material/FitnessCenterOutlined";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { useTrainingsData } from "../../../services/querrys/useTrainingsData";

const DashboardExercises: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { data, loading } = useTrainingsData();
  
  const treinos = data || [];

  const [openAddModal, setOpenAddModal] = useState(false);

  const handleOpenAddModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

  const colunas: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Nome", flex: 1 },
    { field: "description", headerName: "Descrição", flex: 1 },
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
          onClick={() =>
            navigate(`/EmpregadoDashboard/treinos/${params.row.id}`)
          }
        >
          <FitnessCenterOutlinedIcon />
          <Typography ml="5px">Ver treinos</Typography>
        </Button>
      ),
    },
  ];

  const CustomToolbar = () => (
    <Box sx={{ p: "10px 0" }}>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleOpenAddModal}
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
    <Box m="10px">
      <Backdrop
        sx={{ color: "#fff", zIndex: theme.zIndex.drawer + 1 }}
        open={loading}
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
        Todos treinos cadastrados até o momento.
      </Typography>

      <Box m="10px 0 0 0" height="75vh" sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            border: "none",
          },
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
        }}>
        <DataGrid
          rows={treinos}
          columns={colunas}
          slots={{ toolbar: CustomToolbar }}
        />
      </Box>
    </Box>
  );
};

export default DashboardExercises;
