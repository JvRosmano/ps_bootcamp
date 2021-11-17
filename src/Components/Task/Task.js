import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

export default function Task({ name, id, index }) {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => {
        return (
          <TaskWrapper
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            innerRef={provided.innerRef}
          >
            <h3>{name}</h3>
          </TaskWrapper>
        );
      }}
    </Draggable>
  );
}

const TaskWrapper = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  text-align: center;
`;
