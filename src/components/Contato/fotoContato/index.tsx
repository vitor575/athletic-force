import React, { useLayoutEffect } from "react";
import { Box } from "@mui/material";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ImagemContato from "../../../img/imagemContato.jpg";

const FotoContato = () => {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(".imagem-contato", {
      opacity: 1,
      scrollTrigger: {
        trigger: ".imagemlogocontato",
        start: "top 600px",
        end: "bottom 700px",
        scrub: true,
      },
    });

    return () => {
      gsap.killTweensOf(".imagem-contato");
    };
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
        top: "-150px",
        opacity: 0,
        display: "flex",
        justifyContent: "center",
      }}
      className="imagem-contato"
    >
      <img
        src={ImagemContato}
        alt="ImagemContato"
        className="imagemlogocontato"
        style={{ width: "100%", objectFit: "cover" }}
      />
    </Box>
  );
};

export default FotoContato;