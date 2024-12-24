import React from "react";
import "./styles.css";
import { FaGooglePlay } from "react-icons/fa";
import { FaApple } from "react-icons/fa6";
import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


const ContatosFooter = () => {
  
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(".links", {
      opacity: 1,
      x:0,
      scrollTrigger: {
        trigger: ".lista-footer",
        start: "top 800px",
        end: "bottom 900px",
        scrub: true,
      },
    });

    return () => {
      gsap.killTweensOf(".links");
    };
  }, []);

  
  return (
    <div className="links">
      <ul className="lista-footer">
        <h1>Institucional</h1>

        <a href="#sada">Conceito e História</a>

        <a href="#sada">Fale conosco</a>

        <a href="#sada">Investidores</a>

        <a href="#sada">Contratos</a>

        <a href="#sada">Política de Privacidade</a>
      </ul>
      <ul className="lista-footer">
        <h1>Corporativo</h1>

        <a href="#sada">Trabalhe conosco</a>

        <a href="#sada">Indique um ponto</a>

        <a href="#sada">Divulgue sua marca</a>
      </ul>
      <ul className="lista-footer">
        <h1>Baixe o Aplicativo</h1>
        <div className="apps">
          <button>
            <FaApple />
            <span>App Store</span>
          </button>
          <button>
            <FaGooglePlay />
            Google Play
          </button>
        </div>
      </ul>
      <div className="maps">
        <h1>Local</h1>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3659.1794194964723!2d-46.47471708814433!3d-23.490046158889662!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce61a9987bafc1%3A0x1e71f06be950a1e9!2sRua%20Ricardo%20Butarello%20-%20Ermelino%20Matarazzo%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2003813-010!5e0!3m2!1spt-BR!2sbr!4v1734997787586!5m2!1spt-BR!2sbr"
          width="400"
          height="200"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default ContatosFooter;
