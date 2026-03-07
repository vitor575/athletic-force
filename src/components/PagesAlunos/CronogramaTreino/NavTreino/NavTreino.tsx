import { useState, useRef, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  IconButton,
  Typography,
  useTheme,
  Drawer,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  FaDumbbell,
  FaCalendarAlt,
  FaClock,
  FaSignOutAlt,
} from "react-icons/fa";
import { useClientPerfil } from "../../../../services/querrys/useClientPerfil";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import Cookies from "js-cookie";
import { tokens } from "../../../../tema";
import Logo from "../../../../img/logo3.png";

interface TreinoNavProps {
  setSelectedSection: (section: string) => void;
  setIsCollapsed: (value: boolean) => void;
  isCollapsed: boolean;
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
}

const TreinoNav = ({
  setSelectedSection,
  setIsCollapsed,
  isCollapsed,
  mobileOpen = false,
  setMobileOpen,
}: TreinoNavProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState("treinos");
  const [isTraining, setIsTraining] = useState(false);
  const [time, setTime] = useState(0);
  const intervalRef = useRef<any>(null);
  const { client } = useClientPerfil();
  const navigate = useNavigate();
  const alunoProfileImage = "https://github.com/MaxMLira.png";

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/");
  };

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
          if (setMobileOpen) setMobileOpen(false);
        }}
        sx={{
          color: "#fff",
          justifyContent: isCollapsed ? "center" : "flex-start",
          px: isCollapsed ? 0 : 2,
          borderRadius: "12px",
          mx: isCollapsed ? 0.5 : 1,
          mb: 0.5,
          minHeight: 48,
          backgroundColor:
            selected === key ? `${colors.blueAccent[400]}44` : "transparent",
          border:
            selected === key
              ? `1px solid ${colors.blueAccent[400]}`
              : "1px solid transparent",
          "&:hover": {
            backgroundColor: colors.primary[600],
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: isCollapsed ? "100%" : "auto",
          }}
        >
          {icon}
        </Box>
        {!isCollapsed && (
          <ListItemText
            primary={label}
            sx={{ ml: 2 }}
            slotProps={{ primary: { fontWeight: "900", fontSize: "0.9rem" } }}
          />
        )}
      </ListItemButton>
    </ListItem>
  );

  const drawerContent = (
    <Box
      sx={{
        width: isCollapsed ? "80px" : "280px",
        minHeight: mobileOpen ? "100%" : "100vh",
        bgcolor: colors.primary[500],
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: 0,
        transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        borderRight: `1px solid ${colors.primary[600]}`,
        p: 1,
      }}
    >
      <Box sx={{ flex: 1 }}>
        {/* Header / Logo */}
        <Box
          sx={{
            display: "flex",
            justifyContent: isCollapsed ? "center" : "space-between",
            alignItems: "center",
            p: 2,
            mb: 2,
            minHeight: "60px",
          }}
        >
          {!isCollapsed && (
            <Box
              component="img"
              src={Logo}
              sx={{ width: "45px", objectFit: "contain", border: `1px solid ${colors.blueAccent[400]}`, borderRadius: "4px" }}
            />
          )}
          {!mobileOpen && (
            <IconButton
              onClick={() => setIsCollapsed(!isCollapsed)}
              sx={{ color: "#fff", display: { xs: "none", md: "flex" } }}
            >
              <MenuOutlinedIcon />
            </IconButton>
          )}
        </Box>

        {/* Navigation List */}
        <List
          sx={{ px: 1, gap: 0.5, display: "flex", flexDirection: "column" }}
        >
          {renderItem("treinos", <FaDumbbell size={18} />, "Treinos")}
          {renderItem("calendario", <FaCalendarAlt size={18} />, "Calendário")}
          {renderItem(
            "configuracoes",
            <SettingsIcon sx={{ fontSize: 18 }} />,
            "Configurações",
          )}

          <ListItem disablePadding>
            <ListItemButton
              onClick={toggleTraining}
              sx={{
                color: "#fff",
                borderRadius: "12px",
                justifyContent: isCollapsed ? "center" : "flex-start",
                py: 1.5,
                px: isCollapsed ? 0 : 2,
                mx: isCollapsed ? 0.5 : 1,
                backgroundColor: isTraining
                  ? colors.blueAccent[400]
                  : "transparent",
                border: isTraining
                  ? "none"
                  : `1px dashed ${colors.primary[400]}`,
                "&:hover": {
                  bgcolor: isTraining
                    ? colors.blueAccent[500]
                    : colors.primary[600],
                },
                boxShadow: isTraining
                  ? `0 4px 15px ${colors.blueAccent[400]}66`
                  : "none",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: isCollapsed ? "100%" : "auto",
                }}
              >
                <FaClock size={18} />
              </Box>
              {!isCollapsed && (
                <ListItemText
                  primary={
                    <Typography
                      sx={{
                        fontWeight: "900",
                        ml: 2,
                        fontSize: "0.95rem",
                        color: "#fff",
                      }}
                    >
                      {isTraining ? "Parar" : "Iniciar"} ({formatTime(time)})
                    </Typography>
                  }
                />
              )}
            </ListItemButton>
          </ListItem>
        </List>
      </Box>

      <Box sx={{ p: 2, borderTop: `1px solid ${colors.primary[600]}` }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: isCollapsed ? "center" : "space-between",
            gap: 1.5,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <img
              alt="profile"
              src={alunoProfileImage}
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                objectFit: "cover",
                border: `2px solid ${colors.blueAccent[500]}`,
              }}
            />
            {!isCollapsed && (
              <Box>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: "800",
                    color: "#fff",
                    fontSize: "0.8rem",
                  }}
                >
                  {client?.name?.split(" ")[0]}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: colors.blueAccent[900], fontSize: "0.7rem" }}
                >
                  Aluno
                </Typography>
              </Box>
            )}
          </Box>

          {!isCollapsed && (
            <IconButton
              onClick={handleLogout}
              sx={{
                color: colors.blueAccent[200],
                "&:hover": { color: colors.redAccent[400] },
              }}
            >
              <FaSignOutAlt size={16} />
            </IconButton>
          )}
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen?.(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 280,
            border: "none",
          },
        }}
      >
        {drawerContent}
      </Drawer>

      <Box
        sx={{
          display: { xs: "none", md: "block" },
          width: isCollapsed ? "80px" : "280px",
          transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {drawerContent}
      </Box>
    </>
  );
};

export default TreinoNav;
