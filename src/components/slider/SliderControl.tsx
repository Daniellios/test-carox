import React from "react";
import styles from "@/styles/Slider.module.css";
import Caret from "../svg/Caret";
import CountdownCircle from "../svg/CountdownCircle";

interface SideControlProps {
  controlType: "NEXT" | "PREV";
  handleNext?: () => void;
  handlePrev?: () => void;
}

const SliderControl: React.FC<SideControlProps> = ({
  controlType,
  handleNext,
  handlePrev,
}) => {
  if (controlType === "NEXT") {
    return (
      <button className={styles.slider_controls_right} onClick={handleNext}>
        <CountdownCircle />
        <span className={styles.slider_contol_caret}>
          <Caret type="right" />
        </span>
      </button>
    );
  } else {
    return (
      <button className={styles.slider_controls_left} onClick={handlePrev}>
        <Caret type="left" />
      </button>
    );
  }
};

export default SliderControl;
