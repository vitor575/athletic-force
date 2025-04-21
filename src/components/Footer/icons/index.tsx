
import { FaWhatsapp, FaFacebook, FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";
import { Box, Stack, IconButton, useTheme } from "@mui/material";
import { styled, keyframes } from "@mui/system";
import { tokens } from "../../../tema";


const IconsFooter = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Ícone estilizado com hover metálico
  const StyledIconButton = styled(IconButton)(() => ({
    width: 100,
    height: 100,
    fontSize: "4em",
    color: colors.primary[500],
    transition: "transform 500ms, background 500ms",
    "&:hover": {
      transform: "scale(1.1)",
      boxShadow: `0px 4px 60px ${colors.blueAccent[600]}`,
      borderRadius: "50%",
      padding: 10,
    },
  }));

  return (
    <Box
      component="footer"
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "98%",
        margin: "0 auto",
        padding: "20px 0 45px",
        borderBottom: `2px solid ${colors.grey[600]}`,
        transition: "400ms",
      }}
    >
      <Stack direction="row" spacing={10}>
        <StyledIconButton>
          <FaWhatsapp  />
        </StyledIconButton>
        <StyledIconButton>
          <FaFacebook />
        </StyledIconButton>
        <StyledIconButton>
          <FaInstagram />
        </StyledIconButton>
        <StyledIconButton>
          <FaTiktok />
        </StyledIconButton>
      </Stack>
    </Box>
  );
};

export default IconsFooter;
