import formatCumulativeTime from "./formatCumulativeTime";
import store from "../state";

const consoleLogDataObject = () => {
  // landing
  const test2 = store.getState().randomId8;
  const test3 = store.getState().startDate;
  const test5 = store.getState().dataId;
  const test = store.getState().landingLastAccess;
  const test6 = store.getState().landingPageDurationCumulative;
  const test7 = formatCumulativeTime(test6);
  console.log("randomId8 " + JSON.stringify(test2));
  console.log("start date " + JSON.stringify(test3));
  console.log("dataId " + JSON.stringify(test5));
  console.log("landing last access " + test);
  console.log("landing page duration cumulative " + JSON.stringify(test7));
  // home
  const testH = store.getState().homeLastAccess;
  const test6H = store.getState().homePageDurationCumulative;
  const test7H = formatCumulativeTime(test6H);
  console.log("home last access " + testH);
  console.log("home page duration cumulative " + JSON.stringify(test7H));
  // pre sort
  const testPS = store.getState().preSortLastAccess;
  const test6PS = store.getState().preSortPageDurationCumulative;
  const test7PS = formatCumulativeTime(test6PS);
  console.log("preSort last access " + testPS);
  console.log("preSort page duration cumulative " + JSON.stringify(test7PS));
};

export default consoleLogDataObject;
