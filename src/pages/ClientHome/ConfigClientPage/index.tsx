import { Box, useTheme } from "@mui/material";
import { useState } from "react";
import ConfiguracaoNav from "../../../components/AreaAluno/ConfiguracaoNav";
import PerfilContent from "./PerfilContent";
import TrocarSenhaContent from "./TrocarSenhaContent";
import VerPlanoContent from "./VerPlanoContent";
import { tokens } from "../../../tema";

const ConfigClientPage = () => {
  const [selectedSection, setSelectedSection] = useState("perfil");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const renderContent = () => {
    switch (selectedSection) {
      case "perfil":
        return <PerfilContent />;
      case "trocarSenha":
        return <TrocarSenhaContent />;
      case "verPlano":
        return <VerPlanoContent />;
      default:
        return <PerfilContent />;
    }
  };

  return (
    <Box display="flex" sx={{bgcolor: colors.primary[500]}}>
      <ConfiguracaoNav
        setSelectedSection={setSelectedSection}
        setIsCollapsed={setIsCollapsed}
        isCollapsed={isCollapsed}
      />

      <Box
        flex={1}
        display="flex"
        minHeight="100vh"
        padding={2}
        
      >
        <Box width="100%" maxWidth="1900px">
          {renderContent()}
        </Box>
      </Box>
    </Box>
  );
};

export default ConfigClientPage;
