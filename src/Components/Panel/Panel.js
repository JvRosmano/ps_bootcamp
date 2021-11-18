import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Column } from "../index";
import { DragDropContext } from "react-beautiful-dnd";

export default function Panel({ leads, columns }) {
  const [updateLeads, setUpdateLeads] = useState([]);
  const [lead1, setLead1] = useState([]);
  const [lead2, setLead2] = useState([]);
  const [lead3, setLead3] = useState([]);

  useEffect(() => {
    setUpdateLeads(leads);
    let lead1 = leads?.filter(
      (lead) => lead?.status === "Cliente em Potencial"
    );
    setLead1(lead1);
    let lead2 = leads?.filter((lead) => lead?.status === "Dados Confirmados");
    setLead2(lead2);
    let lead3 = leads?.filter((lead) => lead?.status === "Reunião Agendada");
    setLead3(lead3);
  }, [leads, updateLeads]);

  function handleLead2(lead2) {
    lead2.forEach((lead) => {
      if (lead?.status !== "Dados Confirmados" && lead !== undefined)
        lead.status = "Dados Confirmados";
    });
  }

  function handleLead3(lead3) {
    lead3.forEach((lead) => {
      if (lead?.status !== "Reunião Agendada" && lead !== undefined)
        lead.status = "Reunião Agendada";
    });
  }
  function onDragEnd(result) {
    const { destination, source } = result;
    if (!destination) return;

    if (
      destination.dropabbleId === source.dropabbleId &&
      destination.index === source.index
    )
      return;
    if (source.droppableId === "1" && destination.droppableId === "1") {
      const srcI = result.source.index;
      const desI = result.destination.index;
      lead1.splice(desI, 0, lead1.splice(srcI, 1)[0]);
      saveChanges();
    } else if (source.droppableId === "1" && destination.droppableId === "2") {
      const srcI = result.source.index;
      const desI = result.destination.index;
      lead2.splice(desI, 0, lead1.splice(srcI, 1)[0]);
      handleLead2(lead2);
      saveChanges();
    } else if (source.droppableId === "2" && destination.droppableId === "2") {
      const srcI = result.source.index;
      const desI = result.destination.index;
      lead2.splice(desI, 0, lead2.splice(srcI, 1)[0]);
      saveChanges();
    } else if (source.droppableId === "2" && destination.droppableId === "3") {
      const srcI = result.source.index;
      const desI = result.destination.index;
      lead3.splice(desI, 0, lead2.splice(srcI, 1)[0]);
      handleLead3(lead3);
      saveChanges();
    } else return;
  }
  function saveChanges() {
    leads = lead1.concat(lead2, lead3);
    leads = JSON.stringify(leads);
    localStorage.setItem("leads", leads);
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
