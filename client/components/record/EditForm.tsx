import { useEffect, useState } from "react";
import { PostMemberDataType } from "../../@types/member";
import { PostRecordDataType, RecordDataType } from "../../@types/record";
import { UserDataType, memberNameAndIDType } from "../../@types/user";
import { generateSuggestions } from "../../modules/generateSuggestion";
import { getRecordCode } from "../../modules/getRecordCode";
import { getToday } from "../../modules/getToday";
import { getFriendshipsByUID } from "../../services/friendships";
import { postMember } from "../../services/member";
import { postRecord } from "../../services/record";
import styles from "../../styles/New.module.css"
import { useMemberStore } from "../../stores/member";
import { useRecordStore } from "../../stores/record";
import { useUserStore } from "../../stores/user";
import { useRouter } from "next/router";
import FriendCardImage from "../friend/FriendCardImage";
import { CiCloseSm } from "../common/icons/CiCloseSm";

interface Props {
  mode?: "edit" | "submit"
}

const EditForm = ({mode="submit"}: Props): JSX.Element => {
  const router = useRouter();

  const myUser = useUserStore((state) => state.user);
  const [groupName, setGroupName] = useState<string>('');
  const [memberName, setMemberName] = useState<string>('');
  const [memberList, setMemberList] = useState<memberNameAndIDType[]>([]);
  const [suggestions, setSuggestions] = useState<UserDataType[]>([]);
  const [myFriendList, setMyFriendList] = useState<UserDataType[]>([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  const setRecordData = useRecordStore((state) => state.setRecordData);
  const addMembers = useMemberStore((state) => state.addMembers);

  useEffect(() => {
    const getMyFriend = async() => {
      if(myUser != null) {
        const res = await getFriendshipsByUID(myUser.id);
        setMyFriendList(res);
      }
    }
    getMyFriend();
  }, [myUser])

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

  return (
    <div className={styles.main}>
      <div className={styles.form_group}>
        <p className={styles.label}>グループ名</p>
        <input
          type="text"
          className={styles.text_form} 
          placeholder="例）北海道旅行"
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

        <button
          className={styles.submit_button}
          onClick={submit}
          disabled={isButtonDisabled}
        >
          グループ作成
        </button>
      </div>
    </div>
  );
}

export default EditForm;