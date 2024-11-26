import { NewPostType } from "./types";
import { POSTS_PAGE_LIMIT } from "./value";

const BASE_URL = "https://learn.codeit.kr/api/codestudit";

export async function getPosts(
  page: number = 0,
  limit: number = POSTS_PAGE_LIMIT
) {
  const response = await fetch(`${BASE_URL}/posts?page=${page}&limit=${limit}`);
  const jsonData = await response.json();
  // console.log(jsonData);
  return jsonData;
}

export async function getPostsByUsername(
  username: string,
  page: number = 0,
  limit: number = POSTS_PAGE_LIMIT
) {
  const response = await fetch(
    `${BASE_URL}/posts?username=${username}&page=${page}&limit=${limit}`
  );
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

export async function getLikeCountByPostId(postId: number) {
  const response = await fetch(`${BASE_URL}posts/${postId}/likes`);
  const body = await response.json();
  return body.count;
}

export async function getLikeStatusByUsername(
  postId: number,
  username: string
) {
  const response = await fetch(`${BASE_URL}/posts/${postId}/likes/${username}`);
  if (response.status === 200) {
    return true;
  } else if (response.status === 404) {
    return false;
  } else {
    throw new Error("좋아요 상태 가져오기 실패");
  }
}

export async function likePost(postId: number, username: string) {
  const response = await fetch(
    `${BASE_URL}/posts/${postId}/likes/${username}`,
    {
      method: "POST",
    }
  );

  if (!response.ok) {
    throw new Error("좋아요 등록 실패");
  }
}

export async function unlikePost(postId: number, username: string) {
  const response = await fetch(
    `${BASE_URL}/posts/${postId}/likes/${username}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("안좋아요 등록 실패");
  }
}
