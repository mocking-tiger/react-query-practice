import { PostType } from "./PostList";
import Card from "./Card";
import styles from "./Post.module.css";

export default function Post({ post }: { post: PostType }) {
  return (
    <Card className={styles.post}>
      <div className={styles.content}>
        <p className={styles.description}>{post.content}</p>
      </div>
    </Card>
  );
}
