import React from "react";
import CommonPostComponent from "./CommonPostComponent";
import { getFavoritedPosts } from "../../services/api/ApiPostService";

export default function InstagramFavoritePostComponent() {
  return (
    <>
      <br />
      <br />
      <h4>【いいねした投稿】</h4>
      <CommonPostComponent getPosts={getFavoritedPosts} />
    </>
  );
}
