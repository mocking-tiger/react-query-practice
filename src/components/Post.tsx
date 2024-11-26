import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PostType, UserType } from "../types";
import { QUERY_KEYS, USER_ACTION } from "../value";
import {
  getCommentCountByPostId,
  getLikeCountByPostId,
  getLikeStatusByUsername,
  likePost,
  unlikePost,
} from "../api";
import { LoginContext } from "../context/LoginContext";
import Card from "./Card";
import ContentInfo from "./ContentInfo";
import Button from "./Button";
import CommentList from "./CommentList";
import greyHeartImage from "../assets/gray-heart.png";
import yellowHeartImage from "../assets/yellow-heart.png";
import styles from "./Post.module.css";

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

  const { data: likeCount } = useQuery({
    queryKey: [QUERY_KEYS.LIKE_COUNT, post.id],
    queryFn: () => getLikeCountByPostId(post.id),
  });
  console.log(likeCount);
  const { data: isPostLikedByCurrentUser } = useQuery({
    queryKey: [QUERY_KEYS.LIKE_STATUS, post.id, currentUsername],
    queryFn: () => getLikeStatusByUsername(post.id, currentUsername),
    enabled: !!currentUsername,
  });

  const likeMutation = useMutation({
    mutationFn: async ({
      postId,
      username,
      userAction,
    }: {
      postId: number;
      username: string;
      userAction: string;
    }) => {
      if (userAction === USER_ACTION.LIKE_POST) {
        await likePost(postId, username);
      } else {
        await unlikePost(postId, username);
      }
    },
    onSettled: (data, err, { postId, username }) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.LIKE_STATUS, postId, username],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.LIKE_COUNT, postId],
      });
    },
  });

  const handleCommentButtonClick = () => {
    if (!currentUsername) {
      navigate("/not-logged-in");
      return;
    }
    setShowCommentList((prev) => !prev);
    refetchCommentCount();
  };

  const handleLikeButtonClick = (userAction: string) => {
    if (!currentUsername) {
      navigate("not-logged-in");
      return;
    }
    likeMutation.mutate({
      postId: post.id,
      username: currentUsername,
      userAction,
    });
  };

  return (
    <Card className={styles.post}>
      <div className={styles.content}>
        <ContentInfo user={post.user} updatedTime={post.updatedAt} />
        <p className={styles.description}>{post.content}</p>
        <div className={styles.engagement}>
          <Button
            className={styles.likeButton}
            onClick={() =>
              handleLikeButtonClick(
                isPostLikedByCurrentUser
                  ? USER_ACTION.UNLIKE_POST
                  : USER_ACTION.LIKE_POST
              )
            }
          >
            <img
              className={styles.like}
              src={isPostLikedByCurrentUser ? yellowHeartImage : greyHeartImage}
              alt="좋아용"
            />
            {`좋아요 ${likeCount ?? 0}개`}
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
