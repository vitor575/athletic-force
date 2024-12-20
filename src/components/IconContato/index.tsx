import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import "./styles.css"

const IconContato = () => {
  return (
    <main>
      <ul className="links-contact">
        <li>
          <FaWhatsapp />
        </li>
        <li>
          <FaFacebook />
        </li>
        <li>
          <FaInstagram />
        </li>
      </ul>
    </main>
  );
};

export default IconContato;
