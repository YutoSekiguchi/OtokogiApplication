import { create } from "zustand";
import { UserDataType } from "../@types/user";

interface UserStoreType {
  user: UserDataType | {};
  setUserData: (data: UserDataType) => void;
}

export const useUserStore = create<UserStoreType>((set) => ({
  user: {},
  setUserData: (data: UserDataType) => set(() => ({ user: data }))
}))