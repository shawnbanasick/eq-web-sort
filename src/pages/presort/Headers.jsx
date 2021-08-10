import React from 'react';
import styled from 'styled-components';
import { view } from 'react-easy-state';
import headersDivStyle from './headersDivStyle';
import state from '../state';

/* eslint react/prop-types: 0 */

const Headers = props => {
  const {
    qSortHeaders,
    qSortHeaderNumbers,
    headerColorsArray,
    columnWidth,
  } = props;

  // const highlightedColHeader = useStore(state => state.draggingOverColumnId);
  const highlightedColHeader = state.getState('draggingOverColumnId');

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

export default view(Headers);

const HeaderDiv = styled.div``;
