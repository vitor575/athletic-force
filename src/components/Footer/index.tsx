import React from "react";
import "./styles.css";
import logoDois from "../../img/logo2.png";
import IconsFooter from "./icons";
import ContatosFooter from "./contatosFooter";
import TextFooter from "./text";
import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Footer = () => {


  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(".logo-dois", {
      opacity: 1,
      x:0,
      scrollTrigger: {
        trigger: ".imglogodois",
        start: "top 600px",
        end: "bottom 700px",
        scrub: true,
      },
    });

    return () => {
      gsap.killTweensOf(".logo-dois");
    };
  }, []);

  
  return (
    <main>
      <div className="logo-dois">
        <img src={logoDois} alt="segunda logo zenfit" className="imglogodois"/>
      </div>
      <div>
        <IconsFooter />
      </div>
      <div>
        <ContatosFooter />
      </div>
      <div>
        <TextFooter />
      </div>
      <div className="fimFooter">
        <h1>Copyright © 2024. ZenFit Academy. Todos os direitos reservados</h1>
      </div>
    </main>
  );
};

export default Footer;
