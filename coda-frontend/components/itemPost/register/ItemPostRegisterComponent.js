import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-regular-svg-icons";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import ItemPostRegisterAttributeComponent from "./ItemPostRegisterAttributeComponent";
import {
  newItemPost,
  uodateItemPost,
} from "../../../services/api/ApiItemPostService";
import { loginUserState } from "../../../atoms/LoginUser";
import { masterState } from "../../../atoms/Master";

export default function ItemPostRegisterComponent(prop) {
  const [user, setUser] = useRecoilState(loginUserState);
  const [master, setMaster] = useRecoilState(masterState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [displayImageSrc, setDisplayImageSrc] = useState(undefined);

  const { register, handleSubmit, errors, formState, setValue } = useForm({
    mode: "onChange",
    defaultValues: prop.itemPost
      ? {
          title: prop.itemPost.title,
          detail: prop.itemPost.detail,
          item_type: prop.itemPost.item_type,
          url: prop.itemPost.url,
          status: prop.itemPost.status,
          gender: prop.itemPost.gender,
          silhouette: prop.itemPost.silhouette,
          complex: prop.itemPost.complex,
        }
      : {
          status: "open",
          item_type: "apparel",
          gender: "",
          silhouette: "",
          complex: "",
        },
  });

  function registerPost(data) {
    if (prop.itemPost) {
      uodateItemPost(
        { ...data, _id: prop.itemPost._id },
        setSuccess,
        setError,
        setLoading,
        user
      );
    } else {
      newItemPost(data, setSuccess, setError, setLoading, user);
    }
  }

  useEffect(() => {
    register({ name: "itemImage" });
    if (prop.itemPost?.image_url) {
      setDisplayImageSrc(prop.itemPost?.image_url);
    }
  }, []);

  useEffect(() => {
    if (success) {
      const date = new Date();
      prop.setRefetchTime(date.getTime());
      prop.setItemPostModalOpen(false);
      if (prop.setModalFlag) {
        prop.setModalFlag(false);
      }
      document.body.style.overflow = "unset";
    }
  }, [success]);

  function onChangeImage(e) {
    if (e.target.files.length > 0) {
      setValue("itemImage", e.target.files);
      const imageFile = e.target.files[0];
      // FileReaderオブジェクトを使ってファイル読み込み
      var reader = new FileReader();
      // ファイル読み込みに成功したときの処理
      reader.onload = function () {
        setDisplayImageSrc(reader.result);
      };
      // ファイル読み込みを実行
      reader.readAsDataURL(imageFile);
    } else {
      setDisplayImageSrc(undefined);
    }
  }

  return (
    <>
      <div style={{ textAlign: "right" }}>
        <FontAwesomeIcon
          icon={faWindowClose}
          className="fa-2x"
          style={{ width: "30px", height: "30px" }}
          role={"button"}
          color="black"
          onClick={() => {
            prop.setItemPostModalOpen(false);
            if (prop.setModalFlag) {
              prop.setModalFlag(false);
            }
            document.body.style.overflow = "unset";
          }}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ textAlign: "center", width: "100%" }}>
          <Form onSubmit={handleSubmit(registerPost)}>
            <Form.Label className="required">投稿タイトル</Form.Label>
            <div className="row">
              <div style={{ margin: "0 auto" }}>
                <Form.Control
                  id="title"
                  type="text"
                  name="title"
                  placeholder="タイトル"
                  isInvalid={errors.title}
                  style={{ width: "300px", backgroundColor: "whitesmoke" }}
                  ref={register({
                    required: "タイトルは入力必須です",
                  })}
                />
              </div>
            </div>
            {errors.title && (
              <div className="text-danger">{errors.title.message}</div>
            )}
            <br />
            <Form.Label>アイテムのURL</Form.Label>
            <div className="row">
              <div style={{ margin: "0 auto" }}>
                <Form.Control
                  id="url"
                  type="text"
                  name="url"
                  placeholder="URL"
                  style={{ width: "300px", backgroundColor: "whitesmoke" }}
                  ref={register}
                />
              </div>
            </div>
            <br />
            <Form.File id="itemImage" name="itemImage">
              <Form.File.Label>
                画像ファイルを登録する場合はこちらから
              </Form.File.Label>
              <div className="mx-auto" style={{ width: "280px" }}>
                <Form.File.Input onChange={onChangeImage} />
              </div>
            </Form.File>
            {displayImageSrc && (
              <img
                src={displayImageSrc}
                style={{
                  width: "300px",
                  height: "300px",
                  marginTop: "30px",
                  marginBottom: "30px",
                }}
              />
            )}
            <br />
            <Form.Label>おすすめポイント・感想など</Form.Label>
            <div className="mx-auto" style={{ maxWidth: "300px" }}>
              <Form.Control
                id="detail"
                as="textarea"
                rows={4}
                name="detail"
                ref={register}
                style={{ width: "300px", backgroundColor: "whitesmoke" }}
              />
            </div>
            <br />
            <Form.Label>公開設定</Form.Label>
            <div className="row">
              <div style={{ margin: "0 auto" }}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  {master?.master?.post_status
                    .filter((p) => p.value != "notset")
                    .map((p) => {
                      return (
                        <div
                          style={{
                            padding: "5px",
                            marginBottom: "5px",
                            border: "1px solid #333333",
                          }}
                          class="mr-3"
                        >
                          <Form.Check
                            id="status"
                            name="status"
                            type="radio"
                            label={p.label}
                            value={p.value}
                            ref={register}
                            style={{ width: "80px" }}
                          ></Form.Check>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
            <br />
            <ItemPostRegisterAttributeComponent register={register} />
            <br />
            <Button
              variant={"primary"}
              type="submit"
              disabled={!formState.isValid || loading}
            >
              {prop.itemPost ? "アイテム編集" : "アイテム投稿"}
              {loading && <img src="/loading.gif" />}
            </Button>
            {error && (
              <div>
                <br />
                <div className="text-danger">
                  エラーが発生しました。再度投稿操作をお試しください。
                </div>
              </div>
            )}
          </Form>
        </div>
      </div>
    </>
  );
}
