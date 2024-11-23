import { useContext } from "react";
import { NewPostType, UserType } from "../types";
import { LoginContext } from "../context/LoginContext";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../value";
import TextInputForm from "./TextInputForm";
import styles from "./PostForm.module.css";

export default function PostForm({
  onSubmit,
  buttonDisabled,
}: {
  onSubmit: (newPost: NewPostType) => void;
  buttonDisabled: boolean;
}) {
  const { currentUsername } = useContext(LoginContext);
  const queryClient = useQueryClient();
  const currentUserInfo: UserType | undefined = queryClient.getQueryData([
    QUERY_KEYS.USER_INFO,
    currentUsername,
  ]);
  console.log(currentUserInfo);

  const handleSubmit = async (content: string) => {
    const newPost = {
      username: currentUserInfo?.username,
      content: content,
    };

    onSubmit(newPost as NewPostType);
  };

  return (
    <div className={styles.textInputForm}>
      <TextInputForm
        onSubmit={handleSubmit}
        currentUserInfo={currentUserInfo as UserType}
        placeholder="오늘의 공부 기록을 남겨보세요."
        buttonText="업로드"
        buttonDisabled={buttonDisabled}
      />
    </div>
  );
}
