import globalState from "./globalState";

const setGlobalState = (key, value) => {


globalState[key] = value;

return null;
}

export default setGlobalState;