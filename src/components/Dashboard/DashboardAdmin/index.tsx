import React, { useState } from "react";
import {
  Box,
  Typography,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  useTheme,
  Button,
  Backdrop,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { tokens } from "../../../tema";
import {
  cadastrarFuncionario,
  cadastrarCliente,
} from "../../../services/login";
import CustomTextField from "./TextField";

interface UserFormData {
  name: string;
  email: string;
  password: string;
  cpf: string;
  cellphone: string;
  role: string;
}

const DashboardAdmin: React.FC = () => {
  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    email: "",
    password: "",
    cpf: "",
    cellphone: "",
    role: "",
  });

  const [openBackdrop, setOpenBackdrop] = useState<boolean>(false);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      role: e.target.value,
    }));
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setSnackbarMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setOpenBackdrop(true);

      let response: string | undefined;

      if (
        formData.role.toLowerCase() === "professor" ||
        formData.role.toLowerCase() === "admin"
      ) {
        const isProfessor = formData.role.toLowerCase() === "professor";
        response = await cadastrarFuncionario(
          formData.name,
          formData.email,
          formData.password,
          formData.cpf,
          formData.cellphone,
          isProfessor
        );
      } else {
        response = await cadastrarCliente(
          formData.name,
          formData.email,
          formData.password,
          formData.cpf,
          formData.cellphone
        );
      }

      setOpenBackdrop(false);

      setSnackbarMessage(response || "Usuário cadastrado com sucesso!");
      setOpenSnackbar(true);

    } catch (error: any) {

      console.error(error);
      setOpenBackdrop(false); 
      setSnackbarMessage("Erro ao cadastrar usuário.");
      setOpenSnackbar(true);

    }
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: 700,
        mx:'auto',
        mt: 8,
        p: 3,
        border: `2px solid ${colors.blueAccent[600]}`,
        bgcolor: colors.primary[400],
        borderRadius: 2,
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        borderBottom={`2px solid ${colors.blueAccent[400]}`}
      >
        Cadastro de Usuário
      </Typography>
      <CustomTextField
        label="Nome"
        name="name"
        fullWidth
        margin="normal"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <CustomTextField
        label="Email"
        name="email"
        type="email"
        fullWidth
        margin="normal"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <CustomTextField
        label="Senha"
        name="password"
        type="password"
        fullWidth
        margin="normal"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <CustomTextField
        label="CPF"
        name="cpf"
        fullWidth
        margin="normal"
        value={formData.cpf}
        onChange={handleChange}
        required
      />
      <CustomTextField
        label="Telefone"
        name="cellphone"
        fullWidth
        margin="normal"
        value={formData.cellphone}
        onChange={handleChange}
        required
      />
      <FormControl component="fieldset" margin="normal">
        <FormLabel
          component="legend"
          sx={{
            color: colors.grey[100],
            "&.Mui-focused": {
              color: colors.grey[100]
            },
          }}
        >
          Selecione o Perfil
        </FormLabel>
        <RadioGroup
          row
          name="role"
          value={formData.role}
          onChange={handleRoleChange}
        >
          <FormControlLabel
            value="admin"
            control={
              <Radio
                sx={{
                  "&.Mui-checked": { color: colors.greenAccent[400] },
                }}
              />
            }
            label="Admin"
          />
          <FormControlLabel
            value="professor"
            control={
              <Radio
                sx={{
                  "&.Mui-checked": { color: colors.greenAccent[400] },
                }}
              />
            }
            label="Professor"
          />
          <FormControlLabel
            value="student"
            control={
              <Radio
                sx={{
                  "&.Mui-checked": { color: colors.greenAccent[400] },
                }}
              />
            }
            label="Aluno"
          />
        </RadioGroup>
      </FormControl>
      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 4, bgcolor: colors.blueAccent[500] }}
      >
        Cadastrar
      </Button>

      <Backdrop
        open={openBackdrop}
        sx={{ color: "#fff", zIndex: theme.zIndex.drawer + 9999 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarMessage.includes("Erro") ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DashboardAdmin;
