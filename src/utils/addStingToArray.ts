export function addStingToArray(arr: string[], string: string) {
  var index = arr.indexOf(string);

  if (index === -1) {
    arr.push(string); // String does not exist in the array, so add it
  } else {
    arr = arr.filter(e => e !== string);
  }

  return arr;
}
