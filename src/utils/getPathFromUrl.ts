export function getPathFromPagUrl(str: string) {
  return str.split("v1/")[1];
}

export function getPageNoFromUrl(str: string) {
  return str.split("=")[1];
}
