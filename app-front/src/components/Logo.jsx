import React from "react";

export const Logo = ({fillColor,strokeColor}) => {
  
  return (
    <svg
      className="logotipo"
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width="150"
      height="40"
      viewBox="0 -50 270 80"
      preserveAspectRatio="xMidYMid meet">
      <text fontSize="40" fill={fillColor} stroke={strokeColor}>
        <tspan
          fontSize="60"
          fontFamily="'Roboto', sans-serif"
          fontWeight="800"
          y='1'
          x='3'>
          S
        </tspan>
        <tspan
          x="48"
          y="-1"
          fontFamily="'Montserrat', sans-serif"
          fontWeight="800"
          fontSize="30">
          UMINISTROS
        </tspan>
      </text>
    </svg>
  );
};
