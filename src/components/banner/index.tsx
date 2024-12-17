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
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="banner-container">
      <div
        className="banner-slider"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <img key={index} src={image} alt={`Banner ${index + 1}`} />
        ))}
      </div>
    </div>
  );
};

export default Banner;
