import React, { useState, useEffect } from "react";
import Blank from "../Blank/Blank";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper/core";

import "swiper/components/navigation/navigation.min.css";
import "swiper/swiper.scss";
import "./Carousel.scss";

const CarouselComponent = (props) => {
  SwiperCore.use([Navigation]);
  const slidesPerView = 5;

  const handleChange = (data) => {
    // const needToAddSlides =
    //   data.activeIndex + slidesPerView + 2 >= props.slidesCount &&
    //   data.activeIndex > slidesPerView
    //     ? true
    //     : false;

    // if (needToAddSlides) {
    // }

    props.onSlideEnded();
    console.log("addddd");
  };

  const onSwiper = (swiper) => {
    swiper.slideTo(props.todaySlideIndex - 1, 0);
  };

  return (
    <>
      <Swiper
        slidesPerView={slidesPerView}
        navigation={true}
        pagination={true}
        onReachEnd={(data) => handleChange(data)}
        onSwiper={onSwiper}
        activeIndex={3}
      >
        {props.data.map((data, idx) => {
          return (
            <SwiperSlide key={idx} virtualIndex={idx}>
              <Blank data={data} key={idx} onSave={props.onSave} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default CarouselComponent;
