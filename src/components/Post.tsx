import { PostType } from "../types";
import Card from "./Card";
import styles from "./Post.module.css";
import ContentInfo from "./ContentInfo";

export default function Post({ post }: { post: PostType }) {
  return (
    <Card className={styles.post}>
      <div className={styles.content}>
        <ContentInfo user={post.user} updatedTime={post.updatedAt} />
        <p className={styles.description}>{post.content}</p>
      </div>
    </Card>
  );
}
