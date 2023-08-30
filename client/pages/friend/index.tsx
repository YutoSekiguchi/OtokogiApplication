import { NextPage } from "next";
import styles from "../../styles/Friend.module.css";
import { useUserStore } from "../../stores/user";
import FriendCard from "../../components/friend/FriendCard";
import { useEffect, useState } from "react";
import { UserDataType } from "../../@types/user";
import { getFriendshipsByUID } from "../../services/friendships";

const Friend: NextPage = () => {
  const user = useUserStore((state) => state.user);
  const [myFriendList, setMyFriendList] = useState<UserDataType[]>([])

  useEffect(() => {
    const getMyFriend = async() => {
      if(user != null) {
        const res = await getFriendshipsByUID(user.id);
        setMyFriendList(res);
      }
    }
    getMyFriend();
  }, [user])

  return (
    <div className="container">
      <h2 className={styles.title}>フレンド一覧</h2>
      <div className={styles.friend_list}>
        {
          myFriendList.map((myFriend, i) => (
            <FriendCard key={i} user={myFriend} />
          ))
        }
      </div>
    </div>
  );
}

export default Friend;