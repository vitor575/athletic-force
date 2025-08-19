import CardsTraineres from "./index";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import useWindowWidth from "../../hooks/useWindowWidth";
import trainer1 from "../../img/kayk.jpg"
import {useTheme } from "@mui/material";
import { tokens } from "../../tema";

const ListaTrainers = () => {
    const windowWidth = useWindowWidth();
    const isMobile = windowWidth <= 768;
     const theme = useTheme();
        const colors = tokens(theme.palette.mode);

    const trainers = [
        {
            imagem: trainer1,
            titulo: "Jeferson",
            descricao: "Personal trainer de 10 anos na Athletic",
        },
        {
            imagem: trainer1,
            titulo: "Cintia",
            descricao: "Personal trainer de 5 anos na Athletic",
        },
        {
            imagem: trainer1,
            titulo: "Matheus",
            descricao: "Personal trainer de 8 anos na Athletic",
        },
    ];

    if (isMobile) {
        // MOBILE → Carrossel
        return (
            <Swiper
                spaceBetween={25}
                style={{ padding: 20 }}
                breakpoints={{
                    320: { slidesPerView: 0.9 }, // celulares pequenos
                    640: { slidesPerView: 1.1 }, // celulares grandes
                    768: { slidesPerView: 1.9 }, // tablets
                    1024: { slidesPerView: 2 },  // desktop
                }}
            >
                {trainers.map((t, index) => (
                    <SwiperSlide key={index}>
                        <CardsTraineres
                            imagem={t.imagem}
                            titulo={t.titulo}
                            descricao={t.descricao}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        );
    }

    // DESKTOP → Grid
    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "20px",
                justifyItems: "center",
            }}
        >
            {trainers.map((t, index) => (
                <CardsTraineres
                    key={index}
                    imagem={t.imagem}
                    titulo={t.titulo}
                    descricao={t.descricao}
                />
            ))}
        </div>
    );
};

export default ListaTrainers;
