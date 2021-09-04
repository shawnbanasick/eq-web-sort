import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { view } from "@risingstack/react-easy-state";
import getGlobalState from "../../globalState/getGlobalState";
import setGlobalState from "../../globalState/setGlobalState";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";

function PresortDND(props) {
  const langObj = getGlobalState("langObj");
  const configObj = getGlobalState("configObj");
  const statementsName = ReactHtmlParser(decodeHTML(langObj.presortStatements));
  const btnDisagreement = ReactHtmlParser(
    decodeHTML(langObj.presortDisagreement)
  );
  const btnAgreement = ReactHtmlParser(decodeHTML(langObj.presortAgreement));
  const btnNeutral = ReactHtmlParser(decodeHTML(langObj.presortNeutral));

  let presortSortedStatementsNum =
    +getGlobalState("presortSortedStatementsNum") || 0;

  const itemsFromBackend = props.statements;
  const cardFontSize = `${props.cardFontSize + 6}px`;

  const cardHeight = 210;

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    // update statement characteristics
    const columnStatements = getGlobalState("columnStatements");
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
    setGlobalState("columnStatements", columnStatements);

    // when dropped on different droppable
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);

      // change background color
      if (destColumn.id === "pos") {
        removed.backgroundColor = configObj.greenCardColor;
      }
      if (destColumn.id === "neg") {
        removed.backgroundColor = configObj.pinkCardColor;
      }
      if (destColumn.id === "neutral") {
        removed.backgroundColor = configObj.yellowCardColor;
      }

      destItems.splice(destination.index, 0, removed);

      // calc remaining statements
      if (sourceColumn.id === "cards") {
        presortSortedStatementsNum =
          configObj.totalStatements - sourceColumn.items.length + 1;
        setGlobalState(
          "presortSortedStatementsNum",
          presortSortedStatementsNum
        );
        presortSortedStatementsNum = presortSortedStatementsNum.toString();

        setGlobalState(
          "presortSortedStatementsNum",
          presortSortedStatementsNum
        );
      }

      // update progress bar
      const sortedStatements = +getGlobalState("presortSortedStatementsNum");
      const ratio = sortedStatements / configObj.totalStatements;
      const completedPercent = (ratio * 30).toFixed();
      // update Progress Bar State
      setGlobalState("progressScoreAdditional", completedPercent);

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

  const [columns, setColumns] = useState({
    cards: {
      name: statementsName,
      items: itemsFromBackend,
      id: "cards",
    },
    neg: {
      name: btnDisagreement,
      items: [],
      id: "neg",
    },
    neutral: {
      name: btnNeutral,
      items: [],
      id: "neutral",
    },
    pos: {
      name: btnAgreement,
      id: "pos",
      items: [],
    },
  });

  useEffect(() => {
    let projectResultsObj = getGlobalState("results");
    projectResultsObj.npos = columns.pos.items.length;
    projectResultsObj.nneu = columns.neutral.items.length;
    projectResultsObj.nneg = columns.neg.items.length;
    setGlobalState("results", projectResultsObj);
  }, [columns]);

  if (columns.cards.items.length === 0) {
    setGlobalState("presortFinished", true);
    setGlobalState("triggerPresortFinishedModal", true);
  }

  // RENDER COMPONENT
  return (
    <PresortGrid>
      <div id="completionRatio">
        {presortSortedStatementsNum}/{configObj.totalStatements}
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
                              className="dragObject"
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
                                      filter: snapshot.isDragging
                                        ? "brightness(0.85)"
                                        : "brightness(1.00)",
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
}

export default view(PresortDND);

const ColumnNamesDiv = styled.div`
  font-size: 20px;
  font-weight: bold;
  padding-left: 3px;
  padding-right: 3px;
`;

const PresortGrid = styled.div`
  margin-top: 65px;
  margin-bottom: 55px;
  display: grid;
  height: calc(100vh-75);
  grid-template-rows: 230px 15px 1fr;
  grid-template-columns: 1fr 325px 325px 325px 1fr;
  row-gap: 3px;
  column-gap: 18px;
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
