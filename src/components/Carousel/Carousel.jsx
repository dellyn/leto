import { useEffect, useState } from "react";
import Blank from "../Blank/Blank";
import useWindowDimensions from "hooks/useWindowDimensions";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Virtual } from "swiper";
import {
  desktopSettings,
  mobileSettings,
  nextBtnClass,
  prevBtnClass,
} from "./constants";
import { screenSize } from "constants/constants";
import "swiper/components/navigation/navigation.min.css";
import "swiper/swiper.scss";
import "./carousel.scss";

SwiperCore.use([Navigation, Virtual]);
const slidesPerView = 4.33;

const CarouselComponent = (props) => {
  const { todaySlideIndex, onReachSliderEnd, data } = props;
  const { width } = useWindowDimensions();
  const initSettings = width < screenSize.xs ? mobileSettings : desktopSettings;

  const [swiperData, setSwiperData] = useState({
    activeIndex: null,
    swiper: null,
  });
  const [settings, setSettings] = useState(initSettings);

  const isUserInPrevBlanks =
    todaySlideIndex > swiperData.activeIndex + slidesPerView;
  const isUserInNextBlanks = todaySlideIndex < swiperData.activeIndex;
  const isTodayBlankHidden = isUserInPrevBlanks || isUserInNextBlanks;

  const onSwiper = (swiper) => {
    const initFocusSlide =
      width < screenSize.xs ? todaySlideIndex : todaySlideIndex - 1;
    swiper.slideTo(initFocusSlide, 0);
  };

  const navigateToTodayBlank = () => {
    swiperData?.swiper.slideTo(todaySlideIndex - 1, 0);
  };
  const onSlideChange = (swiper) => {
    setSwiperData({ activeIndex: swiper.activeIndex, swiper });
  };

  useEffect(() => {
    if (width < screenSize.xs) {
      setSettings(mobileSettings);
    } else if (width < screenSize.sm) {
      setSettings({
        slidesPerView: 2.5,
        centeredSlides: true,
      });
    } else {
      setSettings({ slidesPerView });
    }
  }, [width]);

  return (
    <>
      <div className="buttons">
        <span className={`nav-btn btnSlide ${prevBtnClass}`}></span>
        {isTodayBlankHidden && (
          <span
            className="nav-btn nav-btn-small home-page"
            onClick={navigateToTodayBlank}
          ></span>
        )}
        <span className={`nav-btn btnSlide ${nextBtnClass}`}></span>
      </div>

      <Swiper
        {...settings}
        onSwiper={onSwiper}
        pagination={true}
        navigation={{ nextEl: `.${nextBtnClass}`, prevEl: `.${prevBtnClass}` }}
        onSlideChange={onSlideChange}
        onReachEnd={onReachSliderEnd}
        virtual
      >
        {data.map((blankInfo, idx) => {
          return (
            <SwiperSlide key={`data-blank${idx}`} virtualIndex={idx}>
              <Blank data={blankInfo} onSave={props.onSave} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default CarouselComponent;
