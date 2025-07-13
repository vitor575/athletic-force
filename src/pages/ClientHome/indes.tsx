import Logo from "../../img/logo3.png";
import { FaSignOutAlt } from "react-icons/fa";
import CardCliente from "../../components/CardsCliente";
import Calendario from "../../img/calendario.png";
import Pagamento from "../../img/pagamento.png";
import Configuracao from "../../img/configuracao.png";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  useTheme,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { tokens } from "../../tema";
import { useClientData } from "../../services/querrys/useClientData";
import Cookies from "js-cookie";

const ClientHome = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const handleExit = () => {
    Cookies.remove("token");
    navigate("/");
  };

  const { client, loading } = useClientData();

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        bgcolor: colors.primary[200],
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        position: "relative",
      }}
      component="main"
    >
      {loading && (
        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          padding: "0rem 1rem",
          bgcolor: colors.primary[300],
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          borderBottom: `3px solid ${colors.blueAccent[500]}`,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.3rem",
          }}
        >
          <Box
            component="img"
            sx={{ width: "80px", marginLeft: "60px" }}
            border={`1px solid ${colors.blueAccent[500]}`}
            src={Logo}
            alt="Logo"
          />
        </Box>
        <Box
          sx={{
            width: "70%",
            height: "20%",
            display: "flex",
            alignItems: "center",
            gap: "2rem",
            padding: "2rem",
            background: colors.primary[600],
            border: `3px solid ${colors.blueAccent[500]}`,
            borderRadius: "20px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            position: "relative",
            color: colors.grey[900],
          }}
        >
          <Box fontWeight="bold">
            <Typography variant="h3" component="h2" sx={{ fontSize: "1.6em" }}>
              Seja bem-vindo, {client?.me?.name}
            </Typography>
            <Button
              sx={{
                bgcolor: colors.blueAccent[500],
                color: "white",
                padding: "0.1rem 2rem",
                fontSize: "1.6rem",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                transition: "background-color 0.3s ease, transform 0.2s ease",
                position: "absolute",
                top: "8px",
                right: "1rem",
                "&:hover": {
                  bgcolor: colors.blueAccent[400],
                  transform: "scale(0.9)",
                },
              }}
              onClick={handleExit}
            >
              <FaSignOutAlt />
              Sair
            </Button>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "3rem",
          margin: "0rem 4rem",
          flexWrap: "wrap",
        }}
        className="cards-container"
      >
        <CardCliente
          titulo="Cronograma de treinos"
          imagem={Calendario}
          destino="/clientHome/cronograma/"
        />
        <CardCliente
          titulo="Central de faturas"
          imagem={Pagamento}
          destino="/clientHome/pagamentos"
        />
        <CardCliente
          titulo="Configuração da conta"
          imagem={Configuracao}
          destino="/clientHome/configuration"
        />
      </Box>
    </Box>
  );
};

export default ClientHome;
