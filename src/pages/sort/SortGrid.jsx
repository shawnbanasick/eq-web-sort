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
import SortCompletedMessage from "./SortCompletedMessage";
import ColumnOverloadMessage from "./ColumnOverloadMessage";
import NumberCardsSortedMessage from "./NumberCardsSortedMessage";
import calculateTimeOnPage from "../../utilities/calculateTimeOnPage";

/* eslint react/prop-types: 0 */

let startTime;

setTimeout(function () {
  setGlobalState("currentPage", "sort");
  setGlobalState("progressScore", 50);
}, 100);

// console.log("CONFIG", window.configXML);

class SortGrid extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      draggingOverColumnId: "column99",
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

      // if (columnStatements.statementList.length === 0) {
      //   state.setState('isSortingCards', false);
      //   state.setState('sortCompleted', true);
      // }

      this.forceUpdate();
    }
  }; // end of dragEnd helper function

  render() {
    const cardFontSize = this.props.cardFontSize;
    console.log("rend size", cardFontSize);

    setGlobalState("sortCharacteristics", window.configXML.sortCharacteristics);

    const sortCompleteText = window.configXML.sortCompleteText;
    const nextButtonText = window.configXML.nextButtonText;
    const horiCardMinHeight = window.configXML.horiCardMinHeight;
    const columnColorsArray = [...window.configXML.columnColorsArray];
    const sortCharacteristics = window.configXML.sortCharacteristics;
    const totalStatements = window.configXML.totalStatements;

    const qSortPattern = [...window.configXML.sortCharacteristics.qSortPattern];

    // const cardHeight = window.configXML.cardHeight;
    const maxNumCardsInCol = Math.max(...qSortPattern);
    const cardHeight = (window.innerHeight - 230) / maxNumCardsInCol;

    // set dynamic width on page load or reload
    // todo make responsive
    const columnWidth = (window.innerWidth - 150) / qSortPattern.length;
    // const columnWidth = window.configXML.columnWidth;

    console.log("CONFIG", window.configXML);

    const changeColumnHeaderColor = (columnId) => {
      this.setState({ draggingOverColumnId: columnId });
    };

    // pull data from localStorage
    const columnStatements = JSON.parse(
      localStorage.getItem("columnStatements")
    );

    const statements = columnStatements.statementList;
    // const overloadedColumn = store.getState().overloadedColumn;
    const overloadedColumn = getGlobalState("overloadedColumn");

    // MAP out SORT COLUMNS component before render
    // code inside render so that column lists update automatically
    const qSortHeaders = [...sortCharacteristics.qSortHeaders];
    const qSortHeaderNumbers = [...sortCharacteristics.qSortHeaderNumbers];
    const columns = qSortHeaders.map((value, index, highlightedColHeader) => {
      const columnId = `column${qSortHeaders[index]}`;
      const sortValue = qSortHeaderNumbers[index];
      const columnColor = columnColorsArray[index];
      // columnColors -> redBase #ff7f7f greenBase #32cd32

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
          qSortHeaderNumber={qSortHeaderNumbers[index]}
          changeColumnHeaderColor={changeColumnHeaderColor}
        />
      );
    }); // end map of sort columns

    // returning main content => horizontal feeder
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="rootDiv">
          {/* <Headers
            className="hoverBlue"
            qSortHeaders={qSortHeaders}
            qSortHeaderNumbers={qSortHeaderNumbers}
            columnWidth={columnWidth}
            headerColorsArray={headerColorsArray}
            highlightedColHeader={this.state.draggingOverColumnId}
          /> */}
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
              <FooterMessageBox>
                <SortCompletedMessage
                  sortCompleteText={sortCompleteText}
                  nextButtonText={nextButtonText}
                />
                <ColumnOverloadMessage overloadedColumn={overloadedColumn} />
                <NumberCardsSortedMessage totalStatements={totalStatements} />
              </FooterMessageBox>
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
  padding-right: 120px;
  left: 0px;
  bottom: 50px;
  width: 100vw;
  height: ${(props) => `${+props.cardHeight + 20}px;`};
`;

const FooterMessageBox = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  flex-basis: 100px;
  padding-right: 5px;
  padding-left: 5px;
  width: 100px;
  height: ${(props) => `${+props.cardHeight}px`};
  border: 2px solid lightgray;
  text-align: center;
  border: 2px solid black;

  p {
    padding: 0px;
    margin-top: 10px;
    font-size: 20px;
    color: #3273dc;
  }
`;

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
