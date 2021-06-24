import React, { useEffect, useState } from "react";
import moment from "moment";
import CarouselComponent from "../Carousel/Carousel";
import { defaultTasksField, defaultModel } from "../../constants/constants";

import { IBlank } from "../../constants/types";
import "./styles.scss";

import {
  timeFormat,
  weekDaysCount,
  LSDataName,
  LSLastUpdateDateName,
  updateStorage,
} from "./constants";

const Board = () => {
  const source = localStorage.getItem(LSDataName);
  const [appData, setAppData] = useState(JSON.parse(source) || []);

  const today = moment();
  const currentDate = today.format(timeFormat);

  const configTimeStatus = (newModel: any, date: string, id: number) => {
    const isDayInPast = moment(date).isBefore(currentDate);
    const isDayInFuture = moment(date).isAfter(currentDate);
    if (isDayInPast) newModel.timeStatus = "past";
    else if (isDayInFuture) newModel.timeStatus = "future";
    else newModel.timeStatus = "present";

    return newModel;
  };

  if (appData.length === 0) {
    let nextDay = moment().add(-1, "days").format(timeFormat);
    const index = -1;
    addNewBlanks(createNewBlank(nextDay, index));
  } else {
    if (appData.length < weekDaysCount) {
      addNewBlanks(createBlanksByCount(weekDaysCount));
    }
  }
  function createBlanksByCount(count: number, date?: string) {
    const arr = [];
    for (let i = 0; i <= count; i++) {
      const nextDay: string = moment(date).add(i, "days").format(timeFormat);
      const index = appData.length - 1 + i;
      arr.push(createNewBlank(nextDay, index));
    }
    return arr;
  }

  function createNewBlank(date: string, id: number) {
    const blank = { ...defaultModel, date: date, id: id };
    return configTimeStatus(blank, date, id);
  }

  function addNewBlanks(data: IBlank[] | IBlank) {
    let updatedAppData = [];

    if (Array.isArray(data)) {
      updatedAppData = appData.concat(data);
    } else {
      updatedAppData.push(data);
    }

    setAppData(updatedAppData);
    updateStorage(updatedAppData);
  }

  const onSave = (model: IBlank) => {
    const updatedBlank = appData.find((blank: IBlank) => blank.id === model.id);
    updatedBlank.tasks = model.tasks;
    const updatedAppData = appData.map(
      (blank: IBlank) => (blank.id === model.id && updatedBlank) || blank
    );
    setAppData(updatedAppData);
    updateStorage(updatedAppData);
  };

  const updateAppData = (data: IBlank[]) => {
    const lastUpdateDateSource = localStorage.getItem(LSLastUpdateDateName);
    const lastUpdateDate = JSON.parse(lastUpdateDateSource);
    const lastUpdateIsToday = moment(lastUpdateDate).isSame(currentDate);

    if (!lastUpdateIsToday) {
      const updatedAppData = data.map((item: IBlank) => {
        return configTimeStatus(item, item.date, item.id);
      });
      updateStorage(updatedAppData);
      localStorage.setItem(LSLastUpdateDateName, JSON.stringify(currentDate));
    }
  };

  const onSlideEnded = () => {
    const lastSlideDate = appData[appData.length - 1].date;
    addNewBlanks(createBlanksByCount(weekDaysCount, lastSlideDate));
  };

  updateAppData(appData);
  const todaySlideIndex = appData.findIndex((item: IBlank) =>
    moment(item.date).isSame(currentDate)
  );

  useEffect(() => {
    if (appData.length === 0) {
      let nextDay = moment().add(-1, "days").format(timeFormat);
      const index = -1;
      addNewBlanks(createNewBlank(nextDay, index));
    } else {
      if (appData.length < weekDaysCount) {
        addNewBlanks(createBlanksByCount(weekDaysCount));
      }
    }
  }, []);

  // custom pagination in v2
  const showPrevBlanks = () => {};
  const showNextBlnks = () => {};
  const navigateToDate = () => {};

  return (
    <div className="board">
      <CarouselComponent
        data={appData}
        onSave={onSave}
        onSlideEnded={onSlideEnded}
        slidesCount={appData.length}
        todaySlideIndex={todaySlideIndex}
      />
    </div>
  );
};

export default Board;
