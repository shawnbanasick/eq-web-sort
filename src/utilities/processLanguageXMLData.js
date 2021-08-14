import setGlobalState from "../globalState/setGlobalState";
import globalState from "../globalState/globalState";

const processLanguageXMLData = (dataObject) => {
  try {
    //   console.log(JSON.stringify(dataObject, null, 2));

    const data = dataObject.language.item;
    //   console.log(JSON.stringify(data[0]._attributes, null, 2));

    const languageObject = {};
    for (let i = 0; i < data.length; i++) {
      languageObject[data[i]._attributes.id] = data[i]._text;
    }
    // setGlobalState("languageObject", languageObject);

    return languageObject;
    // window.languageObject = languageObject;

    // console.log(JSON.stringify(globalState.languageObject, null, 2));
    // console.log(
    //   JSON.stringify(globalState.languageObject.welcomeHead, null, 2)
    // );
  } catch (error) {
    console.log("there was a language import error");
  }
};

export default processLanguageXMLData;
