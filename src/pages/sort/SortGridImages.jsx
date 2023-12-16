import React, {
  useState,
  memo,
  useMemo,
  useEffect,
  useRef,
  createPortal,
} from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import move from "./move";
import reorder from "./reorder";
import SortColumnImages from "./SortColumnImages";
import getListStyleHori from "./getListStyleHori";
import getItemStyleHoriImages from "./getItemStyleHoriImages";
import calculateDragResultsImages from "./calculateDragResultsImages";
// import ReactHtmlParser from "react-html-parser";
// import decodeHTML from "../../utilities/decodeHTML";
import useSettingsStore from "../../globalState/useSettingsStore";
import useStore from "../../globalState/useStore";
import convertObjectToResults from "./convertObjectToResults";
import { Modal } from "react-responsive-modal";

/* eslint react/prop-types: 0 */

const getConfigObj = (state) => state.configObj;
const getMapObj = (state) => state.mapObj;
const getStatementsObj = (state) => state.statementsObj;
const getColumnStatements = (state) => state.columnStatements;
const getSetColState = (state) => state.setColumnStatements;
const getSetIsSortingCards = (state) => state.setIsSortingCards;
const getSetSortCompleted = (state) => state.setSortCompleted;
const getSetProgScoreAddSort = (state) => state.setProgressScoreAdditionalSort;
const getSortCharacteristics = (state) => state.sortCharacteristics;
const getSetSortCharacteristics = (state) => state.setSortCharacteristics;
let getCardHeight = (state) => state.cardHeight;
const getSetCardHeight = (state) => state.setCardHeight;
const getSetColumnWidth = (state) => state.setColumnWidth;
const getResults = (state) => state.results;
const getSortFinModalHasBeenShown = (state) =>
  state.sortFinishedModalHasBeenShown;
const getSortGridResults = (state) => state.sortGridResults;
const getSetIsSortingFinished = (state) => state.setIsSortingFinished;
const getSetResults = (state) => state.setResults;
const getSetSortFinModal = (state) => state.setSortFinishedModalHasBeenShown;
const getSetTriggerSortingFinModal = (state) =>
  state.setTriggerSortingFinishedModal;
const getSetSortGridResults = (state) => state.setSortGridResults;

const SortGrid = memo((props) => {
  // STATE
  const configObj = useSettingsStore(getConfigObj);
  const mapObj = useSettingsStore(getMapObj);
  const statementsObj = useSettingsStore(getStatementsObj);
  const columnStatements = useSettingsStore(getColumnStatements);
  const setColumnStatements = useSettingsStore(getSetColState);
  const setIsSortingCards = useStore(getSetIsSortingCards);
  const setSortCompleted = useStore(getSetSortCompleted);
  const setProgressScoreAdditionalSort = useStore(getSetProgScoreAddSort);
  const sortCharacteristics = useStore(getSortCharacteristics);
  const setSortCharacteristics = useStore(getSetSortCharacteristics);

  let cardHeight = useStore(getCardHeight);
  const setCardHeight = useStore(getSetCardHeight);
  const setColumnWidth = useStore(getSetColumnWidth);
  const results = useStore(getResults);
  const sortFinishedModalHasBeenShown = useStore(getSortFinModalHasBeenShown);
  const sortGridResults = useStore(getSortGridResults);
  const setIsSortingFinished = useStore(getSetIsSortingFinished);
  const setResults = useStore(getSetResults);
  const setSortFinishedModalHasBeenShown = useStore(getSetSortFinModal);
  const setTriggerSortingFinishedModal = useStore(getSetTriggerSortingFinModal);
  const setSortGridResults = useStore(getSetSortGridResults);

  const greenCardColor = configObj.greenCardColor;
  const yellowCardColor = configObj.yellowCardColor;
  const pinkCardColor = configObj.pinkCardColor;

  // setMinCardHeight is boolean (statements only - not images)
  // const setMinCardHeight = configObj.setMinCardHeight;
  // const minCardHeight = +configObj.minCardHeight;

  // MAP out SORT COLUMNS component before render
  // code inside render so that column lists update automatically
  const qSortHeaders = [...mapObj.qSortHeaders];
  const qSortHeaderNumbers = [...mapObj.qSortHeaderNumbers];

  // column colors
  const columnColorsArray = [...mapObj.columnColorsArray];
  const columnHeadersColorsArray = [...mapObj.columnHeadersColorsArray];
  const qSortPattern = [...mapObj.qSortPattern];

  // force updates after dragend - do not delete
  const [value, setValue] = useState(0); // integer state
  const [openImageModal, setOpenImageModal] = useState(false);
  const [imageSource, setImageSource] = useState("");

  // get sort direction
  let sortDirection = "rtl";
  if (configObj.sortDirection === "negative") {
    sortDirection = "ltr";
  }

  const handleOpenImageModal = (src) => {
    setImageSource(src);
    setOpenImageModal(true);
  };

  const useDraggableInPortal = () => {
    const self = useRef({}).current;

    useEffect(() => {
      const div = document.createElement("div");
      div.style.position = "absolute";
      div.style.pointerEvents = "none";
      div.style.top = "0";
      div.style.width = "100%";
      div.style.height = "100%";
      self.elt = div;
      document.body.appendChild(div);
      return () => {
        document.body.removeChild(div);
      };
    }, [self]);

    return (render) =>
      (provided, ...args) => {
        const element = render(provided, ...args);
        if (provided.draggableProps.style.position === "fixed") {
          return createPortal(element, self.elt);
        }
        return element;
      };
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

      const totalStatements = +configObj.numImages;

      const manageDragResults = calculateDragResultsImages(
        { ...result },
        totalStatements,
        results,
        sortFinishedModalHasBeenShown,
        sortGridResults
      );

      setIsSortingFinished(manageDragResults.sortFinished);
      setResults(manageDragResults.results);
      setSortFinishedModalHasBeenShown(
        manageDragResults.sortFinishedModalHasBeenShown
      );
      setTriggerSortingFinishedModal(
        manageDragResults.triggerSortingFinishedModal
      );
      setSortGridResults(manageDragResults.sortGridResults);

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
        const totalStatements = +configObj.numImages;

        const sortCharacterisiticsPrep = {};
        sortCharacterisiticsPrep.qSortPattern = [...mapObj.qSortPattern];
        sortCharacterisiticsPrep.qSortHeaders = [...mapObj.qSortHeaders];
        sortCharacterisiticsPrep.forcedSorts = configObj.warnOverloadedColumn;
        sortCharacterisiticsPrep.qSortHeaderNumbers = [
          ...mapObj.qSortHeaderNumbers,
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
          allowUnforcedSorts,
          qSortHeaderNumbers
        );

        // global state updates
        setColumnStatements(columnStatements);

        convertObjectToResults(columnStatements);

        if (columnStatements.imagesList.length === 0) {
          setIsSortingCards(false);
          setSortCompleted(true);
        } else {
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

        // force component update
        const newValue = value + 1;
        setValue(newValue);
      }
      setSortCharacteristics(sortCharacteristics);
    } catch (error) {
      console.log(error.message);
    }
  }; // end of dragEnd helper function

  // get user settings
  const cardFontSize = props.cardFontSize;
  const fontColor = props.fontColor;

  // just the hori container size, not card size
  let horiCardMinHeight = 50;

  // maximize cardHeight on first mount using default 0 in globalState
  const maxNumCardsInCol = Math.max(...qSortPattern);
  console.log("maxNumCardsInCol", maxNumCardsInCol);
  console.log(window.innerHeight);

  if (+cardHeight === 0) {
    cardHeight = +(
      (window.innerHeight - 150) /
      (maxNumCardsInCol + 1)
    ).toFixed();
    console.log("cardHeight", cardHeight);
    setCardHeight(+cardHeight);
  }

  // adjust width by q sort design
  // todo - find better adjustment process
  let visibleWidthAdjust;

  // less than -3
  if (qSortPattern.length > 0) {
    visibleWidthAdjust = 70;
  }
  // -3 to +3
  if (qSortPattern.length > 6) {
    visibleWidthAdjust = 96;
  }
  // -4 to +4
  if (qSortPattern.length > 8) {
    visibleWidthAdjust = 120;
  }
  // -5 to +5
  if (qSortPattern.length > 10) {
    visibleWidthAdjust = 145;
  }
  // -6 to +6
  if (qSortPattern.length > 12) {
    visibleWidthAdjust = 170;
  }

  // set dynamic width on page load on reload
  const columnWidth = useMemo(() => {
    return (props.dimensions.width - visibleWidthAdjust) / qSortPattern.length;
  }, [props.dimensions.width, visibleWidthAdjust, qSortPattern.length]);

  // send column width to global state
  setTimeout(() => setColumnWidth(columnWidth), 0);

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
        minHeight={qSortPattern[index] * (+cardHeight + 8)}
        maxCards={qSortPattern[index]}
        columnId={columnId}
        columnStatementsArray={columnStatements.vCols[columnId]}
        forcedSorts={configObj.warnOverloadedColumn}
        columnWidth={columnWidth}
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
          onClick={() => handleOpenImageModal(item.element.props.src)}
          className="droppableCards"
        >
          {(provided, snapshot) => (
            <>
              <FeederCard
                ref={provided.innerRef}
                className={`${item.cardColor}`}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={getItemStyleHoriImages(
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
                {item.element}
              </FeederCard>
              {provided.placeholder}
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
    <>
      <Modal
        open={openImageModal}
        center
        onClose={() => setOpenImageModal(false)}
        classNames={{ modal: "postSortImageModal" }}
      >
        <img src={imageSource} width="100%" height="auto" alt="modalImage" />
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
                    <InnerList statements={statements} provided={provided} />
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
});

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
