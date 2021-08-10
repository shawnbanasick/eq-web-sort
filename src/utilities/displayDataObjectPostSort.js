import store from '../state';

const displayDataObject = () => {
  // landing
  const results = store.getState().agreeObj;
  const results2 = store.getState().disagreeObj;
  // const columnStatements = store.getState().columnStatements;
  const columnList = JSON.parse(localStorage.getItem('columnStatements'));

  console.log('agreeObj => ', JSON.stringify(results));
  console.log('disagreeObj => ', JSON.stringify(results2));
  //  console.log("col state => from state ", JSON.stringify(columnStatements));
  console.log(
    'columnStatements from session storage=> ',
    JSON.stringify(columnList)
  );
};

export default displayDataObject;
