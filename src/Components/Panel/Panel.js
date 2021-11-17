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

  function onDragEnd(result) {
    const { destination, source } = result;
    if (!destination) return;

    if (
      destination.dropabbleId === source.dropabbleId &&
      destination.index === source.index
    )
      return;

    if (source.droppableId === "1" && destination.droppableId === "1") {
      const leads = Array.from(lead1);
      const [reorderLeads] = leads.splice(result?.source?.index, 1);
      leads.splice(result?.destination?.index, 0, reorderLeads);
      setLead1(leads);
      saveChanges();
    } else if (
      source?.droppableId === "1" &&
      destination?.droppableId === "2"
    ) {
      const leads1 = Array.from(lead1);
      const leads2 = Array.from(lead2);
      const [firstChange] = leads1.splice(result?.source?.index, 1);
      firstChange["status"] = "Dados Confirmados";
      leads2.splice(result?.destination?.index, 0, firstChange);
      setLead1(leads1);
      setLead2(leads2);
      saveChanges();
    } else if (
      source?.droppableId === "2" &&
      destination?.droppableId === "2"
    ) {
      const leads = Array.from(lead2);
      const [reorderLeads] = leads.splice(result?.source?.index, 1);
      leads.splice(result?.destination?.index, 0, reorderLeads);
      setLead2(leads);
      saveChanges();
    } else if (
      source?.droppableId === "2" &&
      destination?.droppableId === "3"
    ) {
      const leads2 = Array.from(lead2);
      const leads3 = Array.from(lead3);

      const [secondChange] = leads2.splice(result?.source?.index, 1);
      secondChange["status"] = "Reunião Agendada";
      leads3.splice(result?.destination?.index, 0, secondChange);
      setLead2(leads2);
      setLead3(leads3);
      saveChanges();
    } else return;
  }
  function saveChanges() {
    leads = lead1.concat(lead2, lead3);
    leads = JSON.stringify(leads);
    localStorage.removeItem("leads");
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
