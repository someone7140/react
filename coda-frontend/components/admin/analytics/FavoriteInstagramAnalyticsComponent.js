import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import InfiniteScroll from "react-infinite-scroller";
import { Form } from "react-bootstrap";
import { loginUserState } from "../../../atoms/LoginUser";
import { masterState } from "../../../atoms/Master";
import { getCategryStrFromKey } from "../../../services/common/CategoryService";
import { execInstagramJs } from "../../../services/common/PostService";
import { getFavoriteAnalytics } from "../../../services/api/ApiAnalyticsService";

import InstagramPost from "../../common/post/InstagramPost";

export default function FavoritefInstagramAnalyticsComponent() {
  const [user, setUser] = useRecoilState(loginUserState);
  const [master, setMaster] = useRecoilState(masterState);
  const [accountInfo, setAccountInfo] = useState(undefined);
  const [apiError, setApiError] = useState(undefined);
  const [embedInstagramScriptReadFlag, setEmbedInstagramScriptReadFlag] =
    useState(false);
  const [postLoading, setPostLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [displayPosts, setDisplayPosts] = useState([]);

  const [selectSort, setSelectSort] = useState("favoriteCount");

  const SelectSortStyle = {
    background: "white",
    width: "50%",
    margin: "110px 0 0 auto",
  };

  const getPosts = async (sort) => {
    const _sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await _sleep(300);
    getFavoriteAnalytics(setPosts, setApiError, user, setPostLoading, sort);
  };

  function handleSortChange(e) {
    setSelectSort(e.target.value);
    setPostLoading(true);
    setDisplayPosts([]);
    setPosts([]);
    getPosts(e.target.value);
  }

  function displayFavoriteDetail(details) {
    return details.map((d) => {
      const categories = d.user_category.split("-");
      const gender = master.master.gender.find(
        (g) => g.value == categories[0]
      )?.label;
      const silhouette = master.master.silhouette.find(
        (s) => s.value == categories[1]
      )?.label;
      const height =
        categories[2] == "none"
          ? "未指定"
          : master.master.height.find((h) => h.value == categories[2])?.label;
      const genre =
        categories[3] == "none"
          ? "未指定"
          : categories[3]
              .split("|")
              .map((c) => master.master.genre.find((g) => g.value == c)?.label)
              .join("|");
      const complex =
        categories[4] == "none"
          ? "未指定"
          : categories[4]
              .split("|")
              .map(
                (c) => master.master.complex.find((cx) => cx.value == c)?.label
              )
              .join("|");
      return (
        <>
          {gender}-{silhouette}-{height}-{genre}-{complex}：{d.favorite_count}人
          <br />
        </>
      );
    });
  }

  useEffect(() => {
    getPosts(selectSort);
  }, []);

  useEffect(() => {
    if (posts && posts.length > 0) {
      if (!embedInstagramScriptReadFlag) {
        execInstagramJs(document);
        setEmbedInstagramScriptReadFlag(true);
      }
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      }
    }
  }, [displayPosts]);

  //ロード中に表示する項目
  const loader = (
    <div className="loader" key={0}>
      Loading ...
    </div>
  );

  const loadMore = (page) => {
    const displayLength = displayPosts.length + 10;
    setDisplayPosts(posts.slice(0, displayLength - 1));
  };

  return (
    <div>
      <nav className="fixed-top" style={SelectSortStyle}>
        <Form.Control as="select" onChange={handleSortChange}>
          <option value="favoriteCount">いいね数順</option>
          <option value="recent">最新順</option>
        </Form.Control>
      </nav>
      {!apiError && posts && posts.length > 1 && master.master && (
        <div>
          <InfiniteScroll
            loadMore={loadMore}
            hasMore={displayPosts.length < posts.length}
            loader={loader}
          >
            {displayPosts.map((p) => {
              return (
                <div>
                  <a
                    href={`/admin/post/refInstagramAccount?instagram_user_name=${p.instagram_user_name}`}
                    target="_blank"
                  >
                    {p.instagram_user_name}
                  </a>
                  <br />
                  投稿カテゴリー：
                  {getCategryStrFromKey(master?.master, p.category)}
                  <br />
                  投稿ステータス：
                  {
                    master?.master.post_status.find((s) => s.value == p.status)
                      ?.label
                  }
                  <br />
                  いいね合計：{p.favorite_total_count}
                  <InstagramPost
                    id={p.post_id}
                    contentUrl={p.content_url}
                    postDate={p.post_date}
                    displayFavorite={false}
                  />
                  ＜いいね内訳＞
                  <br />
                  {displayFavoriteDetail(p.favorite_analytics_details)}
                  <br />
                </div>
              );
            })}
          </InfiniteScroll>
        </div>
      )}
      {!postLoading && (!posts || posts.length == 0) && (
        <div>
          <br />
          <br />
          いいねされた投稿はありません
        </div>
      )}
    </div>
  );
}
