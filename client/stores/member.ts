import { create } from "zustand";
import { MemberDataType } from "../@types/member";

interface MemberStoreType {
  members: MemberDataType[];
  addMembers: (data: MemberDataType) => void;
  setMembers: (li: MemberDataType[]) => void;
  resetMembers: () => void;
}

export const useMemberStore = create<MemberStoreType>((set) => ({
  members: [],
  addMembers: (data: MemberDataType) => set((state) => ({ members: [...state.members, data] })),
  setMembers: (li: MemberDataType[]) => set(() => ({ members: li })),
  resetMembers: () => set(() => ({ members: [] })),
}))