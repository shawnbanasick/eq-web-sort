import globalState from "./globalState";
import cloneDeep from "lodash/cloneDeep";

const getGlobalState = (key) => {
  const copyValue = cloneDeep(globalState[key]);
  return copyValue;
};

export default getGlobalState;
