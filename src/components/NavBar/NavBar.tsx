import React, { useState } from "react";
import { AppBar, Toolbar, Button, IconButton, Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import ModalLogin from "../ModalLogin";
import { tokens } from "../../tema";
import { useTheme } from "@mui/material";
import Logo from "../../img/logo3.png";
import user from "../../img/user.png";
import { color } from "framer-motion";
import { BorderBottom, BorderTop } from "@mui/icons-material";

const Navbar = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const local = useLocation();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const linkstag = {
    fontSize: "20px",
    "&:hover": {
      color: colors.blueAccent[500],
    },
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: colors.primary?.[500],
        padding: "10px 20px",
      }}
      className={local.pathname === "/" ? "navbar" : "navbar-off"}
    >
      <Toolbar sx={{ display: "flex", alignItems: "center", width: "100%" }}>
        {/* Logo */}
        <Box
          component="img"
          src={Logo}
          alt="Logo"
          sx={{
            width: "6%",
            cursor: "pointer",
            border: `1px solid ${colors.blueAccent[600]}`,
            marginRight: "45%",
          }}
        />

        {/* Links de navegação */}
        <Box
          sx={{
            display: "flex",
            gap: 3,
            backgroundColor: colors.primary[600],
            border: `1px solid ${colors.blueAccent[600]}`,
            borderRadius: "50px",
            padding: "5px 50px",
            "&:hover": {
              boxShadow: `0px 0px 30px ${colors.blueAccent[500]}`,
              transition: "0.4s ease-in-out",
            },
          }}
        >
          <Button color="inherit" href="#home" sx={linkstag}>
            Home
          </Button>
          <Button color="inherit" href="#sobre" sx={linkstag}>
            Sobre
          </Button>
          <Button color="inherit" href="#treinadores" sx={linkstag}>
            Treinadores
          </Button>
          <Button color="inherit" href="#contato" sx={linkstag}>
            Contato
          </Button>
        </Box>

        {/* Botão de Login */}
        <IconButton onClick={() => setModalOpen(!isModalOpen)}>
          <Box
            component="img"
            src={user}
            alt="Usuário"
            sx={{
              width: "65px",
              border: `1px solid ${colors.blueAccent[600]}`,
              borderRadius: "100%",
              padding: "10px",
              marginLeft: "10px",
              backgroundColor: colors.primary[600],
              "&:hover": {
                boxShadow: `0px 0px 30px ${colors.blueAccent[500]}`,
                transition: "0.4s ease-in-out",
              },
            }}
          />
        </IconButton>

        {/* Modal de Login */}
        <ModalLogin open={isModalOpen} onClose={() => setModalOpen(false)} />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
