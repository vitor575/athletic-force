import { useState, useRef, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Box,
  IconButton,
  Typography,
  useTheme
} from "@mui/material";
import { Link } from "react-router-dom";
import { FaDumbbell, FaCalendarAlt, FaClock, FaSignOutAlt } from "react-icons/fa";
import { useClientPerfil } from "../../../../services/querrys/useClientPerfil";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { tokens } from "../../../../tema";
import Logo from "../../../../img/logo3.png"; // Seu logo, já está aqui

interface TreinoNavProps {
  setSelectedSection: (section: string) => void;
  setIsCollapsed: (value: boolean) => void;
  isCollapsed: boolean;
}

const TreinoNav = ({ setSelectedSection, setIsCollapsed, isCollapsed }: TreinoNavProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState("cronograma");
  const [isTraining, setIsTraining] = useState(false);
  const [time, setTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { client } = useClientPerfil();
  const alunoProfileImage = "https://github.com/MaxMLira.png"; // Exemplo de URL de imagem de perfil

  const startTraining = () => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => setTime((t) => t + 1), 1000);
      setIsTraining(true);
    }
  };

  const stopTraining = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setIsTraining(false);
    }
  };

  const toggleTraining = () => (isTraining ? stopTraining() : startTraining());

  const formatTime = (t: number) => {
    const h = String(Math.floor(t / 3600)).padStart(2, "0");
    const m = String(Math.floor((t % 3600) / 60)).padStart(2, "0");
    const s = String(t % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const renderItem = (key: string, icon: React.ReactNode, label: string) => (
    <ListItem disablePadding key={key}>
      <ListItemButton
        selected={selected === key}
        onClick={() => {
          setSelected(key);
          setSelectedSection(key);
        }}
        sx={{
          color: "#fff",
          justifyContent: isCollapsed ? "center" : "flex-start",
          px: 2,
          backgroundColor: selected === key ? colors.primary[500] : "transparent",
          "&:hover": {
            backgroundColor: colors.primary[500],
          },
        }}
      >
        {icon}
        {!isCollapsed && <ListItemText primary={label} sx={{ ml: 2 }} />}
      </ListItemButton>
    </ListItem>
  );

  return (
    <Paper
      sx={{
        width: isCollapsed ? "80px" : "280px",
        minHeight: "100vh",
        bgcolor: colors.primary[300],
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: 0,
        transition: "width 0.3s ease",
        boxShadow: "none",
      }}
    >
      <Box p={2}>
        {/* Cabeçalho superior: Logo e botão de colapsar */}
        <Box
          display="flex"
          justifyContent={isCollapsed ? "center" : "space-between"}
          alignItems="center"
          mb={3}
        >
          {!isCollapsed && <Box component="img" src={Logo} sx={{ width: "40px" }} />}
          <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
            <MenuOutlinedIcon sx={{ color: "#fff" }} />
          </IconButton>
        </Box>

        {!isCollapsed && (
          <Box mb="25px" textAlign="center">
            <Box display="flex" justifyContent="center" alignItems="center" mb={1}>
              <img
                alt="profile-user"
                width="150px" 
                height="150px"
                src={alunoProfileImage}
                style={{ cursor: "pointer", borderRadius: "50%", objectFit: "cover" }}
              />
            </Box>
            <Typography sx={{color:colors.greenAccent[500]}}>
              Aluno
            </Typography>
            <Typography
              variant="h4" // Ajustei a variante para Aluno: Vitor
              color={colors.grey[900]}
              fontWeight="bold"
            >
               {client?.name}
            </Typography>
          </Box>
        )}

        <List sx={{ gap: 1, display: "flex", flexDirection: "column" }}>
          {renderItem("cronograma", <FaDumbbell size={20} />, "Treinos")}
          {renderItem("calendario", <FaCalendarAlt size={20} />, "Calendário")}
          <ListItem disablePadding>
            <ListItemButton
              onClick={toggleTraining}
              sx={{
                color: "#fff",
                justifyContent: isCollapsed ? "center" : "flex-start",
                px: 2,
                backgroundColor: isTraining ? colors.greenAccent[600] : "transparent",
                "&:hover": {
                  backgroundColor: colors.greenAccent[500],
                },
              }}
            >
              <FaClock />
              {!isCollapsed && (
                <ListItemText
                  primary={
                    <Typography>
                      {isTraining ? "Parar Treino" : "Iniciar Treino"} ({formatTime(time)})
                    </Typography>
                  }
                  sx={{ ml: 2 }}
                />
              )}
            </ListItemButton>
          </ListItem>
        </List>
      </Box>

      <Box>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/clientHome" // Ou sua rota de logout
            sx={{
              color: "#fff",
              justifyContent: "center",
              height: "70px",
            }}
          >
            <FaSignOutAlt style={{ marginRight: isCollapsed ? 0 : 8 }} />
            {!isCollapsed && "Voltar"}
          </ListItemButton>
        </ListItem>
      </Box>
    </Paper>
  );
};

export default TreinoNav;