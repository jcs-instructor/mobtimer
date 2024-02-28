import "../App.css"
import React, { useEffect, useState } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ReactDOM from "react-dom";
import {
  DragDropContext,
  Draggable,
  DraggingStyle,
  Droppable,
  DropResult,
  NotDraggingStyle
} from "react-beautiful-dnd";
import { Controller } from '../mobtimer-api/src';

const controller = Controller.staticController as Controller;

type FormParameters = {
    participants: string[];
    setParticipants: (participants: string[]) => void;
    roles: string[];
}

interface Item {
  id: string;
  content: string;
}

const convertStringsToStringsWithIds = (participants: string[]): Item[] => {
    const participantsWithId = participants.map((participant, index) => {
      return {
        id: `item-${index}`,
        content: participant
      }
    });
    return participantsWithId;
  }

// a little function to help us with reordering the result
const reorder = (
  list: Item[],
  startIndex: number,
  endIndex: number
): Item[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

// const getItemStyle = (
//   isDragging: boolean,
//   draggableStyle: DraggingStyle | NotDraggingStyle | undefined
// ): React.CSSProperties => ({
//   // some basic styles to make the items look a bit nicer
//   userSelect: "none",
//   padding: grid * 2,
//   margin: `0 0 ${grid}px 0`,

//   // change background colour if dragging
//   background: isDragging ? "lightgreen" : "grey",

//   // styles we need to apply on draggables
//   ...draggableStyle
// });

const getListStyle = (isDraggingOver: boolean): React.CSSProperties => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250
});

//const Participants = ({ participants, roles }: FormParameters) => {
const ParticipantsDNDApp = ({participants, setParticipants, roles} : FormParameters): JSX.Element => {
  const [state, setState] = useState(convertStringsToStringsWithIds(participants));   
  // console.log("PARTICIPANTS.LENGTH: " + participants.length);
  // console.log("PARTICIPANTS WITH ID: " + JSON.stringify(participantsWithId));
  console.log("STATE: " + JSON.stringify(state));
  // console.log("PARTICIPANTS: " + participants);
  // console.log("GET ITEMS:" + JSON.stringify(convertStringsToStringsWithIds(participants)));

  useEffect(() => {
    const participantsWithId = (convertStringsToStringsWithIds(participants));
    setState(participantsWithId);
  }, [participants]);
  
  const onDragEnd = (result: DropResult): void => {    
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items: Item[] = reorder(
      state,
      result.source.index,
      result.destination.index
    );

    setState(items);
    const changedParticipants = items.map(item => item.content);
    setParticipants(changedParticipants);
    controller.client?.editParticipants(changedParticipants);
  };

  const defaultRole = "";

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  return (    
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, _snapshot): JSX.Element => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            // style={getListStyle(snapshot.isDraggingOver)}
          >
            {state.map((item, index) => (
              <div className="ParticipantRow">
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, _snapshot): JSX.Element => (
                    <div 
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      // style={getItemStyle(
                      //   snapshot.isDragging,
                      //   provided.draggableProps.style
                      // )}
                      className="CellBox ParticipantBorder"
                    >
                      {item.content}
                    </div>
                  )}
                </Draggable>              
                <div className="CellBox">{roles[index] || defaultRole}</div>                
              </div>              
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ParticipantsDNDApp