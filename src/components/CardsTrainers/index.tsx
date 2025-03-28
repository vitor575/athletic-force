import "./styles.css";
import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import IconContato from "../IconContato";

interface CardHomeProps {
  imagem: string;
  titulo: string;
  descricao: string;
}

const CardsTraineres = ({ imagem, titulo, descricao }: CardHomeProps) => {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(".cardHome-container", {
      opacity: 1,
      scrollTrigger: {
        trigger: ".container-cx",
        start: "top 700px",
        end: "bottom 600px",
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
        <div className="buttons">
          <IconContato/>
        </div>
      </div>
    </main>
  );
};

export default CardsTraineres;
