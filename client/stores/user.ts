import { create } from "zustand";
import { UserDataType } from "../@types/user";

interface UserStoreType {
  user: UserDataType | null;
  setUserData: (data: UserDataType) => void;
}

export const useUserStore = create<UserStoreType>((set) => ({
  user: null,
  setUserData: (data: UserDataType) => set(() => ({ user: data }))
}))