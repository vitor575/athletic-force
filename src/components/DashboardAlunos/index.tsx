import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../tema";
import FitnessCenterOutlinedIcon from '@mui/icons-material/FitnessCenterOutlined';
import { useNavigate } from "react-router-dom";

const DashboardAlunos = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const aluno = [
    {
      id: 1,
      nome: "vitor",
      numero: "11999999999",
      email: "vitor95340@gmail.com"
    },
    {
      id: 2,
      nome: "Carlos",
      numero: "11999999999",
      email: "vitor95340@gmail.com"
    }
  ];

  const colunas = [
    {
      field: "id",
      headerName: "ID",
    },
    {
      field: "nome",
      headerName: "Nome",
      flex: 1,
      cellClassName: "name--column--cell",
    },
    {
      field: "numero",
      headerName: "Numero de celular",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1
    },
    {
      field: "treinos",
      headerName: "Treinos",
      width: 150,
      flex: 1,
      renderCell: () => {
        return (
          <Button sx={{
            backgroundColor: colors.greenAccent[600],
             color: colors.grey[100]}}
            variant="contained"
            onClick={() => {
              navigate("/EmpregadoDashboard/Alunos/treinos")
            }}
          >
            <FitnessCenterOutlinedIcon/>
            <Typography m="0 0 0 5px">Acessar</Typography>
          </Button>
        );
      }
    }
  ];

  return (
    <Box m="20px">
      <Typography variant="h3" fontSize="32px" m="0 0 0 10px">
        ALUNOS
      </Typography>
      <Typography
        variant="h4"
        fontSize="16px"
        m="10px 0 0 10px"
        color={colors.greenAccent[500]}
      >
        Todos alunos da academia
      </Typography>
      <Box
        m="30px 0 0 0"
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
        }}
      >
        <DataGrid rows={aluno} columns={colunas} />
      </Box>
    </Box>
  );
};

export default DashboardAlunos;
