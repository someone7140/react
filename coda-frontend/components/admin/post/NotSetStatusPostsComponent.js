import React, { useEffect, useState } from "react";
import Router from "next/router";
import { useRecoilState } from "recoil";
import { Button, Form } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroller";

import { loginUserState } from "../../../atoms/LoginUser";
import { masterState } from "../../../atoms/Master";
import { getCategryStrFromKey } from "../../../services/common/CategoryService";
import { execInstagramJs } from "../../../services/common/PostService";
import {
  getNotsetPosts,
  updateStatusPosts,
} from "../../../services/api/ApiPostService";

import InstagramPost from "../../common/post/InstagramPost";
import { toast } from "react-toastify";

export default function NotSetStatusPostsComponent() {
  const [user, setUser] = useRecoilState(loginUserState);
  const [master, setMaster] = useRecoilState(masterState);
  const [posts, setPosts] = useState([]);
  const [apiError, setApiError] = useState(undefined);
  const [selectMap, setSelectMap] = useState(new Map());
  const [updateStatusApiSuccess, setUpdateStatusApiSuccess] =
    useState(undefined);
  const [searchUserName, setSearchUserName] = useState(undefined);
  const [embedInstagramScriptReadFlag, setEmbedInstagramScriptReadFlag] =
    useState(false);
  const [postLoading, setPostLoading] = useState(true);

  const [displayPosts, setDisplayPosts] = useState([]);

  const headerBarStyle = {
    marginTop: "60px",
    background: "white",
  };

  const postListStyle = {
    marginTop: "120px",
    marginLeft: "40px",
  };

  //ロード中に表示する項目
  const loader = (
    <div className="loader" key={0}>
      Loading ...
    </div>
  );

  const loadMore = (page) => {
    const displayLength = displayPosts.length + 10;
    if (posts) {
      setDisplayPosts(posts.slice(0, displayLength - 1));
    }
  };

  useEffect(() => {
    getNotsetPosts(200, setApiError, setPosts, setPostLoading, user);
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

  useEffect(() => {
    if (updateStatusApiSuccess !== undefined) {
      if (updateStatusApiSuccess) {
        toast("ステータスを更新しました");
        setSelectMap(new Map());
        setPostLoading(true);
        setPosts([]);
        setDisplayPosts([]);
        getNotsetPosts(200, setApiError, setPosts, setPostLoading, user);
      } else {
        toast("ステータスの更新に失敗しました");
      }
      setUpdateStatusApiSuccess(undefined);
    }
  }, [updateStatusApiSuccess]);

  function onChangeStatus(e) {
    const updateMap = new Map(selectMap);
    const id = e.target.id;
    const target = updateMap.get(id);
    if (target) {
      updateMap.set(id, {
        status: e.target.value,
        genre: target.genre
          ? target.genre
          : posts.find((p) => p._id == id)?.post_genre,
      });
    } else {
      updateMap.set(e.target.id, {
        status: e.target.value,
        genre: posts.find((p) => p._id == id)?.post_genre,
      });
    }
    setSelectMap(updateMap);
  }

  function onChangeGenre(e) {
    const updateMap = new Map(selectMap);
    const id = e.target.id.split(",")[0];
    const target = updateMap.get(id);
    if (target) {
      updateMap.set(id, {
        status: target.status
          ? target.status
          : posts.find((p) => p._id == id)?.status,
        genre: e.target.value,
      });
    } else {
      updateMap.set(id, {
        status: posts.find((p) => p._id == id)?.status,
        genre: e.target.value,
      });
    }
    setSelectMap(updateMap);
  }

  function statusChangeCommit() {
    const statusChangeRequest = Array.from(selectMap).map((s) => {
      return {
        post_id: s[0],
        status: s[1]?.status,
        genre: s[1]?.genre,
      };
    });
    updateStatusPosts(statusChangeRequest, setUpdateStatusApiSuccess, user);
  }

  function addAccount() {
    Router.push("/admin/post/addInstagramAccount");
  }

  function onChangeSearchUserName(e) {
    setSearchUserName(e.target.value);
  }

  function searchUser() {
    Router.push(
      "/admin/post/refInstagramAccount?instagram_user_name=" + searchUserName
    );
  }

  return (
    <div>
      <header>
        <nav className="fixed-top" style={headerBarStyle}>
          <br />
          <h4>【公開未設定インスタ投稿】</h4>
          <div className="row">
            <div className="col-xs-2 ml-4">
              <Button
                variant={"primary"}
                onClick={statusChangeCommit}
                disabled={selectMap.size == 0}
              >
                ステータスを更新
              </Button>
            </div>
            <div className="col-xs-2 ml-3">
              <Button variant={"primary"} onClick={addAccount}>
                新規アカウント追加
              </Button>
            </div>
            <div class="col-xs-3 ml-3">
              <Form.Control
                id="searchUserName"
                type="text"
                name="searchUserName"
                placeholder="instagramユーザーネーム"
                style={{ width: "250px" }}
                onChange={onChangeSearchUserName}
              />
            </div>

            <div className="col-xs-2 ml-1">
              <Button
                variant={"primary"}
                onClick={searchUser}
                disabled={!searchUserName}
              >
                アカウント検索
              </Button>
            </div>
          </div>
        </nav>
      </header>
      {apiError && (
        <div className="text-danger" style={postListStyle}>
          投稿の取得に失敗しました
        </div>
      )}
      {!apiError && master?.master && posts && posts.length > 0 && (
        <div style={postListStyle}>
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
                  {getCategryStrFromKey(master?.master, p.category)}
                  <Form.Control
                    id={p._id}
                    as="select"
                    style={{ width: "120px" }}
                    onChange={onChangeStatus}
                  >
                    {master?.master.post_status.map((s) => {
                      if (p.status == s.value) {
                        return (
                          <option value={s.value} selected="selected">
                            {s.label}
                          </option>
                        );
                      } else {
                        return <option value={s.value}>{s.label}</option>;
                      }
                    })}
                  </Form.Control>
                  <span class="ml-3">
                    <Form.Control
                      id={p._id + ",genre"}
                      as="select"
                      style={{ width: "200px" }}
                      onChange={onChangeGenre}
                    >
                      {!p.post_genre && (
                        <option value="" selected="selected">
                          ジャンル指定の選択
                        </option>
                      )}
                      {p.post_genre && (
                        <option value="">ジャンル指定の選択</option>
                      )}
                      {master?.master.genre.map((g) => {
                        if (p.post_genre == g.value) {
                          return (
                            <option value={g.value} selected="selected">
                              {g.label}
                            </option>
                          );
                        } else {
                          return <option value={g.value}>{g.label}</option>;
                        }
                      })}
                    </Form.Control>
                  </span>
                  <InstagramPost
                    id={p._id}
                    contentUrl={p.content_url}
                    postDate={p.post_date}
                    displayFavorite={false}
                  />
                  <br />
                </div>
              );
            })}
          </InfiniteScroll>
        </div>
      )}
      {!postLoading &&
        !apiError &&
        master?.master &&
        (!posts || posts.length == 0) && (
          <div style={postListStyle}>
            <br />
            <br />
            未設定の投稿はありません
          </div>
        )}
    </div>
  );
}
