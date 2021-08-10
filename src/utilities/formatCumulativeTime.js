const formatCumulativetime = timeOnPage => {
  let d = new Date(+timeOnPage);
  let formattedViewTime =
    d.getUTCHours() +
    "_hrs_" +
    d.getUTCMinutes() +
    "_mins_" +
    d.getUTCSeconds() +
    "_secs";
  return formattedViewTime;
};

export default formatCumulativetime;
