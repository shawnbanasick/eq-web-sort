const getFormattedViewTime = () => {
  let date = new Date();
  let minutes = +date.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  let seconds = +date.getSeconds();
  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  let dateTime =
    date.getDate() +
    "/" +
    (date.getMonth() + 1) +
    "/" +
    date.getFullYear() +
    " @ " +
    date.getHours() +
    ":" +
    minutes +
    ":" +
    seconds;
  return dateTime;
};

export default getFormattedViewTime;
