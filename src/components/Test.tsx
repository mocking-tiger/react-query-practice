import {
  keepPreviousData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getLikeCountByPostId, getPosts, likePost, unlikePost } from "../api";
import { useEffect, useState } from "react";
import { CommentType, PostType } from "../types";
import { POSTS_PAGE_LIMIT } from "../value";
import styles from "./Test.module.css";

export default function TestPage() {
  const POST_ID = 7;
  const USER_NAME = "codeit";
  const queryClient = useQueryClient();
  const [dataSwitch, setDataSwitch] = useState(false);
  const [page, setPage] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // react query 복습 페이지

  const dataEx1 = useQuery({
    queryKey: ["testData"],
    queryFn: () => getPosts(),
    // enabled 속성의 값이 true가 되기 전까지는 데이터를 페칭하지 않음
    enabled: !!dataSwitch,
  });

  const { data: dataEx2 } = useQuery({
    queryKey: ["testPosts", page],
    queryFn: () => getPosts(page, POSTS_PAGE_LIMIT),
    // 페칭이 완료되기 전에는 기존의 데이터를 보여줌
    placeholderData: keepPreviousData,
  });

  const {
    data: dataEx3,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["testPosts2"],
    queryFn: ({ pageParam }: { pageParam: number }) =>
      getPosts(pageParam, POSTS_PAGE_LIMIT),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) =>
      lastPage.hasMore ? lastPageParam + 1 : undefined,
  });

  const { data: dataEx4 } = useQuery({
    queryKey: ["likes"],
    queryFn: () => getLikeCountByPostId(POST_ID),
  });

  const testMutation = useMutation({
    mutationFn: async ({
      postId,
      username,
      isLiked,
    }: {
      postId: number;
      username: string;
      isLiked: boolean;
    }) => {
      if (!isLiked) {
        await likePost(postId, username);
      } else {
        await unlikePost(postId, username);
      }
    },
    onSettled: (data, err, { postId, username }) => {
      queryClient.invalidateQueries({
        queryKey: ["likes"],
      });
    },
  });

  const handleLikeButtonClick = () => {
    testMutation.mutate({
      postId: POST_ID,
      username: USER_NAME,
      isLiked: isLiked,
    });
    setIsLiked((prev) => !prev);
  };

  const testData = dataEx1?.data?.results ?? [];
  console.log(testData);

  const testData2 = dataEx2?.results ?? [];
  console.log(dataEx2);

  const testData3 = dataEx3?.pages ?? [];
  console.log(testData3);

  const testData4 = dataEx4 ?? 0;

  useEffect(() => {
    if (dataEx2) {
      setHasNext(dataEx2.hasMore);
    }
  }, [dataEx2]);

  return (
    <main className={styles.container}>
      <section>
        <h2>
          예제1 Dependant Query
          <br />
          (enabled로 조건부 페칭)
        </h2>
        {testData.length > 0
          ? testData.map((result: PostType) => (
              <div key={result.id}>{result.content}</div>
            ))
          : "데이터 없음"}

        <button onClick={() => setDataSwitch((prev) => !prev)}>
          데이터 ON
        </button>
      </section>
      <section>
        <h2>예제2 Paginated query</h2>
        {testData2.map((data: CommentType) => (
          <div key={data.id}>{data.content}</div>
        ))}
        <button
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 0}
        >
          이전
        </button>
        <button onClick={() => setPage((prev) => prev + 1)} disabled={!hasNext}>
          다음
        </button>
      </section>
      <section>
        <h2>예제3 Infinite Query</h2>
        {testData3.map((data) =>
          data.results.map((result: PostType) => (
            <div key={result.id}>{result.content}</div>
          ))
        )}
        <button
          onClick={() => {
            fetchNextPage();
            console.log(testData3);
          }}
          disabled={!hasNextPage}
        >
          더 불러오기
        </button>
      </section>
      <section>
        <h2>예제4 useMutation</h2>
        <div>{`좋아요 수: ${testData4}`}</div>
        <button onClick={handleLikeButtonClick}>좋아요</button>
      </section>
    </main>
  );
}
