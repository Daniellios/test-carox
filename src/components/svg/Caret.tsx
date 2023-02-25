import React from "react";

interface ICaretProps {
  type: "left" | "right";
}

const Caret: React.FC<ICaretProps> = ({ type }) => {
  return (
    <>
      {type === "left" ? (
        <svg
          width="7"
          height="10"
          viewBox="0 0 7 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M5.5 1L1.5 5L5.5 9" stroke="white" strokeWidth="2" />
        </svg>
      ) : (
        <svg
          width="11"
          height="18"
          viewBox="0 0 11 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1 1L9 9L1 17" stroke="white" strokeWidth="2" />
        </svg>
      )}
    </>
  );
};

export default Caret;
