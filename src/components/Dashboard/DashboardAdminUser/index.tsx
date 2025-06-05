import React, { useState } from "react";
import {
  Alert,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Snackbar,
  TextField,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  useTheme,
} from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as yup from "yup";
import { tokens } from "../../../tema";
import {
  cadastrarFuncionario,
  funcionarioCadastrarCliente,
} from "../../../services/login";

interface UserFormData {
  name: string;
  email: string;
  password: string;
  cpf: string;
  cellphone: string;
  role: string;
}

const DashboardAdmin: React.FC = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const initialValues: UserFormData = {
    name: "",
    email: "",
    password: "",
    cpf: "",
    cellphone: "",
    role: "",
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required("Nome é obrigatório"),
    email: yup.string().email("Email inválido").required("Email é obrigatório"),
    password: yup
      .string()
      .min(5, "Senha muito curta")
      .required("Senha é obrigatória"),
    cpf: yup.string().required("CPF é obrigatório"),
    cellphone: yup.string().required("Celular é obrigatório"),
    role: yup.string().required("Função é obrigatória"),
  });

  const [openBackdrop, setOpenBackdrop] = useState<boolean>(false);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  const handleCloseSnackbar = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleSubmit = async (
    values: UserFormData,
    helpers: FormikHelpers<UserFormData>
  ) => {
    try {
      setOpenBackdrop(true);

      let response: string | undefined;
      const roleLower = values.role.toLowerCase();
      if (roleLower === "professor" || roleLower === "admin") {
        const isProfessor = roleLower === "professor";
        response = await cadastrarFuncionario(
          values.name,
          values.email,
          values.password,
          values.cpf,
          values.cellphone,
          isProfessor
        );
      } else {
        response = await funcionarioCadastrarCliente(
          values.name,
          values.email,
          values.password,
          values.cpf,
          values.cellphone
        );
      }

      setOpenBackdrop(false);
      setSnackbarMessage(response || "Usuário cadastrado com sucesso!");
      setOpenSnackbar(true);
      helpers.resetForm();
      helpers.setSubmitting(false);
    } catch (error: any) {
      console.error(error);
      setOpenBackdrop(false);
      setSnackbarMessage("Erro ao cadastrar usuário: " + error.message);
      setOpenSnackbar(true);
      helpers.setSubmitting(false);
    }
  };

  return (
    <>
      <Box m={1} mb={2}>
        <Typography component="h3" fontSize="36px">
          Cadastrar novo usuário
        </Typography>
      </Box>
      <Formik<UserFormData>
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          isSubmitting,
          handleChange,
          values,
          errors,
          touched,
          handleBlur,
        }) => (
          <Form>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns={"repeat(4, minmax(0, 1fr))"}
              sx={{
                "& > div": {
                  gridColumn: isNonMobile ? undefined : "span 4",
                },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 2" }}
                id="name"
                name="name"
                label="Nome"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
              />

              <TextField
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 2" }}
                id="email"
                name="email"
                label="Email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />

              <TextField
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 4" }}
                id="password"
                name="password"
                label="Senha"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />

              <TextField
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 4" }}
                id="cpf"
                name="cpf"
                label="CPF"
                value={values.cpf}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.cpf && Boolean(errors.cpf)}
                helperText={touched.cpf && errors.cpf}
              />

              <TextField
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 4" }}
                id="cellphone"
                name="cellphone"
                label="Celular"
                value={values.cellphone}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.cellphone && Boolean(errors.cellphone)}
                helperText={touched.cellphone && errors.cellphone}
              />
              <Box sx={{ gridColumn: "span 4" }}>
                <FormControl component="fieldset" margin="normal">
                  <FormLabel
                    component="legend"
                    sx={{
                      color: colors.grey[100],
                      "&.Mui-focused": { color: colors.grey[100] },
                    }}
                  >
                    Selecione o Perfil
                  </FormLabel>

                  <RadioGroup
                    row
                    name="role"
                    value={values.role}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <FormControlLabel
                      value="admin"
                      control={
                        <Radio
                          sx={{
                            "&.Mui-checked": {
                              color: colors.greenAccent[400],
                            },
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
                            "&.Mui-checked": {
                              color: colors.greenAccent[400],
                            },
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
                            "&.Mui-checked": {
                              color: colors.greenAccent[400],
                            },
                          }}
                        />
                      }
                      label="Aluno"
                    />
                  </RadioGroup>

                  {touched.role && errors.role && (
                    <Typography
                      variant="caption"
                      color="error"
                      sx={{ mt: 0.5, ml: 1 }}
                    >
                      {errors.role}
                    </Typography>
                  )}
                </FormControl>
              </Box>
            </Box>

            <Box mt="20px" display="flex" justifyContent="end">
              <Button
                color="secondary"
                variant="contained"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "Cadastrar"}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default DashboardAdmin;
