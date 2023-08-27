import { NextPage } from "next";
import styles from "../styles/Friend.module.css";
import { useUserStore } from "../stores/user";
import FriendCard from "../components/friend/FriendCard";

const Friend: NextPage = () => {
  const user = useUserStore((state) => state.user);
  return (
    <div className="container">
      <h2 className={styles.title}>フレンド一覧</h2>
      <div className={styles.friend_list}>
        <FriendCard user={user!} />
      </div>
    </div>
  );
}

export default Friend;