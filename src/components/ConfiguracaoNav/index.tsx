import { List, ListItem, useTheme, ListItemButton, ListItemText, Paper, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { tokens } from "../../tema";

const ConfiguracaoNav = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Paper
      elevation={3}
      sx={{
        width: "100%",
        minHeight: "100vh",
        borderRadius: "0 15px 15px 0",
        boxShadow: 2,
        padding: 2,
        bgcolor: colors.primary[300],
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}
    >
      <List sx={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
        <ListItem disablePadding>
          <ListItemButton
            sx={{
              borderRadius: 2,  
              bgcolor: colors.primary[600],
              textAlign: "center",
              border: `3px solid ${colors.blueAccent[500]}`,
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "scale(0.98)",
                boxShadow: `0 0px 36px ${colors.blueAccent[300]}`,
                bgcolor: colors.primary[600],
              },
            }}
          >
            <ListItemText primary="Editar senha" sx={{ color: "#fff" }} />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            sx={{
              borderRadius: 2,
              textAlign: "center",
              bgcolor: colors.primary[600],
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              border: `3px solid ${colors.blueAccent[500]}`,
              "&:hover": {
                transform: "scale(0.98)",
                boxShadow: `0 0px 36px ${colors.blueAccent[300]}`,
                bgcolor: colors.primary[600],
              },
            }}
          >
            <ListItemText primary="Mudar forma de pagamento" sx={{ color: "#fff" }} />
          </ListItemButton>
        </ListItem>
      </List>

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

            }}
          >
            <FaSignOutAlt style={{ marginRight: 8, color: "#fff" }} /> Voltar
          </ListItemButton>

        </ListItem>
      </Box>
    </Paper>
  );
};

export default ConfiguracaoNav;
