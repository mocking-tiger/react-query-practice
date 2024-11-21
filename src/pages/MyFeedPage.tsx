import { FEED_VARIANT } from "../value";
import Container from "../components/Container";
import PostList from "../components/PostList";
import styles from "./MyFeedPage.module.css";

export default function MyFeedPage() {
  return (
    <Container className={styles.container}>
      <PostList variant={FEED_VARIANT.MY_FEED} />
    </Container>
  );
}
