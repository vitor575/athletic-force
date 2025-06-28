import { Box, useTheme } from "@mui/material";
import { useState } from "react";
import NavTreino from "../../pages/CronogramaTreino/NavTreino";
import { tokens } from "../../tema";
import Treinos from "./Treinos";
import Calendario from "./Calendario";

const ConfigClientPage = () => {
  const [selectedSection, setSelectedSection] = useState("perfil");
  const [isCollapsed, setIsCollapsed] = useState(false);
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
    <Box display="flex" sx={{bgcolor: colors.primary[500]}}>
      <NavTreino
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
