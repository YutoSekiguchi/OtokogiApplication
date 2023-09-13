import type { NextPage } from "next";
import { useRecordStore } from "../../../stores/record";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../../styles/Reccord.module.css"
import { getRecordByURLCode } from "../../../services/record";
import { getMembersByRID } from "../../../services/member";
import { MemberDataType } from "../../../@types/member";
import { RecordDataType } from "../../../@types/record";
import { EvaArrowCircleUpOutline } from "../../../components/common/icons/EvaArrowCircleUpOutline";
import CopyButton from "../../../components/record/CopyButton";
import ShareButton from "../../../components/record/ShareButton";
import { useMemberStore } from "../../../stores/member";

const Record: NextPage = () => {

  const router = useRouter();
  const record = useRecordStore((state) => state.record);
  const setRecordData = useRecordStore((state) => state.setRecordData);
  const setMembers = useMemberStore((state) => state.setMembers);
  const members = useMemberStore((state) => state.members);
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  const getMemberData = async(rid: number) => {
    const res = await getMembersByRID(rid);
    console.log(res);
    if (res != null) {
      setMembers(res);
    }
  }

  const getFirstData = async() => {
    if (Object.keys(record).length === 0) {
      const { code } = router.query;
      console.log(code)
      if (typeof code === "string" ) {
        const res: RecordDataType = await getRecordByURLCode(code);
        if (res != null) {
          setRecordData(res);
          await getMemberData(res.id);
        }
        console.log(res)
      }
    }
  }

  useEffect(() => {
    getFirstData();
  }, [router])

  return (
    <div className="container">
      {
        record && (typeof record === "object" && "title" in record)
        ?
        <>
          <div className={styles.record_header}>
            <h1 className={styles.record_header_title}>{record.title}</h1>
            <div className={styles.record_header_member_list}>
              {
                members.map((data, i) => (
                  <div key={i}>
                    <p className={styles.record_header_member}>{data.name}</p>
                    {
                      i != members.length-1 && <p className={styles.record_header_member}>・</p>
                    }
                  </div>
                ))
              }
            </div>
          </div>

          <div className={styles.main}>
            <button className={styles.add_record_button} onClick={() => {router.push(`/record/${router.query.code}/payment/new`)}}>
              漢気記録を追加
            </button>
            <div className={styles.arrow_icon_wrapper}>
              <EvaArrowCircleUpOutline className={styles.arrow_icon} />
            </div>
            <div>
              <p className={styles.detail_context}>「漢気記録を追加」ボタンから<br />メンバー間の漢気記録を登録しましょう</p>
            </div>
            <div className={styles.button_wrapper}>
              <CopyButton textToCopy={currentUrl} />
              <ShareButton textToShare={currentUrl} />
            </div>

            <div>
              <button className={styles.edit_button}>
                グループ編集
              </button>
            </div>
          </div>
        </>
        :
        <></>
      }
    </div>
  );
}

export default Record;