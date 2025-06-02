import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Typography,
  useTheme,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../tema";
import FitnessCenterOutlinedIcon from "@mui/icons-material/FitnessCenterOutlined";
import { useNavigate } from "react-router-dom";
import { useStudentData } from "../../../services/querrys/useStudentData";

const DashboardStudent = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { data, loading } = useStudentData();

  const alunos =
    data?.findAllUsers.filter((user: any) => user.role === "STUDENT") || [];

  const colunas = [
    {
      field: "id",
      headerName: "ID",
    },
    {
      field: "name",
      headerName: "Nome",
      flex: 1,
      cellClassName: "name--column--cell",
    },
    {
      field: "cellphone",
      headerName: "Numero de celular",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "treinos",
      headerName: "Treinos",
      width: 150,
      flex: 1,
      renderCell: (params: any) => {
        return (
          <Button
            sx={{
              backgroundColor: colors.greenAccent[600],
              color: colors.grey[100],
            }}
            variant="contained"
            onClick={() => {
              navigate(`/EmpregadoDashboard/treinos/${params.row.id}`);
            }}
          >
            <FitnessCenterOutlinedIcon />
            <Typography m="0 0 0 5px">Acessar</Typography>
          </Button>
        );
      },
    },
  ];

  return (
    <Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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
        m="10px 0 0 0"
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
    <DataGrid rows={alunos} columns={colunas} disableColumnResize={true} />
      </Box>
    </Box>
  );
};

export default DashboardStudent;
