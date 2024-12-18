import React from "react";
import Sobre from "../../img/sobre.jpg";
import CaixaTxt from "./caixaTxt";
import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./style.css";

const SobreFT = () => {

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(".imagemSobreTxt", {
      x: 0,
      opacity: 1,
      scrollTrigger: {
        trigger: ".imagem-container",
        start: "top 800px",
        end: "bottom 900px",
        scrub: true,
      },
    });
    return () => {
      gsap.killTweensOf(".imagemSobreTxt");
    };
  }, []);

  return (
    <div className="imagem-container">
      <img
        src={Sobre}
        alt="imagem da caixa do sobre"
        className="imagemSobreTxt"
      />
      <CaixaTxt />
    </div>
  );
};

export default SobreFT