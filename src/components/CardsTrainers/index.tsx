import { Box, Typography, Paper , useTheme} from "@mui/material";
import IconContato from "../IconContato";
import { tokens } from "../../tema";

interface CardHomeProps {
  imagem: string;
  titulo: string;
  descricao: string;
}

const CardsTraineres = ({ imagem, titulo, descricao }: CardHomeProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Paper
      sx={{
        width: "390px",
        height: "520px",
        padding: "30px 5px",
        borderRadius: "20px",
        textAlign: "center",
        backgroundColor: "#fff",
        boxShadow: "0px 4px 60px rgba(177, 177, 177, 0.973)",
        transition: "box-shadow 0.4s ease",
        "&:hover": {
          boxShadow: `0px 4px 60px ${colors.blueAccent[500]}`,
          transform: "scale(1.02)",
          transition: "transform 600ms",
        },
      }}
    >
      <Box
        component="img"
        src={imagem}
        alt={titulo}
        sx={{
          width: "80%",
          borderRadius: "20px",
          objectFit: "cover",
        }}
      />
      <Typography
        variant="h4"
        sx={{
          fontWeight: 600,
          fontSize: "1.9em",
          color:colors.primary[600],
        }}
      >
        {titulo}
      </Typography>
      <Typography sx={{ fontSize: "1.3em", color:colors.primary[500] }}>
        {descricao}
      </Typography>
      <Box>
        <IconContato />
      </Box>
    </Paper>
  );
};

export default CardsTraineres;
