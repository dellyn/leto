import React, { useEffect, useState } from "react";
import moment from "moment";
import CarouselComponent from "../Carousel/Carousel";
import { blankDefaultModel } from "../../constants/constants";
import { IBlank } from "constants/types";

import {
  timeFormat,
  daysOfTheWeek,
  LSDataName,
  LSLastUpdateDateName,
  updateStorage,
} from "./constants";

import "./styles.scss";

const Board = () => {
  const source = localStorage.getItem(LSDataName);
  const [appData, setAppData] = useState(JSON.parse(source) || []);
  const today = moment();
  const currentDate = today.format(timeFormat);

  const configTimeStatus = (newModel: IBlank, date: string) => {
    const isDayInPast = moment(date).isBefore(currentDate);
    const isDayInFuture = moment(date).isAfter(currentDate);
    if (isDayInPast) newModel.timeStatus = "past";
    else if (isDayInFuture) newModel.timeStatus = "future";
    else newModel.timeStatus = "present";

    return newModel;
  };

  const createBlanksByCount = (count: number, date?: string) => {
    const arr = [];
    const isInitialApp = !date;
    for (let i = isInitialApp ? -1 : 1; i <= count; i++) {
      const nextDay: string = moment(date).add(i, "days").format(timeFormat);
      const index = appData.length - 1 + i;
      arr.push(createNewBlank(nextDay, index));
    }
    return arr;
  };

  const createNewBlank = (date: string, id: number) => {
    const blank = { ...blankDefaultModel, date: date, id: id };
    return configTimeStatus(blank, date);
  };

  const addNewBlanks = (data: IBlank[] | IBlank) => {
    let updatedAppData = [];

    if (Array.isArray(data)) {
      updatedAppData = appData.concat(data);
    } else {
      updatedAppData.push(data);
    }

    setAppData(updatedAppData);
    updateStorage(updatedAppData);
  };

  const onSave = (model: IBlank) => {
    const updatedAppData = appData.map((blank: IBlank) => {
      return blank.id === model.id ? model : blank;
    });

    setAppData(updatedAppData);
    updateStorage(updatedAppData);
  };

  const onSlideEnded = () => {
    const lastSlideDate = appData[appData.length - 1].date;
    addNewBlanks(createBlanksByCount(daysOfTheWeek, lastSlideDate));
  };

  const todaySlideIndex = appData.findIndex((item: IBlank) =>
    moment(item.date).isSame(currentDate)
  );

  useEffect(() => {
    const initialApp = () => {
      if (appData.length < daysOfTheWeek) {
        addNewBlanks(createBlanksByCount(daysOfTheWeek));
      }
    };
    const updateAppData = (data: IBlank[]) => {
      const lastUpdateDateSource = localStorage.getItem(LSLastUpdateDateName);
      const lastUpdateDate = JSON.parse(lastUpdateDateSource);
      const lastUpdateIsToday = moment(lastUpdateDate).isSame(currentDate);

      if (!lastUpdateIsToday) {
        const updatedAppData = data.map((item: IBlank) => {
          return configTimeStatus(item, item.date);
        });
        updateStorage(updatedAppData);
        localStorage.setItem(LSLastUpdateDateName, JSON.stringify(currentDate));
      }
    };
    initialApp();
    updateAppData(appData);
  }, []);

  // custom live pagination, month and week navigation in v2
  const showPrevBlanks = () => {};
  const showNextBlnks = () => {};
  const navigateToDate = () => {};

  return (
    <>
      <h1 className="head-title">LETO</h1>
      <div className="board">
        <CarouselComponent
          data={appData}
          onSave={onSave}
          onSlideEnded={onSlideEnded}
          slidesCount={appData.length}
          todaySlideIndex={todaySlideIndex}
          handleEnter={() => {}}
        />
      </div>
    </>
  );
};

export default Board;
