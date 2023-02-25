import React, { useState, useEffect } from "react";

import styles from "@/styles/Sliders.module.css";

const RangeInput = ({
  rangeGrad,
  onSliderChange,
  isDisabled,
  firstPayment,
  slidertype,
  title,
  value,
  valueType,
  min,
  max,
  ...passedProps
}: any) => {
  const [sliderVal, setSliderVal] = useState(value);

  useEffect(() => {
    setSliderVal(value);
  }, [value]);

  const changeCallback = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      onSliderChange(min);
    } else {
      if (parseInt(e.target.value) > max + max) {
        onSliderChange(max);
      } else if (parseInt(e.target.value) < min - min) {
        onSliderChange(min);
      } else {
        onSliderChange(e.target.value);
      }
    }
  };

  const setCorectValue = (e: any) => {
    if (parseInt(e.target.value) > max) {
      onSliderChange(max);
    } else if (parseInt(e.target.value) < min) {
      onSliderChange(min);
    } else {
      onSliderChange(e.target.value);
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.text_input_container}>
        <input
          type="number"
          className={styles.text_input}
          value={slidertype === "Payment" ? firstPayment : sliderVal}
          onChange={changeCallback}
          placeholder={
            slidertype === "Payment" ? firstPayment + " ₽" : sliderVal
          }
          onBlur={setCorectValue}
          title={"Payment"}
        ></input>

        {slidertype === "Payment" ? (
          <div className={styles.percent_container}>
            {value} {valueType}
          </div>
        ) : (
          <div className={styles.value_container}>{valueType}</div>
        )}

        <input
          type="range"
          style={{
            background: `linear-gradient(90deg, rgb(255, 149, 20) ${rangeGrad}%, rgb(225, 225, 225) ${rangeGrad}%)`,
          }}
          value={sliderVal}
          className={styles.range}
          onChange={changeCallback}
          min={min}
          max={max}
          {...passedProps}
          disabled={isDisabled}
          title={"range"}
        ></input>
      </div>

      {isDisabled ? <div className={styles.disable_overlay}></div> : ""}
    </div>
  );
};
export default RangeInput;
