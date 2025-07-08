import { Box, useTheme, Fab, Modal, Typography, Paper, List, ListItem, ListItemText } from "@mui/material";
import { useState } from "react";
import { tokens } from "../../../tema";
import NavTreino from "./NavTreino";
import Treinos from "./Treinos";
import Calendario from "./Calendario";
import { BsJournalCheck } from "react-icons/bs";
import DashTopbar from "../../../components/Dashboard/DashTopbar";

const ConfigClientPage = () => {
  const [selectedSection, setSelectedSection] = useState("perfil");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

 

  const renderContent = () => {
    switch (selectedSection) {
      case "treinos":
        return <Treinos />;
      case "calendario":
        return <Calendario />;
      default:
        return <Treinos />;
    }
  };

  return (
    <Box display="flex" sx={{ bgcolor: colors.primary[500] }}>
      <NavTreino
        setSelectedSection={setSelectedSection}
        setIsCollapsed={setIsCollapsed}
        isCollapsed={isCollapsed}
        />

      <Box flex={1} display="flex" minHeight="100vh" padding={1} position="relative">
        <Box width="100%" maxWidth="1900px">
        <DashTopbar />
          {renderContent()}
        </Box>

        {/* Botão Redondo */}
        <Fab
          onClick={() => setOpenModal(true)}
          sx={{ position: 'fixed', bottom: 32, right: 32, bgcolor: colors.greenAccent[500] }}
        >
          <BsJournalCheck style={{color:colors.grey[900], fontSize:26}}/>
        </Fab>
        {/* Modal de Histórico */}
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 2,
              borderRadius: 2,
              maxHeight: '80vh',
              overflowY: 'auto',
              width: '90%',
              maxWidth: '500px',
            }}
          >
            <Typography variant="h5" mb={2}>
              Treinos Concluídos
            </Typography>
            <Paper elevation={3}>
            </Paper>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default ConfigClientPage;
