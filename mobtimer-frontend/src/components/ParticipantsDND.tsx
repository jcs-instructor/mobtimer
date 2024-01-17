import "../App.css"
import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
  DragDropContext,
  Draggable,
  DraggingStyle,
  Droppable,
  DropResult,
  NotDraggingStyle
} from "react-beautiful-dnd";

type FormParameters = {
    participants: string[];
    //roles: string[];
}

/*
const Participants = ({ participants, roles }: FormParameters) => {

    const defaultRole = "";

    return (
        <div style={{ display: "block" }}>
            <label>Participants: </label>
            {participants.map((participant, i) =>
                <div key={i} className="ParticipantRow">
                    <div className="CellBox ParticipantBorder">{participant}</div>
                    <div className="CellBox">{roles[i] || defaultRole}</div>
                </div>)}
        </div>
    )
}

export default Participants
*/

interface Item {
  id: string;
  content: string;
}

// fake data generator
const getItems = (count: number): Item[] =>
  Array.from({ length: count }, (_v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `item ${k}`
  }));
// const convertStringsToStringsWithIds = (strings: string[]): Item[] =>
//   Array.from({ length: strings.length }, (_v, k) => k).map(k => ({
//     id: `item-${k}`,
//     content: `${strings[k]}`
//   }));  

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

const getItemStyle = (
  isDragging: boolean,
  draggableStyle: DraggingStyle | NotDraggingStyle | undefined
): React.CSSProperties => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = (isDraggingOver: boolean): React.CSSProperties => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250
});

//const Participants = ({ participants, roles }: FormParameters) => {
const ParticipantsDNDApp = ({participants} : FormParameters): JSX.Element => {
  const participantsWithId = (getItems(participants.length)); //convertStringsToStringsWithIds(participants);
  const [state, setState] = useState(participantsWithId); //(getItems(5));  
  console.log("PARTICIPANTS.LENGTH: " + participants.length);
  console.log("PARTICIPANTS WITH ID: " + JSON.stringify(participantsWithId));
  console.log("STATE: " + JSON.stringify(state));
  console.log("PARTICIPANTS: " + participants);
  console.log("GET ITEMS:" + JSON.stringify(getItems(participants.length)));

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
  };

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  return (    
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot): JSX.Element => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {state.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot): JSX.Element => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    {item.content}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ParticipantsDNDApp