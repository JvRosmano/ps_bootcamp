import React from "react";
import styled from "styled-components";
import { Column } from "../index";
import { DragDropContext } from "react-beautiful-dnd";

export default function Panel({ leads, columns }) {
  function onDragEnd(result) {
    // const { destination, source, dragabbleId } = result;
    // if (!destination) return;
    // if (
    //   destination.dropabbleId === source.dropabbleId &&
    //   destination.index === source.index
    // )
    //   return;
    // const column = columns[source.dropabbleId];
  }
  return (
    <PanelWrapper>
      <DragDropContext onDragEnd={onDragEnd}>
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
