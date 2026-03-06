import { Box, useTheme, Fab, Modal, Typography } from "@mui/material";
import { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import { tokens } from "../../tema";
import NavTreino from "./CronogramaTreino/NavTreino/NavTreino";
import Treinos from "./CronogramaTreino/Treinos/Treinos";
import Calendario from "./CronogramaTreino/Calendario/Calendario";
import PerfilAluno from "./ConfigClientPage/PerfilAluno/PerfilAluno";
import TrocarSenha from "./ConfigClientPage/TrocarSenha/TrocarSenha";
import { BsJournalCheck } from "react-icons/bs";

const ConfigClientPage = () => {
  const [selectedSection, setSelectedSection] = useState("treinos");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [configSubSection, setConfigSubSection] = useState("perfil");

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const renderContent = () => {
    switch (selectedSection) {
      case "treinos":
        return <Treinos />;
      case "calendario":
        return <Calendario />;
      case "configuracoes":
        return (
          <Box
            sx={{
              display: "flex",
              height: "100%",
              bgcolor: colors.primary[500],
            }}
          >
            {/* Settings Secondary Sidebar */}
            <Box
              sx={{
                width: 220,
                flexShrink: 0,
                borderRight: `1px solid ${colors.primary[600]}`,
                p: 2,
                display: "flex",
                flexDirection: "column",
                gap: 0.5,
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: colors.primary[900],
                  fontWeight: "900",
                  textTransform: "uppercase",
                  letterSpacing: 1.5,
                  fontSize: "0.65rem",
                  px: 1,
                  mb: 1,
                  display: "block",
                }}
              >
                Conta
              </Typography>
              {[
                {
                  key: "perfil",
                  icon: <PersonIcon sx={{ fontSize: 18 }} />,
                  label: "Perfil",
                },
                {
                  key: "trocarSenha",
                  icon: <LockIcon sx={{ fontSize: 18 }} />,
                  label: "Trocar Senha",
                },
              ].map((item) => (
                <Box
                  key={item.key}
                  onClick={() => setConfigSubSection(item.key)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    px: 1.5,
                    py: 1,
                    borderRadius: "10px",
                    cursor: "pointer",
                    bgcolor:
                      configSubSection === item.key
                        ? `${colors.blueAccent[400]}33`
                        : "transparent",
                    border:
                      configSubSection === item.key
                        ? `1px solid ${colors.blueAccent[400]}`
                        : "1px solid transparent",
                    color:
                      configSubSection === item.key
                        ? colors.blueAccent[300]
                        : "#fff",
                    "&:hover": { bgcolor: colors.primary[600] },
                    transition: "all 0.15s",
                  }}
                >
                  {item.icon}
                  <Typography sx={{ fontWeight: "700", fontSize: "0.9rem" }}>
                    {item.label}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Settings Content */}
            <Box sx={{ flex: 1, overflow: "auto" }}>
              {configSubSection === "perfil" ? (
                <PerfilAluno />
              ) : (
                <TrocarSenha />
              )}
            </Box>
          </Box>
        );
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
          isCollapsed={isCollapsed}
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
              <Typography variant="caption" sx={{ color: "#999" }}>
                Nenhum treino concluído ainda.
              </Typography>
            </Box>
          </Modal>
        </Box>
      </Box>
    </Box>
  );
};

export default ConfigClientPage;
