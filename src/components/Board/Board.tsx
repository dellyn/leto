import { useEffect, useState } from "react";
import moment from "moment";
import CarouselComponent from "../Carousel/Carousel";
import { blankDefaultModel } from "../../constants/constants";
import { IBlank } from "constants/types";

import {
  timeFormat,
  daysOfTheWeek,
  LSLastUpdateDateName,
  updateStorage,
  currentDate,
  source,
} from "./constants";

import "./styles.scss";

const Board = () => {
  const [appData, setAppData] = useState(JSON.parse(source) || []);

  const configTimeStatus = (newModel: IBlank, date: string) => {
    const isDayInPast = moment(date).isBefore(currentDate);
    const isDayInFuture = moment(date).isAfter(currentDate);
    const isDayInPresent = moment(date).isSame(currentDate);
    if (isDayInPast) newModel.timeStatus = "past";
    else if (isDayInFuture) newModel.timeStatus = "future";
    else if (isDayInPresent) {
      newModel.timeStatus = "present";
    }
    return newModel;
  };

  const createBlanksByCount = (count: number, date?: string) => {
    const blanksArr = [];
    const isInitialApp = !date;
    for (let i = isInitialApp ? -1 : 1; i <= count; i++) {
      const nextDay: string = moment(date).add(i, "days").format(timeFormat);
      const index = appData.length - 1 + i;
      blanksArr.push(createNewBlank(nextDay, index));
    }
    return blanksArr;
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
    const firstInitialApp = () => {
      if (appData.length <= daysOfTheWeek) {
        addNewBlanks(createBlanksByCount(daysOfTheWeek));
      }
    };
    const everydayUpdateApp = (data: IBlank[]) => {
      const lastUpdateDateSource = localStorage.getItem(LSLastUpdateDateName);
      const lastUpdateDate = JSON.parse(lastUpdateDateSource);
      const lastUpdateIsToday = moment(lastUpdateDate).isSame(currentDate);

      if (!lastUpdateIsToday) {
        const updatedAppData = data.map((item: IBlank) => {
          return configTimeStatus(item, item.date);
        });
        updateStorage(updatedAppData);
        setAppData(updatedAppData);
        localStorage.setItem(LSLastUpdateDateName, JSON.stringify(currentDate));
      }
    };
    everydayUpdateApp(appData);
    firstInitialApp();
  }, []);

  // custom live pagination, month and week navigation in v2
  const showPrevBlanks = () => {};
  const showNextBlnks = () => {};
  const navigateToDate = () => {};
  const exportToExcel = () => {};

  return (
    <>
      <div className="board-wrapper">
        <div className="container">
          <div className="board">
            <CarouselComponent
              data={appData}
              onSave={onSave}
              onSlideEnded={onSlideEnded}
              slidesCount={appData.length}
              todaySlideIndex={todaySlideIndex}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Board;
