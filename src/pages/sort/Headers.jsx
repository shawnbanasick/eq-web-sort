import React from "react";
import styled from "styled-components";
import headersDivStyle from "./headersDivStyle";
import useStore from "../../globalState/useStore";

/* eslint react/prop-types: 0 */

const getColumnId = (state) => state.draggingOverColumnId;

const Headers = (props) => {
  const { qSortHeaders, qSortHeaderNumbers, headerColorsArray, columnWidth } =
    props;

  const highlightedColHeader = useStore(getColumnId);

  return (
    <div className="headersContainer">
      {qSortHeaderNumbers.map((headerItem, index) => (
        <HeaderDiv
          style={headersDivStyle(
            index,
            columnWidth,
            headerColorsArray,
            qSortHeaders,
            highlightedColHeader
          )}
          key={headerItem}
        >
          {headerItem}
        </HeaderDiv>
      ))}
    </div>
  );
};

export default Headers;

const HeaderDiv = styled.div``;
