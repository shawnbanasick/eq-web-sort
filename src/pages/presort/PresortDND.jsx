import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { view } from "@risingstack/react-easy-state";
import getGlobalState from "../../globalState/getGlobalState";
import setGlobalState from "../../globalState/setGlobalState";
import styled from "styled-components";

function PresortDND(props) {
  useEffect(() => {}, []);

  const langObj = JSON.parse(localStorage.getItem("langObj"));
  console.log(langObj);

  // let presortSortedStatementsNum = getGlobalState("presortSortedStatementsNum");
  let presortSortedStatementsNum =
    localStorage.getItem("presortSortedStatementsNum") || 0;

  const itemsFromBackend = props.statements;
  const cardFontSize = props.cardFontSize;
  const cardHeight = 145;
  // const posName = ;

  const columnsFromBackend = {
    cards: {
      name: langObj.statements,
      items: itemsFromBackend,
    },
    neg: {
      name: langObj.btnDisagreement,
      items: [],
    },
    neutral: {
      name: langObj.btnNeutral,
      items: [],
    },
    pos: {
      name: langObj.btnAgreement,
      items: [],
    },
  };

  const onDragEnd = (result, columns, setColumns) => {
    console.log(JSON.stringify(result));
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
        console.log(statementsArray[i]);
      }
    }
    console.log(JSON.stringify(statementsArray));
    for (let i = 0; i < statementsArray.length; i++) {
      statementsArray[i].listIndex = i + 1;
    }
    columnStatements.statementList = [...statementsArray];
    localStorage.setItem("columnStatements", JSON.stringify(columnStatements));

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      // calc remaining statements
      if (sourceColumn.name === "Statements") {
        presortSortedStatementsNum =
          window.statementsXML.length - sourceColumn.items.length + 1;
        console.log("remaining: ", presortSortedStatementsNum);
        setGlobalState(
          "presortSortedStatementsNum",
          presortSortedStatementsNum
        );
        console.log("sorted: ", presortSortedStatementsNum);
        presortSortedStatementsNum = presortSortedStatementsNum.toString();
        localStorage.setItem(
          "presortSortedStatementsNum",
          presortSortedStatementsNum
        );
      }

      // update progress bar
      const sortedStatements = getGlobalState("presortSortedStatementsNum");
      const ratio = sortedStatements / window.statementsXML.length;
      console.log(ratio);
      const completedPercent = (ratio * 30).toFixed();
      // update Progress Bar State
      setGlobalState("progressScoreAdditional", completedPercent);
      localStorage.setItem("progressScoreAdditional", `${completedPercent}`);

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

    // console.log(JSON.stringify(columns, null, 2));
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
  grid-template-rows: 200px 30px 1fr;
  grid-template-columns: 1fr 300px 300px 300px 1fr;
  row-gap: 10px;
  column-gap: 30px;
  margin-top: 10px;
`;
