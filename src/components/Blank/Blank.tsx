import React, { useState } from "react";
import moment from "moment";
import useSaveData from "../../helpers/useMount";
import { controlNumberOfTasks } from "helpers/helpers";
import TaskField from "components/TaskField/TaskField";
import { IBlank, ITask } from "constants/types";
import { IBlankProps } from "./types";
import "./styles.scss";

const Blank = (props: IBlankProps) => {
  const { data, onSave } = props;

  const [blankData, setBlankData] = useState<IBlank>({
    tasks: data.tasks,
    id: data.id,
    date: data.date,
    timeStatus: data.timeStatus,
  });

  const weekDay = moment(blankData.date).format("dddd");

  const configData = (data: ITask) => {
    console.log("config", data);

    const updatedTasks = blankData.tasks.map((task: ITask) => {
      return task.id === data.id ? data : task;
    });

    setBlankData((prevData) => {
      const copyData = { ...prevData, tasks: updatedTasks };
      const updatedData = controlNumberOfTasks(copyData);
      return updatedData;
    });
  };

  useSaveData(blankData, () => onSave(blankData));

  return (
    <div className={`blank ${blankData.timeStatus}`}>
      <h2 className="week-day">{weekDay}</h2>
      <p className="date">{blankData.date}</p>

      <form className="fields-list scroll">
        {blankData.tasks.map((task: ITask, index: number) => {
          return (
            <TaskField
              data={task}
              key={task.id}
              listCounter={index}
              blankId={blankData.id}
              onFieldChange={configData}
              handleEnter={props.handleEnter}
            />
          );
        })}
      </form>
    </div>
  );
};

export default React.memo(Blank);
