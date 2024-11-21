import { FEED_VARIANT } from "../value";
import { ToastContainer } from "react-toastify";
import Container from "../components/Container";
import PostList from "../components/PostList";
import styles from "./MyFeedPage.module.css";

export default function MyFeedPage() {
  return (
    <Container className={styles.container}>
      <ToastContainer position="top-center" autoClose={2000} />
      <PostList variant={FEED_VARIANT.MY_FEED} showPostForm={true} />
    </Container>
  );
}
