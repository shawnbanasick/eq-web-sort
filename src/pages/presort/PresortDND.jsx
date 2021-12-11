import React, { useState, useEffect, useCallback } from "react";
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

  let presortSortedStatementsNumInitial =
    +getGlobalState("presortSortedStatementsNum") || 0;

  let [presortSortedStatementsNum, setPresortSortedStatementsNum] = useState(
    presortSortedStatementsNumInitial
  );

  const itemsFromBackend = props.statements;
  const cardFontSize = `${props.cardFontSize + 6}px`;

  const cardHeight = 210;

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

  const onDragEnd = useCallback(
    (result, columns, setColumns) => {
      if (!result.destination) return;

      try {
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
            setPresortSortedStatementsNum(
              configObj.totalStatements - sourceColumn.items.length + 1
            );
            setGlobalState(
              "presortSortedStatementsNum",
              presortSortedStatementsNum
            );
            // presortSortedStatementsNum = presortSortedStatementsNum.toString();

            setGlobalState(
              "presortSortedStatementsNum",
              presortSortedStatementsNum.toString()
            );
          }

          // update progress bar
          const sortedStatements = +getGlobalState(
            "presortSortedStatementsNum"
          );
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
      } catch (error) {
        console.log(error);
      }
    },
    [presortSortedStatementsNum, configObj]
  ); // END DRAG-END

  useEffect(() => {
    const handleKeyUp = (event) => {
      console.log(event);
      let target;
      if (event.key === "1" || event.key === 1) {
        target = "neg";
      }
      if (event.key === "2" || event.key === 2) {
        target = "neutral";
      }
      if (event.key === "3" || event.key === 3) {
        target = "pos";
      }

      if (columns.cards.items.length > 0) {
        let source = columns.cards.items[0].id;
        const results = {
          draggableId: source,
          type: "DEFAULT",
          source: {
            index: 0,
            droppableId: "cards",
          },
          reason: "DROP",
          mode: "FLUID",
          destination: {
            droppableId: target,
            index: 0,
          },
          combine: null,
        };

        onDragEnd(results, columns, setColumns);
      }
    }; // end keyup

    window.addEventListener("keyup", handleKeyUp);

    return () => window.removeEventListener("keyup", handleKeyUp);
  }, [onDragEnd, columns]);

  useEffect(() => {
    let projectResultsObj = getGlobalState("results");
    projectResultsObj.npos = columns.pos.items.length;
    projectResultsObj.nneu = columns.neutral.items.length;
    projectResultsObj.nneg = columns.neg.items.length;
    setGlobalState("results", projectResultsObj);
  }, [columns]);

  useEffect(() => {
    if (columns.cards.items.length === 0) {
      setGlobalState("presortFinished", true);
      setGlobalState("triggerPresortFinishedModal", true);
    }
  }, [columns.cards.items.length]);

  /* document.addEventListener("keyup", logKey);
  function logKey(e) {
    //log.textContent += ` ${e.code}`;
    console.log(e.code);
  }
 */

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
                          const statementHtml = ReactHtmlParser(
                            decodeHTML(item.statement)
                          );
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
                                    {statementHtml}
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
  margin-top: 75px;
  margin-bottom: 55px;
  display: grid;
  height: calc(100vh-75);
  grid-template-rows: 230px 15px 1fr;
  grid-template-columns: 1fr 325px 325px 325px 1fr;
  row-gap: 3px;
  column-gap: 15px;
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
