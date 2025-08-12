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
        margin: "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "90%",
        marginBottom: "3%",
        [theme.breakpoints.down("md")]: {
          display: "block",
          marginBottom: "0%",
          margin: "0px",
          width: "100%",

        },
      }}
    >
      <Box
        component="img"
        src={Sobre}
        alt="imagem da caixa do sobre"
        className="imagemSobreTxt"
        sx={{
          width: "60%",
          borderRadius: "20px",
          boxShadow: `0px 4px 60px ${colors.blueAccent[600]}`,
          [theme.breakpoints.down("md")]: {
            width: "100%",
            margin: "0px 0px 10px"
          },
        }}
      />
      <CaixaTxt />
    </Box>
  );
};

export default SobreFT;