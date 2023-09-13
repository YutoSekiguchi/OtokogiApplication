import { NextPage } from "next";
import { useRouter } from "next/router";
import { useRecordStore } from "../../../../stores/record";
import { MemberDataType } from "../../../../@types/member";
import { useEffect, useState } from "react";
import { getMembersByRID } from "../../../../services/member";
import { RecordDataType } from "../../../../@types/record";
import { getRecordByURLCode } from "../../../../services/record";
import styles from "../../../../styles/Reccord.module.css"
import { useMemberStore } from "../../../../stores/member";

const NewRecord: NextPage = () => {
  const router = useRouter();
  const record = useRecordStore((state) => state.record);
  const setRecordData = useRecordStore((state) => state.setRecordData);
  const setMembers = useMemberStore((state) => state.setMembers);
  const members = useMemberStore((state) => state.members);
  const [isCheckedList, setIsCheckedList] = useState<boolean[]>([]);
  

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
    if(members.length > 0) {
      const tmp = new Array(members.length).fill(true);
      setIsCheckedList(tmp);
    }
  }, [members])

  return (
    <div className="container">
      <div className={styles.newmain}>
        <div className="flex-start">
          <select name="paid-user" className={styles.user_select_box}>
            {
              members.map((member, i) => (
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
              members.map((member, i) => (
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

        <div className="flex-start">
          <p className="bold-text">の</p>
          <input 
            type="text"
            className={styles.text_form}
            placeholder="タクシー代"
          />
          <p className="bold-text">を払って、</p>
        </div>

        <div className="flex-start">
          <div className={styles.number_form_left}>¥</div>
          <input type="number" className={styles.number_form} placeholder="4800" />
          <p className="bold-text">かかった。</p>
        </div>

        <div>
          <button
            className={styles.submit_button}
          >
            登録
          </button>
        </div>

        <div>
          <button
            className={styles.back_button}
            onClick={() => {router.push(`/record/${router.query.code}`)}}
          >
            戻る
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewRecord;