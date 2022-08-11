import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-regular-svg-icons";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";

import { loginUserState } from "../../../atoms/LoginUser";
import { masterState } from "../../../atoms/Master";

import DateTimeSetComponent from "./DateTimeSetComponent";
import {
  newCoordinatePost,
  updateCoordinatePost,
} from "../../../services/api/ApiCoordinateService";

import CoordinatePostImageRegisterComponent from "./CoordinatePostImageRegisterComponent";
import GenderAndSilhouetteComponent from "../../common/coordinate/GenderAndSilhouetteComponent";
import ShopSelectComponent from "../../common/coordinate/ShopSelectComponent";

export default function CoordinatePostRegisterComponent(prop) {
  const [user, setUser] = useRecoilState(loginUserState);
  const [master, setMaster] = useRecoilState(masterState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const coordinatePost = prop.coordinatePost;

  const displayNumber = (inputNum) => {
    return inputNum ? parseInt(inputNum) : undefined;
  };

  const {
    register,
    handleSubmit,
    errors,
    formState,
    setValue,
    getValues,
    methods,
    control,
  } = useForm({
    mode: "onChange",
    defaultValues: coordinatePost
      ? {
          title: coordinatePost.title,
          shopSettingId: coordinatePost.shop_setting_id,
          url: coordinatePost.url,
          status: coordinatePost.status,
          detail: coordinatePost.detail,
          gender: coordinatePost.model_attribute?.gender,
          silhouette: coordinatePost.model_attribute?.silhouette,
          weight: displayNumber(coordinatePost.model_attribute?.weight),
          height: displayNumber(coordinatePost.model_attribute?.height),
          deleteImageKeys: [],
          size: coordinatePost.model_attribute?.size,
          price: displayNumber(coordinatePost.price),
          category: coordinatePost.category,
          price: displayNumber(coordinatePost.price),
          salePrice: coordinatePost?.sale?.sale_price
            ? displayNumber(coordinatePost?.sale?.sale_price)
            : undefined,
          saleStartDate: coordinatePost?.sale?.start_date
            ? new Date(coordinatePost?.sale?.start_date)
            : undefined,
          saleEndDate: coordinatePost?.sale?.end_date
            ? new Date(coordinatePost?.sale?.end_date)
            : undefined,
        }
      : {
          status: "open",
          gender: "",
          silhouette: "",
        },
  });

  function registerCoordinate(data) {
    const postRequest = {
      ...data,
      weight: displayNumber(data.weight),
      height: displayNumber(data.height),
      price: displayNumber(data.price),
      salePrice: data?.salePrice ? displayNumber(data?.salePrice) : undefined,
    };
    if (coordinatePost) {
      updateCoordinatePost(
        {
          ...postRequest,
          _id: coordinatePost._id,
        },
        setSuccess,
        setError,
        setLoading,
        user
      );
    } else {
      newCoordinatePost(postRequest, setSuccess, setError, setLoading, user);
    }
  }

  useEffect(() => {
    if (success) {
      const date = new Date();
      prop.setRefetchTime(date.getTime());
      prop.setCoordinatePostRegisterModalOpen(false);
      if (prop.setModalFlag) {
        prop.setModalFlag(false);
      }
      document.body.style.overflow = "unset";
    }
  }, [success]);

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
            prop.setCoordinatePostRegisterModalOpen(false);
            if (prop.setModalFlag) {
              prop.setModalFlag(false);
            }
            document.body.style.overflow = "unset";
          }}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ textAlign: "center", width: "100%" }}>
          <Form onSubmit={handleSubmit(registerCoordinate)}>
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
            <ShopSelectComponent
              required={true}
              errors={errors}
              methods={methods}
              control={control}
              shops={prop.shops}
            />
            <br />
            <Form.Label>URL</Form.Label>
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
            <Form.Label>詳細</Form.Label>
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
            <CoordinatePostImageRegisterComponent
              register={register}
              setValue={setValue}
              getValues={getValues}
              coordinatePost={prop.coordinatePost}
            />
            <br />
            <b>【モデル情報】</b>
            <br />
            <GenderAndSilhouetteComponent
              register={register}
              master={master?.master}
            />
            <br />
            <Form.Label>身長（cm）</Form.Label>
            <div className="row">
              <div style={{ margin: "0 auto" }}>
                <Form.Control
                  id="height"
                  type="text"
                  name="height"
                  isInvalid={errors.height}
                  style={{
                    width: "100px",
                  }}
                  ref={register({
                    min: {
                      value: 1,
                      message: "正の数を入力してください",
                    },
                    max: {
                      value: 1000,
                      message: "入力された身長は大きすぎます",
                    },
                    pattern: {
                      value: /[0-9]/,
                      message: "数値を入力してください",
                    },
                  })}
                />
              </div>
            </div>
            {errors.height && (
              <div className="text-danger">{errors.height.message}</div>
            )}
            <br />
            <Form.Label>体重（kg）</Form.Label>
            <div className="row">
              <div style={{ margin: "0 auto" }}>
                <Form.Control
                  id="weight"
                  type="text"
                  name="weight"
                  isInvalid={errors.weight}
                  style={{ width: "100px" }}
                  ref={register({
                    min: {
                      value: 1,
                      message: "正の数を入力してください",
                    },
                    max: {
                      value: 1000,
                      message: "入力された体重は大きすぎます",
                    },
                    pattern: {
                      value: /[0-9]/,
                      message: "数値を入力してください",
                    },
                  })}
                />
              </div>
            </div>
            {errors.weight && (
              <div className="text-danger">{errors.weight.message}</div>
            )}
            <br />
            <div style={{ textAlign: "center", width: "100%" }}>
              <Form.Label>着用サイズ</Form.Label>
              <div className="row">
                <div style={{ margin: "0 auto" }}>
                  <Form.Control
                    id="size"
                    type="text"
                    name="size"
                    placeholder="着用サイズ"
                    style={{ width: "200px", backgroundColor: "whitesmoke" }}
                    ref={register}
                  />
                </div>
              </div>
            </div>
            <br />
            <Form.Label>円価格（セール前原価+送料+関税+手数料）</Form.Label>
            <div className="row">
              <div style={{ margin: "0 auto" }}>
                <Form.Control
                  id="price"
                  type="text"
                  name="price"
                  isInvalid={errors.price}
                  style={{
                    width: "100px",
                  }}
                  ref={register({
                    min: {
                      value: 1,
                      message: "正の数を入力してください",
                    },
                    pattern: {
                      value: /[0-9]/,
                      message: "数値を入力してください",
                    },
                  })}
                />
              </div>
            </div>
            {errors.price && (
              <div className="text-danger">{errors.price.message}</div>
            )}
            <br />
            <Form.Label>カテゴリー</Form.Label>
            <div className="row">
              <div style={{ margin: "0 auto" }}>
                <Form.Control
                  id="category"
                  as="select"
                  name="category"
                  style={{ width: "250px" }}
                  ref={register}
                >
                  {[
                    <option value="">指定なし</option>,
                    ...master?.master?.coordinate_category.map((c) => {
                      return <option value={c.value}>{c.label}</option>;
                    }),
                  ]}
                </Form.Control>
              </div>
            </div>
            <br />
            <Form.Label>セール円価格（セール原価+送料+関税+手数料）</Form.Label>
            <div className="row">
              <div style={{ margin: "0 auto" }}>
                <Form.Control
                  id="salePrice"
                  type="text"
                  name="salePrice"
                  isInvalid={errors.salePrice}
                  style={{
                    width: "100px",
                  }}
                  ref={register({
                    min: {
                      value: 1,
                      message: "正の数を入力してください",
                    },
                    pattern: {
                      value: /[0-9]/,
                      message: "数値を入力してください",
                    },
                  })}
                />
              </div>
            </div>
            {errors.salePrice && (
              <div className="text-danger">{errors.salePrice.message}</div>
            )}
            <br />
            <Form.Label>セール開始日時</Form.Label>
            <DateTimeSetComponent
              methods={methods}
              control={control}
              name="saleStartDate"
            />
            <br />
            <Form.Label>セール終了日時</Form.Label>
            <DateTimeSetComponent
              methods={methods}
              control={control}
              name="saleEndDate"
            />
            <br />
            <Button
              variant={"primary"}
              type="submit"
              disabled={!formState.isValid || loading}
            >
              {coordinatePost ? "コーデ編集" : "コーデ投稿"}
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
