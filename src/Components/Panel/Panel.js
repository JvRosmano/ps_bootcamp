import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Column } from "../index";
import { DragDropContext } from "react-beautiful-dnd";

export default function Panel({ leads, columns }) {
  const [updateLeads, setUpdateLeads] = useState([]);

  useEffect(() => {
    setUpdateLeads(leads);
  }, [leads]);

  function onDragEnd(result) {
    const { destination, source } = result;
    if (!destination) return;

    if (
      destination.dropabbleId === source.dropabbleId &&
      destination.index === source.index
    )
      return;

    const leads = Array.from(updateLeads);
    const [reorderLeads] = leads.splice(result.source.index, 1);
    leads.splice(result.destination.index, 0, reorderLeads);
    setUpdateLeads(leads);
  }

  return (
    <PanelWrapper>
      <DragDropContext onDragEnd={onDragEnd}>
        {columns.map((column) => {
          return (
            <Column title={column.title} leads={updateLeads} id={column.id} />
          );
        })}
      </DragDropContext>
    </PanelWrapper>
  );
}

const PanelWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
