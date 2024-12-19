import React from "react";
import "./styles.css";
import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface CardProps {
  imagem: string;
  titulo: string;
  descricao: string;
}

const CardsHome = ({ imagem, titulo, descricao }: CardProps) => {

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(".cardHome-container", {
      opacity: 1,
      scrollTrigger: {
        trigger: ".container-cx",
        start: "top 900px",
        end: "bottom 900px",
        scrub: true,
        
      },
    });
    return () => {
      gsap.killTweensOf(".cardHome-container");
    };
  }, []);

  return (
    <main className="cardHome-container">
      <div className="container-cx">
        <div className="cardHome-image">
          <img src={imagem} alt={titulo} />
        </div>
        <div className="cardHome-titulo">
          <h1>{titulo}</h1>
        </div>
        <div className="cardHome-text">
          <p>{descricao}</p>
        </div>
      </div>
    </main>
  );
};

export default CardsHome;
