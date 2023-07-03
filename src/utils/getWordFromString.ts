const getWordFromString = (text: string, wordPosition: number) => {
  let actualWordPosition = wordPosition - 1;
  return text.split(' ')[actualWordPosition];
};

export default getWordFromString;
