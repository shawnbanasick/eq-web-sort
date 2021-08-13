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
  const cardHeight = `${props.cardHeight}px`;

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
      const completedPercent = (ratio * 30 + 20).toFixed();
      setGlobalState("progressScore", +completedPercent);

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
  };

  const [columns, setColumns] = useState(columnsFromBackend);

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
                                        ? "gray"
                                        : "#ececec",
                                      color: snapshot.isDragging
                                        ? "white"
                                        : "black",
                                      ...provided.draggableProps.style,
                                    }}
                                  >
                                    {item.content}
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
}

export default view(PresortDND);

const ColumnNamesDiv = styled.div`
  font-size: 22px;
  font-weight: bold;
`;

const PresortGrid = styled.div`
  display: grid;
  height: calc(100vh-50);
  grid-template-rows: ${(props) => props.cardHeight} 30px auto;
  grid-template-columns: 1fr 300px 300px 300px 1fr;
  row-gap: 10px;
  column-gap: 30px;
  margin-top: 10px;
`;
