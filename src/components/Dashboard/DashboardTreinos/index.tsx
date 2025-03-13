import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { tokens } from "../../../tema";
import FitnessCenterOutlinedIcon from "@mui/icons-material/FitnessCenterOutlined";
import { useNavigate, useParams } from "react-router-dom";
import { useStudentData } from "../../../services/GetData/useStudentData";

interface TrainingData {
  treino: string;
  description: string;
  exercises: any[];
  id: string;
}

const DashboardAlunos: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading } = useStudentData();
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

 
  const student = data?.findAllUsers.find((user: any) => user.id === id);

 
  const trainings: TrainingData[] =
    student?.trainings?.map((training: any) => ({
      id: training.Id,
      treino: training.name,
      description: training.description,
      exercises: training.exercises,
    })) || [];

  const colunas: GridColDef[] = [
    {
      field: "treino",
      headerName: "Treino",
      flex: 1,
      valueGetter: (params: any) => params.row.treino,
    },
    {
      field: "description",
      headerName: "Descrição",
      flex: 1,
      valueGetter: (params: any) => params.row.description,
    },
    {
      field: "acoes",
      headerName: "Ações",
      flex: 1,
      renderCell: (params: any) => (
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
          >
            <FitnessCenterOutlinedIcon />
            <Typography m="0 0 0 5px">Editar</Typography>
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
      ),
    },
  ];

  return (
    <Box m="20px">
      {loading && <p>Carregando...</p>}
      <Typography variant="h3" fontSize="32px" ml="10px">
        TREINOS
      </Typography>
      <Typography variant="h4" fontSize="16px" ml="10px" mt="5px" color={colors.greenAccent[500]}>
        Treinos de {student ? student.name : "Aluno"}
      </Typography>
      <Button
        sx={{
          backgroundColor: colors.blueAccent[700],
          color: colors.grey[100],
          m: "5px 0 0 10px",
        }}
        onClick={() => navigate(-1)}
      >
        Voltar
      </Button>

      <Box
        m="20px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { border: "none" },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400] },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiDataGrid-row:hover .actionButtons": { opacity: 1 },
          ".actionButtons": { opacity: 0, transition: "opacity 0.3s ease-in-out" },
        }}
      >
        {trainings.length === 0 ? (
          <Typography variant="h6" color={colors.grey[600]}>
            Nenhum treino encontrado.
          </Typography>
        ) : (
          <DataGrid rows={trainings} columns={colunas} />
        )}
      </Box>
    </Box>
  );
};

export default DashboardAlunos;
