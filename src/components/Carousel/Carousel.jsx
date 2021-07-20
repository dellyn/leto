import { useEffect, useState } from "react";
import Blank from "../Blank/Blank";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import useWindowDimensions from "helpers/useWindowDimensions";
import { screenSize } from "constants/constants";
import {
  desktopSettings,
  mobileSettings,
  nextBtnClass,
  prevBtnClass,
} from "./constants";
import "swiper/components/navigation/navigation.min.css";
import "swiper/swiper.scss";

SwiperCore.use([Navigation]);

const CarouselComponent = (props) => {
  const { todaySlideIndex } = props;

  const { width } = useWindowDimensions();
  const initSettings = width < screenSize.xs ? mobileSettings : desktopSettings;
  const [settings, setSettings] = useState(initSettings);

  const onSwiper = (swiper) => {
    const initFocusSlide =
      width < screenSize.xs ? todaySlideIndex : todaySlideIndex - 1;
    swiper.slideTo(initFocusSlide, 0);
  };

  const handleChange = () => {
    props.onSlideEnded();
  };

  useEffect(() => {
    if (width < screenSize.xs) {
      setSettings(mobileSettings);
    } else if (width < screenSize.sm) {
      setSettings({
        slidesPerView: 2.5,
        centeredSlides: true,
      });
    } else if (width < screenSize.md) {
      setSettings({ slidesPerView: 4 });
    } else if (width < screenSize.lg) {
      setSettings({ slidesPerView: 4 });
    } else {
      setSettings(desktopSettings);
    }
  }, [width]);

  return (
    <>
      <span className={`swiper-button-prev ${prevBtnClass}`}></span>

      <Swiper
        {...settings}
        onSwiper={onSwiper}
        pagination={true}
        navigation={{ nextEl: `.${nextBtnClass}`, prevEl: `.${prevBtnClass}` }}
        onReachEnd={handleChange}
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
