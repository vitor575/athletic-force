import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";
import "./styles.css";

const IconsFooter = () => {

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
