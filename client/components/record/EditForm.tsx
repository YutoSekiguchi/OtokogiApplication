import { useEffect, useState } from "react";
import { MemberDataType, PostMemberDataType } from "../../@types/member";
import { PostRecordDataType, RecordDataType } from "../../@types/record";
import { UserDataType, memberNameAndIDType } from "../../@types/user";
import { generateSuggestions } from "../../modules/generateSuggestion";
import { getRecordCode } from "../../modules/getRecordCode";
import { getToday } from "../../modules/getToday";
import { getFriendshipsByUID } from "../../services/friendships";
import { getMembersByRID, postMember } from "../../services/member";
import { getRecordByURLCode, postRecord, updateRecordByID, updateRecordTitleByID } from "../../services/record";
import styles from "../../styles/New.module.css"
import { useMemberStore } from "../../stores/member";
import { useRecordStore } from "../../stores/record";
import { useUserStore } from "../../stores/user";
import { useRouter } from "next/router";
import FriendCardImage from "../friend/FriendCardImage";
import { CiCloseSm } from "../common/icons/CiCloseSm";
import { findDifferentObjects } from "../../modules/edit/findDifferentObjects";

interface Props {
  mode?: "edit" | "submit"
}

const EditForm = ({mode="submit"}: Props): JSX.Element => {
  const router = useRouter();

  const myUser = useUserStore((state) => state.user);
  const [recordID, setRecordID] = useState<number>(0);
  const [groupName, setGroupName] = useState<string>('');
  const [memberName, setMemberName] = useState<string>('');
  const [memberList, setMemberList] = useState<memberNameAndIDType[]>([]);
  const [prevMemberList, setPrevMemberList] = useState<memberNameAndIDType[]>([]);
  const [suggestions, setSuggestions] = useState<UserDataType[]>([]);
  const [myFriendList, setMyFriendList] = useState<UserDataType[]>([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  const setRecordData = useRecordStore((state) => state.setRecordData);
  const addMembers = useMemberStore((state) => state.addMembers);

  const getMyFriend = async() => {
    if(myUser != null) {
      const res = await getFriendshipsByUID(myUser.id);
      setMyFriendList(res);
    }
  }

  const getMemberData = async(rid: number) => {
    const res = await getMembersByRID(rid);
    if (res != null) {
      let tmp: memberNameAndIDType[] = [];
      res.map((member: MemberDataType) => {
        if (myUser?.id !== member.uid) {
          const foundFriend = myFriendList.find(myFriend => myFriend.id === member.uid);
          if (foundFriend) {
            tmp = [...tmp, {id: member.uid, displayName: member.name, image: foundFriend.image}]
          } else {
            tmp = [...tmp, {id: null, displayName: member.name, image: "/noimage.png"}]
          }
        }
      })
      setMemberList(tmp);
      setPrevMemberList(tmp);
    }
  }

  const getRecordData = async() => {
    if(mode === "edit") {
      const { code } = router.query;
      if (typeof code === "string" ) {
        const res: RecordDataType = await getRecordByURLCode(code);
        if (res != null) {
          await getMemberData(res.id);
          setGroupName(res.title);
          setRecordID(res.id);
        }
      }
    }
  }

  useEffect(() => {
    getMyFriend();
  }, [myUser])

  useEffect(() => {
    if (myFriendList.length > 0) {
      getRecordData();
    }
  }, [myFriendList])

  const changeGroupName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroupName(e.target.value);
  }

  const changeMemberName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMemberName(e.target.value);
    // ここで候補を生成するロジックを実装
    // TODO: stringだけじゃなくてみんなのIDとか持ってくる
    if (e.target.value === "") {
      return
    }
    const newSuggestions = generateSuggestions(e.target.value, myFriendList, memberList);
    setSuggestions(newSuggestions);
  }

  const addMemberListFromTextBox = () => {
    const name = memberName;
    setMemberName('');
    if (name === "") {
      return;
    }
    setMemberList([...memberList, {id: null, displayName: name, image: "/noimage.png"}]);
  }

  const addMemberListFromFriend = (suggestion: UserDataType) => {
    var name = "";
    if (suggestion.displayName === null) {
      name = suggestion.name;
    } else {
      name = suggestion.displayName;
    }
    setMemberList([...memberList, {id: suggestion.id, displayName: name, image: suggestion.image}])
    setMemberName(name);
    setSuggestions([]); // 候補をクリックしたら候補リストをクリア
  }

  const removeMember = (index: number) => {
    const tmp = memberList.filter((_, i) => i !== index);
    setMemberList(tmp);
  }

  const submit = async() => {
    if (!isButtonDisabled) {
      setIsButtonDisabled(true);
      if (groupName !== "" && memberList.length > 0) {
        const date = getToday();
        const urlCode = getRecordCode();
        const recordData: PostRecordDataType = {
          title: groupName,
          date: date,
          totalPrice: 0,
          urlCode: urlCode,
        }
        const record: RecordDataType = await postRecord(recordData);
        setRecordData(record);
        if (record !== null && myUser !== null) {
          const myData: PostMemberDataType = {
            uid: myUser.id,
            name: myUser.displayName !== null? myUser.displayName!: myUser.name,
            rid: record.id,
            ranking: 1,
            totalWin: 0,
            totalDrive: 0,
            totalPrice: 0,
          }
          const me = await postMember(myData);
          addMembers(me);
          for(let i=0; i<memberList.length; i++) {
            const memberData: PostMemberDataType = {
              uid: (memberList[i].id===null)? 0: memberList[i].id!,
              name: memberList[i].displayName,
              rid: record.id,
              ranking: 1,
              totalPrice: 0,
              totalWin: 0,
              totalDrive: 0,
            }
            const member = await postMember(memberData);
            addMembers(member);
          }
          router.push(`/record/${urlCode}`);
        } else {
          alert("グループ作成に失敗しました");
          return;
        }
      } else {
        alert("グループ名とメンバーを埋めてください");
        return;
      }
      setTimeout(() => {
        setIsButtonDisabled(false);
      }, 2000)
    }
  }

  const changeRecord = async() => {
    if (!isButtonDisabled) {
      setIsButtonDisabled(true);

      if (groupName !== "" && memberList.length > 0) {
        const record: RecordDataType = await updateRecordTitleByID(recordID, groupName);
        setRecordData(record);
        // FIXME: 削除機能等に関して
        const differentMembers = findDifferentObjects(memberList, prevMemberList);
        if (record !== null && myUser !== null) {
          for(let i=0; i<differentMembers.length; i++) {
            const memberData: PostMemberDataType = {
              uid: (differentMembers[i].id===null)? 0: differentMembers[i].id!,
              name: differentMembers[i].displayName,
              rid: record.id,
              ranking: 1,
              totalPrice: 0,
              totalWin: 0,
              totalDrive: 0,
            }
            const member = await postMember(memberData);
            addMembers(member);
          }
          router.push(`/record/${record.urlCode}`);
        } else {
          alert("グループ編集に失敗しました");
          return;
        }
      } else {
        alert("グループ名とメンバーを埋めてください");
        return;
      }
      setTimeout(() => {
        setIsButtonDisabled(false);
      }, 2000)
    }
  }

  return (
    <div className={styles.main}>
      <div className={styles.form_group}>
        <p className={styles.label}>グループ名</p>
        <input
          type="text"
          className={styles.text_form} 
          placeholder="例）北海道旅行"
          value={groupName}
          onChange={changeGroupName}
        ></input>
      </div>

      <div className={styles.form_group}>
        <p className={styles.label}>メンバー<span className={styles.small_label}>*フレンドだと相手側の端末でも結果を保持できます</span></p>
        <div className={styles.name_form}>
          <input
            type="text"
            className={styles.text_form} 
            placeholder="メンバー名"
            value={memberName}
            onChange={changeMemberName}
          ></input>
          <button
            className={styles.form_add_button}
            onClick={addMemberListFromTextBox}
          >
            追加
          </button>
        </div>
        {
          memberList.length > 0 &&
          <div className={styles.member_list}>
            {
              memberList.map((memberData, index) => (
                <div key={index} className={styles.member_chip}>
                  <FriendCardImage img={memberData.image} width={24} height={24} />
                  <p>{memberData.displayName}</p>
                  <CiCloseSm 
                    className={styles.icon}
                    onClick={() => removeMember(index)}
                  />
                </div>
              ))
            }
          </div>
        }
        {
          suggestions.length >0 &&
          <>
            <p className={styles.suggestion_list_title}>候補のフレンド</p>
            <div className={styles.suggestion_list}>
              {suggestions.map((suggestion, index) => (
                <div key={index} className={styles.suggestion_description}>
                  <div className={styles.suggestion_description_right}>
                    <FriendCardImage img={suggestion.image} />
                    <p>{suggestion.displayName}</p>
                  </div>
                  <button
                    className={styles.suggestion_description_add_button}
                    onClick={() => addMemberListFromFriend(suggestion)}
                  >
                    メンバーに追加
                  </button>
                </div>
              ))}
            </div>
          </>
        }
        {
          mode === "submit" &&
          <button
            className={styles.submit_button}
            onClick={submit}
            disabled={isButtonDisabled}
          >
            グループ作成
          </button>
        }
        {
          mode === "edit" &&
          <button
            className={styles.submit_button}
            onClick={changeRecord}
            disabled={isButtonDisabled}
          >
            グループの変更
          </button>
        }
      </div>
    </div>
  );
}

export default EditForm;