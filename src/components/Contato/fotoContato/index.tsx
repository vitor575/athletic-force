import React from 'react'
import ImagemContato from "../../../img/imagemContato.jpg"
import "../styles.css"
import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
    <div className='imagem-contato'>
        <img src={ImagemContato} alt="ImagemContato" className='imagemlogocontato'/>
    </div>
  )
}

export default FotoContato
