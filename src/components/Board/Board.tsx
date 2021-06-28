import React, { useEffect, useState } from "react";
import moment from "moment";
import CarouselComponent from "../Carousel/Carousel";
import { blankDefaultModel } from "../../constants/constants";
import { triggerInput } from "helpers/helpers";
import { IBlank } from "constants/types";

import {
  timeFormat,
  weekDaysCount,
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
    const updatedBlank = appData.find((blank: IBlank) => blank.id === model.id);
    updatedBlank.tasks = model.tasks;
    const updatedAppData = appData.map(
      (blank: IBlank) => (blank.id === model.id && updatedBlank) || blank
    );
    setAppData(updatedAppData);
    updateStorage(updatedAppData);
  };

  const onSlideEnded = () => {
    const lastSlideDate = appData[appData.length - 1].date;
    addNewBlanks(createBlanksByCount(weekDaysCount, lastSlideDate));
  };

  const todaySlideIndex = appData.findIndex((item: IBlank) =>
    moment(item.date).isSame(currentDate)
  );

  // field navigation using enter
  // const taskFieldsKeyboardNavigation = React.useCallback((event: any): void => {
  //   const bottomArrow = 40;
  //   const topArrow = 38;
  //   const enterKeyCode = 13;
  //   const deleteKeyCode = 8;
  //   const form = event.target.form;

  //   if (form) {
  //     const index = Array.prototype.indexOf.call(form, event.target);
  //     // if form html structure will be changed it's possible to crash
  //     const prevInputField = form.elements[index - 2];
  //     const nextInputField = form.elements[index + 2];
  //     const firstInputField = form.elements[0];
  //     const inputField = form.elements[index];

  //     switch (event.keyCode) {
  //       case enterKeyCode:
  //         nextInputField?.focus();
  //         event.preventDefault();

  //         break;
  //       case deleteKeyCode:
  //         if (inputField.value.length <= 1) {
  //           console.log("start", inputField.value.length);

  //           if (firstInputField === document.activeElement) {
  //             event.preventDefault();
  //             triggerInput(firstInputField);
  //             form.elements[0].focus();
  //           } else {
  //             event.preventDefault();
  //             triggerInput(inputField);
  //             prevInputField?.focus();
  //           }
  //         }
  //         console.log("end", inputField.value.length);

  //         break;
  //       case topArrow:
  //         event.preventDefault();
  //         prevInputField?.focus();

  //         break;
  //       case bottomArrow:
  //         event.preventDefault();
  //         nextInputField?.focus();

  //         break;
  //       default:
  //         break;
  //     }
  //   }
  // }, []);

  useEffect(() => {
    const initialApp = () => {
      if (appData.length < weekDaysCount) {
        addNewBlanks(createBlanksByCount(weekDaysCount));
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
    <div className="board">
      <CarouselComponent
        data={appData}
        onSave={onSave}
        onSlideEnded={onSlideEnded}
        slidesCount={appData.length}
        todaySlideIndex={todaySlideIndex}
        handleEnter={()=>{}}
      />
    </div>
  );
};

export default Board;
