import React from "react";
import {
  Box,
  Typography,
  Link,
  Button,
  Stack,
  Paper,
  useTheme
} from "@mui/material";
import { FaGooglePlay } from "react-icons/fa";
import { FaApple } from "react-icons/fa6";
import { tokens } from "../../../tema";


const ContatosFooter = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const textlink = {
    color: colors.grey[200],
    textDecoration: "none",
    fontSize: "1.1em",
    cursor: "pointer",
    [theme.breakpoints.down("md")]: {
      fontSize: 25,

    },
  }
  const buttonLikn = {
    borderRadius: "15px",
    padding: "10px",
    fontSize: "1.1em",
    justifyContent: "space-evenly",
    width: "185px",
    textTransform: "none",
    bgcolor: colors.primary[500],
    border: `3px solid${colors.blueAccent[500]}`,
    "&:hover": {
      transform: "scale(1.05)",
      transition: "300ms"
    },
  
  }
  return (
    <Box
      component="footer"
      sx={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "flex-start",
        textAlign: "center",
        width: "100%",
        px: "30px",
        my: "30px",
        transition: "400ms",
        gap: 4,
        fontWeight: "500",
        [theme.breakpoints.down("md")]: {
          display: "block",
          px: "5px",
          textAlign: "left",
        },
      }}
    >
      <Stack spacing={3} sx={{
        [theme.breakpoints.down("md")]: {
          marginBottom: "30px",

        },
      }}>
        <Typography variant="h5" fontWeight="bold" sx={{
          color: colors.primary[500],
          [theme.breakpoints.down("md")]: {
            fontSize: 35
          },

        }}>
          Institucional
        </Typography>
        <Link href="#sada" sx={textlink}>Conceito e História</Link>
        <Link href="#sada" sx={textlink} >Fale conosco</Link>
        <Link href="#sada" sx={textlink}>Investidores</Link>
        <Link href="#sada" sx={textlink} >Contratos</Link>
        <Link href="#sada" sx={textlink}>Política de Privacidade</Link>
      </Stack>

      <Stack spacing={3} sx={{
        [theme.breakpoints.down("md")]: {
          marginBottom: "30px"
        },
      }}>
        <Typography variant="h5" fontWeight="bold" sx={{
          color: colors.primary[500], [theme.breakpoints.down("md")]: {
            fontSize: 35
          },
        }}>
          Corporativo
        </Typography>
        <Link href="#sada" sx={textlink}>Trabalhe conosco</Link>
        <Link href="#sada" sx={textlink}>Indique um ponto</Link>
        <Link href="#sada" sx={textlink}>Divulgue sua marca</Link>
      </Stack>

      <Stack spacing={2} sx={{
        [theme.breakpoints.down("md")]: {
          marginBottom: "30px"
        },
      }}>
        <Typography variant="h5" fontWeight="bold" sx={{
          color: colors.primary[500],
          [theme.breakpoints.down("md")]: {
            fontSize: 35
          },
        }}>
          Baixe o Aplicativo
        </Typography>
        <Stack spacing={2} sx={{
          [theme.breakpoints.down("sm")]: {
            display: "flex",
            alignContent: "center",
            flexDirection: "row",
            margin: 0,
            gap: 2
          },
        }} >

          <Button startIcon={<FaApple />} sx={buttonLikn}>
            App Store
          </Button>

          <Button startIcon={<FaGooglePlay />} sx={buttonLikn}>
            Google Play
          </Button>

        </Stack>
      </Stack>

      <Box>
        <Typography variant="h5" fontWeight="bold" sx={{
          margin: "0 0 10px", width: "100%", [theme.breakpoints.down("md")]: {
            fontSize: 35
          },
        }}>
          Local
        </Typography>
        <Paper elevation={3} sx={{ overflow: "hidden", borderRadius: 2, }}>
          <iframe
            title="Local"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3659.1794194964723!2d-46.47471708814433!3d-23.490046158889662!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce61a9987bafc1%3A0x1e71f06be950a1e9!2sRua%20Ricardo%20Butarello%20-%20Ermelino%20Matarazzo%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2003813-010!5e0!3m2!1spt-BR!2sbr!4v1734997787586!5m2!1spt-BR!2sbr"
            width="350"
            height="200"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          />
        </Paper>
      </Box>
    </Box>
  );
};

export default ContatosFooter;
