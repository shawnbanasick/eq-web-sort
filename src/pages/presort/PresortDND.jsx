import React, { useState, useEffect, useCallback } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import useSettingsStore from "../../globalState/useSettingsStore";
import useStore from "../../globalState/useStore";
import useLocalStorage from "../../utilities/useLocalStorage";

const getLangObj = (state) => state.langObj;
const getConfigObj = (state) => state.configObj;
const getStatementsObj = (state) => state.statementsObj;
const getColumnStatements = (state) => state.columnStatements;
const getPreSortedStateNumInit = (state) =>
  state.presortSortedStatementsNumInitial;
// const getSetColumnStatements = (state) => state.setColumnStatements;
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
  // const setColumnStatements = useSettingsStore(getSetColumnStatements);
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
  const onPageInstructions = ReactHtmlParser(
    decodeHTML(langObj.onPageInstructions)
  );

  // initialize local state
  let [presortSortedStatementsNum, setPresortSortedStatementsNum] = useState(
    presortSortedStatementsNumInitial
  );

  const cardFontSize = `${props.cardFontSize}px`;
  let defaultFontColor = configObj.defaultFontColor;
  let statementsLength = columnStatements.statementList.length;

  const cardHeight = 210;

  const [columns, setColumns] = useLocalStorage("columns", {
    cards: {
      name: statementsName,
      items: [...props.statements],
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

  // default = positive sort direction
  let pinkArraySortValue = 333,
    greenArraySortValue = 111;
  if (configObj.sortDirection === "negative") {
    pinkArraySortValue = 111;
    greenArraySortValue = 333;
  }

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
            statementsArray[i].sortValue = pinkArraySortValue;
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
            statementsArray[i].sortValue = greenArraySortValue;
          }
        }
      }

      // set new ordering
      for (let i = 0; i < statementsArray.length; i++) {
        statementsArray[i].listIndex = i + 1;
      }

      // save to memory
      columnStatements.statementList = [...statementsArray];
      //setColumnStatements(columnStatements);
      localStorage.setItem(
        "columnStatements",
        JSON.stringify(columnStatements)
      );

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
      statementsObj,
      setProgressScoreAdditional,
      greenArraySortValue,
      pinkArraySortValue,
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
  }, [onDragEnd, setColumns, columns]);

  useEffect(() => {
    let posText = "";
    let neutralText = "";
    let negText = "";

    columns.pos.items.forEach((item) => {
      if (columns.pos.items[0]) {
        posText += item.statementNum + ",";
      }
    });

    if (columns.neutral.items[0]) {
      columns.neutral.items.forEach((item) => {
        neutralText += item.statementNum + ",";
      });
    }

    if (columns.neg.items[0]) {
      columns.neg.items.forEach((item) => {
        negText += item.statementNum + ",";
      });
    }

    let projectResultsObj = results;
    projectResultsObj.npos = columns.pos.items.length;
    projectResultsObj.posStateNums = posText;
    projectResultsObj.nneu = columns.neutral.items.length;
    projectResultsObj.neuStateNums = neutralText;
    projectResultsObj.nneg = columns.neg.items.length;
    projectResultsObj.negStateNums = negText;
    setResults(projectResultsObj);
    localStorage.setItem("resultsPresort", JSON.stringify(projectResultsObj));
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
    <PresortGrid id="statementsGrid">
      <ImageEnlargeInstructionsDiv id="imageEnlargeInstructionsDiv">
        <div>{onPageInstructions}</div>
      </ImageEnlargeInstructionsDiv>
      <CompletionRatioDiv id="completionRatio">
        {presortSortedStatementsNum}/{statementsLength}
      </CompletionRatioDiv>
      <ColumnNamesNeg id="negDivImg">
        <div>{columns.neg.name}</div>
      </ColumnNamesNeg>
      <ColumnNamesNeu id="negDivImg">
        <div>{columns.neutral.name}</div>
      </ColumnNamesNeu>
      <ColumnNamesPos id="negDivImg">
        <div>{columns.pos.name}</div>
      </ColumnNamesPos>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <AllColWrapper
              key={columnId}
              id={`${columnId}Div`}
              className={`${columnId}Div`}
            >
              <ThreeColCardWrapper>
                <Droppable
                  droppableId={columnId}
                  className={columnId}
                  key={columnId}
                >
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        id={columnId}
                        className={columnId}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "white",
                          padding: 4,
                          width: "100%",
                        }}
                      >
                        {column.items.map((item, index) => {
                          const statementHtml = ReactHtmlParser(
                            `<div>${decodeHTML(item.statement)}</div>`
                          );
                          return (
                            <Draggable
                              key={item.id}
                              id={item.id}
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
                                      padding: 6,
                                      margin: "0 0 8px 0",
                                      width: "100%",
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
              </ThreeColCardWrapper>
            </AllColWrapper>
          );
        })}
      </DragDropContext>
    </PresortGrid>
  );
}

export default PresortDND;
const ColumnNamesNeg = styled.div`
  display: flex;
  grid-column-start: 2;
  grid-row-start: 2;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;

  div {
    display: flex;
    outline: 1px solid #a8a8a8;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 182, 193, 0.4);
    min-width: 50%;
    padding: 2px;
    border-radius: 5px;
  }
`;

const ColumnNamesNeu = styled.div`
  display: flex;
  align-self: center;
  grid-column-start: 3;
  grid-row-start: 2;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    outline: 1px solid #a8a8a8;
    background-color: lightgray;
    min-width: 50%;
    padding: 2px;
    border-radius: 5px;
  }
`;

const ColumnNamesPos = styled.div`
  display: flex;
  grid-column-start: 4;
  grid-row-start: 2;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(199, 246, 199, 0.6);
    min-width: 50%;
    padding: 2px;
    border-radius: 5px;
    outline: 1px solid #a8a8a8;
  }
`;

const PresortGrid = styled.div`
  padding-top: 10px;
  margin-top: 25px;
  margin-bottom: 55px;
  display: grid;
  height: calc(100vh-100px);
  grid-template-rows: 34h 25px 40vh;
  grid-template-columns: 0.25fr 1.5fr 1.5fr 1.5fr 0.25fr;
  row-gap: 3px;
  column-gap: 15px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`;

const DroppableContainer = styled.div`
  background-color: "#83cafe";
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 2px;
  width: 27.8vw;
  border: 1px solid #a8a8a8;
`;

const ThreeColCardWrapper = styled.div`
  margin: 4px;
  img {
    max-width: 98%;
    max-height: 98%;
    padding: 0px;
  }
`;

const CompletionRatioDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
  font-size: 60px;
  font-weight: bold;
  padding-left: 3px;
  padding-right: 3px;
`;

const ImageEnlargeInstructionsDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
  font-size: 16px;
  padding-left: 3px;
  padding-right: 3px;
  width: 100%;
`;

const AllColWrapper = styled.div`
  margin: 4px;
  display: "flex";
  flex-direction: "column";
  width: 100%;
`;
