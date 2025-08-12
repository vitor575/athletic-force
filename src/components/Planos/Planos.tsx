import React from "react";
import CardPlano from "./CardPlano";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import useWindowWidth from "../../hooks/useWindowWidth";

const Planos = () => {
    const windowWidth = useWindowWidth();
    const isMobile = windowWidth <= 768;

    const planos = [
        { plano: "Plano 1", valor: 99.99, page: "/Planos/Plano1" },
        { plano: "Plano 2", valor: 150.0, page: "/Planos/Plano2" },
        { plano: "Plano 3", valor: 250.0, page: "/Planos/Plano3" },
    ];

    if (isMobile) {
        // MOBILE → Carrossel
        return (
            <Swiper spaceBetween={25}
                style={{padding: 20}}
                breakpoints={{
                    320: {       // celulares pequenos
                        slidesPerView: .9,
                    },
                    640: {       // celulares grandes
                        slidesPerView: 1.1,
                    },
                    768: {       // tablets
                        slidesPerView: 1.9,
                    },
                    1024: {      // desktop
                        slidesPerView: 2,
                    },
                }}
            >
                {planos.map((p) => (
                    <SwiperSlide key={p.plano}>
                        <CardPlano plano={p.plano} valor={p.valor} page={p.page} />
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
                gap: "10px",
                justifyItems: "center",
            }}
        >
            {planos.map((p) => (
                <CardPlano key={p.plano} plano={p.plano} valor={p.valor} page={p.page} />
            ))}
        </div>
    );
};

export default Planos;
