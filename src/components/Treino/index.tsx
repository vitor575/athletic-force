import React from 'react';
import { useAppSelector } from '../../store';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  List,
  ListItem,
  Card,
  CardMedia,
  useTheme
} from '@mui/material';

import { tokens } from "../../tema"

const Treino: React.FC = () => {
  const { dia } = useParams();
  const treinos = useAppSelector((state) => state.treinos.treinos);
  const treinoDoDia = treinos.filter((treino) => treino.diaSemana === dia);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <List
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {treinoDoDia.map((treino, index) => (
          <ListItem key={index} disablePadding>
            <Card
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 5,
                boxShadow: "0px 5px 15px rgba(102, 102, 102, 0.32)"
              }}
            >
              <CardMedia
                component="img"
                image={treino.imgem}
                alt={treino.nome}
                sx={{
                  width: "10%",
                  objectFit: 'cover',

                }}
              />

              <Typography
                variant="h4"
                sx={{ fontWeight: 'bold', color:colors.primary[600] }}
              >
                {treino.nome}
              </Typography>
              <Typography variant="h6" sx={{ color: colors.primary[600] }}>
                {treino.repeticoes} repetições
              </Typography>

            </Card>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Treino;
