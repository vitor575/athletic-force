import React from "react";
import { Box, Typography, Container, Divider, useTheme } from "@mui/material";

import IconsFooter from "./icons";
import ContatosFooter from "./contatosFooter";
import TextFooter from "./text";
import { tokens } from "../../tema";

const Footer: React.FC = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  return (
    <Box component="footer" sx={{ bgcolor: "#f5f5f5", pt: 4, }}>
      <Divider sx={{ width: "100%", borderColor: "#9c9c9c" }} />

      <Container sx={{ textAlign: "center" }}>
        <IconsFooter />
        <ContatosFooter />
        <TextFooter />
      </Container>

      <Box sx={{
        bgcolor: colors.primary[500], py: 3, mt: 4,

      }}>
        <Typography variant="body2" color="#fff" align="center" fontWeight="bold"
          sx={{
            [theme.breakpoints.down("md")]: {
              margin:"20px"
            },
          }}>
          Copyright © 2024. Athletic Academy. Todos os direitos reservados
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
