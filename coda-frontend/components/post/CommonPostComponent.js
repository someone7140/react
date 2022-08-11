import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import InfiniteScroll from "react-infinite-scroller";

import { loginUserState } from "../../atoms/LoginUser";
import { masterState } from "../../atoms/Master";
import { execInstagramJs } from "../../services/common/PostService";
import InstagramPost from "../common/post/InstagramPost";

export default function CommonPostComponent(prop) {
  const [user, setUser] = useRecoilState(loginUserState);
  const [master, setMaster] = useRecoilState(masterState);
  const [posts, setPosts] = useState([]);
  const [apiError, setApiError] = useState(undefined);
  const [postLoading, setPostLoading] = useState(true);
  const [displayPosts, setDisplayPosts] = useState([]);
  const [embedInstagramScriptReadFlag, setEmbedInstagramScriptReadFlag] =
    useState(false);

  //ロード中に表示する項目
  const loader = (
    <div>
      <img src="/loading.gif" />
    </div>
  );

  const loadMore = (page) => {
    const displayLength = displayPosts.length + 10;
    if (posts) {
      setDisplayPosts(posts.slice(0, displayLength - 1));
    }
  };

  const getPosts = async () => {
    const _sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await _sleep(300);
    if (prop.selectGenre) {
      prop.getPosts(
        setApiError,
        setPosts,
        setPostLoading,
        user,
        prop.selectGenre
      );
    } else {
      prop.getPosts(setApiError, setPosts, setPostLoading, user);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    setPostLoading(true);
    setPosts([]);
    setDisplayPosts([]);
    getPosts();
  }, [prop.selectGenre]);

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

  return (
    <div className="mt-3">
      {postLoading && loader}
      {!postLoading && !apiError && posts && posts.length > 0 && master && (
        <div>
          <InfiniteScroll
            loadMore={loadMore}
            hasMore={displayPosts.length < posts.length}
            loader={loader}
          >
            {displayPosts.map((p) => {
              return (
                <div>
                  <InstagramPost
                    id={p._id}
                    contentUrl={p.content_url}
                    postDate={p.post_date}
                    favoriteCount={p.favorite_count}
                    favorited={p.favorited_flg}
                    displayFavorite={true}
                    genre={p.genre}
                    genreMaster={master.master.genre}
                  />
                  <br />
                </div>
              );
            })}
          </InfiniteScroll>
        </div>
      )}
      {!postLoading && apiError && <div>投稿取得時にエラーが発生しました</div>}
      {!postLoading && !apiError && (!posts || posts.length == 0) && (
        <div>取得できた投稿はありません</div>
      )}
    </div>
  );
}
