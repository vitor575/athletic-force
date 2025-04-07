import React from "react";
import { Box } from "@mui/material";
import Sobre from "../../img/sobre.jpg";
import CaixaTxt from "./caixaTxt";

import { tokens } from "../../tema";
import { useTheme } from "@mui/material";

const SobreFT: React.FC = () => {
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