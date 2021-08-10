const getCurrentDateTime = () => {
  const currentDate = new Date();
  const date = currentDate.getDate();
  const month = currentDate.getMonth(); //Be careful! January is 0 not 1
  const year = currentDate.getFullYear();
  const hour = currentDate.getHours();
  let minute = currentDate.getMinutes();
  let seconds = currentDate.getSeconds();
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  if (minute < 10) {
    minute = "0" + minute;
  }
  let dateString =
    date +
    "/" +
    (month + 1) +
    "/" +
    year +
    " @ " +
    hour +
    ":" +
    minute +
    ":" +
    seconds;

  return dateString;
};

export default getCurrentDateTime;
