import React, { useEffect, useState } from "react";
import Router from "next/router";
import { useRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import { Form, FormFile, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Stepper } from "react-form-stepper";
import { useMedia } from "react-use";

import { loginUserState } from "../../atoms/LoginUser";
import { masterState } from "../../atoms/Master";

import { zeroFill } from "../../services/common/DateService";
import {
  newRegistUser,
  registrationCheckByGoogleIdToken,
  registrationCheckByFacebookAccessToken,
} from "../../services/api/ApiUserService";

export default function UserRegisterComponent(prop) {
  const nowYear = new Date().getFullYear();
  const [user, setUser] = useRecoilState(loginUserState);
  const [master, setMaster] = useRecoilState(masterState);
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const {
    register,
    handleSubmit,
    errors,
    clearErrors,
    formState,
    setValue,
    getValues,
  } = useForm({
    mode: "onChange",
    defaultValues: prop.userDetail
      ? {
          userSettingID: prop.userDetail.user_setting_id,
          name: prop.userDetail.name,
          gender: prop.userDetail.gender,
          year: prop.userDetail.birth_date
            ? prop.userDetail.birth_date.split("-")[0]
            : String(nowYear - 20),
          month: prop.userDetail.birth_date
            ? prop.userDetail.birth_date.split("-")[1]
            : "01",
          day: prop.userDetail.birth_date
            ? prop.userDetail.birth_date.split("-")[2]
            : "01",
          silhouette: prop.userDetail.silhouette,
          height:
            prop.userDetail.height && prop.userDetail.height > 0
              ? prop.userDetail.height
              : undefined,
          weight:
            prop.userDetail.weight && prop.userDetail.weight > 0
              ? prop.userDetail.weight
              : undefined,
          genres: prop.userDetail.genres,
          complexes: prop.userDetail.complexes,
        }
      : {
          gender: "female",
          silhouette: "standard",
          year: String(nowYear - 20),
          month: "01",
          day: "01",
        },
  });

  const [checkUserResult, setCheckUserResult] = useState(undefined);
  const [errorCode, setErrorCode] = useState(undefined);
  const [updated, setUpdated] = useState(undefined);
  const [displayIconSrc, setDisplayIconSrc] = useState(undefined);

  useEffect(() => {
    register({ name: "iconImage" });
    if (prop.userDetail) {
      if (prop.userDetail.icon_url) {
        setDisplayIconSrc(prop.userDetail.icon_url);
      }
      setCheckUserResult(true);
      formState;
    } else if (prop.googleIdToken) {
      registrationCheckByGoogleIdToken(prop.googleIdToken, setCheckUserResult);
    } else if (prop.facebookAccessToken) {
      registrationCheckByFacebookAccessToken(
        prop.facebookAccessToken,
        setCheckUserResult
      );
    } else if (prop.userId) {
      setCheckUserResult(true);
    } else {
      Router.push("/");
    }
  }, []);

  useEffect(() => {
    if (checkUserResult !== undefined) {
      if (!checkUserResult) {
        toast(
          "会員登録できません。既に登録済みのアカウントでないか確認してください。"
        );
        Router.push("/");
      }
    }
  }, [checkUserResult]);

  function registerUser(data) {
    if (prop.userDetail) {
      setUpdated(true);
      newRegistUser(
        { userDetail: prop.userDetail, userInput: data, userAuth: user },
        setErrorCode,
        setUser,
        setLoading
      );
    } else if (prop.googleIdToken) {
      newRegistUser(
        { googleIdToken: prop.googleIdToken, userInput: data },
        setErrorCode,
        setUser,
        setLoading
      );
    } else if (prop.facebookAccessToken) {
      newRegistUser(
        { facebookAccessToken: prop.facebookAccessToken, userInput: data },
        setErrorCode,
        setUser,
        setLoading
      );
    } else if (prop.userId) {
      newRegistUser(
        { userId: prop.userId, token: prop.token, userInput: data },
        setErrorCode,
        setUser,
        setLoading
      );
    }
  }

  function onChangeIconImage(e) {
    if (e.target.files.length > 0) {
      setValue("iconImage", e.target.files);
      const imageFile = e.target.files[0];
      // FileReaderオブジェクトを使ってファイル読み込み
      var reader = new FileReader();
      // ファイル読み込みに成功したときの処理
      reader.onload = function () {
        setDisplayIconSrc(reader.result);
      };
      // ファイル読み込みを実行
      reader.readAsDataURL(imageFile);
    } else {
      setDisplayIconSrc(undefined);
    }
  }

  function validateDate(yearStr, monthStr, dayStr) {
    if (yearStr && monthStr && dayStr) {
      clearErrors("year");
      clearErrors("month");
      clearErrors("day");
      const year = parseInt(yearStr);
      const month = parseInt(monthStr) - 1;
      const day = parseInt(dayStr);
      const dt = new Date(year, month, day);
      return (
        dt.getFullYear() === year &&
        dt.getMonth() === month &&
        dt.getDate() == day
      );
    }
    return true;
  }

  useEffect(() => {
    if (user && user.loginUser && !errorCode) {
      if (!prop.userDetail) {
        Router.push("/");
        toast("会員登録が完了しました");
      } else if (updated) {
        prop.refetchUserDetail();
        toast("更新が完了しました");
      }
    }
  }, [user]);

  const isWide = useMedia("(min-width: 800px)");

  function nextStep() {
    setActiveStep(1);
    scrollTo(0, 0);
  }

  function previousStep() {
    setActiveStep(0);
    scrollTo(0, 0);
  }

  return (
    <>
      <div class="ml-3">
        <Stepper
          steps={[
            { label: "アカウント情報" },
            { label: "ファッション情報" },
            { label: "完了" },
          ]}
          activeStep={activeStep}
          style={{ width: isWide ? "1200px" : "500px" }}
        />
      </div>
      <div className="text-center">
        <br />
        <Form onSubmit={handleSubmit(registerUser)}>
          <span style={{ display: activeStep === 0 ? "" : "none" }}>
            <div class="mr-4">
              <Form.File id="iconImage" name="iconImage" type="file" custom>
                <FormFile.Input
                  style={{ width: "70px", height: "70px" }}
                  onChange={onChangeIconImage}
                />
                <div style={{ height: "1px" }}>
                  {displayIconSrc ? (
                    <img
                      src={displayIconSrc}
                      className="mt-2 mr-2 rounded-circle"
                      style={{
                        width: "70px",
                        height: "70px",
                        position: "relative",
                        bottom: "75px",
                      }}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faUser}
                      className="fa-2x mt-2 mr-2"
                      style={{
                        width: "70px",
                        height: "70px",
                        position: "relative",
                        bottom: "75px",
                      }}
                    />
                  )}
                </div>
                <div
                  style={{
                    position: "relative",
                    bottom: "50px",
                    left: "170px",
                  }}
                >
                  アイコン画像を選択してください
                </div>
              </Form.File>
            </div>
          </span>
          <span style={{ visibility: activeStep === 0 ? "visible" : "hidden" }}>
            <div
              style={{
                position: "relative",
                bottom: "10px",
                left: "80px",
              }}
            >
              <Form.Label className="required">ユーザID</Form.Label>
              <br />
              <span>（emailなど個人情報は指定しないでください）</span>
              <div className="row">
                <div style={{ margin: "0 auto" }}>
                  <Form.Control
                    id="userSettingID"
                    type="text"
                    name="userSettingID"
                    placeholder="ユーザID"
                    isInvalid={errors.userSettingID}
                    style={{ width: "300px", backgroundColor: "whitesmoke" }}
                    ref={register({
                      required: "ユーザIDは入力必須です",
                      minLength: {
                        value: 6,
                        message: "ユーザIDは6文字以上で入力してください",
                      },
                    })}
                  />
                </div>
              </div>
              {errors.userSettingID && (
                <div className="text-danger">
                  {errors.userSettingID.message}
                </div>
              )}
              <br />
              <Form.Label className="required">表示名</Form.Label>
              <div className="row">
                <div style={{ margin: "0 auto" }}>
                  <Form.Control
                    id="name"
                    type="text"
                    name="name"
                    placeholder="表示名"
                    isInvalid={errors.name}
                    style={{ width: "300px", backgroundColor: "whitesmoke" }}
                    ref={register({
                      required: "表示名は入力必須です",
                    })}
                  />
                </div>
              </div>
              {errors.name && (
                <div className="text-danger">{errors.name.message}</div>
              )}
              <br />
              <Form.Label>生年月日</Form.Label>
              <div className="row">
                <div style={{ margin: "0 auto" }}>
                  <div style={{ display: "flex" }}>
                    <div>
                      <Form.Control
                        id="year"
                        as="select"
                        name="year"
                        style={{ width: "85px" }}
                        ref={register({
                          validate: (input) => {
                            return validateDate(
                              input,
                              getValues("month"),
                              getValues("day")
                            );
                          },
                        })}
                      >
                        {[...Array(100).keys()].map((y) => {
                          return (
                            <option value={String(nowYear - y)}>
                              {nowYear - y}
                            </option>
                          );
                        })}
                      </Form.Control>
                    </div>
                    <div class="ml-3">
                      <Form.Control
                        id="month"
                        as="select"
                        name="month"
                        style={{ width: "80px" }}
                        ref={register({
                          validate: (input) => {
                            return validateDate(
                              getValues("year"),
                              input,
                              getValues("day")
                            );
                          },
                        })}
                      >
                        {[...Array(12).keys()].map((m) => {
                          return (
                            <option value={zeroFill(m + 1)}>{m + 1}</option>
                          );
                        })}
                      </Form.Control>
                    </div>
                    <div class="ml-3">
                      <Form.Control
                        id="day"
                        as="select"
                        name="day"
                        style={{ width: "80px" }}
                        ref={register({
                          validate: (input) => {
                            return validateDate(
                              getValues("year"),
                              getValues("month"),
                              input
                            );
                          },
                        })}
                      >
                        {[...Array(31).keys()].map((d) => {
                          return (
                            <option value={zeroFill(d + 1)}>{d + 1}</option>
                          );
                        })}
                      </Form.Control>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                {(errors?.year || errors?.month || errors?.day) && (
                  <div className="text-danger">
                    <span>日付の入力に誤りがあります</span>
                  </div>
                )}
              </div>
              <br />
              <Form.Label>性別</Form.Label>
              <div className="row">
                <div style={{ margin: "0 auto" }}>
                  <div style={{ display: "flex" }}>
                    {master?.master?.gender
                      ?.slice()
                      .reverse()
                      .map((g) => {
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
                              id="gender"
                              name="gender"
                              type="radio"
                              label={g.label}
                              value={g.value}
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
              <Button variant={"primary"} onClick={nextStep}>
                次へ
              </Button>
            </div>
          </span>
          <span style={{ display: activeStep === 1 ? "" : "none" }}>
            <div
              style={{
                position: "relative",
                bottom: "500px",
                left: "80px",
              }}
            >
              <br />
              <br />
              <Button variant={"info"} onClick={previousStep}>
                アカウント情報へ戻る
              </Button>
              <br />
              <br />
              <Form.Label>体型</Form.Label>
              <div className="row">
                <div style={{ margin: "0 auto" }}>
                  <div style={{ display: "flex" }}>
                    {master?.master?.silhouette.map((s) => {
                      return (
                        <div
                          style={{
                            padding: "5px",
                            marginBottom: "5px",
                            border: "1px solid #333333",
                          }}
                          class="mr-2"
                        >
                          <Form.Check
                            id="silhouette"
                            name="silhouette"
                            type="radio"
                            label={s.label}
                            value={s.value}
                            ref={register}
                            style={{ width: "100px" }}
                          ></Form.Check>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <br />
              <Form.Label>身長（cm）（※任意項目）</Form.Label>
              <div className="row">
                <div style={{ margin: "0 auto" }}>
                  <Form.Control
                    id="height"
                    type="text"
                    name="height"
                    isInvalid={errors.height}
                    style={{ width: "100px" }}
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
              <Form.Label>体重（kg）（※任意項目）</Form.Label>
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
              <Form.Label>好きなジャンル（※任意項目）</Form.Label>
              {master?.master?.genre.map((g) => {
                return (
                  <Form.Check
                    id="genres"
                    name="genres"
                    type="checkbox"
                    label={g.label}
                    value={g.value}
                    ref={register}
                  />
                );
              })}
              <br />
              <Form.Label>コンプレックス（※任意項目）</Form.Label>
              {master?.master?.complex.map((c) => {
                return (
                  <Form.Check
                    id="complexes"
                    name="complexes"
                    type="checkbox"
                    label={c.label}
                    value={c.value}
                    ref={register}
                  />
                );
              })}
              <br />
              {prop.userDetail ? (
                <></>
              ) : (
                <>
                  <a href="/policy/userPolicy" target="_blank">
                    利用規約
                  </a>
                  を確認の上登録をしてください。
                  <br /> <br />
                </>
              )}
              <Button
                variant={"primary"}
                type="submit"
                disabled={Object.keys(formState?.errors).length >= 1 || loading}
              >
                {prop.userDetail ? <>設定変更</> : <>会員登録</>}
                {loading && <img src="/loading.gif" />}
              </Button>
              <br />
              {errorCode === 403 && (
                <div>
                  <br />
                  <div className="text-danger">
                    入力されたユーザIDがすでに使われています。別のユーザIDを指定してください。
                  </div>
                </div>
              )}
              {errorCode && errorCode !== 403 && (
                <div>
                  <br />
                  <div className="text-danger">ユーザの登録に失敗しました</div>
                </div>
              )}
            </div>
          </span>
        </Form>
      </div>
    </>
  );
}
