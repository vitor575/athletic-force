import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import "./styles.css";

const IconsFooter = () => {
  return (
    <main>
      <ul className="links-footer">
        <li>
          <a href="#sdadasda">
            <FaWhatsapp />
          </a>
        </li>
        <li>
          <a href="#sdadadas">
            <FaFacebook />
          </a>
        </li>
        <li>
          <a href="#dadasdada">
            <FaInstagram />
          </a>
        </li>
      </ul>
    </main>
  );
};

export default IconsFooter;
