import { NextPage } from "next";
import { useRouter } from "next/router";
import { useRecordStore } from "../../../../../stores/record";
import { useMemberStore } from "../../../../../stores/member";
import { useState } from "react";
import PayEditForm from "../../../../../components/record/PayEditForm";

const PayEditPage: NextPage = () => {
  const router = useRouter();
  const record = useRecordStore((state) => state.record);
  const setRecordData = useRecordStore((state) => state.setRecordData);
  const setMembers = useMemberStore((state) => state.setMembers);
  const members = useMemberStore((state) => state.members);
  const [paidUserId, setPaidUserId] = useState<number>(0);
  const [paidMemberId, setPaidMemberId] = useState<number>(0);
  const [isCheckedList, setIsCheckedList] = useState<boolean[]>([]);
  const [paidEventName, setPaidEventName] = useState<string>("");
  const [paidMoney, setPaidMoney] = useState<number>(0);
  const [isCheckDrive, setIsCheckDrive] = useState<boolean>(false);
  const [isCheckDriveBeer, setIsCheckDriveBeer] = useState<boolean>(false);

  return (
    <div className="container">
      <PayEditForm mode="edit" />
    </div>
  );
}

export default PayEditPage;