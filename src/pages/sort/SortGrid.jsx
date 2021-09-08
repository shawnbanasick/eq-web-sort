import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { view } from "@risingstack/react-easy-state";
import styled from "styled-components";
import move from "./move";
import reorder from "./reorder";
import getGlobalState from "../../globalState/getGlobalState";
import setGlobalState from "../../globalState/setGlobalState";
import SortColumn from "./SortColumn";
import getListStyleHori from "./getListStyleHori";
import getItemStyleHori from "./getItemStyleHori";
import calculateDragResults from "./calculateDragResults";

/* eslint react/prop-types: 0 */

function debounce(fn, ms) {
  let timer;
  return (_) => {
    clearTimeout(timer);
    timer = setTimeout((_) => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}

const SortGrid = (props) => {
  const configObj = getGlobalState("configObj");

  // force updates after dragend - do not delete
  const [value, setValue] = useState(0); // integer state

  // force updates on window resize
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  // page resize
  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }, 200);

    window.addEventListener("resize", debouncedHandleResize);

    return (_) => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  });

  // fire move and re-order functions
  const onDragEnd = (result) => {
    // console.log(result);
    /*
    example result object:
    result {"draggableId":"s1","type":"DEFAULT",
    "source":{"droppableId":"statements","index":0},
    "destination":{"droppableId":"column1","index":0},
    "reason":"DROP"}
    */

    calculateDragResults({ ...result });

    // pull data from localStorage
    // const columnStatements = JSON.parse(
    //   localStorage.getItem("columnStatements")
    // );

    const columnStatements = getGlobalState("columnStatements");
    // source and destination are objects
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    // if moving inside the same column
    if (source.droppableId === destination.droppableId) {
      reorder(
        source.droppableId,
        source.index,
        destination.index,
        columnStatements
      );

      // force component update
      const newValue = value + 1;
      setValue(newValue);
    } else {
      // moving to another column

      // source.droppableId give orgin id => "statements" or "columnN1"
      // sourceList is cards in that origin
      // gather data to send to move function
      let sourceListArray;
      let destinationListArray;
      if (source.droppableId === "statements") {
        sourceListArray = columnStatements.statementList;
      } else {
        sourceListArray = columnStatements.vCols[source.droppableId];
      }
      if (destination.droppableId === "statements") {
        destinationListArray = columnStatements.statementList;
      } else {
        destinationListArray = columnStatements.vCols[destination.droppableId];
      }
      const droppableSource = source;
      const droppableDestination = destination;
      const totalStatements = +configObj.totalStatements;

      const sortCharacterisiticsPrep = {};
      sortCharacterisiticsPrep.qSortPattern = [...configObj.qSortPattern];
      sortCharacterisiticsPrep.qSortHeaders = [...configObj.qSortHeaders];
      sortCharacterisiticsPrep.forcedSorts = configObj.overloadedColumnDisplay;
      sortCharacterisiticsPrep.qSortHeaderNumbers = [
        ...configObj.qSortHeaderNumbers,
      ];
      const sortCharacteristics = sortCharacterisiticsPrep;
      const allowUnforcedSorts = configObj.allowUnforcedSorts;
      move(
        sourceListArray,
        destinationListArray,
        droppableSource,
        droppableDestination,
        columnStatements,
        totalStatements,
        sortCharacteristics,
        allowUnforcedSorts
      );

      // global state updates
      setGlobalState("columnStatements", columnStatements);

      if (columnStatements.statementList.length === 0) {
        setGlobalState("isSortingCards", false);
        setGlobalState("sortCompleted", true);
      } else {
        setGlobalState("isSortingCards", true);
        setGlobalState("sortCompleted", false);
      }

      // increment Progress Bar
      const totalStatements2 = configObj.totalStatements;
      const remainingStatements = columnStatements.statementList.length;
      const numerator = totalStatements2 - remainingStatements;

      const ratio = numerator / totalStatements2;
      const completedPercent = (ratio * 30).toFixed();

      // update Progress Bar State
      setGlobalState("progressScoreAdditionalSort", completedPercent);

      // force component update
      const newValue = value + 1;
      setValue(newValue);
    }
    setGlobalState("sortCharacteristics", sortCharacteristics);
  }; // end of dragEnd helper function

  // state management
  const isSortingCards = getGlobalState("isSortingCards");
  if (isSortingCards === true) {
  }

  // get user settings
  const cardFontSize = props.cardFontSize;
  const horiCardMinHeight = +configObj.horiCardMinHeight;

  const sortCharacteristics = getGlobalState("sortCharacteristics");

  // column colors
  const columnColorsArray = [...configObj.columnColorsArray];
  const columnHeadersColorsArray = [...configObj.columnHeadersColorsArray];
  const qSortPattern = [...configObj.qSortPattern];

  // maximize cardHeight on first mount using default 0 in globalState
  const maxNumCardsInCol = Math.max(...qSortPattern);
  let cardHeight = getGlobalState("cardHeight");
  if (cardHeight === 0) {
    cardHeight = ((dimensions.height - 320) / maxNumCardsInCol).toFixed();
    setGlobalState("cardHeight", +cardHeight);
  }

  // set dynamic width on page load on reload
  const columnWidth = (dimensions.width - 134) / qSortPattern.length;

  // pull data from localStorage
  // const columnStatements = JSON.parse(localStorage.getItem("columnStatements"));
  const columnStatements = getGlobalState("columnStatements");
  const statements = columnStatements.statementList;

  // MAP out SORT COLUMNS component before render
  // code inside render so that column lists update automatically
  const qSortHeaders = [...configObj.qSortHeaders];
  const qSortHeaderNumbers = [...configObj.qSortHeaderNumbers];

  // setup grid columns
  const columns = qSortHeaders.map((value, index, highlightedColHeader) => {
    const columnId = `column${qSortHeaders[index]}`;
    const sortValue = qSortHeaderNumbers[index];
    const columnColor = columnColorsArray[index];

    // console.log(qSortPattern, cardHeight);

    return (
      <SortColumn
        key={columnId}
        minHeight={qSortPattern[index] * (+cardHeight + 8) + 15}
        maxCards={qSortPattern[index]}
        columnId={columnId}
        columnStatementsArray={columnStatements.vCols[columnId]}
        forcedSorts={configObj.overloadedColumnDisplay}
        columnWidth={columnWidth}
        cardHeight={cardHeight}
        sortValue={sortValue}
        columnColor={columnColor}
        cardFontSize={cardFontSize}
        qSortHeaderNumber={qSortHeaderNumbers[index]}
        columnHeadersColor={columnHeadersColorsArray[index]}
      />
    );
  }); // end map of sort columns

  // returning main content => horizontal feeder
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="rootDiv">
        {columns}
        <SortFooterDiv>
          <div className="cardSlider">
            <Droppable droppableId="statements" direction="horizontal">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyleHori(
                    snapshot.isDraggingOver,
                    horiCardMinHeight
                  )}
                >
                  {statements.map((item, index) => {
                    const statementHtml = item.statement;
                    return (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                        sortValue={item.sortValue}
                        cardColor={item.cardColor}
                      >
                        {(provided, snapshot) => (
                          <div
                            className={`${item.cardColor}`}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyleHori(
                              snapshot.isDragging,
                              provided.draggableProps.style,
                              `${item.sortValue}`,
                              `${item.cardColor}`,
                              columnWidth,
                              cardHeight,
                              cardFontSize
                            )}
                          >
                            {statementHtml}
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </SortFooterDiv>
      </div>
    </DragDropContext>
  );
};

export default view(SortGrid);

const SortFooterDiv = styled.div`
  flex-direction: row;
  background: #e4e4e4;
  position: fixed;
  padding-right: 10px;
  left: 0px;
  bottom: 50px;
  width: 100vw;
  height: ${(props) => `${+props.cardHeight + 20}px;`};
`;

/* DO NOT DELETE - important
"columnColorsArray": [
      "#ffb2b2"
      "#ffbfbf",
      "#ffcbcb",
      "#ffd8d8",
      "#ffe5e5",
      "#f5f5f5",
      "#d6f5d6",
      "#c1f0c1",
      "#adebad",
      "#98E698",
      "#84e184"
    ],
*/
