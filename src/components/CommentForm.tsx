import { UserType } from "../types";
import styles from "./CommentForm.module.css";
import TextInputForm from "./TextInputForm";

export default function CommentForm({
  currentUserInfo,
  onSubmit,
  buttonDisabled,
}: {
  currentUserInfo: UserType;
  onSubmit: (newComment: { username: string; content: string }) => void;
  buttonDisabled: boolean;
}) {
  const handleSubmit = async (content: string) => {
    const newComment = {
      username: currentUserInfo.username,
      content,
    };
    onSubmit(newComment);
  };

  return (
    <div className={styles.commentForm}>
      {
        <TextInputForm
          onSubmit={handleSubmit}
          currentUserInfo={currentUserInfo}
          placeholder="댓글을 입력하세요."
          buttonText="댓글 달기"
          buttonDisabled={buttonDisabled}
        />
      }
    </div>
  );
}
