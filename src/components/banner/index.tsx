import React from "react";
import banner from "../../img/banner1.png";
import black from "../../img/blckfried2.png";
import "./estiloBN.css";
import { useState, useEffect } from "react";

const Banner = () => {
  const images = [banner, black];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval); 
  }, [images.length]);


  return (
    <div className="banner">
      <img src={images[currentIndex]} alt={`Banner ${currentIndex + 1}`} />
    </div>
  );
};

export default Banner;
