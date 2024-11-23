import { useQuery, useQueryClient } from "@tanstack/react-query";
import { PostType, UserType } from "../types";
import { QUERY_KEYS } from "../value";
import { getCommentCountByPostId } from "../api";
import Card from "./Card";
import styles from "./Post.module.css";
import ContentInfo from "./ContentInfo";
import Button from "./Button";
import greyHeartImage from "../assets/gray-heart.png";
import { useContext, useState } from "react";
import { LoginContext } from "../context/LoginContext";
import { useNavigate } from "react-router-dom";
import CommentList from "./CommentList";

export default function Post({ post }: { post: PostType }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { currentUsername } = useContext(LoginContext);
  const [showCommentList, setShowCommentList] = useState(false);
  const currentUserInfo: UserType | undefined = queryClient.getQueryData([
    QUERY_KEYS.USER_INFO,
    currentUsername,
  ]);

  const { data: commentCount, refetch: refetchCommentCount } = useQuery({
    queryKey: [QUERY_KEYS.COMMENT_COUNT, post.id],
    queryFn: () => getCommentCountByPostId(post.id),
  });

  const handleCommentButtonClick = () => {
    if (!currentUsername) {
      navigate("/not-logged-in");
      return;
    }
    setShowCommentList((prev) => !prev);
    refetchCommentCount();
  };

  return (
    <Card className={styles.post}>
      <div className={styles.content}>
        <ContentInfo user={post.user} updatedTime={post.updatedAt} />
        <p className={styles.description}>{post.content}</p>
        <div className={styles.engagement}>
          <Button className={styles.likeButton}>
            <img className={styles.like} src={greyHeartImage} alt="좋아용" />
            {`좋아요 0개`}
          </Button>
          <Button onClick={handleCommentButtonClick}>{`댓글 ${
            commentCount ?? 0
          }개`}</Button>
        </div>
        {showCommentList ? (
          <div>
            <CommentList
              currentUserInfo={currentUserInfo as UserType}
              postId={post.id}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </Card>
  );
}
