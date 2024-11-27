import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getPosts } from "../api";
import { useEffect, useState } from "react";
import { CommentType, PostType } from "../types";
import { POSTS_PAGE_LIMIT } from "../value";
import styles from "./Test.module.css";

export default function TestPage() {
  const [dataSwitch, setDataSwitch] = useState(false);
  const [page, setPage] = useState(0);
  const [hasNext, setHasNext] = useState(false);

  // react query 복습 페이지

  const data = useQuery({
    queryKey: ["testData"],
    queryFn: () => getPosts(),
    // enabled 속성의 값이 true가 되기 전까지는 데이터를 페칭하지 않음
    enabled: !!dataSwitch,
  });

  const { data: postsData } = useQuery({
    queryKey: ["testPosts", page],
    queryFn: () => getPosts(page, POSTS_PAGE_LIMIT),
    placeholderData: keepPreviousData,
  });

  const testData = data?.data?.results ?? [];
  console.log(testData);

  const testData2 = postsData?.results ?? [];
  console.log(postsData);

  useEffect(() => {
    if (postsData) {
      setHasNext(postsData.hasMore);
    }
  }, [postsData]);

  return (
    <main className={styles.container}>
      <section>
        <h2>예제1(enabled로 조건부 페칭)</h2>
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
        <h2>예제2 paginated query</h2>
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
    </main>
  );
}
