import useStore from "../globalState/useStore";

const processLanguageXMLData = (dataObject) => {
  try {
    const data = dataObject.language.item;

    const langObj = {};
    for (let i = 0; i < data.length; i++) {
      langObj[data[i]._attributes.id] = data[i]._text;
      useStore.setState({ [data[i]._attributes.id]: data[i]._text });
    }

    return langObj;
  } catch (error) {
    console.log("there was a language import error");
  }
};

export default processLanguageXMLData;
