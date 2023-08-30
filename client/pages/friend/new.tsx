import { NextPage } from "next";
import styles from "../../styles/Friend.module.css";
import { useState } from "react";
import { UserDataType } from "../../@types/user";
import { getUserByFriendCode } from "../../services/user";
import FriendCard from "../../components/friend/FriendCard";

const FriendNew: NextPage = () => {
  const [isNotFound, setIsNotFound] = useState<boolean>(false);
  const [suggestUser, setSuggestUser] = useState<UserDataType | null>(null);
  const [inputFriendCode, setInputFriendCode] = useState<string>("");
  
  const changeInputFriendCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputFriendCode(e.target.value);
    setSuggestUser(null);
  }

  const searchUser = async() => {
    const res = await getUserByFriendCode(inputFriendCode);
    if (res === null) {
      setIsNotFound(true);
      return;
    }
    setIsNotFound(false);
    setSuggestUser(res);
  }

  return(
    <div className="container">
      <h2 className={styles.title}>フレンド申請</h2>
      <div className={styles.friend_search_form_box}>
        <input
          type="text"
          className={styles.friend_search_form} 
          placeholder="フレンドコードを入力"
          value={inputFriendCode}
          onChange={changeInputFriendCode}
        ></input>
        <button
          className={styles.form_search_button}
          onClick={searchUser}
        >
          検索
        </button>
      </div>
      {
        isNotFound &&
        <h2 className={styles.notfound_text}>該当ユーザなし</h2>
      }
      {
        suggestUser !== null &&
        <div className={styles.suggest_user}>
          <FriendCard user={suggestUser} />
        </div>
      }
    </div>
  );
}

export default FriendNew;