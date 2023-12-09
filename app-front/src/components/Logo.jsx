import { useState } from "react";
import React from "react";

export const Logo = () => {
  const [hovered, setHovered] = useState(false);

  const changeColor = () => {
    setHovered(true);
  };

  const resetColor = () => {
    setHovered(false);
  };

  const fillColor = hovered ? "#f2f3f5" : "#f1f1f1"; // Color diferente al pasar el ratón

  return (
    <svg
      className="logotipo"
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="150"
      height="40"
      viewBox="0 -55 280 80"
      preserveAspectRatio="xMidYMid meet"
      onMouseOver={changeColor}
      onMouseOut={resetColor}>
      <text fontSize="40" fill={fillColor}>
        <tspan
          fontSize="70"
          fontFamily="'Roboto', sans-serif"
          fontWeight="700">
          S
        </tspan>
        <tspan
          x="48"
          y="-1"
          fontFamily="'Montserrat', sans-serif"
          fontWeight="700"
          fontSize="35">
          UMINISTROS
        </tspan>
      </text>
    </svg>
  );
};
