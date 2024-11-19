import styles from "./ProfilePhoto.module.css";

export default function ProfilePhoto({
  photo,
  name,
}: {
  photo: string;
  name: string;
}) {
  return <img className={styles.profilePhoto} src={photo} alt={name} />;
}
