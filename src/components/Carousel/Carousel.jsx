import { useEffect, useState } from "react";
import Blank from "../Blank/Blank";
import useWindowDimensions from "hooks/useWindowDimensions";
import { screenSize } from "constants/constants";
import {
  desktopSettings,
  mobileSettings,
  nextBtnClass,
  prevBtnClass,
} from "./constants";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import "swiper/components/navigation/navigation.min.css";
import "swiper/swiper.scss";

import "./styles.scss";

SwiperCore.use([Navigation]);

const CarouselComponent = (props) => {
  const { todaySlideIndex } = props;
  const [swiperData, setSwiperData] = useState({
    activeIndex: null,
    swiper: null,
  });

  const { width } = useWindowDimensions();
  const initSettings = width < screenSize.xs ? mobileSettings : desktopSettings;
  const [settings, setSettings] = useState(initSettings);

  const onSwiper = (swiper) => {
    const initFocusSlide =
      width < screenSize.xs ? todaySlideIndex : todaySlideIndex - 1;
    swiper.slideTo(initFocusSlide, 0);
  };
  const navToHome = () => {
    swiperData?.swiper.slideTo(todaySlideIndex - 1, 0);
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

  const handleSlideChange = (swiper) => {
    setSwiperData({ activeIndex: swiper.activeIndex, swiper });
  };

  const activeSlideNotToday = swiperData.activeIndex + 1 !== todaySlideIndex;

  return (
    <>
      <div className="buttons">
        <span className={`nav-btn btnSlide ${prevBtnClass}`}></span>
        {activeSlideNotToday && (
          <span
            className="nav-btn nav-btn-small  home-page"
            onClick={navToHome}
          ></span>
        )}
        <span className="nav-btn  nav-btn-small calendar"></span>
        <span className={`nav-btn btnSlide ${nextBtnClass}`}></span>
      </div>

      <Swiper
        {...settings}
        onSwiper={onSwiper}
        pagination={true}
        navigation={{ nextEl: `.${nextBtnClass}`, prevEl: `.${prevBtnClass}` }}
        onSlideChange={handleSlideChange}
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
