import { useState } from "react";
import Blank from "../Blank/Blank";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/components/navigation/navigation.min.css";
import "swiper/swiper.scss";
import "./Carousel.scss";

const slidesPerView = 5;
const nextBtnClass = "btnNextSlide";
const prevBtnClass = "btnPrevSlide";

const CarouselComponent = (props) => {
  const [controlledSwiper, setControlledSwiper] = useState(null);

  const handleChange = () => {
    props.onSlideEnded();
  };

  const onSwiper = (swiper) => {
    swiper.slideTo(props.todaySlideIndex - 1, 0);
    setControlledSwiper(swiper);
  };

  const toNextSlide = () => {
    controlledSwiper &&
      controlledSwiper.slideTo(controlledSwiper.activeIndex + 1, 0);
  };

  const handleInit = (params) => {};
  return (
    <>
      <span className={`swiper-button-prev ${prevBtnClass}`}></span>

      <Swiper
        slidesPerView={slidesPerView}
        pagination={true}
        navigation={{ nextEl: `.${nextBtnClass}`, prevEl: `.${prevBtnClass}` }}
        onReachEnd={(data) => handleChange(data)}
        onSwiper={onSwiper}
        onInit={handleInit}
        slideDuplicateNextClass="creq"
      >
        {props.data.map((data, idx) => {
          return (
            <SwiperSlide key={idx} virtualIndex={idx}>
              <Blank data={data} key={idx} onSave={props.onSave} />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <span className={`swiper-button-next ${nextBtnClass}`}></span>
    </>
  );
};

export default CarouselComponent;
