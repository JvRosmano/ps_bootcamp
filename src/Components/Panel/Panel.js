import React from "react";
import styled from "styled-components";
import { Column } from "../index";
import { DragDropContext } from "react-beautiful-dnd";

export default function Panel({ leads, columns }) {
  return (
    <PanelWrapper>
      <DragDropContext>
        {columns.map((column) => {
          return <Column title={column.title} leads={leads} id={column.id} />;
        })}
      </DragDropContext>
    </PanelWrapper>
  );
}

const PanelWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
