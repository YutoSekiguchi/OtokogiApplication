import type { NextPage } from "next";
import { useRecordStore } from "../../stores/record";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../styles/Reccord.module.css"
import { getRecordByURLCode } from "../../services/record";
import { getMembersByRID } from "../../services/member";
import { MemberDataType } from "../../@types/member";
import { RecordDataType } from "../../@types/record";

const Record: NextPage = () => {

  const router = useRouter();
  const record = useRecordStore((state) => state.record);
  const setRecordData = useRecordStore((state) => state.setRecordData);
  const [memberData, setMemberData] = useState<MemberDataType[]>([]);

  const getMemberData = async(rid: number) => {
    const res = await getMembersByRID(rid);
    console.log(res);
    if (res != null) {
      setMemberData(res);
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
                memberData.map((data, i) => (
                  <div key={i}>
                    <p className={styles.record_header_member}>{data.name}</p>
                    {
                      i != memberData.length-1 && <p className={styles.record_header_member}>・</p>
                    }
                  </div>
                ))
              }
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