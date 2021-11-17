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
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {leads.map((lead, index) => {
                  if (title === lead.status)
                    return (
                      <Task name={lead.name} id={lead.id} index={index}>
                        {provided.placeholder}
                      </Task>
                    );
                  else return null;
                })}
              </div>
            )}
          </Droppable>
        </div>
      </Leads>
    </ColumnWrapper>
  );
}

// {leads.map((lead) => {
//   if (title === lead.status) return <Task name={lead.name} />;
//   else return null;
// });}

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
