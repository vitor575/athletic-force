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
        "& .MuiOutlinedInput-root.Mui-focused fieldset": {
          borderColor: colors.blueAccent[200],
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: colors.blueAccent[200], 
        },
        ...props.sx, 
      }}
    />
  );
};

export default CustomTextField;
