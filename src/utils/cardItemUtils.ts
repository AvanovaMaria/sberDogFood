import { isLiked } from "./products";

export function setColorForIcon(likes: string[], id: string) {
  const like = isLiked(likes, id);
  let iconLikeColor = "";
  like ? (iconLikeColor = "red") : (iconLikeColor = "black");
  return iconLikeColor;
}
