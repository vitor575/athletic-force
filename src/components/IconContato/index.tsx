
import { FaWhatsapp, FaFacebook, FaInstagram  } from "react-icons/fa";
import { Box, IconButton, Stack,useTheme } from "@mui/material";
import { tokens } from "../../tema";

const IconContato = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const btnStyle = {
    color: colors.primary[500] ,
    transition: "transform 0.5s, color 0.5s",
    "&:hover": {
      color:colors.blueAccent[400],
      transform: "scale(1.1)",
    },
  }
  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={3  }
        sx={{ margin: "5px 0 10px" }}
      >
        <IconButton
          component="a"
          href="#sdadasda"
          sx={btnStyle}
        >
          <FaWhatsapp size={50} />
        </IconButton>

        <IconButton
          component="a"
          href="#sdadadas"
          sx={btnStyle}
        >
          <FaFacebook size={50} />
        </IconButton>

        <IconButton
          component="a"
          href="#dadasdada"
          sx={btnStyle}
        >
          <FaInstagram size={50} />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default IconContato;
