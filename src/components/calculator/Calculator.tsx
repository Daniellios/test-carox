import React, { useContext, useEffect, useState } from "react";
import RangeInput from "./RangeInput";
import styles from "@/styles/Calculator.module.css";
import { useRangeCalcHook } from "@/hooks/useRangeCalcHook";
import { AppContext, IAppContext, IFormData } from "@/context/appContext";

const Calculator = () => {
  const { togglePopup, formData, handleFormData } = useContext(
    AppContext
  ) as IAppContext;

  const [price, setPrice] = useState<number>(3300000);

  const [firstPaymentPercent, setFirstPaymentPercent] = useState<number>(10);

  const [firstPaymentSum, setFirstPaymentSum] = useState<number>(1);

  const [months, setMonths] = useState<number>(60);

  const [monthlyPayment, setMonthlyPayment] = useState<number>(1);

  const [dealSum, setDealSum] = useState<number>(1);

  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [requestTextStatus, setRequestTextStatus] =
    useState<string>("Оставить заявку");

  const updatedFormData: IFormData = {
    ...formData,
    creditSum: price,
    creditTime: months,
    monthlyPayment: monthlyPayment,
    firstPayment: firstPaymentSum,
    totalSum: dealSum,
  };

  useEffect(() => {
    countFirstPayment();
    countMounthlyPayment();
    countLeaseDealSum();
    handleFormData({ ...updatedFormData });
  }, [price, monthlyPayment, months, firstPaymentPercent]);

  const sliderPropsPrice = {
    slidertype: "Price",
    min: 1000000,
    max: 6000000,
    valueType: "₽",
    step: 100000,
    title: "Желаемая сумма кредита",
  };

  const sliderPropsFirstPayment = {
    slidertype: "Payment",
    min: 10,
    max: 60,
    valueType: "%",
    step: 1,
    title: "Первоначальный взнос",
  };

  const sliderPropsTerms = {
    slidertype: "Terms",
    min: 1,
    max: 60,
    valueType: "мес.",
    step: 1,
    title: "Срок лизинга",
  };

  const priceRangeGrad = useRangeCalcHook(
    price,
    sliderPropsPrice.min,
    sliderPropsPrice.max
  );

  const initRangeGrad = useRangeCalcHook(
    firstPaymentPercent,
    sliderPropsFirstPayment.min,
    sliderPropsFirstPayment.max
  );

  const monthRangeGrad = useRangeCalcHook(
    months,
    sliderPropsTerms.min,
    sliderPropsTerms.max
  );

  const countFirstPayment = () => {
    let firstPaymentSum = (firstPaymentPercent / 100) * price;

    setFirstPaymentSum(Number(firstPaymentSum.toFixed(0)));
  };

  const countLeaseDealSum = () => {
    let leaseDealSum = firstPaymentSum + months * monthlyPayment;

    setDealSum(Number(leaseDealSum.toFixed(0)));
  };

  const countMounthlyPayment = () => {
    let monthPay =
      (price - firstPaymentSum) *
      ((0.035 * Math.pow(1 + 0.035, months)) /
        (Math.pow(1 + 0.035, months) - 1));

    setMonthlyPayment(Number(monthPay.toFixed(0)));
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        Рассчитайте стоимость автомобиля в лизинг
      </h2>

      <div className={styles.grid_container}>
        <div className={styles.slider_grid}>
          <RangeInput
            rangeGrad={priceRangeGrad}
            onSliderChange={setPrice}
            isDisabled={isDisabled}
            value={price}
            {...sliderPropsPrice}
          ></RangeInput>

          <RangeInput
            rangeGrad={initRangeGrad}
            firstPayment={firstPaymentSum}
            isDisabled={isDisabled}
            onSliderChange={setFirstPaymentPercent}
            value={firstPaymentPercent}
            {...sliderPropsFirstPayment}
          ></RangeInput>
          <RangeInput
            rangeGrad={monthRangeGrad}
            onSliderChange={setMonths}
            isDisabled={isDisabled}
            value={months}
            {...sliderPropsTerms}
          ></RangeInput>
        </div>

        <div className={styles.deal_grid}>
          <div className={styles.deal_container}>
            <h3 className={styles.deal_sub_title}>Сумма договора лизинга</h3>
            <h2 className={styles.deal_total}>
              {!isNaN(+dealSum) ? dealSum?.toLocaleString("ru-RU") + " ₽" : 0}
            </h2>
          </div>
          <div className={styles.deal_container}>
            <h3 className={styles.deal_sub_title}>Ежемесячный платеж от</h3>
            <h2 className={styles.deal_total}>
              {!isNaN(+monthlyPayment) && monthlyPayment !== Infinity
                ? monthlyPayment?.toLocaleString("ru-RU") + " ₽"
                : 0}
            </h2>
          </div>
          <button
            disabled={isDisabled}
            onClick={togglePopup}
            className={styles.button_main}
          >
            {isLoading ? (
              <div className={styles.loading_ring}>
                <div></div>
                <div></div>
                <div></div>
              </div>
            ) : (
              requestTextStatus
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
