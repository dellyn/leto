import Blank from "../Blank/Blank";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper/core";

import "swiper/components/navigation/navigation.min.css";
import "swiper/swiper.scss";
import "./Carousel.scss";

const slidesPerView = 5;
SwiperCore.use([Navigation]);

const CarouselComponent = (props) => {
  const handleChange = () => {
    props.onSlideEnded();
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
