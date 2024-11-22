import { useContext } from "react";
import { FEED_VARIANT } from "../value";
import { ToastContainer } from "react-toastify";
import { LoginContext } from "../context/LoginContext";
import Container from "../components/Container";
import PostList from "../components/PostList";
import styles from "./MyFeedPage.module.css";
import NotLoggedInPage from "./NotLoggedInPage";

export default function MyFeedPage() {
  const { currentUsername } = useContext(LoginContext);

  if (!currentUsername) return <NotLoggedInPage />;

  return (
    <Container className={styles.container}>
      <ToastContainer position="top-center" autoClose={2000} />
      <PostList variant={FEED_VARIANT.MY_FEED} showPostForm={true} />
    </Container>
  );
}
