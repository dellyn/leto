import Blank from "../Blank/Blank";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Controller } from "swiper/core";

import "swiper/components/navigation/navigation.min.css";
import "swiper/swiper.scss";
import "./Carousel.scss";
import { useState } from "react";

const slidesPerView = 5;
SwiperCore.use([Navigation]);

const CarouselComponent = (props) => {
  const [controlledSwiper, setControlledSwiper] = useState(null);

  const handleChange = () => {
    props.onSlideEnded();
  };

  const onSwiper = (swiper) => {
    console.log(swiper);
    swiper.slideTo(props.todaySlideIndex - 1, 0);
    setControlledSwiper(swiper);
  };

  const toNextSlide = () => {
    controlledSwiper &&
      controlledSwiper.slideTo(controlledSwiper.activeIndex + 1, 0);
  };

  const handleInit = (params) => {
    console.log(params);
  };
  console.log(controlledSwiper);
  return (
    <>
      <span className="swiper-button-prev btnPrevSlide"></span>

      <Swiper
        slidesPerView={slidesPerView}
        pagination={true}
        navigation={{ nextEl: ".btnNextSlide", prevEl: ".btnPrevSlide" }}
        onReachEnd={(data) => handleChange(data)}
        onSwiper={onSwiper}
        onInit={handleInit}
        slideDuplicateNextClass="creq"
        next={(e) => console.log(e)}
      >
        {props.data.map((data, idx) => {
          return (
            <SwiperSlide key={idx} virtualIndex={idx}>
              <Blank data={data} key={idx} onSave={props.onSave} />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <span className="swiper-button-next btnNextSlide"></span>
    </>
  );
};

export default CarouselComponent;
