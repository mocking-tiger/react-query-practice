import React, { SetStateAction } from "react";

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

export type UserType = {
  createdAt: number;
  id: number;
  name: string;
  photo: string;
  updatedAt: number;
  username: string;
};

export type LoadingNErrorType = {
  className?: string;
  variant?: string;
  title: string;
  description: string;
};

export type NewPostType = {
  username: string;
  content: string;
};

export type TextInputFormType = {
  onSubmit: (content: string) => Promise<void>;
  currentUserInfo: {
    username: string;
    name: string;
    photo: string;
  };
  placeholder: string;
  buttonText: string;
  buttonDisabled: boolean;
};

export type LoginContextType = {
  currentUsername: string;
  setCurrentUsername: React.Dispatch<SetStateAction<string>>;
};
