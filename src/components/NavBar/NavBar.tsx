import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Box,
  Hidden,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import ModalLogin from "../ModalLogin";
import { tokens } from "../../tema";
import { useTheme } from "@mui/material";
import Logo from "../../img/logo3.png";
import user from "../../img/user.png";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const linkstag = {
    fontSize: "20px",
    "&:hover": {
      color: colors.blueAccent[500],
    },
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const menuItems = [
    { text: "Home", href: "#home" },
    { text: "Sobre", href: "#sobre" },
    { text: "Treinadores", href: "#treinadores" },
    { text: "Contato", href: "#contato" },
  ];

  const drawer = (
    <Box
      sx={{
        width: 250,
        backgroundColor: colors.primary[500],
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "20px",
        justifyContent: "space-evenly",
      }}
      role="presentation"
      onClick={handleDrawerToggle}
      onKeyDown={handleDrawerToggle}
    >
      <Box
        component="img"
        src={Logo}
        alt="Logo"
        sx={{
          width: "30%",
          border: `1px solid ${colors.blueAccent[600]}`,
          marginBottom: "20px"
        }}
      />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton href={item.href}>
              <ListItemText primary={item.text} sx={{ color: "white", textAlign:"center", }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {/* Botão de login agora está dentro do Drawer */}
      <IconButton onClick={() => setModalOpen(!isModalOpen)} sx={{ marginTop: "8  0px" }}>
        <Box
          component="img"
          src={user}
          alt="Usuário"
          sx={{
            width: "65px",
            border: `1px solid ${colors.blueAccent[600]}`,
            borderRadius: "100%",
            padding: "10px",
            backgroundColor: colors.primary[600],
            "&:hover": {
              boxShadow: `0px 0px 30px ${colors.blueAccent[500]}`,
              transition: "0.4s ease-in-out",
            },
          }}
        />
      </IconButton>
    </Box>
  );

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: colors.primary?.[500],
        padding: "10px 20px",
      }}
    >
      <Toolbar sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
        <Box
          component="img"
          src={Logo}
          alt="Logo"
          sx={{
            width: { xs: "20%", sm: "8%", md: "6%" },
            cursor: "pointer",
            border: `1px solid ${colors.blueAccent[600]}`,
            marginRight: { md: "45%" },
          }}
        />

        <Hidden mdDown>
          <Box
            sx={{
              display: "flex",
              gap: 1,
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
            {menuItems.map((item) => (
              <Button key={item.text} color="inherit" href={item.href} sx={linkstag}>
                {item.text}
              </Button>
            ))}
          </Box>
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
        </Hidden>

        <Hidden mdUp>
          {/* O ícone do hambúrguer vai para o final, onde o ícone de usuário estava */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>

      </Toolbar>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Melhora o desempenho em dispositivos móveis.
        }}
      >
        {drawer}
      </Drawer>
      <ModalLogin open={isModalOpen} onClose={() => setModalOpen(false)} />
    </AppBar>
  );
};

export default Navbar;