import React, { useState } from "react";
import { AppBar, Toolbar, Button, IconButton, Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import ModalLogin from "../ModalLogin";
import { tokens } from "../../tema";
import { useTheme } from "@mui/material";
import Logo from "../../img/logo3.png";
import user from "../../img/user.png";

const Navbar = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const local = useLocation();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: colors.primary?.[500],
        padding: "10px 20px",
      }}
      className={local.pathname === "/" ? "navbar" : "navbar-off"}
    >
      <Toolbar sx={{ display: "flex", alignItems: "center", width: "100%"}}>
        {/* Logo */}
        <Box component="img" src={Logo} alt="Logo" sx={{ width: "8%", cursor: "pointer",border: `1px solid ${colors.blueAccent[600]}`, marginRight: "30%"}} />

        {/* Links de navegação */}
        <Box sx={{ display: "flex", gap: 3, border: `1px solid ${colors.blueAccent[600]}`,borderRadius: "50px", padding: "15px 30px"}}>
          <Button color="inherit" href="#home" sx={{fontSize: "25px", "&:hover": {color: colors.blueAccent[500]}}}>Home</Button>    
          <Button color="inherit" href="#sobre"  sx={{fontSize: "25px",  "&:hover": {color: colors.blueAccent[500]}}}>Sobre</Button>
          <Button color="inherit" href="#treinadores"  sx={{fontSize: "25px",  "&:hover": {color: colors.blueAccent[500]}}}>Treinadores</Button>
          <Button color="inherit" href="#contato"  sx={{fontSize: "25px" , "&:hover": {color: colors.blueAccent[500]}}}>Contato</Button>
        </Box>

        {/* Botão de Login */}
        <IconButton onClick={() => setModalOpen(!isModalOpen)}>
          <Box component="img" src={user} alt="Usuário" sx={{ width: "100px",  border: `1px solid ${colors.blueAccent[600]}`,borderRadius: "100%",padding: "15px"}} />
        </IconButton>

        {/* Modal de Login */}
        <ModalLogin open={isModalOpen} onClose={() => setModalOpen(false)} />
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
