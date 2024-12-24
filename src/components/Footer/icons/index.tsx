import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";
import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles.css";

const IconsFooter = () => {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(".links-footer", {
      opacity: 1,
      x: 0,
      scrollTrigger: {
        trigger: ".link",
        start: "top 700px",
        end: "bottom 800px",
        scrub: true,

      },
    });

    return () => {
      gsap.killTweensOf(".links-footer");
    };
  }, []);
  return (
    <main >
      <div className="animacao">
        <ul className="links-footer">
          <li className="link">
            <a href="#sdadasda">
              <FaWhatsapp />
            </a>
          </li>
          <li className="link">
            <a href="#sdadadas">
              <FaFacebook />
            </a>
          </li>
          <li className="link">
            <a href="#dadasdada">
              <FaInstagram />
            </a>
          </li>
          <li className="link">
            <a href="#dadasdada">
              <FaTiktok />
            </a>
          </li>
        </ul>
      </div>
    </main>
  );
};

export default IconsFooter;
