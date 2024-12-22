import React, { useState, useLayoutEffect } from "react";
import FotoContato from "./fotoContato";
import "./styles.css";
import logocontato from "../../img/logo.png";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Contato: React.FC = () => {
  const [formContatoState, setFormContato] = useState({
    nome: "",
    email: "",
    numero: "",
    textmensage: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormContato({ ...formContatoState, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dados enviados:", setFormContato);
  };

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(".container-contact", {
      opacity: 1,
      scrollTrigger: {
        trigger: ".formulario",
        start: "top 600px",
        end: "bottom 700px",
        scrub: true,
      },
    });

    return () => gsap.killTweensOf(".container-contact");
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
        <form className="formulario" onSubmit={handleSubmit}>
          <div className="nomecontato">
            CONTATO COM<span>ZENFIT</span>
          </div>
          <div className="forms">
            <input
              type="text"
              id="nome"
              name="nome"
              value={formContatoState.nome}
              onChange={handleChange}
              placeholder="Digite seu Nome :"
              required
            />
          </div>
          <div className="forms2">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Digite seu E-mail :"
              value={formContatoState.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              id="numero"
              name="numero"
              placeholder="(00) 00000-0000"
              required
              value={formContatoState.numero}
              onChange={handleChange}
            />
          </div>
          <textarea
            name="textmensage"
            placeholder="Deixe sua mensagem :"
            value={formContatoState.textmensage}
            onChange={handleChange}
            required
          ></textarea>
          <div className="submit">
            <button type="submit">Enviar mensagem</button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Contato;
