import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  useTheme,
  Backdrop,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Avatar,
} from "@mui/material";
import { useClientPerfil } from "../../../../services/querrys/useClientPerfil";
import { tokens } from "../../../../tema";
import { FaMapLocationDot } from "react-icons/fa6";
import { FaAddressCard } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdMarkEmailRead } from "react-icons/md";
const PerfilAluno = () => {
  const { client, loading } = useClientPerfil();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    address: "",
    cpf: "",
    cellphone: "",
  });
  const [originalData, setOriginalData] = useState(formData);

  useEffect(() => {
    if (client) {
      const data = {
        id: client.id,
        name: client.name,
        email: client.email,
        address: client.address,
        cpf: client.cpf,
        cellphone: client.cellphone,
      };
      setFormData(data);
      setOriginalData(data);
    }
  }, [client]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOpenModal = () => {
    setFormData(originalData);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setFormData(originalData);
    setIsModalOpen(false);
  };

  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    // Simula uma requisição assíncrona
    setTimeout(() => {
      setOriginalData(formData);
      setIsModalOpen(false);
      setSaving(false);
    }, 2000);
  };
  const text = {
    color: colors.grey[100], display: "flex", gap: 2, fontSize: "1.6em", alignItems: "center", mb: 3
  }

  if (loading) {
    return (
      <Backdrop sx={{ color: "#fff", zIndex: theme.zIndex.drawer + 1 }} open>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <Box sx={{p:2}}>
      <Typography
        variant="h4"
        sx={{
          color: colors.greenAccent[500],
        }}
      >
        Perfil do Aluno
      </Typography>
      <Typography variant="body1" sx={{ mb: 2, color: colors.grey[900] }}>
        Visualize e gerencie as informações do seu perfil.
      </Typography>


      <Box
        display="flex"
        alignItems="center"
        bgcolor={theme.palette.background.paper}
        p={2}
        borderRadius={2}
        boxShadow={3}
        maxWidth={1900}
        flexDirection="row"
        gap={8}
      >
        <Avatar
          src={`https://github.com/MaxMLira.png`}
          sx={{ width: 250, height: 250, border: `5px solid ${colors.greenAccent[500]}` }}
        />

        <Box flex={1}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", color: colors.primary[500], margin: "0 0 25px" }}>
            <Typography fontWeight="bold" fontSize={35}>
              {client?.name}
            </Typography>
            <Typography variant="body2" >
              ID: {originalData.id}
            </Typography>
          </Box>
          <Box mt={1}>

            <Typography sx={text} >
              <MdMarkEmailRead style={{ color: colors.greenAccent[500] }} /> E-mail:
              <Typography sx={{ fontSize: ".8em" }}> {originalData.email}</Typography>
            </Typography>

            <Typography variant="body2" sx={text}>
              <FaMapLocationDot style={{ color: colors.greenAccent[500] }} /> Endereço:
              <Typography sx={{ fontSize: ".8em" }}>{originalData.address}</Typography>
            </Typography>
            <Typography variant="body2" sx={text}>
              <FaAddressCard style={{ color: colors.greenAccent[500] }} />CPF:
              <Typography sx={{ fontSize: ".8em" }}>{originalData.cpf}</Typography>
            </Typography>
            <Typography variant="body2" sx={text}>
              <IoLogoWhatsapp style={{ color: colors.greenAccent[500] }} /> Celular:
              <Typography sx={{ fontSize: ".8em" }}>{originalData.cellphone}</Typography>
            </Typography>
          </Box>

          <Box mt={2} sx={{ display: "flex", justifyContent: "flex-end", }}>
            <Button variant="contained" onClick={handleOpenModal} sx={{ background: colors.primary[500] }}>
              Editar Perfil
            </Button>
          </Box>
        </Box>
        <Dialog open={isModalOpen} onClose={handleCloseModal} fullWidth maxWidth="sm">
          <DialogTitle>Editar Informações</DialogTitle>
          <DialogContent>
            <TextField
              label="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Endereço"
              name="address"
              value={formData.address}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Celular"
              name="cellphone"
              value={formData.cellphone}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal}>Cancelar</Button>
            <Button onClick={handleSave} variant="contained" color="success" disabled={saving}>
              {saving ? <CircularProgress size={24} sx={{ color: "success" }} /> : "Salvar"}
            </Button>
          </DialogActions>
        </Dialog>

      </Box>
    </Box>
  );
};

export default PerfilAluno;
