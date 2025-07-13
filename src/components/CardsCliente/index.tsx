
import { Link } from "react-router-dom";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../tema";

interface CardProps {
  titulo: string;
  imagem: string;
  destino: string;
}

const cardStyle = { width: "180px", height: "auto" };

const CardCliente = ({ titulo, imagem, destino }: CardProps) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

  return (
    <Box
      sx={{
        bgcolor: colors.primary[600],
        width: "350px",
        height: "450px",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "2rem 1rem",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        border: `3px solid ${colors.blueAccent[500]}`,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "scale(0.95)",
          boxShadow: `0 0px 36px ${colors.blueAccent[300]}`,
        },
      }}
    >
      <Box>
        <Box component="img" sx={cardStyle} src={imagem} alt={titulo} />
      </Box>
      <Box textAlign="center">
        <Typography color={colors.grey[900]} fontWeight="bold" variant="h5">
          {titulo}
        </Typography>
      </Box>  
      <Box>
        <Link
          style={{
            backgroundColor: colors.blueAccent[400],
            color: colors.grey[900],
            padding: "0.7rem 2rem",
            borderRadius: "10px",
            textDecoration: "none",
            transition: "background-color 0.3s ease, transform 0.2s ease",
            fontFamily: 'Roboto',
            fontWeight: 'bold'
          }}
          to={destino}
        >
          ACESSAR
        </Link>
      </Box>
    </Box>
  );
};

export default CardCliente;
