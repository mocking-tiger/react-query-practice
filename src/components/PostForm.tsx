import { NewPostType } from "../types";
import styles from "./PostForm.module.css";
import TextInputForm from "./TextInputForm";

export default function PostForm({
  onSubmit,
  buttonDisabled,
}: {
  onSubmit: (newPost: NewPostType) => void;
  buttonDisabled: boolean;
}) {
  const currentUserInfo = {
    username: "codeit",
    name: "코드잇",
    photo:
      "https://learn-codeit-kr-static.s3.ap-northeast-2.amazonaws.com/codestudit/001.png",
  };

  const handleSubmit = async (content: string) => {
    const newPost = {
      username: currentUserInfo.username,
      content: content,
    };

    onSubmit(newPost);
  };

  return (
    <div className={styles.textInputForm}>
      <TextInputForm
        onSubmit={handleSubmit}
        currentUserInfo={currentUserInfo}
        placeholder="오늘의 공부 기록을 남겨보세요."
        buttonText="업로드"
        buttonDisabled={buttonDisabled}
      />
    </div>
  );
}
