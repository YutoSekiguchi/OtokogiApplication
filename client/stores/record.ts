import { create } from "zustand";
import { RecordDataType } from "../@types/record";

interface RecordStoreType {
  record: RecordDataType | null;
  setRecordData: (data: RecordDataType) => void;
  resetRecordData: () => void;
}

export const useRecordStore = create<RecordStoreType>((set) => ({
  record: null,
  setRecordData: (data: RecordDataType) => set(() => ({ record: data })),
  resetRecordData: () => set(() => ({record: null}))
}))