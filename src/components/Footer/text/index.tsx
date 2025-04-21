
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../tema";

const TextFooter = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const texto = {
    fontSize: "1.5em",
    width: "100%"
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        py: "20px",
        gap: "25px",
        color:colors.grey[200],
        width: "100%",
        margin: "0 auto 10px",
        borderTop: `2px solid ${colors.grey[600]}`,
        borderBottom: `2px solid ${colors.grey[600]}`,
      }}
    >
      <Typography variant="body1" sx={texto}>
        *Consulte todas as condições e regulamentos em : ZenFitAcademy.com.br/contratos
      </Typography>
      <Typography variant="body1" sx={texto}>
        Rua Ricardo Butarello , 735 - Ermelino Matarazzo
      </Typography>
      <Typography variant="body1" sx={texto}>
        faleconosco@ZenFitAcademy.com.br
      </Typography>
      <Typography variant="body1" sx={texto}>
        RP Group Participações Societarias Ltda.
      </Typography>
      <Typography variant="body1" sx={texto}>
        CNPJ : 32.656.443/0001-21
      </Typography>
    </Box>
  );
};

export default TextFooter;
