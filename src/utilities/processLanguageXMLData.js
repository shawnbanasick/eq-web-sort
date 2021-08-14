import setGlobalState from "../globalState/setGlobalState";
// import globalState from "../globalState/globalState";

const processLanguageXMLData = (dataObject) => {
  //   console.log(JSON.stringify(dataObject, null, 2));

  const data = dataObject.language.item;
  //   console.log(JSON.stringify(data[0]._attributes, null, 2));

  const languageObject = {};
  for (let i = 0; i < data.length; i++) {
    languageObject[data[i]._attributes.id] = data[i]._text;
  }
  setGlobalState("languageObject", languageObject);

  //   console.log(JSON.stringify(globalState, null, 2));
};

export default processLanguageXMLData;
