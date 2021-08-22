import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { view } from "@risingstack/react-easy-state";
import getGlobalState from "../../globalState/getGlobalState";
import setGlobalState from "../../globalState/setGlobalState";
import styled from "styled-components";

function PresortDND(props) {
  useEffect(() => {}, []);

  const langObj = JSON.parse(localStorage.getItem("langObj"));

  let presortSortedStatementsNum =
    localStorage.getItem("presortSortedStatementsNum") || 0;

  const itemsFromBackend = props.statements;
  const cardFontSize = `${props.cardFontSize + 6}px`;

  const cardHeight = 210;

  const columnsFromBackend = {
    cards: {
      name: langObj.statements,
      items: itemsFromBackend,
      id: "cards",
    },
    neg: {
      name: langObj.btnDisagreement,
      items: [],
      id: "neg",
    },
    neutral: {
      name: langObj.btnNeutral,
      items: [],
      id: "neutral",
    },
    pos: {
      name: langObj.btnAgreement,
      id: "pos",
      items: [],
    },
  };

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    // update statement characteristics
    const columnStatements = JSON.parse(
      localStorage.getItem("columnStatements")
    );
    const statementsArray = [...columnStatements.statementList];
    const destinationId = result.destination.droppableId;
    const draggableId = result.draggableId;

    for (let i = 0; i < statementsArray.length; i++) {
      if (statementsArray[i].id === draggableId) {
        if (destinationId === "neg") {
          statementsArray[i].divColor = "isNegativeStatement";
          statementsArray[i].cardColor = "pinkSortCard";
          statementsArray[i].pinkChecked = true;
          statementsArray[i].yellowChecked = false;
          statementsArray[i].greenChecked = false;
          statementsArray[i].sortValue = 111;
        }
        if (destinationId === "neutral") {
          statementsArray[i].divColor = "isUncertainStatement";
          statementsArray[i].cardColor = "yellowSortCard";
          statementsArray[i].pinkChecked = false;
          statementsArray[i].yellowChecked = true;
          statementsArray[i].greenChecked = false;
          statementsArray[i].sortValue = 222;
        }
        if (destinationId === "pos") {
          statementsArray[i].divColor = "isPositiveStatement";
          statementsArray[i].cardColor = "greenSortCard";
          statementsArray[i].pinkChecked = false;
          statementsArray[i].yellowChecked = false;
          statementsArray[i].greenChecked = true;
          statementsArray[i].sortValue = 333;
        }
      }
    }

    // set new ordering
    for (let i = 0; i < statementsArray.length; i++) {
      statementsArray[i].listIndex = i + 1;
    }

    // save to memory
    columnStatements.statementList = [...statementsArray];
    localStorage.setItem("columnStatements", JSON.stringify(columnStatements));

    // when dropped on different droppable
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);

      // change background color
      if (destColumn.id === "pos") {
        removed.backgroundColor = "#CCFFCC";
      }
      if (destColumn.id === "neg") {
        removed.backgroundColor = "rgba(255,182,193,0.6)";
      }

      destItems.splice(destination.index, 0, removed);

      // calc remaining statements
      if (sourceColumn.id === "cards") {
        presortSortedStatementsNum =
          window.statementsXML.length - sourceColumn.items.length + 1;
        setGlobalState(
          "presortSortedStatementsNum",
          presortSortedStatementsNum
        );
        presortSortedStatementsNum = presortSortedStatementsNum.toString();
        localStorage.setItem(
          "presortSortedStatementsNum",
          presortSortedStatementsNum
        );
      }

      // update progress bar
      const sortedStatements = getGlobalState("presortSortedStatementsNum");
      const ratio = sortedStatements / window.statementsXML.length;
      const completedPercent = (ratio * 30).toFixed();
      // update Progress Bar State
      setGlobalState("progressScoreAdditional", completedPercent);
      localStorage.setItem("progressScoreAdditional", completedPercent);

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
  }; // END DRAG-END

  const [columns, setColumns] = useLocalStorage(
    "columnsFromBackend",
    columnsFromBackend
  );

  // RENDER COMPONENT
  return (
    <PresortGrid>
      <div id="completionRatio">
        {presortSortedStatementsNum}/{window.statementsXML.length}
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
                          width: 300,
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
                                  <DroppableContainer
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
                                        ? item.backgroundColor
                                        : item.backgroundColor,
                                      color: "black",
                                      ...provided.draggableProps.style,
                                    }}
                                  >
                                    {item.statement}
                                  </DroppableContainer>
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
  margin-top: 50px;
  margin-bottom: 75px;
  display: grid;
  height: calc(100vh-75);
  grid-template-rows: 235px 25px 1fr;
  grid-template-columns: 1fr 320px 320px 320px 1fr;
  row-gap: 10px;
  column-gap: 20px;
`;

const DroppableContainer = styled.div`
  background-color: "#83cafe";
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 2px;
  border: 1px solid #a8a8a8;
`;
