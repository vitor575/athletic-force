import { Box, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { themeSettings } from "../../tema";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import DashTopbar from "../../components/Dashboard/DashTopbar";
import Sidebar from "../../components/Dashboard/Sidebar";
import { Outlet } from "react-router-dom";

const EmpregadoDashboard = () => {
  const mode = useSelector((state: RootState) => state.tema.mode);

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box display="flex" height="100vh">
        <Sidebar />
        <Box flex={1}>
          <DashTopbar />
          <div className="content">
            <Outlet />
          </div>
        </Box>
      </Box>
      
    </ThemeProvider>
  );
};

export default EmpregadoDashboard;
