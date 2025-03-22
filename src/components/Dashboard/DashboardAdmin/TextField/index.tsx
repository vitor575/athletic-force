import React from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../../../tema";

const CustomTextField: React.FC<TextFieldProps> = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <TextField
      {...props}
      sx={{
        "& .MuiInputBase-input": {
          color: 'white'
        },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: colors.blueAccent[600],
          },
          "&:hover fieldset": {
            borderColor: colors.blueAccent[400],
          },
          "&.Mui-focused fieldset": {
            borderColor: colors.blueAccent[300],
          }, 
        },
      }}
    />
  );
};

export default CustomTextField;
