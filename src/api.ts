import { NewPostType } from "./types";

const BASE_URL = "https://learn.codeit.kr/api/codestudit";

export async function getPosts() {
  const response = await fetch(`${BASE_URL}/posts`);
  const jsonData = await response.json();
  // console.log(jsonData);
  return jsonData;
}

export async function getPostsByUsername(username: string) {
  const response = await fetch(`${BASE_URL}/posts?username=${username}`);
  const jsonData = await response.json();
  // console.log(jsonData);
  return jsonData;
}

export async function uploadPost(newPost: NewPostType) {
  const response = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPost),
  });

  if (!response.ok) {
    throw new Error("업로드 실패");
  }

  return await response.json();
}

export async function getUserInfo(username: string) {
  const response = await fetch(`${BASE_URL}/users/${username}`);
  const jsonData = await response.json();
  // console.log(jsonData);
  return jsonData;
}

export async function getCommentCountByPostId(postId: number) {
  const response = await fetch(`${BASE_URL}/posts/${postId}/comments`);
  const body = await response.json();
  return body.count;
}

export async function getCommentsByPostId(
  postId: number,
  page: number,
  limit: number
) {
  const response = await fetch(
    `${BASE_URL}/posts/${postId}/comments?page=${page}&limit=${limit}`
  );
  const body = await response.json();
  // console.log(body);
  return body;
}

export async function addComment(postId: number, newComment: NewPostType) {
  const response = await fetch(`${BASE_URL}/posts/${postId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newComment),
  });

  if (!response.ok) {
    throw new Error("댓글 달기 실패");
  }
  return await response.json();
}
