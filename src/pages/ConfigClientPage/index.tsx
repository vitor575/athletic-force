
import { Box, Container } from "@mui/material";
import ConfiguracaoNav from "../../components/ConfiguracaoNav";
import Form from "../../components/Form";

const ConfigClientPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 4,
        minHeight: "100vh",
        backgroundColor: "#eaeaea",
        
      }}
    >
      <Box
        sx={{
          flex: 1,
          maxWidth: { xs: "100%", md: "25rem" },
        }}
      >
        <ConfiguracaoNav />
      </Box>

      <Box
        sx={{
          flex: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 4,
          width: "100%",
        }}
      >
        <Container >
          <Form
            titulo="Mudar senha"
            label1="Senha atual"
            label2="Nova senha"
            botao="Salvar"
            type="password"
          />
        </Container>
      </Box>
    </Box>
  );
};

export default ConfigClientPage;
