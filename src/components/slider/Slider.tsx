import { slides } from "@/constants/slider";
import React, { useContext, useEffect, useState } from "react";
import hero_styles from "@/styles/Slider.module.css";
import SliderControl from "./SliderControl";

import shared_styles from "@/styles/Shared.module.css";
import { AppContext, IAppContext } from "@/context/appContext";
import Image from "next/image";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const { togglePopup } = useContext(AppContext) as IAppContext;

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (currentSlide === slides.length - 1) {
        setCurrentSlide(0);
      } else {
        setCurrentSlide((prev) => prev + 1);
      }
    }, 10000);

    return () => clearInterval(intervalId);
  }, [currentSlide]);

  const handleNextSlideChange = () => {
    if (currentSlide === 4) setCurrentSlide(0);
    else {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const handlePreviousSlide = () => {
    if (currentSlide === 0) setCurrentSlide(4);
    else {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  return (
    <div className={hero_styles.container}>
      {slides.map((slide, idx) => {
        if (currentSlide === idx) {
          return (
            <div className={hero_styles.text_wrap} key={idx}>
              <h1>{slide.title}</h1>
              <div className={`${hero_styles.get_car_wrap} `}>
                <h2 className={hero_styles.get_car_text}>{slide.text} </h2>
                <button
                  disabled={slide.isDisabled}
                  onClick={togglePopup}
                  className={shared_styles.button_filled}
                >
                  {slide.isLoading ? (
                    <div className={shared_styles.loading_ring}>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  ) : (
                    slide.buttonText
                  )}
                </button>
              </div>
            </div>
          );
        }
      })}

      <div className={hero_styles.image_container}>
        <Image
          className={hero_styles.image}
          src={"/Bg-car.jpg"}
          fill
          alt="img"
        ></Image>
      </div>

      <div className={hero_styles.image_wrap}>
        <div className={hero_styles.slider}>
          <div className={hero_styles.slider_position}>
            {slides.map((slide, idx) => {
              return (
                <div
                  key={slide.id}
                  className={`${hero_styles.slider_point} ${
                    currentSlide === idx ? hero_styles.active : ""
                  }`}
                ></div>
              );
            })}
          </div>

          <div className={hero_styles.slider_controls}>
            {slides.map((_, idx) => {
              if (currentSlide === idx) {
                return (
                  <>
                    <SliderControl
                      controlType="PREV"
                      handlePrev={handlePreviousSlide}
                    ></SliderControl>

                    <SliderControl
                      controlType="NEXT"
                      handleNext={handleNextSlideChange}
                    ></SliderControl>
                  </>
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
