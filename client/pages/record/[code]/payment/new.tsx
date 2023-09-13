import { NextPage } from "next";
import { useRouter } from "next/router";
import { useRecordStore } from "../../../../stores/record";
import { MemberDataType } from "../../../../@types/member";
import { useEffect, useState } from "react";
import { getMembersByRID } from "../../../../services/member";
import { RecordDataType } from "../../../../@types/record";
import { getRecordByURLCode } from "../../../../services/record";
import styles from "../../../../styles/Reccord.module.css"

const NewRecord: NextPage = () => {
  const router = useRouter();
  const record = useRecordStore((state) => state.record);
  const setRecordData = useRecordStore((state) => state.setRecordData);
  const [memberData, setMemberData] = useState<MemberDataType[]>([]);
  const [isCheckedList, setIsCheckedList] = useState<boolean[]>([]);
  

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

  const changeCheck = (i: number) => {
    const tmp = isCheckedList.concat();
    if (tmp[i] == true) {
      tmp[i] = false;
    } else {
      tmp[i] = true;
    }
    console.log(tmp);
    setIsCheckedList(tmp);
  }

  useEffect(() => {
    getFirstData();
  }, [router])

  useEffect(() => {
    if(memberData.length > 0) {
      const tmp = new Array(memberData.length).fill(true);
      setIsCheckedList(tmp);
    }
  }, [memberData])

  return (
    <div className="container">
      <div className={styles.newmain}>
        <div className="flex-start">
          <select name="paid-user" className={styles.user_select_box}>
            {
              memberData.map((member, i) => (
                <option key={i} value={member.name}>{member.name}</option>
              ))
            }
          </select>
          <p className="bold-text">が</p>
        </div>

        <div className="flex-start flex-wrap">
          {
            isCheckedList.length > 0 &&
            <>
            {
              memberData.map((member, i) => (
                <div key={i} className={styles.checkbox_wrapper}>
                  <input
                    type="checkbox" 
                    className="checkbox-input"
                    checked={isCheckedList[i]}
                    onChange={()=>{}}
                  />
                  <span className="custom-checkbox" onClick={() => changeCheck(i)}></span>
                  <p className="checkbox-label">{member.name}</p>
                </div> 
              ))
            }
            </>
          }
        </div>
      </div>
      </div>
  );
}

export default NewRecord;