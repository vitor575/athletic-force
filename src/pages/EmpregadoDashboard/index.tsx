import { Box, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { themeSettings } from "../../tema";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { useMemo, useState } from "react";
import DashTopbar from "../../components/Dashboard/DashTopbar";
import Sidebar from "../../components/Dashboard/Sidebar";
import { Outlet } from "react-router-dom";

const EmpregadoDashboard = () => {
  const mode = useSelector((state: RootState) => state.tema.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box display="flex" height="100vh" width="100vw">
        <Box>
          <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        </Box>
        <Box flex={1}>
          <DashTopbar />
          <Box m={2}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default EmpregadoDashboard;
