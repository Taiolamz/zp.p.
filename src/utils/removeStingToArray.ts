export function removeStingToArray(arr: string[], string: string) {
  arr = arr.filter(e => e !== string);

  return arr;
}
