import { UserDataType, memberNameAndIDType } from "../@types/user";

export const generateSuggestions = (input: string, suggestionList: UserDataType[], memberList: memberNameAndIDType[]) => {
  const lowercaseTarget = input.toLowerCase();
  const suggestionNameList = suggestionList.filter(obj => obj.displayName!.toLowerCase().includes(lowercaseTarget));
  var res = [];
  for(let i=0; i<suggestionNameList.length; i++) {
    var count = 0;
    for(let j=0; j<memberList.length; j++) {
      if(suggestionNameList[i].id === memberList[j].id) {
        count += 1
      }
    }
    if (count == 0) {
      res.push(suggestionNameList[i]);
    }
    count = 0;
  }
  return res;
};