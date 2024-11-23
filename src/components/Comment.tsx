import { CommentType } from "../types";
import styles from "./Comment.module.css";
import ContentInfo from "./ContentInfo";

export default function Comment({ comment }: { comment: CommentType }) {
  return (
    <div className={styles.comment}>
      <ContentInfo user={comment.user} updatedTime={comment.updatedAt} />
      <p className={styles.description}>{comment.content}</p>
    </div>
  );
}
