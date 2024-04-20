import React, { useState } from "react";
import "../styles/slider.scss";

export const Slider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [translateValue, setTranslateValue] = useState(0);

  const slideWidth = () => {
    return document.querySelector(".slide").clientWidth;
  };

  const goToNextSlide = () => {
    if (currentIndex === images.length - 1) {
      setCurrentIndex(currentIndex - 1)
      setTranslateValue(translateValue + slideWidth())
    } else {
      setCurrentIndex(currentIndex + 1)
      setTranslateValue(translateValue + -slideWidth())
    }
  };

  const goToPrevSlide = () => {
    if (currentIndex === 0) return;

    setCurrentIndex(currentIndex - 1)
    setTranslateValue(translateValue + slideWidth())
  };

  return <div className="slider">
    <div
      className="slider-wrapper"
      style={{
        transform: `translateX(${translateValue}px)`,
        transition: "transform ease-out 0.45s"
      }}
    >
      {images.map((image, i) => (
        <div className="slide" key={i} style={{ backgroundImage: `url(${image})` }}></div>
      ))}
    </div>
    {images.length > 1 ? (
      <div id="slider-arrows">
        <svg viewBox="0 0 230.4 448" fill="none" id="slider-arrow-left" onClick={goToPrevSlide}><path d="M213.328 21.696L16.724 227.245l196.093 201.873" stroke="#00a5e2" strokeWidth="28.134" strokeLinecap="round" strokeLinejoin="round" /></svg>
        <svg viewBox="0 0 230.4 448" id="slider-arrow-right" fill="none" onClick={goToNextSlide}><path d="M16.724 429.118l196.604-205.549L17.235 21.696" stroke="#00a5e2" strokeWidth="28.134" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </div>
    ) : (
      ""
    )}
  </div>
}