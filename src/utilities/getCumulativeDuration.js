// import state from "../store";
// import store from "../state";

const getCumulativeDuration = (startTime, cumulativeDuration2) => {
  const cumulativeDuration = +cumulativeDuration2;
  // duration, location
  let dateNow = Date.now();

  let fullTime = dateNow - startTime + cumulativeDuration;

  return fullTime;
};

export default getCumulativeDuration;
