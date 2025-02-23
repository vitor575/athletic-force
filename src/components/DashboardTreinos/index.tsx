import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../tema";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ModalComponent from "../Modal";

interface TrainingData {
  treino: string;
  repeticoes: string;
  carga: string;
}

const DashboardAlunos: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const [trainingData, setTrainingData] = useState<TrainingData>({
    treino: "Supino",
    repeticoes: "10x",
    carga: "60kg",
  });

  const handleOpenModal = (): void => {
    setModalOpen(true);
  };

  const handleCloseModal = (): void => {
    setModalOpen(false);
  };

  const handleSave = (data: TrainingData): void => {
    setTrainingData(data);
    handleCloseModal();
  };

  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const treinos = [
    {
      id: 1,
      treino: "Supino",
      repetições: "10x3",
      carga: "30kg",
    },
    {
      id: 2,
      treino: "Agachamento",
      repetições: "10x3",
      carga: "30kg",
    },
  ];

  const colunas = [
    {
      field: "treino",
      headerName: "Treino",
      flex: 1,
    },
    {
      field: "repetições",
      headerName: "Repetições",
      flex: 1,
    },
    {
      field: "carga",
      headerName: "Carga",
      flex: 1,
    },
    {
      field: "opções",
      headerName: "Ações",
      flex: 1,
      renderCell: () => {
        return (
          <Box
            className="actionButtons"
            display="flex"
            alignItems="center"
            height="100%"
            gap="5px"
          >
            <Button
              sx={{
                backgroundColor: colors.greenAccent[600],
                color: colors.grey[100],
                marginRight: "5px",
              }}
              variant="contained"
              onClick={handleOpenModal}
            >
              Editar
            </Button>
            <Button
              sx={{
                backgroundColor: colors.redAccent[600],
                color: colors.grey[100],
              }}
              variant="contained"
            >
              Excluir
            </Button>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Typography variant="h3" fontSize="32px" m="0 0 0 10px">
        TREINOS
      </Typography>
      <Typography
        variant="h4"
        fontSize="16px"
        m="5px 0 0 10px"
        color={colors.greenAccent[500]}
      >
        Treinos de fulano
      </Typography>
      <Button
        sx={{
          backgroundColor: colors.blueAccent[700],
          color: colors.grey[100],
          margin: "5px 0 0 10px",
        }}
        onClick={() => navigate(-1)}
      >
        Voltar
      </Button>
      <ModalComponent
        open={modalOpen}
        handleClose={handleCloseModal}
        initialData={trainingData}
        onSave={handleSave}
      />
      <Box
        m="20px 0 0 0"
        height="75vh"
        sx={{
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
          "& .MuiDataGrid-row:hover .actionButtons": {
            opacity: 1,
          },
          ".actionButtons": {
            opacity: 0,
            transition: "opacity 0.3s ease-in-out",
          },
        }}
      >
        <DataGrid rows={treinos} columns={colunas} />
      </Box>
    </Box>
  );
};

export default DashboardAlunos;
