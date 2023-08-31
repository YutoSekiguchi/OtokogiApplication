import styles from "../../styles/Friend.module.css";
import Image from "next/image";

const FriendCardImage = ({img, width=42, height=42}: {img: string, width?: number, height?: number}) => {
  return (
    <Image 
      className={styles.user_icon}
      src={img}
      alt="" width={width} height={height}
    />
  );
}

export default FriendCardImage;