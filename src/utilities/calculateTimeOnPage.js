// import store from '../state';
import getCumulativeDuration from './getCumulativeDuration';
import millisecondsToTime from './millisecondsToTime';
import getCurrentDateTime from './getCurrentDateTime';

const calculateTimeOnPage = (startTime, prefix, prefix2) => {
  const identifier = `${prefix}DurationCumulative`;
  // const identifier2 = `set${prefix2}DurationCumulative`;
  const identifier3 = `set${prefix2}DurationFormatted`;
  const identifier4 = `set${prefix2}LastAccess`;

  // const durationCumulative = store.getState()[identifier];
  const durationCumulative = localStorage.getItem(identifier) || 0;

  const newDurationCumulative = getCumulativeDuration(
    startTime,
    +durationCumulative
  );
  // send to state
  localStorage.setItem(identifier, newDurationCumulative);

  // send last access time to state
  const dateString = getCurrentDateTime();
  localStorage.setItem(identifier4, dateString);

  // send to memory
  const formattedDuration = millisecondsToTime(newDurationCumulative);
  localStorage.setItem(identifier3, formattedDuration);
};

export default calculateTimeOnPage;
