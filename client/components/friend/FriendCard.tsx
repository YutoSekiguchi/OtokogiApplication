import styles from "../../styles/Friend.module.css";
import Image from "next/image";
import { FriendCardPropsType, UserDataType } from "../../@types/user";
import { useUserStore } from "../../stores/user";
import { useEffect, useState } from "react";
import { getFriendshipsByUID, postFriendship } from "../../services/friendships";
import { PostFriendshipDataType } from "../../@types/friendship";

const FriendCard: ({user}:FriendCardPropsType)=>JSX.Element = ({user}: FriendCardPropsType) => {

  const myUser = useUserStore((state) => state.user);
  const [myFriendList, setMyFriendList] = useState<(UserDataType)[]>([]);
  const [applingUserList, setApplingUserList] = useState<|{id: number}[]>([]);

  const hasObjectWithId = (id: number): boolean => {
    return myFriendList.some(obj => obj.id === id);
  }

  const appriedObjectWithId = (id: number): boolean => {
    return applingUserList.some(obj => obj.id === id);
  }

  const follow = async() => {
    if(!(appriedObjectWithId(user?.id)) && !(hasObjectWithId(user?.id))) {
      const postData: PostFriendshipDataType = {
        uid: myUser!.id,
        friendId: user.id,
        status: 1,
      }
      const newFriendData = await postFriendship(postData);
      setApplingUserList([...applingUserList, {id: user.id}]);
    }
  }

  const unfollow = async() => {
    alert("未実装です")
  }

  useEffect(() => {
    const getMyFriend = async() => {
      if(myUser != null) {
        const res = await getFriendshipsByUID(myUser.id);
        setMyFriendList(res);
      }
    }
    getMyFriend();
  }, [myUser])

  const FriendRightSide = () => {
    return (
      <>
        {
          (hasObjectWithId(user?.id))
          ?
          <button
            className={styles.unfollow_button}
          >
            削除
          </button>
          :
            (appriedObjectWithId(user?.id))
            ?
            <button
              className={styles.follow_button}
              onClick={unfollow}
            >
              フォローをはずす
            </button>
            :
            <button
              className={styles.follow_button}
              onClick={follow}
            >
              フォロー
            </button>
        }
      </>
    );
  }

  return (
    <div className={styles.friend}>
      <div className={styles.left_side}>
        <Image 
          className={styles.user_icon}
          src={user?.image}
          alt="" width={42} height={42}
        />
        <div className={styles.user_name_and_code}>
          <p className={styles.user_name}>{user?.displayName}</p>
          <p className={styles.user_code}>{user?.friendCode}</p>
        </div>
      </div>
      <div className={styles.right_side}>
        <FriendRightSide />
      </div>
    </div>
  );
}

export default FriendCard;