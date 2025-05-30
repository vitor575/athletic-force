import { Box, Typography } from "@mui/material";

const VerPlanoContent = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Detalhes do seu Plano
      </Typography>
      <Typography variant="body1">
        Veja as informações sobre o seu plano atual e opções de upgrade.
      </Typography>
      {/* Adicione informações do plano aqui */}
    </Box>
  );
};

export default VerPlanoContent;