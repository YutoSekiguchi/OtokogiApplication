export const generateSuggestions = (input: string, suggestionList: string[]) => {
  return  suggestionList.filter(suggestion =>
    suggestion.toLowerCase().includes(input.toLowerCase())
  );
};