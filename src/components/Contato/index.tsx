import FotoContato from "./fotoContato";
import "./styles.css";
import logocontato from "../../img/logo.png";
import React, { useState } from "react";
import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"


const Contato: React.FC = () => {
  const [numeroTel, setNumeroTel] = useState("");

  const [letrasvalor, setLetrasvalor] = useState('');

  const indentificadorLetras = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Permite apenas letras
    const inputValueLetras = e.target.value.replace(/[^a-zA-Z]/g, ''); // Remove tudo que não é letra
    setLetrasvalor(inputValueLetras);
  };


  const indentificadorNumero = (e: React.ChangeEvent<HTMLInputElement>) => {
    let mascaraNum = e.target.value.replace(/\D/g, "");

    if (mascaraNum.length > 2) {
      mascaraNum = mascaraNum.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
    }
    if (mascaraNum.length > 6) {
      mascaraNum = mascaraNum.replace(/^(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    }
    if (mascaraNum.length > 2 && mascaraNum.length <= 6) {
      mascaraNum = mascaraNum.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
    }

    setNumeroTel(mascaraNum);
  };

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(".container-contact", {
      opacity: 1,
      scrollTrigger: {
        trigger: ".formulario",
        start: "top 800px",
        end: "bottom 900px",
        scrub: true,
    
      },
    });

    return () => {
      gsap.killTweensOf(".container-contact");
    };
  }, []);


  return (
    <main>
      <div>
        <FotoContato />
      </div>
      <div className="container-contact">
        <div className="logo">
          <img src={logocontato} alt="logocontato" className="animacao" />
        </div>
        <form action="" className="formulario">
          <div className="nomecontato">
            CONTATO COM<span>ZENFIT</span>
          </div>
          <div className="forms" >
            <input
              type="text"
              id="name"
              name="name"
              value={letrasvalor}
              onChange={indentificadorLetras}
              placeholder="Digite seu Nome :"
              required
            />
          </div>
          <div className="forms2" >
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Digite seu E-mail :"
              required
            />
            <input
              type="text"
              id="number"
              name="number"
              placeholder="(00) 00000-0000"
              required
              value={numeroTel}
              onChange={indentificadorNumero}
            />
          </div>
          <textarea
            name="caixatexto"
            placeholder="Deixe sua mensagem :"
          ></textarea>
          <div className="submit" >
            <button>Enviar mensagem</button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Contato;
