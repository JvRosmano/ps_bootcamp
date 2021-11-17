import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

export default function Task({ name, id, index }) {
  return (
    <div>
      <Draggable key={id} draggableId={id} index={index}>
        {(providedDraggable, snapshot) => {
          return (
            <TaskWrapper
              {...providedDraggable.draggableProps}
              {...providedDraggable.dragHandleProps}
              ref={providedDraggable.innerRef}
              isDragging={snapshot.isDragging}
            >
              <h3>{name}</h3>
            </TaskWrapper>
          );
        }}
      </Draggable>
    </div>
  );
}

const TaskWrapper = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  text-align: center;
  background-color: ${(props) => (props.isDragging ? "lightblue" : "white")};
`;
