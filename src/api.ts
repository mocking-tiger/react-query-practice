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
