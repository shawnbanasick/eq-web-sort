import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        outline:0;
        box-sizing:border-box;
        font-family: 'Open Sans', sans-serif; 
    }
    #root{
        margin:0 auto;
    }

    /*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */

/* Document
   ========================================================================== */

/**
 * 1. Correct the line height in all browsers.
 * 2. Prevent adjustments of font size after orientation changes in iOS.
 */

html {
  line-height: 1.15; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
  overflow: -moz-scrollbars-vertical; 
  overflow-y: scroll;
  -ms-touch-action: manipulation;
touch-action: manipulation;
}



/* Sections
   ========================================================================== */

/**
 * Remove the margin in all browsers.
 */

body {
  margin: 0;
  height:calc(100vh-50px);
  overscroll-behavior: none;
  overflow: hidden;
}

/**
 * Render the main element consistently in IE.
 */

main {
  display: block;
}

/**
 * Correct the font size and margin on 'h1' elements within 'section' and
 * 'article' contexts in Chrome, Firefox, and Safari.
 */

h1 {
  font-size: 2em;
  margin: 0.67em 0;
}

/* Grouping content
   ========================================================================== */

/**
 * 1. Add the correct box sizing in Firefox.
 * 2. Show the overflow in Edge and IE.
 */

hr {
  box-sizing: content-box; /* 1 */
  height: 0; /* 1 */
  overflow: visible; /* 2 */
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd 'em' font sizing in all browsers.
 */

pre {
  font-family: monospace, monospace; /* 1 */
  font-size: 1em; /* 2 */
}

/* Text-level semantics
   ========================================================================== */

/**
 * Remove the gray background on active links in IE 10.
 */

a {
  background-color: transparent;
}

/**
 * 1. Remove the bottom border in Chrome 57-
 * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.
 */

abbr[title] {
  border-bottom: none; /* 1 */
  text-decoration: underline; /* 2 */
  text-decoration: underline dotted; /* 2 */
}

/**
 * Add the correct font weight in Chrome, Edge, and Safari.
 */

b,
strong {
  font-weight: bolder;
  display: inline !important;
}

/**
 * 1. Correct the inheritance and scaling of font size in all browsers.
 * 2. Correct the odd 'em' font sizing in all browsers.
 */

code,
kbd,
samp {
  font-family: monospace, monospace; /* 1 */
  font-size: 1em; /* 2 */
}

/**
 * Add the correct font size in all browsers.
 */

small {
  font-size: 80%;
}

/**
 * Prevent 'sub' and 'sup' elements from affecting the line height in
 * all browsers.
 */

sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/* Embedded content
   ========================================================================== */

/**
 * Remove the border on images inside links in IE 10.
 */

img {
  border-style: none;
}

/* Forms
   ========================================================================== */

/**
 * 1. Change the font styles in all browsers.
 * 2. Remove the margin in Firefox and Safari.
 */

button,
input,
optgroup,
select,
textarea {
  font-family: inherit; /* 1 */
  font-size: 100%; /* 1 */
  line-height: 1.15; /* 1 */
  margin: 0; /* 2 */
}

/**
 * Show the overflow in IE.
 * 1. Show the overflow in Edge.
 */

button,
input { /* 1 */
  overflow: visible;
}

/**
 * Remove the inheritance of text transform in Edge, Firefox, and IE.
 * 1. Remove the inheritance of text transform in Firefox.
 */

button,
select { /* 1 */
  text-transform: none;
}

/**
 * Correct the inability to style clickable types in iOS and Safari.
 */

button,
[type="button"],
[type="reset"],
[type="submit"] {
  -webkit-appearance: button;
}

/**
 * Remove the inner border and padding in Firefox.
 */

button::-moz-focus-inner,
[type="button"]::-moz-focus-inner,
[type="reset"]::-moz-focus-inner,
[type="submit"]::-moz-focus-inner {
  border-style: none;
  padding: 0;
}

/**
 * Restore the focus styles unset by the previous rule.
 */

button:-moz-focusring,
[type="button"]:-moz-focusring,
[type="reset"]:-moz-focusring,
[type="submit"]:-moz-focusring {
  outline: 1px dotted ButtonText;
}

/**
 * Correct the padding in Firefox.
 */

fieldset {
  padding: 0.35em 0.75em 0.625em;
}

/**
 * 1. Correct the text wrapping in Edge and IE.
 * 2. Correct the color inheritance from 'fieldset' elements in IE.
 * 3. Remove the padding so developers are not caught out when they zero out
 *    'fieldset' elements in all browsers.
 */

legend {
  box-sizing: border-box; /* 1 */
  color: inherit; /* 2 */
  display: table; /* 1 */
  max-width: 100%; /* 1 */
  padding: 0; /* 3 */
  white-space: normal; /* 1 */
}

/**
 * Add the correct vertical alignment in Chrome, Firefox, and Opera.
 */

progress {
  vertical-align: baseline;
}

/**
 * Remove the default vertical scrollbar in IE 10+.
 */

textarea {
  overflow: auto;
}

/**
 * 1. Add the correct box sizing in IE 10.
 * 2. Remove the padding in IE 10.
 */

[type="checkbox"],
[type="radio"] {
  box-sizing: border-box; /* 1 */
  padding: 0; /* 2 */
}

/**
 * Correct the cursor style of increment and decrement buttons in Chrome.
 */

[type="number"]::-webkit-inner-spin-button,
[type="number"]::-webkit-outer-spin-button {
  height: auto;
}

/**
 * 1. Correct the odd appearance in Chrome and Safari.
 * 2. Correct the outline style in Safari.
 */

[type="search"] {
  -webkit-appearance: textfield; /* 1 */
  outline-offset: -2px; /* 2 */
}

/**
 * Remove the inner padding in Chrome and Safari on macOS.
 */

[type="search"]::-webkit-search-decoration {
  -webkit-appearance: none;
}

/**
 * 1. Correct the inability to style clickable types in iOS and Safari.
 * 2. Change font properties to 'inherit' in Safari.
 */

::-webkit-file-upload-button {
  -webkit-appearance: button; /* 1 */
  font: inherit; /* 2 */
}

/* Interactive
   ========================================================================== */

/*
 * Add the correct display in Edge, IE 10+, and Firefox.
 */

details {
  display: block;
}

/*
 * Add the correct display in all browsers.
 */

summary {
  display: list-item;
}

/* Misc
   ========================================================================== */

/**
 * Add the correct display in IE 10+.
 */

template {
  display: none;
}

/**
 * Add the correct display in IE 10.
 */

[hidden] {
  display: none;
}


/***********************************
  FOOTER CSS
 *******************************************************************************/
footer { 
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50px;
  background: #ececec; 
}

/***********************************
  PRESORT CSS
 *******************************************************************************/

  /* to speed up react beautiful dnd */
[data-rbd-draggable-id] { will-change: transform, opacity }
/*
[data-rbd-draggable-id] { left: auto !important; top: auto !important; }
*/
  .dragObject {
    -webkit-user-select: none;
    user-select: none;
    display: flex;
  }



  .react-responsive-modal-modal {
  background: white;
  max-width: 700px;
  width: 100%;
  padding: 15px;

}

  #cardsDiv{
    grid-column-start: 3;
    overflow: hidden;
    align-self: end;
    margin-top: 20px;
  }
  
  #cards{
    max-height: 215px;
    min-height:150px;
    overflow: hidden;
  }
  
  #completionRatio {
    grid-row-start: 1;
    grid-column-start: 4;
    text-align: center;
    font-weight: bold;
  }

  #negDiv{
    grid-row-start: 3;
    grid-column-start: 2;
    overflow-y: auto;
    background-color: white;
    min-height: 300px;
    height: 58vh;
    padding-top: 5px;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    border: 1px solid #aeaeae;

    ::-webkit-scrollbar {
      // Width of vertical scroll bar
      width: 10px;
      // Height of horizontal scroll bar
      height: 10px;

    }
    ::-webkit-scrollbar-thumb {
      border-radius: 8px;
      background: gray;
    }
  }
  

  #neutralDiv{
    grid-row-start: 3;
    grid-column-start: 3;
    overflow-y: auto;
    background-color: white;
    min-height: 300px;
    height: 58vh;
    padding-top: 5px;
    border: 1px solid #aeaeae;

    ::-webkit-scrollbar {
      // Width of vertical scroll bar
      width: 10px;
      // Height of horizontal scroll bar
      height: 10px;

    }
    ::-webkit-scrollbar-thumb {
      border-radius: 8px;
      background: gray;
    }

  }

  #posDiv{
    grid-row-start: 3;
    grid-column-start: 4;
    overflow-y: auto;
    background-color: white;
    height: 58vh;
    padding-top: 5px;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
    border: 1px solid #aeaeae;

    ::-webkit-scrollbar {
      // Width of vertical scroll bar
      width: 10px;
      // Height of horizontal scroll bar
      height: 10px;

    }
    ::-webkit-scrollbar-thumb {
      border-radius: 8px;
      background: gray;
    }
  }

  #pos{
    min-height: 52vh;
    border-radius: 3px;
  }

  #neutral{
    min-height: 52vh;
    border-radius: 3px;
  }

  #neg{
    min-height: 52vh;
    border-radius: 3px;
  }
}



/***********************************
  PRESORT CSS  ** IMAGES ** 
 *******************************************************************************/
  #presortFinishedModal  {
  max-width: 380px !important;
  margin-right: 10px !important;
}


#imageGrid .cardsDivImg{
    grid-column-start: 3;
    overflow: hidden;
    padding-top: 10px;
  }



 #imageGrid .cardsDivImg  img {
    width: 100%;
  }

  
  #imageGrid #cards{
    min-height:34vh;
   overflow: hidden;
  }
  

  #imageGrid #completionRatioImg {
    grid-row-start: 1;
    grid-column-start: 4;
    text-align: center;
    font-weight: bold;
  }

  #imageEnlargeInstructionsDiv {
    grid-row-start: 1;
    grid-column-start: 2;
    text-align: center;
  }

  #imageGrid .negDivImg{
    grid-row-start: 3;
    grid-column-start: 2;
    overflow-y: auto;
    background-color: white;
    min-height: 300px;
    height: 50vh;
    padding-top: 5px;
    border-top-left-radius: 3px;
    overflow-x: hidden;
    border-bottom-left-radius: 3px;
    border: 1px solid #aeaeae;

    ::-webkit-scrollbar {
      // Width of vertical scroll bar
      width: 3px;
      // Height of horizontal scroll bar
      height: 10px;

    }
    ::-webkit-scrollbar-thumb {
      border-radius: 8px;
      background: gray;
    }
  }
  

  #imageGrid .neutralDivImg{
    grid-row-start: 3;
    grid-column-start: 3;
    overflow-y: auto;
    background-color: white;
    min-height: 300px;
    height: 50vh;
    padding-top: 5px;
    overflow-x: hidden;
    border: 1px solid #aeaeae;

    ::-webkit-scrollbar {
      // Width of vertical scroll bar
      width: 3px;
      // Height of horizontal scroll bar
      height: 10px;

    }
    ::-webkit-scrollbar-thumb {
      border-radius: 8px;
      background: gray;
    }

  }

  #imageGrid .posDivImg{
    grid-row-start: 3;
    grid-column-start: 4;
    overflow-y: auto;
    background-color: white;
    height: 50vh;
    padding-top: 5px;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
    border: 1px solid #aeaeae;
    overflow-x: hidden;

    ::-webkit-scrollbar {
      // Width of vertical scroll bar
      width: 3px;
      // Height of horizontal scroll bar
      height: 10px;

    }
    ::-webkit-scrollbar-thumb {
      border-radius: 8px;
      background: gray;
    }
  }

  .pos{
    min-height: 25vh;
    border-radius: 3px;
  }

  .neutral{
    min-height: 38vh;
    border-radius: 3px;
  }

  .neg{
    min-height: 38vh;
    border-radius: 3px;
  }

  #imageGrid .cards{
    border-radius: 3px;
    
  }
  
  #imageGrid .cards > :not(:first-child) {
    opacity: 0;
    }
  

/***********************************
  SORT CSS
 *******************************************************************************/
.sortContainer {
  display: flex;
  flex-direction: column;
  margin: 5px;
  background: rgba(0, 0, 0, 0.1);
  min-height: 400px;
  max-height: 800px;
  overflow: auto;
}

.rootDiv {
  background-color: white;
  /* background-color: #6a9bc3; */
  padding: 0px, 0px, 10px, 10px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
}

.headersContainer {
  display: flex;
  position: fixed;
  justify-content: center;
  align-items: flex-start;
  height: 50px;
  flex-direction: "row-reverse";
}

.greenSortCard {
  display: flex;
  justify-content: center;
  background: lightgreen;
  border: 2px solid gray;
}

.pinkSortCard {
  display: flex;
  justify-content: center;
  background-color: rgba(255, 182, 193, 0.4);
  border: 2px solid gray;
}

.yellowSortCard {
  display: flex;
  justify-content: center;
  background-color: lightgray;
  border: 2px solid gray;
}

/* 
.isPositiveStatement {
  background-color: rgba(199, 246, 199, 0.6);
} */

.sortFooter {
  display: flex;
  flex-direction: row;
  background: #e4e4e4;
  position: fixed;
  left: 0px;
  bottom: 50px !important;
  width: 100%;
  height: 150px;
}

.footerMessageBox {
  flex-basis: 100px;
  padding-right: 5px;
  padding-left: 5px;
  width: 100px;
  height: 100px;
  border: 2px solid lightgray;
  text-align: center;
}

.footerMessageBox p {
  padding: 0px;
  margin-top: 10px;
  font-size: 10px;
  color: #3273dc;
}

.sortEndButton {
  position: fixed;
  bottom: 0;
  right: 0;
  margin: 10px;
}

.cardSlider {
  width: 100vw;
  overflow: hidden;
  display: flex;
  align-items: right;
}

.placeholder {
  width: 100px;
  -webkit-animation: placeholderAnimate 3s ease-in;
}

/*

#DroppableContainer > img {
  width: 23.5vw !important;
  height: auto;
}

.imageModal {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);

  img {
  width: 100%;
  height: auto;
  }
}
*/

/***********************************
  POST SORT 
 *******************************************************************************/
.dropdown-heading-value {
  padding-top: 5px;
  min-height: 30px;
}

/***********************************
  IMAGE MODAL CSS
 *******************************************************************************/


  .postSortImageModal169 {
    background: black;
    width: 70vw;
    max-width: none;
   }


  .postSortImageModal43 {
    background: black;
    width: 30vw;
    max-width: none;
   }


   .dualImageModal {
    background: black;
    width: 85vw;
    max-width: none;
   }

   .dualImageOverlay {
    background: black;
    opacity: 0.85;
  }

  /***********************************
  LANDING MODAL CSS
 *******************************************************************************/


  /*
  spinner css
  */

  #loading {
  display: inline-block;
  width: 100px;
  margin-top: 40px;
  height: 100px;
  border: 10px solid lightgray;
  border-radius: 50%;
  border-top-color: #337ab7;
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { -webkit-transform: rotate(360deg); }
}
@-webkit-keyframes spin {
  to { -webkit-transform: rotate(360deg); }
}


@keyframes opacity {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}


@-webkit-keyframes slide {
    100% { left: 0; }
}

@keyframes slide {
    100% { left: 0; }
}

@-webkit-keyframes placeholderAnimate {
  100% {
    width: 100%;
  }
  0% {
    width: 0px;
  }
}

`;
