import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import move from "./move";
import reorder from "./reorder";
import SortColumnImages from "./SortColumnImages";
import getListStyleHori from "./getListStyleHori";
import getItemStyleHoriImages from "./getItemStyleHoriImages";
import calculateDragResultsImages from "./calculateDragResultsImages";
import useSettingsStore from "../../globalState/useSettingsStore";
import useStore from "../../globalState/useStore";
import { Modal } from "react-responsive-modal";
import useLocalStorage from "../../utilities/useLocalStorage";

/* eslint react/prop-types: 0 */

const getConfigObj = (state) => state.configObj;
const getMapObj = (state) => state.mapObj;
const getSetIsSortingCards = (state) => state.setIsSortingCards;
const getSetSortCompleted = (state) => state.setSortCompleted;
const getSetProgScoreAddSort = (state) => state.setProgressScoreAdditionalSort;
const getResults = (state) => state.results;
const getSortFinModalHasBeenShown = (state) =>
  state.sortFinishedModalHasBeenShown;
const getSortGridResults = (state) => state.sortGridResults;
const getSetIsSortingFinished = (state) => state.setIsSortingFinished;
const getSetResults = (state) => state.setResults;
const getSetTriggerSortingFinModal = (state) =>
  state.setTriggerSortingFinishedModal;
const getSetSortGridResults = (state) => state.setSortGridResults;

const SortGridImages = (props) => {
  // GLOBAL STATE
  const configObj = useSettingsStore(getConfigObj);
  const mapObj = useSettingsStore(getMapObj);
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

  let presortColumnStatements = JSON.parse(
    localStorage.getItem("columnStatements")
  );

  if (presortColumnStatements === null) {
    presortColumnStatements = [];
  }

  // LOCAL STATE
  const [openImageModal, setOpenImageModal] = useState(false);
  const [imageSource, setImageSource] = useState("");
  const [dualPhotoArray, setDualPhotoArray] = useState([]);
  const [openDualImageModal, setOpenDualImageModal] = useState(false);

  // PERSISTENT STATE
  const [columnStatements, setColumnStatements] = useLocalStorage(
    "sortColumns",
    presortColumnStatements
  );

  let columnWidth = props.columnWidth;
  const totalStatements = +configObj.numImages;
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

  const handleOpenImageModal = (e, src) => {
    if (e.detail === 2) {
      if (e.shiftKey) {
        dualPhotoArray.push(e.target.src);
        setDualPhotoArray(dualPhotoArray);
        if (dualPhotoArray.length === 2) {
          setOpenDualImageModal(true);
        }
      } else {
        setImageSource(e.target.src);
        setOpenImageModal(true);
      }
    }
  };

  // fire move and re-order functions
  const onDragEnd = (result) => {
    try {
      /*
    example result object:
    result {"draggableId":"s1","type":"DEFAULT",
    "source":{"droppableId":"statements","index":0},
    "destination":{"droppableId":"column1","index":0},
    "reason":"DROP"}
    */
      // translated column name and starts results calculations
      const manageDragResults = calculateDragResultsImages(
        { ...result },
        totalStatements,
        results,
        sortFinishedModalHasBeenShown,
        sortGridResults
      );

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
        // source.droppableId give origin id => "statements" or "columnN1"
        // sourceList is cards in that origin
        // gather data to send to move function
        let sourceListArray;
        let destinationListArray;
        if (source.droppableId === "statements") {
          sourceListArray = columnStatements.imagesList;
        } else {
          sourceListArray = columnStatements.vCols[source.droppableId];
        }
        if (destination.droppableId === "statements") {
          destinationListArray = columnStatements.imagesList;
        } else {
          destinationListArray =
            columnStatements.vCols[destination.droppableId];
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
        const hasShownSortFinModal = localStorage.getItem(
          "hasShownSortFinModal"
        );

        if (columnStatements.imagesList.length === 0) {
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
        const totalStatements2 = configObj.numImages;
        const remainingStatements = columnStatements.imagesList.length;
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
  const statements = columnStatements.imagesList;

  // setup grid columns
  const columns = qSortHeaders.map((value, index, highlightedColHeader) => {
    const columnId = `column${qSortHeaders[index]}`;
    const sortValue = qSortHeaderNumbers[index];
    const columnColor = columnColorsArray[index];

    return (
      <SortColumnImages
        key={columnId}
        minHeight={qSortPattern[index] * (+props.cardHeight + 8)}
        maxCards={qSortPattern[index]}
        columnId={columnId}
        columnStatementsArray={columnStatements.vCols[columnId]}
        forcedSorts={configObj.warnOverloadedColumn}
        columnWidth={props.columnWidth}
        cardHeight={+props.cardHeight}
        sortValue={sortValue}
        columnColor={columnColor}
        cardFontSize={cardFontSize}
        qSortHeaderNumber={qSortHeaderNumbers[index]}
        columnHeadersColor={columnHeadersColorsArray[index]}
        greenCardColor={greenCardColor}
        yellowCardColor={yellowCardColor}
        pinkCardColor={pinkCardColor}
        fontColor={fontColor}
        handleOpenImageModal={handleOpenImageModal}
      />
    );
  }); // end map of sort columns

  const InnerList = React.memo((props) => {
    const items = props.statements.map((item, index) => {
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
              <FeederCard
                ref={provided.innerRef}
                className={`${item.cardColor}`}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                onClick={(e) => handleOpenImageModal(e, item.element.props.src)}
                style={getItemStyleHoriImages(
                  snapshot.isDragging,
                  provided.draggableProps.style,
                  `${item.sortValue}`,
                  `${item.cardColor}`,
                  columnWidth,
                  props.cardHeight,
                  cardFontSize,
                  greenCardColor,
                  yellowCardColor,
                  pinkCardColor,
                  fontColor
                )}
              >
                <img
                  src={item.element.props.src}
                  alt={item.element.props.alt}
                />
              </FeederCard>
              {provided.placeholder}
            </>
          )}
        </Draggable>
      );
    });
    return items;
  });
  /*
  *** placeholder problem is from React Beautiful DND lib - due to position fixed
  let finalItem = <div key={"placeholder"}>{props.provided.placeholder}</div>;
  items.unshift(finalItem);
  todo - fix placeholder problem
  */

  // returning main content => horizontal feeder
  return (
    <>
      <Modal
        open={openImageModal}
        center
        onClose={() => setOpenImageModal(false)}
        classNames={{
          modal: `${configObj.imageFormat}`,
          overlay: "dualImageOverlay",
        }}
      >
        <img src={imageSource} width="100%" height="auto" alt="modalImage" />
      </Modal>
      <Modal
        open={openDualImageModal}
        center
        onClose={() => {
          setOpenDualImageModal(false);
          setDualPhotoArray([]);
        }}
        classNames={{ overlay: "dualImageOverlay", modal: "dualImageModal" }}
      >
        <img
          src={dualPhotoArray[0]}
          width="49.5%"
          height="auto"
          alt="modalImage"
        />
        <img
          src={dualPhotoArray[1]}
          width="49.5%"
          height="auto"
          style={{ marginLeft: "1%" }}
          alt="modalImage2"
        />
      </Modal>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="rootDiv">
          {columns}
          <SortFooterDiv id="SortFooterDiv">
            <CardSlider id="CardSlider">
              <Droppable
                id="Droppable"
                droppableId="statements"
                direction="horizontal"
                style={{ maxWidth: "100vw" }}
              >
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
                    <InnerList
                      statements={statements}
                      cardHeight={props.cardHeight}
                      provided={provided}
                    />
                    <span style={{ display: "none" }}>
                      {" "}
                      {provided.placeholder}
                    </span>
                  </HorizontalFeederDiv>
                )}
              </Droppable>
            </CardSlider>
          </SortFooterDiv>
        </div>
      </DragDropContext>
    </>
  );
};

export default SortGridImages;

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

const FeederCard = styled.div`
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
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
