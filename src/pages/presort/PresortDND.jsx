import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { view } from "@risingstack/react-easy-state";
import getGlobalState from "../../globalState/getGlobalState";
import setGlobalState from "../../globalState/setGlobalState";
import styled from "styled-components";

let presortSortedStatements = getGlobalState("presortSortedStatements");

function PresortDND(props) {
  const itemsFromBackend = props.statements;
  const cardFontSize = props.cardFontSize;
  const cardHeight = props.cardHeight;

  const columnsFromBackend = {
    cards: {
      name: window.languageXML.statements,
      items: itemsFromBackend,
    },
    neg: {
      name: window.languageXML.negative,
      items: [],
    },
    neutral: {
      name: window.languageXML.neutral,
      items: [],
    },
    pos: {
      name: window.languageXML.positive,
      items: [],
    },
  };

  const onDragEnd = (result, columns, setColumns) => {
    console.log(JSON.stringify(result));
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      // calc remaining statements
      if (sourceColumn.name === "Statements") {
        presortSortedStatements =
          window.statementsXML.length - sourceColumn.items.length + 1;
        console.log("remaining: ", presortSortedStatements);
        setGlobalState("presortSortedStatements", presortSortedStatements);
      }

      // update progress bar
      const sortedStatements = getGlobalState("presortSortedStatements");
      const ratio = sortedStatements / window.statementsXML.length;
      console.log(ratio);
      const completedPercent = (ratio * 30 + 20).toFixed();
      setGlobalState("progressScore", +completedPercent);
      localStorage.setItem("progressScore", `${completedPercent}`);

      // update columns
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }

    console.log(JSON.stringify(columns, null, 2));
  };

  // const [columns, setColumns] = useState(columnsFromBackend);
  const [columns, setColumns] = useLocalStorage(
    "columnsFromBackend",
    columnsFromBackend
  );

  // RENDER COMPONENT
  return (
    <PresortGrid>
      <div id="completionRatio">
        {presortSortedStatements}/{window.statementsXML.length}
      </div>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              key={columnId}
              id={`${columnId}Div`}
            >
              <ColumnNamesDiv>{column.name}</ColumnNamesDiv>
              <div style={{ margin: 4 }}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        id={columnId}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "white",
                          padding: 4,
                          width: 250,
                        }}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="droppableCards"
                                    style={{
                                      userSelect: "none",
                                      padding: 16,
                                      margin: "0 0 8px 0",
                                      height: cardHeight,
                                      overflow: "hidden",
                                      fontSize: cardFontSize,
                                      backgroundColor: snapshot.isDragging
                                        ? "#e6bbad"
                                        : "#eeeeee",
                                      color: "black",
                                      ...provided.draggableProps.style,
                                    }}
                                  >
                                    {item.statement}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </PresortGrid>
  );

  function useLocalStorage(key, initialValue) {
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState(() => {
      try {
        // Get from local storage by key
        const item = window.localStorage.getItem(key);
        // Parse stored json or if none return initialValue
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        // If error also return initialValue
        console.log(error);
        return initialValue;
      }
    });
    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue = (value) => {
      try {
        // Allow value to be a function so we have same API as useState
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        // Save state
        setStoredValue(valueToStore);
        // Save to local storage
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        // A more advanced implementation would handle the error case
        console.log(error);
      }
    };
    return [storedValue, setValue];
  }
}

export default view(PresortDND);

const ColumnNamesDiv = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const PresortGrid = styled.div`
  display: grid;
  height: calc(100vh-50);
  grid-template-rows: ${(props) => props.cardHeightText};
  grid-template-columns: 1fr 300px 300px 300px 1fr;
  row-gap: 10px;
  column-gap: 30px;
  margin-top: 10px;
`;
