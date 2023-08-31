import type { NextPage } from 'next'
import Head from 'next/head'
import { PROJECT_NAME } from '../configs/settings';
import styles from "../styles/New.module.css"
import { useState, useEffect } from 'react';
import { generateSuggestions } from '../modules/generateSuggestion';
import { CiCloseSm } from '../components/common/icons/CiCloseSm';
import { postRecord } from '../services/record';
import { PostRecordDataType } from '../@types/record';
import { getToday } from '../modules/getToday';
import { useRecordStore } from '../stores/record';
import { UserDataType, memberNameAndIDType } from '../@types/user';
import { useUserStore } from '../stores/user';
import { getFriendshipsByUID } from '../services/friendships';
import FriendCardImage from "../components/friend/FriendCardImage";

const New: NextPage = () => {

  const myUser = useUserStore((state) => state.user);
  const [groupName, setGroupName] = useState<string>('');
  const [memberName, setMemberName] = useState<string>('');
  const [memberList, setMemberList] = useState<memberNameAndIDType[]>([]);
  const [suggestions, setSuggestions] = useState<UserDataType[]>([]);
  const [myFriendList, setMyFriendList] = useState<UserDataType[]>([]);

  const setRecordData = useRecordStore((state) => state.setRecordData);

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
    const newSuggestions = generateSuggestions(e.target.value, myFriendList);
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
    const recordData: PostRecordDataType = {
      title: groupName,
      date: getToday(),
      totalPrice: 0,
    }
    const record = await postRecord(recordData);
    setRecordData(record);
  }

  return (
    <div className="container">
      <Head>
        <title>新規グループを作成|{PROJECT_NAME}</title>
        <meta name="description" content="会計を漢気じゃんけんで決めるためのアプリケーション" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
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
          >
            グループ作成
          </button>
        </div>
      </main>
    </div>
  )
}

export default New;