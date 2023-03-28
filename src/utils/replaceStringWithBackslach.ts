const replaceStringWithBackslach = (text: string) => {
  const to_replace = new RegExp(",", "g");
  const replacement = "\\";

  const required_string = text.replace(to_replace, replacement);
  return required_string;
};

export default replaceStringWithBackslach;
