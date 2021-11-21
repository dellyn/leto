import { useEffect, useState } from "react";
import moment from "moment";
import CarouselComponent from "../Carousel/Carousel";
import { blankDefaultModel } from "../../constants/constants";
import { IBlank } from "constants/types";

import {
  daysOfTheWeek,
  updateStorage,
  compareAtPresentDay,
  source,
} from "./constants";

import "./board.scss";

const Board = () => {
  const [appData, setAppData] = useState<IBlank[]>(JSON.parse(source) || []);

  const createBlanksByCount = (count: number, date?: string) => {
    const blanksArr = [];
    const isInitialApp = !date;
    for (let i = isInitialApp ? -1 : 1; i <= count; i++) {
      const nextDayDate = moment(date).add(i, "days");
      const lastBlankIndex = appData.length - 1 + i;
      blanksArr.push(createNewBlank(nextDayDate, lastBlankIndex));
    }
    return blanksArr;
  };

  const createNewBlank = (date: any, id: number) => {
    return { ...blankDefaultModel, date: date, id: id };
  };

  const addNewBlanksToBoard = (data: IBlank[] | IBlank) => {
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
    const updatedAppData = appData.map((blank) => {
      return blank.id === model.id ? model : blank;
    });

    setAppData(updatedAppData);
    updateStorage(updatedAppData);
  };

  const onReachSliderEnd = () => {
    const lastSlideDate = appData[appData.length - 1].date;
    addNewBlanksToBoard(createBlanksByCount(daysOfTheWeek, lastSlideDate));
  };

  const todaySlideIndex = appData.findIndex((item: IBlank) =>
    compareAtPresentDay(item.date)
  );

  useEffect(() => {
    const firstInitialApp = () => {
      if (appData.length <= daysOfTheWeek) {
        addNewBlanksToBoard(createBlanksByCount(daysOfTheWeek));
      }
    };

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
              onReachSliderEnd={onReachSliderEnd}
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
