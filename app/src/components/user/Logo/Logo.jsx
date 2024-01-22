import React from "react";

export const Logo = ({fillColor,strokeColor}) => {
  
  return (
    <svg
      className="logotipo"
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="150"
      height="40"
      viewBox="1 -60 350 90"
      preserveAspectRatio="xMidYMid meet">
      <text fontSize="40" fill={fillColor} stroke={strokeColor}>
        <tspan
          fontSize="80"
          fontFamily="'Montserrat'"
          fontWeight="800"
          y='1'
          x='5'>
          S
        </tspan>
        <tspan
          x="50"
          y="-2"
          fontFamily="'roboto', sans-serif"
          fontWeight="700"
          fontSize="39">
          UMINISTROS
        </tspan>
      </text>
    </svg>
  );
};
