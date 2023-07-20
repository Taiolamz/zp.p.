export const dateFormat = (text: string) => {
  let d = new Date(text);

  let datestring = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear() + ' ';

  return datestring;
};

export const yearDateFormat = (text: string) => {
  let d = new Date(text);

  let datestring = d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate() + ' ';

  return datestring;
};

export const dateTimeFormat = (text: string) => {
  let d = new Date(text);

  let datestring = d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate() + ' ';

  return datestring;
};

export function timeFormat(date: string, pmAm: boolean = false) {
  const d = new Date(date);
  let hours = d.getHours();
  let minutes: any = d.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';

  hours %= 12;
  hours = hours || 12;
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  const strTime = `${hours - 1}:${minutes} ${ampm}`;
  const noAmPmstrTime = `${hours - 1}:${minutes}`;

  return pmAm ? strTime : noAmPmstrTime;
}

// export default dateFormat;
