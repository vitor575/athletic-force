import { useState } from "react";
import {
  List,
  ListItem,
  useTheme,
  ListItemButton,
  ListItemText,
  Paper,
  Box,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../../tema";
import Logo from "../../../img/logo3.png";
import { FaUserCog, FaSignOutAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { GrDocumentUser } from "react-icons/gr";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

interface ConfiguracaoNavProps {
  setSelectedSection: (section: string) => void;
  setIsCollapsed: (value: boolean) => void;
  isCollapsed: boolean; // ✅ Recebido do pai agora
}

const ConfiguracaoNav = ({
  setSelectedSection,
  setIsCollapsed,
  isCollapsed,
}: ConfiguracaoNavProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState("perfil");

  const buttonStyle = {
    display: "flex",
    justifyContent: isCollapsed ? "center" : "flex-start",
    color: "#fff",
    alignItems: "center",
    px: 2,
    textAlign: "left",
  };

  const renderItem = (key: string, icon: React.ReactNode, label: string) => (
    <ListItem disablePadding sx={{ width: "100%" }} key={key}>
      <ListItemButton
        selected={selected === key}
        onClick={() => {
          setSelected(key);
          setSelectedSection(key);
        }}
        sx={{
          ...buttonStyle,
          backgroundColor: selected === key ? colors.primary[600] : "transparent",
          "&:hover": {
            backgroundColor: colors.primary[500],
          },
        }}
      >
        {icon}
        {!isCollapsed && (
          <ListItemText primary={label} sx={{ marginLeft: "20px" }} />
        )}
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
      }}
    >
      <Box p={2}>
        <Box
          display="flex"
          justifyContent={isCollapsed ? "center" : "space-between"}
          alignItems="center"
          mb={3}
        >
          {!isCollapsed && (
            <Box component="img" src={Logo} sx={{ width: "40px" }} />
          )}
          <IconButton
            onClick={() => {
              setIsCollapsed(!isCollapsed);
            }}
          >
            <MenuOutlinedIcon sx={{ color: "#fff" }} />
          </IconButton>
        </Box>

        <List
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            flex: 1,
            alignItems: "center",
          }}
        >
          {renderItem("perfil", <FaUserCog size={20} />, "Perfil")}
          {renderItem("trocarSenha", <RiLockPasswordFill size={20} />, "Trocar Senha")}
          {renderItem("verPlano", <GrDocumentUser size={20} />, "Ver Plano")}
        </List>
      </Box>

      <Box sx={{ marginTop: "auto" }}>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/clientHome"
            sx={{
              borderRadius: 2,
              display: "flex",
              justifyContent: "center",
              color: "#fff",
              alignItems: "center",
              height: "70px"
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

export default ConfiguracaoNav;
