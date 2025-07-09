import React from 'react';
import { Box, Typography, Card, CardContent, Button, List, ListItem, ListItemIcon, ListItemText, Divider, useTheme, CssBaseline } from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'; // Ícone mais moderno
import { tokens } from "../../../../tema"; // Supondo que você use o tema

const PagePlano = () => {
  // Supondo que você tenha acesso ao seu tema
  // Se não tiver, pode remover useTheme e colors e usar cores diretas (ex: 'primary')
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Mock de dados do plano atual - em um app real, isso viria de uma API
  const planoAtual = {
    nome: "Plano Smart",
    preco: "99,90",
    status: "Ativo",
    validade: "25/08/2025",
    features: [
      "Acesso das 6h às 17h (segunda a sexta)",
      "1 ficha de treino com personal a cada 30 dias",
      "Avaliação física inicial gratuita",
      "Livre acesso à musculação e cardio",
      "Acompanhamento básico via aplicativo",
    ]
  };

  return (
    <Box sx={{ py: 1, px: 2, mx: 'auto' }}>
      <CssBaseline/>
      <Typography
        variant="h4"
        sx={{ color: colors.greenAccent[500] }}
      >
        Detalhes do seu Plano
      </Typography>
      <Typography variant="body1" sx={{ mb: 2, color: colors.grey[900] }}>
        Veja as informações sobre o seu plano atual e opções de upgrade.
      </Typography>

      <Card raised sx={{
        backgroundColor: theme.palette.background.paper, // Usa a cor de papel do tema
        borderRadius: '12px',
      }}>
        <CardContent sx={{ p: 5 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: colors.blueAccent[200] }}>
            {planoAtual.nome}
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, color: colors.grey[800] }}>
            <Typography variant="body2" sx={{ color: colors.grey[500] }}>
              Status: <Typography component="span" sx={{ color: colors.greenAccent[500], fontWeight: 'bold' }}>{planoAtual.status}</Typography>
            </Typography>
            <Typography variant="body2" sx={{ color: colors.greenAccent[500] }}>
              Válido até: {planoAtual.validade}
            </Typography>
          </Box>

          <Divider sx={{ mb: 1, bgcolor: colors.grey[200] }} />

          <Box sx={{ display: 'flex', alignItems: 'baseline', my: 3}}>
            <Typography variant="h3" sx={{ fontWeight: '600', color: colors.blueAccent[200] }}>
              R$ {planoAtual.preco}
            </Typography>
            <Typography variant="h6" sx={{ ml: 1, color: colors.grey[500] }}>
              /mês
            </Typography>
          </Box>

          <Typography variant="h6" sx={{ mt: 1,color: colors.greenAccent[500] }}>
            Benefícios incluídos:
          </Typography>

          <List>
            {planoAtual.features.map((feature, index) => (
              <ListItem key={index} disablePadding>
                <ListItemIcon sx={{ minWidth: '40px', color: colors.greenAccent[500] }}>
                  <CheckCircleOutlineIcon />
                </ListItemIcon>
                <ListItemText primary={feature} sx={{ color: colors.grey[400] }} />
              </ListItem>
            ))}
          </List>

          <Button
            variant="contained"
            fullWidth
            size="large"
            sx={{
              mt: 1,
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 'bold',
              backgroundColor: colors.greenAccent[500],
              '&:hover': {
                backgroundColor: colors.greenAccent[600]
              }
            }}
          >
            Ver Opções de Upgrade
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PagePlano;