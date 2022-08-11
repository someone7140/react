import React, { useEffect, useState } from "react";
import Router from "next/router";
import { useRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import { Button, Form } from "react-bootstrap";

import { loginUserState } from "../../../atoms/LoginUser";
import { masterState } from "../../../atoms/Master";
import {
  addInstagramAccount,
  editInstagramAccount,
  getInstagramAccount,
} from "../../../services/api/ApiInstagramAccountService";
import { toast } from "react-toastify";

export default function RegisterInstagramAccountComponent(prop) {
  const { register, handleSubmit, errors, formState } = useForm({
    mode: "onChange",
  });
  const [user, setUser] = useRecoilState(loginUserState);
  const [master, setMaster] = useRecoilState(masterState);
  const [apiSuccess, setApiSuccess] = useState(undefined);
  const [editAccount, setEditAccount] = useState(undefined);
  const [getEditAccountError, setEditAccountError] = useState(false);

  function registerInstagramAccount(data) {
    if (prop.editFlag) {
      editInstagramAccount(
        editAccount.id,
        data.gatherStatus,
        data.gender,
        data.silhouette,
        data.height,
        data.genre,
        setApiSuccess,
        user
      );
    } else {
      addInstagramAccount(
        data.instagramUserName,
        data.gatherStatus,
        data.gender,
        data.silhouette,
        data.height,
        data.genre,
        setApiSuccess,
        user
      );
    }
  }

  useEffect(() => {
    getInstagramAccount(
      prop.instagramUserName,
      setEditAccountError,
      setEditAccount,
      user
    );
  }, []);

  useEffect(() => {
    if (apiSuccess !== undefined && apiSuccess) {
      if (prop.editFlag) {
        toast("アカウントを編集しました");
        Router.push(
          "/admin/post/refInstagramAccount?instagram_user_name=" +
            prop.instagramUserName
        );
      } else {
        toast("アカウントを登録しました");
        Router.push("/admin/post/notsetStatusPosts");
      }
    }
  }, [apiSuccess]);

  useEffect(() => {
    if (apiSuccess !== undefined && apiSuccess) {
      if (prop.editFlag) {
        toast("アカウントを編集しました");
        Router.push(
          "/admin/post/refInstagramAccount?instagram_user_name=" +
            prop.instagramUserName
        );
      } else {
        toast("アカウントを登録しました");
        Router.push("/admin/post/notsetStatusPosts");
      }
    }
  }, []);

  return (
    <div>
      <h4>
        {prop.editFlag ? (
          <>【収集対象インスタグラムアカウント編集】</>
        ) : (
          <>【収集対象インスタグラムアカウント登録】</>
        )}
      </h4>
      {master &&
        master?.master &&
        (!prop.editFlag ||
          (prop.editFlag && editAccount && !getEditAccountError)) && (
          <div className="ml-5">
            <Form onSubmit={handleSubmit(registerInstagramAccount)}>
              <Form.Label>ユーザーネーム</Form.Label>
              {!prop.editFlag && (
                <>
                  <Form.Control
                    id="instagramUserName"
                    type="text"
                    name="instagramUserName"
                    placeholder="ユーザーネーム"
                    isInvalid={errors.instagramUserName}
                    style={{ width: "300px" }}
                    ref={register({
                      required: "ユーザーネームは必須項目です",
                      pattern: {
                        value: /^[\u0020-\u007e]+$/i,
                        message: "ユーザーネームは半角文字で入力してください",
                      },
                    })}
                  />
                  {errors.instagramUserName && (
                    <Form.Control.Feedback type="invalid">
                      {errors.instagramUserName.message}
                    </Form.Control.Feedback>
                  )}
                </>
              )}
              {prop.editFlag && <div>{editAccount.instagram_user_name}</div>}
              <br />
              <Form.Label>収集ステータス</Form.Label>
              <Form.Control
                id="gatherStatus"
                as="select"
                name="gatherStatus"
                style={{ width: "200px" }}
                defaultValue={prop.editFlag ? editAccount.status : "on"}
                ref={register}
              >
                {master?.master.gather_status.map((s) => {
                  return <option value={s.value}>{s.label}</option>;
                })}
              </Form.Control>
              <br />
              <Form.Label>性別</Form.Label>
              <Form.Control
                id="gender"
                as="select"
                name="gender"
                style={{ width: "200px" }}
                defaultValue={prop.editFlag ? editAccount.gender : "male"}
                ref={register}
              >
                {master?.master.gender.map((g) => {
                  return <option value={g.value}>{g.label}</option>;
                })}
              </Form.Control>
              <br />
              <Form.Label>体型</Form.Label>
              <Form.Control
                id="silhouette"
                as="select"
                name="silhouette"
                style={{ width: "200px" }}
                defaultValue={
                  prop.editFlag ? editAccount.silhouette : "standard"
                }
                ref={register}
              >
                {master?.master.silhouette.map((s) => {
                  return <option value={s.value}>{s.label}</option>;
                })}
              </Form.Control>
              <br />
              <Form.Label>身長</Form.Label>
              <Form.Control
                id="height"
                as="select"
                name="height"
                style={{ width: "200px" }}
                defaultValue={prop.editFlag ? editAccount.height : "standard"}
                ref={register}
              >
                {master?.master.height.map((h) => {
                  return <option value={h.value}>{h.label}</option>;
                })}
              </Form.Control>
              <br />
              <Form.Label>ジャンル</Form.Label>
              <Form.Control
                id="genre"
                as="select"
                name="genre"
                style={{ width: "200px" }}
                defaultValue={prop.editFlag ? editAccount.genre : "street"}
                ref={register}
              >
                {master?.master.genre.map((g) => {
                  return <option value={g.value}>{g.label}</option>;
                })}
              </Form.Control>
              <br />
              <Button
                variant={"primary"}
                type="submit"
                disabled={!formState.isValid}
              >
                {prop.editFlag ? <>編集する</> : <>新規登録</>}
              </Button>
              {apiSuccess !== undefined && !apiSuccess && (
                <div>
                  <br />
                  <div className="text-danger">
                    {prop.editFlag ? (
                      <>編集に失敗しました。</>
                    ) : (
                      <>
                        登録に失敗しました。ユーザネームが重複していないか確認してください。
                      </>
                    )}
                  </div>
                </div>
              )}
            </Form>
          </div>
        )}
      {prop.editFlag && getEditAccountError && (
        <>
          <div className="text-danger">アカウント情報の取得に失敗しました</div>
          <br />
          <a href="/admin/post/notsetStatusPosts">未設定投稿一覧へ戻る</a>
        </>
      )}
    </div>
  );
}
