import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import move from "./move";
import reorder from "./reorder";
import SortColumn from "./SortColumn";
import getListStyleHori from "./getListStyleHori";
import getItemStyleHori from "./getItemStyleHori";
import calculateDragResults from "./calculateDragResults";
import ReactHtmlParser from "react-html-parser";
import decodeHTML from "../../utilities/decodeHTML";
import useSettingsStore from "../../globalState/useSettingsStore";
import useStore from "../../globalState/useStore";
import useLocalStorage from "../../utilities/useLocalStorage";

/* eslint react/prop-types: 0 */

const getConfigObj = (state) => state.configObj;
const getMapObj = (state) => state.mapObj;
const getStatementsObj = (state) => state.statementsObj;
const getSetIsSortingCards = (state) => state.setIsSortingCards;
const getSetSortCompleted = (state) => state.setSortCompleted;
const getSetProgScoreAddSort = (state) => state.setProgressScoreAdditionalSort;
const getResults = (state) => state.results;
const getSortFinModalHasBeenShown = (state) => state.sortFinishedModalHasBeenShown;
const getSortGridResults = (state) => state.sortGridResults;
const getSetIsSortingFinished = (state) => state.setIsSortingFinished;
const getSetResults = (state) => state.setResults;
const getSetTriggerSortingFinModal = (state) => state.setTriggerSortingFinishedModal;
const getSetSortGridResults = (state) => state.setSortGridResults;

const SortGrid = (props) => {
  // GLOBAL STATE
  const configObj = useSettingsStore(getConfigObj);
  const mapObj = useSettingsStore(getMapObj);
  const statementsObj = useSettingsStore(getStatementsObj);
  const setIsSortingCards = useStore(getSetIsSortingCards);
  const setSortCompleted = useStore(getSetSortCompleted);
  const setProgressScoreAdditionalSort = useStore(getSetProgScoreAddSort);
  const results = useStore(getResults);
  const sortFinishedModalHasBeenShown = useStore(getSortFinModalHasBeenShown);
  const sortGridResults = useStore(getSortGridResults);
  const setIsSortingFinished = useStore(getSetIsSortingFinished);
  const setResults = useStore(getSetResults);
  const setTriggerSortingFinishedModal = useStore(getSetTriggerSortingFinModal);
  const setSortGridResults = useStore(getSetSortGridResults);

  const greenCardColor = configObj.greenCardColor;
  const yellowCardColor = configObj.yellowCardColor;
  const pinkCardColor = configObj.pinkCardColor;

  const qSortHeaders = [...mapObj.qSortHeaders];
  const qSortHeaderNumbers = [...mapObj.qSortHeaderNumbers];
  const columnColorsArray = [...mapObj.columnColorsArray];
  const columnHeadersColorsArray = [...mapObj.columnHeadersColorsArray];
  const qSortPattern = [...mapObj.qSortPattern];
  const cardHeight = props.cardHeight;

  let presortColumnStatements = JSON.parse(localStorage.getItem("columnStatements"));

  if (presortColumnStatements === null) {
    presortColumnStatements = [];
  }
  // LOCAL STATE

  // PERSISTENT STATE
  const [columnStatements, setColumnStatements] = useLocalStorage(
    "sortColumns",
    presortColumnStatements
  );

  // layout settings
  let columnWidth = props.columnWidth;
  const totalStatements = +configObj.totalStatements;
  const sortCharacterisiticsPrep = {};
  sortCharacterisiticsPrep.qSortPattern = [...mapObj.qSortPattern];
  sortCharacterisiticsPrep.qSortHeaders = [...mapObj.qSortHeaders];
  sortCharacterisiticsPrep.forcedSorts = configObj.warnOverloadedColumn;
  sortCharacterisiticsPrep.qSortHeaderNumbers = [...mapObj.qSortHeaderNumbers];

  const sortCharacteristics = sortCharacterisiticsPrep;
  const allowUnforcedSorts = configObj.allowUnforcedSorts;

  // get sort direction
  let sortDirection = "rtl";
  if (configObj.sortDirection === "negative") {
    sortDirection = "ltr";
  }

  // fire move and re-order functions
  const onDragEnd = async (result) => {
    try {
      /*
    example result object:
    result {"draggableId":"s1","type":"DEFAULT",
    "source":{"droppableId":"statements","index":0},
    "destination":{"droppableId":"column1","index":0},
    "reason":"DROP"}
    */
      // translated column name and starts results calculations
      const manageDragResults = calculateDragResults(
        { ...result },
        totalStatements,
        results,
        sortFinishedModalHasBeenShown,
        sortGridResults
      );

      // update global state
      setIsSortingFinished(manageDragResults.sortFinished);
      setResults(manageDragResults.results);
      setSortGridResults(manageDragResults.sortGridResults);

      // source and destination are objects
      const { source, destination } = result;

      // dropped outside the list
      if (!destination) {
        return;
      }
      // if moving inside the same column
      if (source.droppableId === destination.droppableId) {
        let newCols = reorder(
          source.droppableId,
          source.index,
          destination.index,
          columnStatements
        );

        setColumnStatements(newCols);
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

        move(
          sourceListArray,
          destinationListArray,
          droppableSource,
          droppableDestination,
          columnStatements,
          totalStatements,
          sortCharacteristics,
          allowUnforcedSorts,
          qSortHeaderNumbers
        );

        // global state updates
        setColumnStatements(columnStatements);
        const hasShownSortFinModal = localStorage.getItem("hasShownSortFinModal");

        if (columnStatements.statementList.length === 0) {
          setIsSortingCards(false);
          setSortCompleted(true);
          if (hasShownSortFinModal === "false") {
            localStorage.setItem("hasShownSortFinModal", true);
            setTriggerSortingFinishedModal(true);
          }
        } else {
          localStorage.setItem("hasShownSortFinModal", false);
          setIsSortingCards(true);
          setSortCompleted(false);
        }

        // increment Progress Bar
        const totalStatements2 = statementsObj.totalStatements;
        const remainingStatements = columnStatements.statementList.length;
        const numerator = totalStatements2 - remainingStatements;
        const ratio = numerator / totalStatements2;
        const completedPercent = (ratio * 30).toFixed();

        // update Progress Bar State
        setProgressScoreAdditionalSort(completedPercent);
      }
    } catch (error) {
      console.log(error.message);
    }
  }; // end of dragEnd helper function

  // get user settings
  const cardFontSize = props.cardFontSize;
  const fontColor = props.fontColor;

  // just the hori container size, not card size
  let horiCardMinHeight = 50;

  // pull data from STATE
  const statements = columnStatements.statementList;

  // setup grid columns
  const columns = qSortHeaders.map((value, index, highlightedColHeader) => {
    const columnId = `column${qSortHeaders[index]}`;
    const sortValue = qSortHeaderNumbers[index];
    const columnColor = columnColorsArray[index];

    return (
      <SortColumn
        key={columnId}
        minHeight={qSortPattern[index] * (+cardHeight + 8)}
        maxCards={qSortPattern[index]}
        columnId={columnId}
        columnStatementsArray={columnStatements.vCols[columnId]}
        forcedSorts={configObj.warnOverloadedColumn}
        columnWidth={props.columnWidth}
        cardHeight={+cardHeight}
        sortValue={sortValue}
        columnColor={columnColor}
        cardFontSize={cardFontSize}
        qSortHeaderNumber={qSortHeaderNumbers[index]}
        columnHeadersColor={columnHeadersColorsArray[index]}
        greenCardColor={greenCardColor}
        yellowCardColor={yellowCardColor}
        pinkCardColor={pinkCardColor}
        fontColor={fontColor}
      />
    );
  }); // end map of sort columns

  const InnerList = React.memo((props) => {
    const items = props.statements.map((item, index) => {
      const statementHtml = ReactHtmlParser(`<div>${decodeHTML(item.statement)}</div>`);
      return (
        <Draggable
          key={item.id}
          draggableId={item.id}
          index={index}
          sortValue={item.sortValue}
          cardColor={item.cardColor}
          className="droppableCards"
        >
          {(provided, snapshot) => (
            <>
              <div
                ref={provided.innerRef}
                className={`${item.cardColor}`}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={getItemStyleHori(
                  snapshot.isDragging,
                  provided.draggableProps.style,
                  `${item.sortValue}`,
                  `${item.cardColor}`,
                  columnWidth,
                  cardHeight,
                  cardFontSize,
                  greenCardColor,
                  yellowCardColor,
                  pinkCardColor,
                  fontColor
                )}
              >
                <span style={{ direction: "ltr" }}>{statementHtml}</span>
              </div>
            </>
          )}
        </Draggable>
      );
    });
    /*
    let finalItem = <div key={"placeholder"}>{props.provided.placeholder}</div>;
    items.unshift(finalItem);
    */
    return items;
  });

  // returning main content => horizontal feeder
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="rootDiv">
        {columns}
        <SortFooterDiv id="SortFooterDiv">
          <CardSlider id="CardSlider">
            <Droppable id="Droppable" droppableId="statements" direction="horizontal">
              {(provided, snapshot) => (
                <HorizontalFeederDiv
                  id="HorizontalFeederDiv"
                  ref={provided.innerRef}
                  style={getListStyleHori(
                    snapshot.isDraggingOver,
                    horiCardMinHeight,
                    sortDirection
                  )}
                >
                  <InnerList statements={statements} provided={provided} />
                  <div style={{ width: `0px` }}>{provided.placeholder}</div>
                </HorizontalFeederDiv>
              )}
            </Droppable>
          </CardSlider>
        </SortFooterDiv>
      </div>
    </DragDropContext>
  );
};

export default SortGrid;

const SortFooterDiv = styled.div`
  background: #e4e4e4;
  padding-right: 10px;
  position: fixed;
  left: 0px;
  bottom: 50px;
  width: 100vw;
  height: ${(props) => `${+props.cardHeight + 20}px;`};
`;

const CardSlider = styled.div`
  display: flex;
  width: 100vw;
  overflow: hidden;
`;

const HorizontalFeederDiv = styled.div``;

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
