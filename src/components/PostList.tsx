import { useQuery } from "@tanstack/react-query";
import { getPosts, getPostsByUsername } from "../api";
import { PostType } from "../types";
import { FEED_VARIANT } from "../value";
import Post from "./Post";
import styles from "./PostList.module.css";
import LoadingPage from "../pages/LoadingPage";
import ErrorPage from "../pages/ErrorPage";

export default function PostList({
  variant = FEED_VARIANT.HOME_FEED,
}: {
  variant: string;
}) {
  let postsQueryKey;
  let postsQueryFn;

  if (variant === FEED_VARIANT.HOME_FEED) {
    postsQueryKey = ["posts"];
    postsQueryFn = getPosts;
  } else if (variant === FEED_VARIANT.MY_FEED) {
    const username = "codeit";
    postsQueryKey = ["posts", username];
    postsQueryFn = () => getPostsByUsername(username);
  } else {
    console.warn("제대로 확인하고 다시 해라 코드좀 잘 짜라");
  }

  const {
    data: postsData,
    isPending,
    isError,
  } = useQuery({
    queryKey: postsQueryKey as string[],
    queryFn: postsQueryFn,
    retry: 0,
  });

  if (isPending) return <LoadingPage />;
  if (isError) return <ErrorPage />;

  const posts = postsData?.results ?? [];

  return (
    <div className={styles.postList}>
      {posts.map((post: PostType) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
