import React from "react";

const CountdownCircle = () => {
  return (
    <svg
      version="1.1"
      id="circle"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 52 52"
      xmlSpace="preserve"
    >
      <circle
        fill="none"
        stroke="white"
        opacity={0.4}
        strokeWidth="2"
        cx="75"
        cy="26"
        r="24"
        strokeDasharray="360"
        strokeLinecap="round"
        transform="rotate(-90) translate(-100 0)"
      >
        <animate
          attributeName="opacity"
          values="0.4;0"
          dur="25s"
          restart="always"
          repeatCount="indefinite"
        ></animate>
      </circle>

      <circle
        fill="none"
        stroke="white"
        strokeWidth="2.3"
        cx="75"
        cy="26"
        r="24"
        strokeDasharray="360"
        strokeLinecap="round"
        transform="rotate(-90) translate(-100 0)"
      >
        <animate
          attributeName="stroke-dashoffset"
          from={360}
          to={0}
          dur="25s"
          repeatCount="indefinite"
        ></animate>
      </circle>
    </svg>
  );
};

export default CountdownCircle;
