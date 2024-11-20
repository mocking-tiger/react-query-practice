import { UserType } from "../types";
import styles from "./ContentInfo.module.css";
import UserInfo from "./UserInfo";

function formateDate(timestamp: number) {
  const fullDate = new Date(timestamp);
  const date = fullDate.getDate();
  const month = fullDate.getMonth() + 1;
  const year = fullDate.getFullYear();
  const hours = fullDate.getHours();
  const minutes = fullDate.getMinutes();

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");

  return `${year}-${month}-${date} ${formattedHours}:${formattedMinutes}`;
}

export default function ContentInfo({
  user,
  updatedTime,
}: {
  user: UserType;
  updatedTime: number;
}) {
  return (
    <div className={styles.info}>
      <UserInfo name={user.name} photo={user.photo} />
      <div className={styles.date}>{formateDate(updatedTime)}</div>
    </div>
  );
}
