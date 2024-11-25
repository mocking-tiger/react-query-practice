import { useContext } from "react";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { getPosts, getPostsByUsername, uploadPost } from "../api";
import { NewPostType, PostType } from "../types";
import { FEED_VARIANT, POSTS_PAGE_LIMIT, QUERY_KEYS } from "../value";
import { toast } from "react-toastify";
import { LoginContext } from "../context/LoginContext";
import Post from "./Post";
import styles from "./PostList.module.css";
import LoadingPage from "../pages/LoadingPage";
import ErrorPage from "../pages/ErrorPage";
import PostForm from "./PostForm";
import Button from "./Button";

export default function PostList({
  variant = FEED_VARIANT.HOME_FEED,
  showPostForm,
}: {
  variant: string;
  showPostForm?: boolean;
}) {
  const { currentUsername } = useContext(LoginContext);
  const queryClient = useQueryClient();

  let postsQueryKey: readonly unknown[] = [];
  let postsQueryFn;

  if (variant === FEED_VARIANT.HOME_FEED) {
    postsQueryKey = [QUERY_KEYS.POSTS];
    postsQueryFn = ({ pageParam }: { pageParam: number }) =>
      getPosts(pageParam, POSTS_PAGE_LIMIT);
  } else if (variant === FEED_VARIANT.MY_FEED) {
    postsQueryKey = [QUERY_KEYS.POSTS, currentUsername];
    postsQueryFn = ({ pageParam }: { pageParam: number }) =>
      getPostsByUsername(currentUsername, pageParam, POSTS_PAGE_LIMIT);
  } else {
    console.warn("제대로 확인하고 다시 해라 코드좀 잘 짜라");
  }

  const {
    data: postsData,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: postsQueryKey,
    queryFn: postsQueryFn,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) =>
      lastPage.hasMore ? lastPageParam + 1 : undefined,
  });

  const uploadPostMutation = useMutation({
    mutationFn: (newPost: NewPostType) => uploadPost(newPost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.POSTS] });
    },
  });

  const handleUploadPost = (newPost: NewPostType) => {
    uploadPostMutation.mutate(newPost, {
      onSuccess: () => toast.success("포스트가 성공적으로 등록되었습니다!"),
    });
  };

  if (isPending) return <LoadingPage />;
  if (isError) return <ErrorPage />;

  // const posts = postsData?.results ?? [];
  const postsPages = postsData?.pages ?? [];

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
      {postsPages.map((postPage) =>
        postPage.results.map((post: PostType) => (
          <Post key={post.id} post={post} />
        ))
      )}
      <Button
        onClick={fetchNextPage}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        더 불러오기
      </Button>
    </div>
  );
}
