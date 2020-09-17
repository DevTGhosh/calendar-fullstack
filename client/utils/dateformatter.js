import dayjs from 'dayjs';

export const convertDateObjectToUnix = (dateObject) => {
  return dayjs.unix(dateObject).toDate();
};

export const convertUnixToDateObject = (unixTime) => {
  return dayjs(unixTime).unix();
};
