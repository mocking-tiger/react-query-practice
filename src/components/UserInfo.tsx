import ProfilePhoto from "./ProfilePhoto";
import styles from "./UserInfo.module.css";

export default function UserInfo({
  name,
  photo,
}: {
  name: string;
  photo: string;
}) {
  return (
    <div className={styles.userInfo}>
      <ProfilePhoto photo={photo} name={name} />
      <div className={styles.userName}>{name}</div>
    </div>
  );
}
