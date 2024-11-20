import { FEED_VARIANT } from "../value";
import Container from "../components/Container";
import PostList from "../components/PostList";
import styles from "./HomePage.module.css";

export default function HomePage() {
  return (
    <main>
      <Container className={styles.container}>
        <PostList variant={FEED_VARIANT.HOME_FEED} />
      </Container>
    </main>
  );
}
