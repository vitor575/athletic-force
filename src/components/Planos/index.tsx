import { Typography, Paper, useTheme, Button } from "@mui/material";
import { tokens } from "../../tema";
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
import { useNavigate } from "react-router-dom";


interface CardPlanoProps {
    page: string;
    plano: string;
    descricao: string;
    valor: number;
}

const CardPlano = ({ plano, descricao, valor, page }: CardPlanoProps) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    
    const icons = {
        color: colors.blueAccent[500],
    };

    const descricoes = {
        fontSize: "1.2rem",
        color: colors.grey[100],
        display: "flex",
        gap: 2,
        marginLeft: 7,
    }
    return (

        <Paper
            elevation={4}
            sx={{
                py: 4,
                px: 2,
                borderRadius: 4,
                backgroundColor: colors.primary[400],
                textAlign: "center",
                minHeight: 450,
                width: 380,
                border: `2px solid ${colors.blueAccent[600]}`,
                transition: " 0.6s ease-in-out",
               
                "&:hover": {
                    backgroundColor: colors.primary[500],
                    transform: " translateY(-5px)",
                    border: `2px solid ${colors.blueAccent[500]}`,
                },
                "&:hover .plano": {
                    color: colors.grey[900],
                },
                "&:hover .descrip": {
                    color: colors.blueAccent[400],
                },  
                "&:hover .valor": {
                    color: colors.grey[900],
                },
                "&:hover .MuiSvgIcon-root": {
                    color: colors.grey[900],
                },
                "&:hover .MuiButton-root": {
                    backgroundColor: colors.grey[900],
                    color: colors.blueAccent[100],
                },
                "&:hover .MuiButton-root:hover": {
                    backgroundColor: colors.blueAccent[400],
                    color: colors.grey[900],
                    transition: " 0.4s ease-in-out",
                }
            }}
            onClick={() => navigate(page)}
        >
            <Typography className="plano" variant="h4" fontWeight="bold" gutterBottom sx={{ color: colors.primary[500] }}>
                {plano}
            </Typography>
            <Typography className="descrip" variant="body1" gutterBottom sx={descricoes}>
                <CheckTwoToneIcon sx={icons} /> {descricao}
            </Typography>
            <Typography className="descrip" variant="body1" gutterBottom sx={descricoes}>
                <CheckTwoToneIcon sx={icons} /> {descricao}
            </Typography>
            <Typography className="descrip" variant="body1" gutterBottom sx={descricoes}>
                <CheckTwoToneIcon sx={icons} /> {descricao}
            </Typography>
            <Typography className="descrip" variant="body1" gutterBottom sx={descricoes}>
                <CheckTwoToneIcon sx={icons} />  {descricao}
            </Typography>
            <Typography className="descrip" variant="body1" gutterBottom sx={descricoes}>
                <CheckTwoToneIcon sx={icons} /> {descricao}
            </Typography>
            <Typography className="valor" variant="h3" sx={{ fontWeight: 600, color: colors.blueAccent[500] }}>R$ {valor.toFixed(2)}</Typography>
            <Button onClick={() => navigate(page)} variant="contained" color="primary" sx={{ fontSize: '1rem', mt: 2, backgroundColor: colors.primary[600], color: colors.grey[900], py: 1, px: 5, }}>
                Comprar
            </Button>
        </Paper>
    );
};



export default CardPlano;
