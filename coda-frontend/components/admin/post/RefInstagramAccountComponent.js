import React, { useEffect, useState } from "react";
import Router from "next/router";
import { useRecoilState } from "recoil";
import { Button, Form } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroller";

import { loginUserState } from "../../../atoms/LoginUser";
import { masterState } from "../../../atoms/Master";
import { getCategryStrFromKey } from "../../../services/common/CategoryService";
import { execInstagramJs } from "../../../services/common/PostService";
import { getInstagramAccountWithPosts } from "../../../services/api/ApiInstagramAccountService";
import { updateStatusPosts } from "../../../services/api/ApiPostService";
import { getDateStrDisplay } from "../../../services/common/DateService";

import InstagramPost from "../../common/post/InstagramPost";
import { toast } from "react-toastify";

export default function RefInstagramAccountComponent(prop) {
  const [user, setUser] = useRecoilState(loginUserState);
  const [master, setMaster] = useRecoilState(masterState);
  const [accountInfo, setAccountInfo] = useState(undefined);
  const [apiError, setApiError] = useState(undefined);
  const [selectMap, setSelectMap] = useState(new Map());
  const [updateStatusApiSuccess, setUpdateStatusApiSuccess] =
    useState(undefined);
  const [embedInstagramScriptReadFlag, setEmbedInstagramScriptReadFlag] =
    useState(false);
  const [postLoading, setPostLoading] = useState(true);
  const [fiteringStatus, setFiteringStatus] = useState("all");

  const [displayPosts, setDisplayPosts] = useState([]);

  const headerBarStyle = {
    marginTop: "60px",
    background: "white",
  };

  const postListStyle = {
    marginTop: "90px",
    marginLeft: "40px",
  };

  useEffect(() => {
    getInstagramAccountWithPosts(
      prop.instagramUserName,
      fiteringStatus,
      200,
      setApiError,
      setAccountInfo,
      setPostLoading,
      user
    );
  }, []);

  useEffect(() => {
    if (accountInfo && accountInfo.posts.length > 0) {
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
        setAccountInfo({ ...accountInfo, posts: [] });
        setDisplayPosts([]);
        getInstagramAccountWithPosts(
          prop.instagramUserName,
          fiteringStatus,
          200,
          setApiError,
          setAccountInfo,
          setPostLoading,
          user
        );
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
          : accountInfo.posts.find((p) => p._id == id)?.post_genre,
      });
    } else {
      updateMap.set(e.target.id, {
        status: e.target.value,
        genre: accountInfo.posts.find((p) => p._id == id)?.post_genre,
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
          : accountInfo.posts.find((p) => p._id == id)?.status,
        genre: e.target.value,
      });
    } else {
      updateMap.set(id, {
        status: accountInfo.posts.find((p) => p._id == id)?.status,
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

  function editAccount() {
    Router.push(
      "/admin/post/editInstagramAccount?instagram_user_name=" +
        prop.instagramUserName
    );
  }

  function onChangeFilteringStatus(e) {
    setFiteringStatus(e.target.value);
  }

  function filteringStatus() {
    setPostLoading(true);
    setAccountInfo({ ...accountInfo, posts: [] });
    setDisplayPosts([]);
    getInstagramAccountWithPosts(
      prop.instagramUserName,
      fiteringStatus,
      200,
      setApiError,
      setAccountInfo,
      setPostLoading,
      user
    );
    toast("投稿の表示を更新しました");
  }

  //ロード中に表示する項目
  const loader = (
    <div className="loader" key={0}>
      Loading ...
    </div>
  );

  const loadMore = (page) => {
    const displayLength = displayPosts.length + 10;
    setDisplayPosts(accountInfo.posts.slice(0, displayLength - 1));
  };

  function renderingFilteringStatus() {
    if (master?.master) {
      const statuses = [{ label: "全て", value: "all" }].concat(
        master.master.post_status
      );
      return statuses.map((s) => {
        return <option value={s.value}>{s.label}</option>;
      });
    } else {
      return <></>;
    }
  }

  return (
    <div>
      {apiError && (
        <>
          <div className="text-danger">アカウント情報の取得に失敗しました</div>
          <br />
          <a href="/admin/post/notsetStatusPosts">未設定投稿一覧へ戻る</a>
        </>
      )}
      {!apiError && accountInfo && master.master && (
        <>
          <header>
            <nav className="fixed-top" style={headerBarStyle}>
              <br />
              <h4>{accountInfo.instagram_user_name} </h4>
              <div className="ml-4">
                カテゴリー：
                {getCategryStrFromKey(master.master, accountInfo.category)}
                、投稿収集：
                {accountInfo.status}、最終投稿収集日：
                {getDateStrDisplay(accountInfo.gather_date)}
              </div>
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
                <div className="col-xs-2 ml-2">
                  <Button variant={"primary"} onClick={editAccount}>
                    アカウント情報編集
                  </Button>
                </div>
                <div className="col-xs-2 ml-2">
                  <Form.Control
                    id="filteringStatus"
                    as="select"
                    style={{ width: "120px" }}
                    onChange={onChangeFilteringStatus}
                  >
                    {master?.master &&
                      renderingFilteringStatus(master?.master?.post_status)}
                  </Form.Control>
                </div>
                <div className="col-xs-2 ml-1">
                  <Button variant={"primary"} onClick={filteringStatus}>
                    投稿絞り込み
                  </Button>
                </div>
              </div>
            </nav>
          </header>
          {accountInfo.posts && accountInfo.posts.length > 0 && (
            <div style={postListStyle}>
              <InfiniteScroll
                loadMore={loadMore}
                hasMore={displayPosts.length < accountInfo.posts.length}
                loader={loader}
              >
                {displayPosts.map((p) => {
                  return (
                    <div>
                      {p.instagram_user_name}
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
            accountInfo &&
            (!accountInfo.posts || accountInfo.posts.length == 0) && (
              <div style={postListStyle}>
                <br />
                <br />
                収集された投稿はありません
              </div>
            )}
        </>
      )}
    </div>
  );
}
