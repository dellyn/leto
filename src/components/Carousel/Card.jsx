import React, { Component, useState } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// fake data generator

// a little function to help us with reordering the result
export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const grid = 8;

export const getItemStyle = (isDragging, draggableStyle) => {
  console.log(draggableStyle);
  return {
    userSelect: "none",
    background: isDragging ? "lightgreen" : "",
    ...draggableStyle,
    left: draggableStyle.left - 80,
    top: draggableStyle.top + 8,
  };
};

export const getListStyle = (isDraggingOver) => ({
  padding: isDraggingOver ? "0px 0px 30px 0px" : "",
});

const Card = (props) => {
  const [state, setstate] = useState(props.data);
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = reorder(state, result.source.index, result.destination.index);

    setstate(items);
  };

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {state.map((item, index) => (
              <Draggable
                key={`item-${item.id}`}
                draggableId={`item-${item.id}`}
                index={index}
              >
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
                    {item.date}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

// Put the thing into the DOM!

// Put the things into the DOM!
export default Card;
