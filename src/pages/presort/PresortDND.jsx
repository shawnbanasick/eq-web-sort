import React, { useState, useEffect, useCallback } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import useSettingsStore from "../../globalState/useSettingsStore";
import useStore from "../../globalState/useStore";

const getLangObj = (state) => state.langObj;
const getConfigObj = (state) => state.configObj;
const getStatementsObj = (state) => state.statementsObj;
const getColumnStatements = (state) => state.columnStatements;
const getPreSortedStateNumInit = (state) =>
  state.presortSortedStatementsNumInitial;
const getSetColumnStatements = (state) => state.setColumnStatements;
const getSetPresortFinished = (state) => state.setPresortFinished;
const getSetTrigPresortFinModal = (state) =>
  state.setTriggerPresortFinishedModal;
const getResults = (state) => state.results;
const getSetResults = (state) => state.setResults;
const getSetProgressScoreAdditional = (state) =>
  state.setProgressScoreAdditional;

function PresortDND(props) {
  // STATE
  const langObj = useSettingsStore(getLangObj);
  const configObj = useSettingsStore(getConfigObj);
  const statementsObj = useSettingsStore(getStatementsObj);
  const columnStatements = useSettingsStore(getColumnStatements);
  const presortSortedStatementsNumInitial = useStore(getPreSortedStateNumInit);
  const setColumnStatements = useSettingsStore(getSetColumnStatements);
  const setPresortFinished = useStore(getSetPresortFinished);
  const setTriggerPresortFinishedModal = useStore(getSetTrigPresortFinModal);
  const results = useStore(getResults);
  const setResults = useStore(getSetResults);
  const setProgressScoreAdditional = useStore(getSetProgressScoreAdditional);

  const statementsName = ReactHtmlParser(decodeHTML(langObj.presortStatements));
  const btnDisagreement = ReactHtmlParser(
    decodeHTML(langObj.presortDisagreement)
  );
  const btnAgreement = ReactHtmlParser(decodeHTML(langObj.presortAgreement));
  const btnNeutral = ReactHtmlParser(decodeHTML(langObj.presortNeutral));

  // initialize local state
  let [presortSortedStatementsNum, setPresortSortedStatementsNum] = useState(
    presortSortedStatementsNumInitial
  );

  const itemsFromBackend = props.statements;
  const cardFontSize = `${props.cardFontSize}px`;
  let defaultFontColor = configObj.defaultFontColor;

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
      if (!result.destination || result.destination.droppableId === "cards") {
        return;
      }
      const { source, destination } = result;

      // update statement characteristics
      const statementsArray = [...columnStatements.statementList];
      const destinationId = result.destination.droppableId;
      const draggableId = result.draggableId;

      // set METADATA FOR SORTING
      for (let i = 0; i < statementsArray.length; i++) {
        if (statementsArray[i].id === draggableId) {
          if (destinationId === "neg") {
            statementsArray[i].divColor = "isNegativeStatement";
            statementsArray[i].cardColor = "pinkSortCard";
            statementsArray[i].pinkChecked = true;
            statementsArray[i].yellowChecked = false;
            statementsArray[i].greenChecked = false;
            statementsArray[i].sortValue = 333;
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
            statementsArray[i].sortValue = 111;
          }
        }
      }

      // set new ordering
      for (let i = 0; i < statementsArray.length; i++) {
        statementsArray[i].listIndex = i + 1;
      }

      // save to memory
      columnStatements.statementList = [...statementsArray];
      setColumnStatements(columnStatements);

      // when dropped on different droppable
      if (source.droppableId !== destination.droppableId) {
        try {
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

          // calc remaining statements
          let sortedStatements;
          if (sourceColumn.id === "cards") {
            sortedStatements =
              statementsObj.totalStatements - sourceColumn.items.length + 1;
            setPresortSortedStatementsNum(sortedStatements);
            const ratio = sortedStatements / statementsObj.totalStatements;
            const completedPercent = (ratio * 30).toFixed();

            // update Progress Bar State
            setProgressScoreAdditional(completedPercent);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          // MOVING BETWEEN COLUMNS
          const sourceCol = columns[source.droppableId];
          const copiedItems = [...sourceCol.items];
          const [removed] = copiedItems.splice(source.index, 1);
          copiedItems.splice(destination.index, 0, removed);
          setColumns({
            ...columns,
            [source.droppableId]: {
              ...sourceCol,
              items: copiedItems,
            },
          });
        } catch (error) {
          console.log(error);
        }
      }
    },
    [
      configObj,
      columnStatements,
      setColumnStatements,
      statementsObj,
      setProgressScoreAdditional,
    ]
  ); // END DRAG-END

  useEffect(() => {
    const handleKeyUp = (event) => {
      let target;
      if (event.key === "1" || event.key === 1) {
        target = "neg";
      } else if (event.key === "2" || event.key === 2) {
        target = "neutral";
      } else if (event.key === "3" || event.key === 3) {
        target = "pos";
      } else {
        return;
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
    let projectResultsObj = results;
    projectResultsObj.npos = columns.pos.items.length;
    projectResultsObj.nneu = columns.neutral.items.length;
    projectResultsObj.nneg = columns.neg.items.length;
    setResults(projectResultsObj);
  }, [columns, results, setResults]);

  useEffect(() => {
    if (columns.cards.items.length === 0) {
      setPresortFinished(true);
      setTriggerPresortFinishedModal(true);
    }
  }, [
    columns.cards.items.length,
    setPresortFinished,
    setTriggerPresortFinishedModal,
  ]);

  // RENDER COMPONENT

  return (
    <PresortGrid>
      <div id="completionRatio">
        {presortSortedStatementsNum}/{statementsObj.totalStatements}
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
                            `<div>${decodeHTML(item.statement)}</div>`
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
                                      color: defaultFontColor,
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

export default PresortDND;

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
