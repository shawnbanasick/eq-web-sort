const languageXML = {
  nextButtonText: "Next",
  welcomeText: `This is a demo project on iPad use in the classroom.<br/><br/>
  <b>** Important Information **</b><br/>For this survey you will need as much 
  screen space as possible!<br/><br/>If necessary, please <strong>MAXIMIZE</strong> the 
  size of your browser window, <b><i>reload</i></b> this web page, 
  <br/>and click on the "Continue" button to start the survey.`,
  presortModalText: `Read the following statements carefully and split them up into 
  three piles: a pile for statements you tend to disagree with, a pile for cards you 
  tend to agree with, and a pile for the rest.<br/><br/>You can either drag the cards 
  into one of the three piles or <b>press 1, 2, 3</b> on your keyboard. Changes can be made 
  later.<br/><br/>If you want to read this instruction a second time, press the 
  help-button at the bottom left corner.`,
  btnAgreement: "Agree",
  btnNeutral: "Neutral",
  btnDisagreement: "Disagree",
  statements: "Statements",
  negative: "Negative",
  neutral: "Neutral",
  positive: "Positive",
};

window.languageXML = languageXML;

// <!-- misc -->
// <item id="btnContinue">Continue...</item>
// <item id="btnclose">Close</item>
// <item id="btnHelp">Help me!</item>
// <item id="btnTransfer">Submit data</item>
// <item id="btnExit">Exit</item>
// <item id="selectItem">Please select...</item>

// <!-- Warning when user is trying to leave the page (this item was added for HtmlQ) -->
// <item id="leaveSiteWarning">Your answers will be lost.</item>

// <!-- HtmlQ only: In-App Back Button -->
// <item id="backButton">Back</item>
// <item id="fillInRequiredFields">Please fill in all required fields</item>

// <!-- errors -->
// <item id="errorHead">Error!</item>
// <item id="errorWindowTooSmall">Please maximize your browser for using this application.</item>

// <!-- welcome screen (leave blank to skip screen) -->
// <item id="welcomeHead">Welcome!</item>
// <item id="welcomeText">This is a demo project on iPad use in the classroom.{br}{br}{b}** Important Information **{/b}{br}For this survey you will need as much screen space as possible!{br}{br}If necessary, please {b}MAXIMIZE{/b} the size of your browser window, {b}{i}reload{/i}{/b} this web page, and click on the "Continue" button to start the survey.</item>

// <!-- user login, only displayed if access is restricted (see config-file) -->
// <item id="loginHead">Access Code</item>
// <item id="loginText">Please enter the access code for this survey.</item>
// <item id="loginFormHeader">Access Code</item>
// <item id="loginPartIdText">Your name or survey id number</item>
// <item id="loginNoInput">Please insert the access code.</item>
// <item id="loginInvalidInput">Access code invalid</item>
// <item id="loginNoConnection">Connection to server failed. Please try again.</item>

// <!-- introduction (leave blank to skip popup) -->
// <item id="introHead">Introduction</item>
// <item id="introText">This study is about iPad use in the classroom.</item>

// <!-- step1: rough sorting into three piles (leave blank to skip popup)-->
// <item id="step1Head">Step 1 of 5</item>
// <item id="step1Text">Read the folowing statements carefully and split them up into three piles: a pile for statements you tend to disagree with, a pile for cards you tend to agree with, and a pile for the rest.{br}{br}You can either drag the cards into one of the three piles or {b}press 1, 2, 3{/b} on your keyboard. Changes can be made later.{br}{br}If you want to read this instruction a second time, press the help-button at the bottom left corner.</item>

// <!-- step2: sorting (leave blank to skip popup) -->
// <item id="step2Head">Step 2 of 5</item>
// <item id="step2Text">Take the cards from the "AGREE"-pile and arrange them on right side of the score sheet.{br}{br}Next, take the cards from the "DISAGREE"-pile and arrange them on the left side of the score sheet. Follow this procedure for all cards in the "AGREE"- and "DIAGREE"-piles.{br}{br}Finally, take the "NEUTRAL"-cards arange them in the remaining open boxes of the score sheet.</item>
// <item id="step2CondOfInstruc">Sort the cards according to your experience with the iPads this semester</item>

// <!-- step3: check sorting, only displayed if showStep3== true (see config-file; leave blank to skip popup)-->
// <item id="step3Head">Step 3 of 5</item>
// <item id="step3Text">Now you have placed all cards on the score sheet. Please go over your distribution once more and swap card positions cards if desired.</item>
// <item id="step3CondOfInstruc">Sort the cards according to your experience with the iPads this semester</item>

// <!-- step4: comments on best/worst rated statements, only displayed if showStep4== true (see config-file; leave blank to skip popup) -->
// <item id="step4Head">Step 4 of 5</item>
// <item id="step4Text">Please explain why you agree most or disagree most with the following statements you have placed below "+4" or "-4".</item>

// <!-- step5: dditional questions, only displayed if showStep5== true (see config-file; leave blank to skip popup)-->
// <item id="step5Head">Step 5 of 5</item>
// <item id="step5Text">Finally, please answer the following questions regarding your background.</item>

// <!-- data transfer, only displayed if submitUrl is not blank (see config-file) -->
// <item id="transferHead">Submit Data</item>
// <item id="transferText">You've finished the survey. Please submit your data now.</item>
// <item id="transferFailed">Data submission failed. Please try again.</item>
// <item id="transferOk">Thank you for using Easy HTMLQ!{br}{br}You can now close your browser window.</item>
