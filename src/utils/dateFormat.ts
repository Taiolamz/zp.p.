export const dateFormat = (text: string) => {
  let d = new Date(text);

  let datestring =
    d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + " ";

  return datestring;
};

export const yearDateFormat = (text: string) => {
  let d = new Date(text);

  let datestring =
    d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate() + " ";

  return datestring;
};

// export default dateFormat;
