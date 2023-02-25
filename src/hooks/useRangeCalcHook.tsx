import { useEffect, useState } from "react";

export const useRangeCalcHook = (
  val: number,
  minVal: number,
  maxVal: number
) => {
  const [value, setValue] = useState(
    ((val - minVal) / (maxVal - minVal)) * 100
  );

  useEffect(() => {
    setValue(((val - minVal) / (maxVal - minVal)) * 100);
  }, [val]);

  return value;
};
