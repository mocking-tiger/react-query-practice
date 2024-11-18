import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../api";
import Post from "./Post";
import styles from "./PostList.module.css";

export type PostType = {
  content: string;
  createdAt: number;
  id: number;
  updatedAt: number;
  user: {
    createdAt: number;
    id: number;
    name: string;
    photo: string;
    updatedAt: number;
    username: string;
  };
  userId: number;
};

export default function PostList() {
  const { data: postsData } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  const posts = postsData?.results ?? [];
  console.log(posts);

  return (
    <div className={styles.postList}>
      {posts.map((post: PostType) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
