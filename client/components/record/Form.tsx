import { useRouter } from "next/router";
import { useRecordStore } from "../../stores/record";
import { MemberDataType } from "../../@types/member";
import { ChangeEvent, useEffect, useState } from "react";
import { getMembersByRID } from "../../services/member";
import { RecordDataType } from "../../@types/record";
import { getRecordByURLCode } from "../../services/record";
import styles from "../../styles/Reccord.module.css"
import { useMemberStore } from "../../stores/member";
import { PayDataType, PostPayDataType } from "../../@types/pay";
import { getToday } from "../../modules/getToday";
import { getPayByID, postPay, updatePayByID } from "../../services/pay";
import { stringToNumberArray } from "../../modules/stringToNumberArray";

interface Props {
  mode?: "edit" | "submit"
}

const Form = ({mode="submit"}: Props): JSX.Element => {
  const router = useRouter();
  const record = useRecordStore((state) => state.record);
  const setRecordData = useRecordStore((state) => state.setRecordData);
  const setMembers = useMemberStore((state) => state.setMembers);
  const members = useMemberStore((state) => state.members);
  const [payData, setPayData] = useState<PayDataType | null>(null);
  const [paidUserId, setPaidUserId] = useState<number>(0);
  const [paidMemberId, setPaidMemberId] = useState<number>(0);
  const [isCheckedList, setIsCheckedList] = useState<boolean[]>([]);
  const [paidEventName, setPaidEventName] = useState<string>("");
  const [paidMoney, setPaidMoney] = useState<number>(0);
  const [isCheckDrive, setIsCheckDrive] = useState<boolean>(false);
  const [isCheckDriveBeer, setIsCheckDriveBeer] = useState<boolean>(false);
  

  const getMemberData = async(rid: number) => {
    const res = await getMembersByRID(rid);
    if (res != null) {
      setMembers(res);
    }
  }

  const getPayData = async(id: number) => {
    const res = await getPayByID(id);
    if (res !== null) {
      setPayData(res);
    }
  }

  const getFirstData = async() => {
    if (record === null || mode==="edit") {
      const { code, id } = router.query;
      if (typeof code === "string" ) {
        const res: RecordDataType = await getRecordByURLCode(code);
        if (res != null) {
          setRecordData(res);
          await getMemberData(res.id);
          if (mode === "edit") {
            await getPayData(Number(id));
          }
        }
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
    setIsCheckedList(tmp);
  }

  const changePaidUser = (e: ChangeEvent<HTMLSelectElement>) => {
    // カンマで分割して文字列の配列にする
    var stringArray = e.target.value.split(',');
    var numberArray = stringArray.map(function(str) {
      return parseInt(str, 10);
    });
    setPaidMemberId(numberArray[0]);
    setPaidUserId(numberArray[1]);
  }

  const changePaidEventName = (e: ChangeEvent<HTMLInputElement>) => {
    setPaidEventName(e.target.value);
  }
  
  const changePaidMoney = (e: ChangeEvent<HTMLInputElement>) => {
    setPaidMoney(Number(e.target.value));
  }

  const changeCheckDrive = () => {
    if (isCheckDrive == false) {
      setIsCheckDriveBeer(false)
    }
    setIsCheckDrive((prev) => !prev);
  }
  
  const changeCheckDriveBeer = () => {
    if (isCheckDriveBeer == false) {
      setIsCheckDrive(false);
    }
    setIsCheckDriveBeer((prev) => !prev);
  }
  
  const submit = async() => {
    if ((paidUserId == null || paidUserId == 0) || (paidMemberId == null || paidMemberId == 0)) {
      alert("エラーが発生しました。誰が支払ったのか再入力してください。");
      return;
    }
    if (record === null) {
      alert("エラーが発生しました。");
      return;
    }

    var count = 0;
    var otherUids: number[] = [];
    for(var i=0; i<isCheckedList.length; i++) {
      if (isCheckedList[i] == true) {
        count += 1;
        otherUids = [...otherUids, members[i].id];
      }
    }

    if (!isCheckDrive && !isCheckDriveBeer) {
      if (isCheckedList.length === 0) {
        alert("エラーが発生しました。メンバー情報を再確認してください。");
        return;
      }
      if (count === 0) {
        alert("誰に支払ったのかチェックを入れてください。");
        return;
      }
      if (paidEventName === null || paidEventName === "") {
        alert("何を払ったのか入力してください。");
        return;
      }
      if (paidMoney === null || paidMoney === 0) {
        alert("1円以上の値を入力してください。");
        return;
      }
      if (mode === "submit") {
        const data: PostPayDataType = {
          rid: record.id,
          mid: paidMemberId,
          uid: paidUserId,
          otherUids: otherUids.join(','),
          price: paidMoney,
          drive: 0,
          driveBeer: 0,
          detail: paidEventName,
          date: getToday(),
        }
        await postPay(data);
      } else if (mode === "edit") {
        const updateId = Number(router.query.id);
        const data: PostPayDataType = {
          rid: record.id,
          mid: paidMemberId,
          uid: paidUserId,
          otherUids: otherUids.join(","),
          price: paidMoney,
          drive: 0,
          driveBeer: 0,
          detail: paidEventName,
          date: payData?.date!,
        }
        await updatePayByID(updateId, data);
      }
    } else if (isCheckDrive && !isCheckDriveBeer) {
      if (mode === "submit") {
        const data: PostPayDataType = {
          rid: record.id,
          mid: paidMemberId,
          uid: paidUserId,
          otherUids: otherUids.join(','),
          price: 0,
          drive: 1,
          driveBeer: 0,
          detail: "運転",
          date: getToday(),
        }
        await postPay(data);
      } else if (mode === "edit") {
        const updateId = Number(router.query.id);
        const data: PostPayDataType = {
          rid: record.id,
          mid: paidMemberId,
          uid: paidUserId,
          otherUids: otherUids.join(","),
          price: 0,
          drive: 1,
          driveBeer: 0,
          detail: "運転",
          date: payData?.date!,
        }
        await updatePayByID(updateId, data);
      }
    } else if (!isCheckDrive && isCheckDriveBeer) {
      if (mode === "submit") {
        const data: PostPayDataType = {
          rid: record.id,
          mid: paidMemberId,
          uid: paidUserId,
          otherUids: otherUids.join(','),
          price: 0,
          drive: 0,
          driveBeer: 1,
          detail: "運転&酒封印",
          date: getToday(),
        }
        await postPay(data);
      } else if (mode === "edit") {
        const updateId = Number(router.query.id);
        const data: PostPayDataType = {
          rid: record.id,
          mid: paidMemberId,
          uid: paidUserId,
          otherUids: otherUids.join(","),
          price: 0,
          drive: 0,
          driveBeer: 1,
          detail: "運転&酒封印",
          date: payData?.date!,
        }
        await updatePayByID(updateId, data);
      }
    }

    router.push(`/record/${router.query.code}`);
  }

  useEffect(() => {
    getFirstData();
  }, [router])

  useEffect(() => {
    if(members.length > 0) {
      if (mode === "submit") {
        const tmp = new Array(members.length).fill(true);
        setIsCheckedList(tmp);
        setPaidUserId(members[0].uid)
        setPaidMemberId(members[0].id)
      }
    }
  }, [members])

  useEffect(() => {
    if(payData !== null && mode === "edit") {
      const uids = stringToNumberArray(payData.otherUids)
      let tmp: boolean[] = [];
      members.map((member, _) => {
        if(uids.includes(member.id)) {
          tmp.push(true);
        } else {
          tmp.push(false);
        }
      })
      setIsCheckedList(tmp);
      setPaidUserId(payData.uid)
      setPaidMemberId(payData.mid);
      if (payData.drive === 1) {
        setIsCheckDrive(true);
      } else if (payData.driveBeer === 1) {
        setIsCheckDriveBeer(true);
      } else {
        setPaidEventName(payData.detail);
        setPaidMoney(payData.price)
      }
    }
  }, [payData])

  return (
    <div className={styles.newmain}>
      <div className="flex-start">
        <select name="paid-user" className={styles.user_select_box} onChange={changePaidUser}>
          {
            members.map((member, i) => (
              <option key={i} value={[String(member.id), String(member.uid)]}>{member.name}</option>
            ))
          }
        </select>
        <p className="bold-text">が</p>
      </div>
      {
        !isCheckDrive && !isCheckDriveBeer &&
        <>
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
              value={paidEventName}
              onChange={changePaidEventName}
              placeholder="タクシー代"
            />
            <p className="bold-text">を払って、</p>
          </div>

          <div className="flex-start">
            <div className={styles.number_form_left}>¥</div>
            <input
              type="number"
              className={styles.number_form}
              placeholder="4800"
              value={paidMoney === 0? "": paidMoney}
              onChange={changePaidMoney}
            />
            <p className="bold-text">かかった。</p>
          </div>
        </>
      }

      {
        isCheckDrive && !isCheckDriveBeer &&
        <>
          <p className="bold-text">運転をする。</p>
        </>
      }
      
      {
        !isCheckDrive && isCheckDriveBeer &&
        <>
          <p className="bold-text">今日の運転を担当する。<br />だからしばらく酒飲めないねwwww</p>
        </>
      }

      <div className="flex-start flex-wrap">
        <div className={styles.checkbox_wrapper}>
          <input
            type="checkbox" 
            className="checkbox-input"
            checked={isCheckDrive}
            onChange={()=>{}}
          />
          <span className="custom-checkbox" onClick={changeCheckDrive}></span>
          <p className="checkbox-label">運転</p>
        </div>
        <div className={styles.checkbox_wrapper}>
          <input
            type="checkbox" 
            className="checkbox-input"
            checked={isCheckDriveBeer}
            onChange={()=>{}}
          />
          <span className="custom-checkbox" onClick={changeCheckDriveBeer}></span>
          <p className="checkbox-label">運転&酒封印</p>
        </div>
      </div>

      <div>
        <button
          className={styles.submit_button}
          onClick={submit}
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
  );
}

export default Form;