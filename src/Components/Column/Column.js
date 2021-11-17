import React from "react";
import styled from "styled-components";
import { Task } from "../index";
import { Droppable } from "react-beautiful-dnd";

export default function Column({ leads, title, id }) {
  return (
    <ColumnWrapper>
      <Title>{title}</Title>
      <Leads>
        <div>
          <Droppable droppableId={id}>
            {(provided) => (
              <TaskWrapper ref={provided.innerRef} {...provided.droppableProps}>
                {provided.placeholder}
                {leads?.map((lead, index) => {
                  if (title === lead.status)
                    return (
                      <Task name={lead.name} id={lead.id} index={index}></Task>
                    );
                  else return null;
                })}
              </TaskWrapper>
            )}
          </Droppable>
        </div>
      </Leads>
    </ColumnWrapper>
  );
}

const ColumnWrapper = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 40vw;
`;
const Title = styled.h1`
  max-width: 30vw;
  padding: 8px;
  text-align: center;
`;

const Leads = styled.div`
  padding: 8px;
`;

const TaskWrapper = styled.div``;
