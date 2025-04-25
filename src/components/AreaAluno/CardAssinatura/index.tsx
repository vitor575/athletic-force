import React from "react";
import { Box, Typography, Button, keyframes, colors , useTheme} from "@mui/material";
import { tokens } from "../../../tema";

interface cardAssinaturaProps {
    plano: string;
}



const CardAssinatura = ({ plano }: cardAssinaturaProps) => {
    const theme = useTheme();
      const colors = tokens(theme.palette.mode);
    return (
        <Box
            sx={{
                width: "95%",
                height: "35%",
                bgcolor: "white",
                boxShadow: "5px 5px 15px rgba(102, 102, 102, 0.5)",
                borderRadius: "10px",
                p: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
            }}
        >
            <Box
                sx={{
                    height: "40%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Typography fontSize="1.5rem" fontWeight="bold" textAlign="center"  >
                    {plano}
                </Typography>
            </Box>

            <Box
                sx={{
                    height: "40%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-end",
                }}
            >
                <Button
                    variant="contained"
                    sx={{
                        px: 3,
                        borderRadius: "10px",
                        bgcolor: colors.blueAccent[300],
                        "&:hover": {
                            bgcolor: colors.blueAccent[400],
                        },
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: "1.1rem",
                        boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.36)",
                     
                    }}
                >
                    Detalhes
                </Button>
            </Box>
        </Box>
    );
};

export default CardAssinatura;
