import styles from "../../styles/Friend.module.css";
import Image from "next/image";

const FriendCardImage = ({img}: {img: string}) => {
  return (
    <Image 
      className={styles.user_icon}
      src={img}
      alt="" width={42} height={42}
    />
  );
}

export default FriendCardImage;