import { useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPosts, getPostsByUsername, uploadPost } from "../api";
import { PostType } from "../types";
import { FEED_VARIANT, QUERY_KEYS } from "../value";
import { toast } from "react-toastify";
import { LoginContext } from "../context/LoginContext";
import Post from "./Post";
import styles from "./PostList.module.css";
import LoadingPage from "../pages/LoadingPage";
import ErrorPage from "../pages/ErrorPage";
import PostForm from "./PostForm";

export default function PostList({
  variant = FEED_VARIANT.HOME_FEED,
  showPostForm,
}: {
  variant: string;
  showPostForm?: boolean;
}) {
  const { currentUsername } = useContext(LoginContext);
  const queryClient = useQueryClient();

  let postsQueryKey;
  let postsQueryFn;

  if (variant === FEED_VARIANT.HOME_FEED) {
    postsQueryKey = [QUERY_KEYS.POSTS];
    postsQueryFn = getPosts;
  } else if (variant === FEED_VARIANT.MY_FEED) {
    postsQueryKey = [QUERY_KEYS.POSTS, currentUsername];
    postsQueryFn = () => getPostsByUsername(currentUsername);
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

  const uploadPostMutation = useMutation({
    mutationFn: (newPost) => uploadPost(newPost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.POSTS] });
    },
  });

  const handleUploadPost = (newPost: any) => {
    uploadPostMutation.mutate(newPost, {
      onSuccess: () => toast.success("포스트가 성공적으로 등록되었습니다!"),
    });
  };

  if (isPending) return <LoadingPage />;
  if (isError) return <ErrorPage />;

  const posts = postsData?.results ?? [];

  return (
    <div className={styles.postList}>
      {showPostForm ? (
        <PostForm
          onSubmit={handleUploadPost}
          buttonDisabled={uploadPostMutation.isPending}
        />
      ) : (
        ""
      )}
      {posts.map((post: PostType) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
