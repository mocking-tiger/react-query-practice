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
