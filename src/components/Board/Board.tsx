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

import "./styles.scss";

const Board = () => {
  const [appData, setAppData] = useState<IBlank[]>(JSON.parse(source) || []);

  const createBlanksByCount = (count: number, date?: string) => {
    const blanksArr = [];
    const isInitialApp = !date;
    for (let i = isInitialApp ? -1 : 1; i <= count; i++) {
      const nextDay = moment(date).add(i, "days");
      const index = appData.length - 1 + i;
      blanksArr.push(createNewBlank(nextDay, index));
    }
    return blanksArr;
  };

  const createNewBlank = (date: any, id: number) => {
    return { ...blankDefaultModel, date: date, id: id };
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
    const updatedAppData = appData.map((blank) => {
      return blank.id === model.id ? model : blank;
    });

    setAppData(updatedAppData);
    updateStorage(updatedAppData);
  };

  const onSlideEnded = () => {
    const lastSlideDate = appData[appData.length - 1].date;
    addNewBlanks(createBlanksByCount(daysOfTheWeek, lastSlideDate));
  };

  const todaySlideIndex = appData.findIndex((item: IBlank) => {
    return compareAtPresentDay(item.date);
  });

  useEffect(() => {
    const firstInitialApp = () => {
      if (appData.length <= daysOfTheWeek) {
        addNewBlanks(createBlanksByCount(daysOfTheWeek));
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
