import React, { Component } from "react";
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
// import SortCompletedMessage from "./SortCompletedMessage";
// import ColumnOverloadMessage from "./ColumnOverloadMessage";
// import NumberCardsSortedMessage from "./NumberCardsSortedMessage";
import calculateTimeOnPage from "../../utilities/calculateTimeOnPage";

/* eslint react/prop-types: 0 */

let startTime;

setTimeout(function () {}, 100);

// const getCardHeight = (maxNumCardsInCol, cardHeightSetting) => {

// };

// console.log("CONFIG", window.configXML);

class SortGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      draggingOverColumnId: "column99",
      windowSize: 100,
    };
  }

  componentDidMount() {
    startTime = Date.now();
  }

  componentWillUnmount() {
    calculateTimeOnPage(startTime, "sortPage", "SortPage");
  }

  // fire move and re-order functions
  onDragEnd = (result) => {
    /*
    example result object:
    result {"draggableId":"s1","type":"DEFAULT",
    "source":{"droppableId":"statements","index":0},
    "destination":{"droppableId":"column1","index":0},
    "reason":"DROP"}
    */

    // pull data from localStorage
    const columnStatements = JSON.parse(
      localStorage.getItem("columnStatements")
    );

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

      this.forceUpdate();
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
      const totalStatements = window.configXML.totalStatements;
      const sortCharacteristics = window.configXML.sortCharacteristics;
      move(
        sourceListArray,
        destinationListArray,
        droppableSource,
        droppableDestination,
        columnStatements,
        totalStatements,
        sortCharacteristics
      );

      // store.dispatch.setDraggingOverColumnId('column99');
      setGlobalState("draggingOverColumnId", "column99");

      // global state updates
      setGlobalState("setColumnStatements", columnStatements);
      localStorage.setItem(
        "columnStatements",
        JSON.stringify(columnStatements)
      );

      if (columnStatements.statementList.length === 0) {
        setGlobalState("isSortingCards", false);
        setGlobalState("sortCompleted", true);
      } else {
        setGlobalState("isSortingCards", true);
        setGlobalState("sortCompleted", false);
      }

      // increment Progress Bar
      // const sortedStatements = getGlobalState("presortSortedStatementsNum");
      const totalStatements2 = window.statementsXML.length;
      const remainingStatements = columnStatements.statementList.length;
      const numerator = totalStatements2 - remainingStatements;

      const ratio = numerator / window.statementsXML.length;
      console.log(ratio);
      const completedPercent = (ratio * 30).toFixed();
      // update Progress Bar State
      setGlobalState("progressScoreAdditionalSort", completedPercent);
      localStorage.setItem(
        "progressScoreAdditionalSort",
        `${completedPercent}`
      );

      this.forceUpdate();
    }
  }; // end of dragEnd helper function

  render() {
    // state management
    const isSortingCards = getGlobalState("isSortingCards");
    if (isSortingCards === true) {
    }
    setGlobalState("sortCharacteristics", window.configXML.sortCharacteristics);

    // get user settings
    const cardFontSize = this.props.cardFontSize;
    const horiCardMinHeight = window.configXML.horiCardMinHeight;
    const columnColorsArray = [...window.configXML.columnColorsArray];
    const sortCharacteristics = window.configXML.sortCharacteristics;
    const qSortPattern = [...window.configXML.sortCharacteristics.qSortPattern];

    // calc card height
    const maxNumCardsInCol = Math.max(...qSortPattern);
    let cardHeight = getGlobalState("cardHeight");
    if (cardHeight === 0) {
      cardHeight = ((window.innerHeight - 230) / maxNumCardsInCol).toFixed();
      setGlobalState("cardHeight", cardHeight);
    }
    if (cardHeight < 50) {
      cardHeight = 50;
      setGlobalState("cardHeight", cardHeight);
    }

    // set dynamic width on page load or reload
    // todo make responsive
    const columnWidth = (window.innerWidth - 130) / qSortPattern.length;

    // UI updates
    const changeColumnHeaderColor = (columnId) => {
      this.setState({ draggingOverColumnId: columnId });
    };

    // pull data from localStorage
    const columnStatements = JSON.parse(
      localStorage.getItem("columnStatements")
    );
    const statements = columnStatements.statementList;

    // MAP out SORT COLUMNS component before render
    // code inside render so that column lists update automatically
    const qSortHeaders = [...sortCharacteristics.qSortHeaders];
    const qSortHeaderNumbers = [...sortCharacteristics.qSortHeaderNumbers];
    const columns = qSortHeaders.map((value, index, highlightedColHeader) => {
      const columnId = `column${qSortHeaders[index]}`;
      const sortValue = qSortHeaderNumbers[index];
      const columnColor = columnColorsArray[index];

      return (
        <SortColumn
          key={columnId}
          minHeight={qSortPattern[index] * (cardHeight + 8) + 15}
          maxCards={qSortPattern[index]}
          columnId={columnId}
          columnStatementsArray={columnStatements.vCols[columnId]}
          forcedSorts={sortCharacteristics.forcedSorts}
          columnWidth={columnWidth}
          cardHeight={cardHeight}
          sortValue={sortValue}
          columnColor={columnColor}
          cardFontSize={cardFontSize}
          qSortHeaderNumber={qSortHeaderNumbers[index]}
          changeColumnHeaderColor={changeColumnHeaderColor}
        />
      );
    }); // end map of sort columns

    // returning main content => horizontal feeder
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
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
                    {statements.map((item, index) => (
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
                            {item.statement}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </SortFooterDiv>
        </div>
      </DragDropContext>
    );
  }
}

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

// const FooterMessageBox = styled.div`
//   position: fixed;
//   bottom: 0;
//   right: 0;
//   flex-basis: 100px;
//   padding-right: 5px;
//   padding-left: 5px;
//   width: 100px;
//   height: ${(props) => `${+props.cardHeight}px`};
//   border: 2px solid lightgray;
//   text-align: center;
//   border: 2px solid black;

//   p {
//     padding: 0px;
//     margin-top: 10px;
//     font-size: 20px;
//     color: #3273dc;
//   }
// `;

/*
<div className="footerMessageBox">
  <SortCompletedMessage
    sortCompleteText={sortCompleteText}
    nextButtonText={nextButtonText}
  />
  <ColumnOverloadMessage overloadedColumn={overloadedColumn} />
  <NumberCardsSortedMessage totalStatements={totalStatements} />
</div>

height: 150px;
.sortFooter {
  display: flex;
  flex-direction: row;
  background: #e4e4e4;
  position: fixed;
  left: 0px;
  bottom: 0;
  width: 100%;
  height: 150px;
}
*/

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
