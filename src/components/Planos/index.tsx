import { Typography, Paper, useTheme, Button } from "@mui/material";
import { tokens } from "../../tema";
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
import { useNavigate } from "react-router-dom";


interface CardPlanoProps {
    page: string;
    plano: string;
    valor: number;
}

const CardPlano = ({ plano, valor, page }: CardPlanoProps) => {
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
        justifyContent: "flex-start",
    }
    return (

        <Paper
            elevation={4}
            sx={{
                py: 3,
                px: 3,
                borderRadius: 4,
                backgroundColor: colors.primary[400],
                minHeight: 450,
                width: 380,
                border: `2px solid ${colors.blueAccent[600]}`,
                transition: " 0.6s ease-in-out",
                flexDirection: "column",
                display: "flex",
                justifyContent: "space-between",


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
            <Typography className="plano" variant="h4" fontWeight="bold" gutterBottom sx={{ color: colors.primary[500], display: "flex", justifyContent: "center", fontSize: "2rem" }}>
                {plano}
            </Typography>
            {valor === 99.99 && (
                <>
                    <Typography className="descrip" variant="body1" gutterBottom sx={descricoes}>
                        <CheckTwoToneIcon sx={icons} /> Acesso das 6h às 17h (segunda a sexta)
                    </Typography>
                    <Typography className="descrip" variant="body1" gutterBottom sx={descricoes}>
                        <CheckTwoToneIcon sx={icons} /> 1 ficha de treino com personal a cada 30 dias
                    </Typography>
                    <Typography className="descrip" variant="body1" gutterBottom sx={descricoes}>
                        <CheckTwoToneIcon sx={icons} /> Avaliação física inicial gratuita
                    </Typography>
                    <Typography className="descrip" variant="body1" gutterBottom sx={descricoes}>
                        <CheckTwoToneIcon sx={icons} /> Livre acesso à musculação e cardio
                    </Typography>
                    <Typography className="descrip" variant="body1" gutterBottom sx={descricoes}>
                        <CheckTwoToneIcon sx={icons} /> Acompanhamento básico via aplicativo
                    </Typography>
                </>
            )}

            {valor === 150.00 && (
                
                <>
                    <Typography className="descrip" variant="body1" gutterBottom sx={descricoes}>
                        <CheckTwoToneIcon sx={icons} /> Acesso ilimitado (segunda a sábado)
                    </Typography>
                    <Typography className="descrip" variant="body1" gutterBottom sx={descricoes}>
                        <CheckTwoToneIcon sx={icons} /> 2 fichas de treino por mês com personal trainer
                    </Typography>
                    <Typography className="descrip" variant="body1" gutterBottom sx={descricoes}>
                        <CheckTwoToneIcon sx={icons} /> Avaliação física + bioimpedância mensal
                    </Typography>
                    <Typography className="descrip" variant="body1" gutterBottom sx={descricoes}>
                        <CheckTwoToneIcon sx={icons} /> Acesso a todas as aulas coletivas (HIIT, Funcional, Zumba)
                    </Typography>
                    <Typography className="descrip" variant="body1" gutterBottom sx={descricoes}>
                        <CheckTwoToneIcon sx={icons} /> Consulta com nutricionista a cada 6 meses
                    </Typography>
                </>
            )}

            {valor === 250.00 && (
                <>
                    <Typography className="descrip" variant="body1" gutterBottom sx={descricoes}>
                        <CheckTwoToneIcon sx={icons} /> Acesso 24h todos os dias, inclusive feriados
                    </Typography>
                    <Typography className="descrip" variant="body1" gutterBottom sx={descricoes}>
                        <CheckTwoToneIcon sx={icons} /> Personal trainer 2x por semana incluso
                    </Typography>
                    <Typography className="descrip" variant="body1" gutterBottom sx={descricoes}>
                        <CheckTwoToneIcon sx={icons} /> Avaliação física + bioimpedância quinzenal
                    </Typography>
                    <Typography className="descrip" variant="body1" gutterBottom sx={descricoes}>
                        <CheckTwoToneIcon sx={icons} /> Acesso VIP a todas aulas e salas (cross, spinning, yoga)
                    </Typography>
                    <Typography className="descrip" variant="body1" gutterBottom sx={descricoes}>
                        <CheckTwoToneIcon sx={icons} /> Consultas mensais com nutricionista e fisioterapeuta
                    </Typography>
                </>
            )}


            <Typography className="valor" variant="h3" sx={{ fontWeight: 600, color: colors.blueAccent[500] }}>R$ {valor.toFixed(2)}</Typography>
            <Button onClick={() => navigate(page)} variant="contained" color="primary" sx={{ fontSize: '1rem', mt: 2, backgroundColor: colors.primary[600], color: colors.grey[900], py: 1, px: 5, }}>
                Comprar
            </Button>
        </Paper>
    );
};



export default CardPlano;
