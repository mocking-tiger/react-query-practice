import { FormEvent, useState } from "react";
import { TextInputFormType } from "../types";
import styles from "./TextInputForm.module.css";
import ProfilePhoto from "./ProfilePhoto";
import Button from "./Button";

export default function TextInputForm({
  onSubmit,
  currentUserInfo,
  placeholder,
  buttonText,
  buttonDisabled,
}: TextInputFormType) {
  const [content, setContent] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(content);
    setContent("");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div>
        <ProfilePhoto
          photo={currentUserInfo.photo}
          name={currentUserInfo.name}
        />
      </div>
      <textarea
        name="content"
        placeholder={placeholder}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button disabled={buttonDisabled || !content} type="submit">
        {buttonText}
      </Button>
    </form>
  );
}
