import Blank from "../Blank/Blank";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/components/navigation/navigation.min.css";
import "swiper/swiper.scss";
import "./Carousel.scss";
import useWindowDimensions from "helpers/useWindowDimensions";
import { useEffect, useState } from "react";

let slidesPerView = 5;
const nextBtnClass = "btnNextSlide";
const prevBtnClass = "btnPrevSlide";

const CarouselComponent = (props) => {
  const [swiper, setSwiper] = useState(null);
  const windowSize = useWindowDimensions();
  const handleChange = () => {
    props.onSlideEnded();
  };

  const onSwiper = (swiper) => {
    swiper.slideTo(props.todaySlideIndex - 1, 0);
    setSwiper(swiper);
  };

  if (windowSize.width < 600) {
    slidesPerView = 1;
    swiper?.slideTo(props.todaySlideIndex, 0);
  } else if (windowSize.width < 900) {
    slidesPerView = 2;
  } else if (windowSize.width < 1100) {
    slidesPerView = 3;
  } else if (windowSize.width < 1400) {
    slidesPerView = 4;
  }

  return (
    <>
      <span className={`swiper-button-prev ${prevBtnClass}`}></span>

      <Swiper
        slidesPerView={slidesPerView}
        pagination={true}
        navigation={{ nextEl: `.${nextBtnClass}`, prevEl: `.${prevBtnClass}` }}
        onReachEnd={handleChange}
        onSwiper={onSwiper}
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
