import { create } from "zustand";
import { RecordDataType } from "../@types/record";

interface RecordStoreType {
  record: RecordDataType | {};
  setRecordData: (data: RecordDataType) => void;
}

export const useRecordStore = create<RecordStoreType>((set) => ({
  record: {},
  setRecordData: (data: RecordDataType) => set(() => ({ record: data })),
  resetRecordData: () => set(() => ({record: {}}))
}))