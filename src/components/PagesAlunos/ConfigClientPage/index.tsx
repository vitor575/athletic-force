import { Box, useTheme } from "@mui/material";
import { useState } from "react";
import ConfiguracaoNav from "../../AreaAluno/ConfiguracaoNav";
import PerfilContent from "./PerfilAluno/PerfilAluno";
import TrocarSenhaContent from "./TrocarSenha/TrocarSenha";
import VerPlanoContent from "./PagePlano/PagePlano";
import { tokens } from "../../../tema";
import DashTopbar from "../../Dashboard/DashTopbar";

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
        padding={1}
        
      >
        <Box width="100%" maxWidth="1900px">
          <DashTopbar/>
          {renderContent()}
        </Box>
      </Box>
    </Box>
  );
};

export default ConfigClientPage;
