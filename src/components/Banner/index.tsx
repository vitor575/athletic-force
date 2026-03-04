import React, { useState, useEffect } from "react";
import banner1 from "../../img/banner1.png";
import banner2 from "../../img/blckfried2.png";
import { Box } from "@mui/material";

const Banner = () => {
  const images = [banner1, banner2];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <Box sx={{ width: "100%", overflow: "hidden"}}>
      <Box
        sx={{
          display: "flex",
          width: `${images.length * 100}%`,
          transform: `translateX(-${currentIndex * (100 / images.length)}%)`,
          transition: "transform 1s ease-in-out",
        }}
      >
        {images.map((image, index) => (
          <Box
            key={index}
            component="img"
            src={image}
            alt={`Banner ${index + 1}`}
            sx={{
              width: `${100 / images.length}%`,
              height: "600px",
              objectFit: "cover",
              flexShrink: 0,
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Banner;
