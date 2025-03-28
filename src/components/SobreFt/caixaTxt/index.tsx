import React from "react";
import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./style.css";

const CaixaTxt = () => {


  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(".caixaDetxt", {
      opacity: 1,
      scrollTrigger: {
        trigger: ".caixa",
        start: "top 800px",
        end: "bottom 900px",
        scrub: true,
      
      },
    });
    return () => {
      gsap.killTweensOf(".caixaDetxt");
    };
  }, []);

  return (
    <div className="caixa">
      <div className="caixaDetxt">
        <h1>
          Conheça a historia da <span>ZenFit</span>
        </h1>
        <p>
          ZenFit fundada em 2015, a Academia Zenfit tem a missão de promover
          saúde e bem-estar em um ambiente acolhedor e inspirador.
        </p>
        <p>
          Com profissionais qualificados e estrutura moderna, buscamos
          transformar vidas através da atividade física e do autocuidado. Venha
          fazer parte dessa jornada!
        </p>
      </div>
    </div>
  );
};

export default CaixaTxt;
