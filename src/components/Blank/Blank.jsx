import React, { useState, useEffect, useCallback } from "react";
import moment from "moment";
import useActionAfterMount from "../../helpers/useMount";
import TaskField from "components/TaskField/TaskField";
import { taskDefaultModel, defaultNumberOfFields } from "constants/constants";
import "./styles.scss";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Blank = (props) => {
  const { data } = props;
  const [blankData, setBlankData] = useState({
    tasks: data.tasks,
    id: data.id,
  });

  const day = moment(data.date).format("dddd");

  const configData = (data) => {
    const updatedTasks = blankData.tasks.map((task) =>
      task.id === data.id ? data : task
    );
    setBlankData((prevData) => {
      const updatedData = { ...prevData, tasks: updatedTasks };
      controlTasksCount(updatedData);
      return updatedData;
    });
  };

  const controlTasksCount = (data) => {
    if (data.tasks.length >= defaultNumberOfFields) {
      const fullAllFields = data.tasks.every((field) => field.label);
      if (fullAllFields) {
        const updatedBlankTaks = [...blankData.tasks];
        updatedBlankTaks.push({
          ...taskDefaultModel,
          id: updatedBlankTaks.length,
        });
        setBlankData((prevData) => ({ ...prevData, tasks: updatedBlankTaks }));
      }
      // else {
      //   const filteredTasks = data.tasks.filter((field) => field.label);
      //   console.log("no", filteredTasks);
      //   setBlankData((prevData) => ({ ...prevData, tasks: filteredTasks }));
      // }
    }
  };

  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: grid,
    width: 250,
  });

  const grid = 6;
  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle,
  });
  useActionAfterMount(blankData, () => props.onSave(blankData));

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      blankData.tasks,
      result.source.index,
      result.destination.index
    );

    setBlankData(items);
  };

  return (
    <div className={`blank ${data.timeStatus}`}>
      <h2>{day}</h2>
      <p>{data.date}</p>
      <div className="fields-list scroll">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId={`droppable${data.id}`}>
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {blankData.tasks.map((task, idx) => {
                  return (
                    <Draggable key={task.id} draggableId={task.id} index={idx}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <TaskField
                            data={task}
                            key={idx}
                            listCounter={idx}
                            blankId={blankData.id}
                            onFieldChange={configData}
                          />
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        {/* {blankData.tasks.map((task, idx) => {
          return (
            <TaskField
              data={task}
              key={idx}
              listCounter={idx}
              blankId={blankData.id}
              onFieldChange={configData}
            />
          );
        })} */}
      </div>
    </div>
  );
};

export default React.memo(Blank);
