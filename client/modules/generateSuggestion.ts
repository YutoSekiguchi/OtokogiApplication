import { UserDataType } from "../@types/user";

export const generateSuggestions = (input: string, suggestionList: UserDataType[]) => {
  const lowercaseTarget = input.toLowerCase();
  return suggestionList.filter(obj => obj.displayName!.toLowerCase().includes(lowercaseTarget));
};