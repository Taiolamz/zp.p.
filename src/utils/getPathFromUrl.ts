export function getPathFromPagUrl(str: string) {
  return str.split("v1/")[1];
}
