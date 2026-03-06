import {
  Box,
  useTheme,
  Fab,
  Modal,
  Typography,
  Paper,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { tokens } from "../../tema";
import NavTreino from "./CronogramaTreino/NavTreino/NavTreino";
import Treinos from "./CronogramaTreino/Treinos/Treinos";
import Calendario from "./CronogramaTreino/Calendario/Calendario";
import { BsJournalCheck } from "react-icons/bs";

const ConfigClientPage = () => {
  const [selectedSection, setSelectedSection] = useState("treinos");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isActiveSession, setIsActiveSession] = useState(false);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const renderContent = () => {
    switch (selectedSection) {
      case "treinos":
        return <Treinos onSessionStateChange={setIsActiveSession} />;
      case "calendario":
        return <Calendario />;
      default:
        return <Treinos />;
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{
        bgcolor: colors.primary[500],
        height: "100vh",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Box display="flex" flex={1}>
        <NavTreino
          setSelectedSection={setSelectedSection}
          setIsCollapsed={setIsCollapsed}
          isCollapsed={isMobile ? false : isCollapsed}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />

        <Box
          flex={1}
          display="flex"
          flexDirection="column"
          padding={0}
          position="relative"
          sx={{ overflow: "hidden", height: "100%" }}
        >
          {renderContent()}

          {/* Botão Redondo */}
          <Fab
            onClick={() => setOpenModal(true)}
            sx={{
              position: "fixed",
              bottom: 32,
              right: 32,
              bgcolor: colors.greenAccent[500],
            }}
          >
            <BsJournalCheck style={{ color: colors.grey[900], fontSize: 26 }} />
          </Fab>
          {/* Modal de Histórico */}
          <Modal open={openModal} onClose={() => setOpenModal(false)}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 2,
                borderRadius: 2,
                maxHeight: "80vh",
                overflowY: "auto",
                width: "90%",
                maxWidth: "500px",
              }}
            >
              <Typography variant="h5" mb={2}>
                Treinos Concluídos
              </Typography>
              <Paper elevation={3}></Paper>
            </Box>
          </Modal>
        </Box>
      </Box>
    </Box>
  );
};

export default ConfigClientPage;
