import React, { useLayoutEffect } from "react";
import { Box } from "@mui/material";
import Sobre from "../../img/sobre.jpg";
import CaixaTxt from "./caixaTxt";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { tokens } from "../../tema";
import { useTheme } from "@mui/material";

const SobreFT = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  return (
    <Box
      sx={{
        margin: "50px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "95%",
        marginBottom: "3%",
      }}
    >
      <Box
        component="img"
        src={Sobre}
        alt="imagem da caixa do sobre"
        className="imagemSobreTxt"
        sx={{
          width: "55%",
          borderRadius: "20px",
          boxShadow: `0px 4px 60px ${colors.blueAccent[600]}`,
        }}
      />
      <CaixaTxt />
    </Box>
  );
};

export default SobreFT;