import store from "../state";

const displayDataObject = () => {
  // landing
  const results = store.getState().result;
  const columnList = store.getState().columnStatements;

  console.log("results => ", JSON.stringify(results));
  console.log(JSON.stringify(columnList));
};

export default displayDataObject;
