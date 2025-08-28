import { TextField, Button, Paper, Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../../tema";

interface FormProps {
  titulo: string;
  label1: string;
  label2: string;
  botao: string;
  type: string;
}

const FormPassword = ({ titulo, label1, label2, botao, type }: FormProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Paper
      elevation={3}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 5,
        padding: 6,
        borderRadius: 2,
        width: "95%",
        bgcolor: colors.primary[300],
      }}
    >
      <Typography variant="h4" component="h2" sx={{ color: "white" }}>
        {titulo}
      </Typography>
      <Box sx={{ width: "28rem" }}>
        <TextField
          fullWidth
          type={type}
          id="password"
          name="password"
          label={label1}
          variant="outlined"
          sx={{
            backgroundColor: "#fff",
            color: "black",
            borderRadius: "5px"
          }}
        />
      </Box>
      <Box sx={{ width: "28rem" }}>
        <TextField
          fullWidth
          type="password"
          id="confirm-password"
          name="confirm-password"
          label={label2}
          variant="outlined"
          sx={{
            backgroundColor: "#fff",
            color: "black",
            borderRadius: "5px"
          }}
        />
      </Box>
      <Button
        variant="contained"
        sx={{
          padding: 1,
          width: "20%",
          fontSize: "1.2rem",
          borderRadius: 2,
          bgcolor: colors.primary[600],
          color: "white",
          transition: "ease-in-out 0.3s",
          border: `2px solid ${colors.blueAccent[500]}`,
          '&:hover': {
            transform: "translateY(-2px)",
            boxShadow: `0 0px 36px ${colors.blueAccent[300]}`,
          },
        }}
      >
        {botao}
      </Button>
    </Paper>
  );
};

export default FormPassword;
