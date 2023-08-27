import styles from "../../styles/Friend.module.css";
import Image from "next/image";
import { FriendCardPropsType } from "../../@types/user";

const FriendCard: ({user}:FriendCardPropsType)=>JSX.Element = ({user}: FriendCardPropsType) => {

  const FriendRightSide = () => {
    return (
      <button
        className={styles.unfollow_button}
      >
        削除
      </button>
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