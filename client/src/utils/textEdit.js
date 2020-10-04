export const firstLetterToUpperCase = (text) => {
  const transformedText = text.charAt(0).toUpperCase() + text.slice(1);
  return transformedText;
};
