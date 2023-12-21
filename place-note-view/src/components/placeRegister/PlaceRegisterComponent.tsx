"use client";

import React, { FC, useRef, useState } from "react";

import { Button, Label, TextInput, Textarea } from "flowbite-react";
import {
  Field,
  FieldArray,
  FieldArrayInstance,
  FieldArrayItem,
  Form,
  FormInstance,
} from "houseform";
import { useRouter } from "next/navigation";
import { z } from "zod";

import { ConnectError } from "@bufbuild/connect";
import { useMutation } from "@tanstack/react-query";

import { PostCategorySelectComponent } from "@/components/postCategory/PostCategorySelectComponent";
import { LatLon } from "@/gen/placeNoteCommon_pb";
import { getLatLonFromAddress } from "@/gen/placeNoteGeolocationService-GeolocationService_connectquery";
import { addPostPlace } from "@/gen/placeNotePostPlaceService-PostPlaceService_connectquery";
import { useGeolocationService } from "@/hooks/useGeolocationService";
import { centerHorizonContainerStyle } from "@/style/CommonStyle";
import {
  formBlockStyle,
  inputLabelStyle,
  inputTextStyle,
} from "@/style/FormStyle";
import { errorMessageStyle } from "@/style/MessageStyle";

export type PlaceRegisterForm = {
  name: string;
  address?: string;
  urlList: {
    urlInput: string;
  }[];
  categoryIds?: string[];
  detail?: string;
};

export type Props = {
  afterRegisterAction: (placeId: string | undefined) => void;
};

export const PlaceRegisterComponent: FC<Props> = ({ afterRegisterAction }) => {
  const router = useRouter();

  const formRef = useRef<FormInstance<PlaceRegisterForm>>(null);
  const [isUseMapInputAddress, setIsUseMapInputAddress] =
    useState<boolean>(false);
  const [disabledSubmitButton, setDisabledSubmitButton] =
    useState<boolean>(false);
  const [latLon, setLatLon] = useState<LatLon | undefined>(undefined);
  const [errMsg, setErrMsg] = useState<string | undefined>(undefined);

  const { mutationFn: getLatLonFromAddressFn } =
    getLatLonFromAddress.useMutation({});
  const {
    mutationFn: addPostPlaceMutationFn,
    onError: addPostPlaceMutationOnError,
  } = addPostPlace.useMutation({
    onError: (err) => {
      setErrMsg("登録時にエラーが発生しました");
      setDisabledSubmitButton(false);
    },
  });
  const { mutate: registerPostPlaceMutate } = useMutation<
    void,
    ConnectError,
    PlaceRegisterForm,
    unknown
  >({
    mutationFn: async (formValue: PlaceRegisterForm) => {
      setErrMsg(undefined);
      setDisabledSubmitButton(true);
      let latLonRegister = latLon;
      let prefectureCode: string | undefined = undefined;
      if (formValue.address) {
        // 緯度経度と都道府県の登録
        try {
          if (!latLonRegister) {
            // 住所から緯度・経度を取得
            latLonRegister = (
              await getLatLonFromAddressFn({
                address: formValue.address,
              })
            )?.latLon;
          }
          if (latLonRegister) {
            // 緯度経度から都道府県コードを取得
            prefectureCode = await getPrefectureCodeFromLatLon(latLonRegister);
          }
        } catch (e) {
          // エラー時は何もしない
        }
      }

      // 登録API
      const result = await addPostPlaceMutationFn({
        name: formValue.name,
        address: formValue.address,
        latLon: latLonRegister,
        prefectureCode: prefectureCode,
        categoryIdList: formValue.categoryIds,
        detail: formValue.detail,
        urlList: formValue.urlList
          .filter((u) => !!u.urlInput)
          .map((u) => u.urlInput),
      });
      // 事後処理
      afterRegisterAction(result.id);
    },
    onError: (err) => {
      if (addPostPlaceMutationOnError) {
        addPostPlaceMutationOnError(err);
      }
    },
  });
  const { getPrefectureCodeFromLatLon } = useGeolocationService();

  const addUrl = () => {
    const urlListRefField = formRef.current?.getFieldValue("urlList");
    if (urlListRefField) {
      const urlListRef = urlListRefField as FieldArrayInstance;
      urlListRef.setValues([...urlListRef.value, { urlInput: "" }]);
    }
  };

  const deleteUrl = (index: number) => {
    const urlListRefField = formRef.current?.getFieldValue("urlList");
    if (urlListRefField) {
      const urlListRef = urlListRefField as FieldArrayInstance;
      urlListRef.setValues(urlListRef.value.filter((_, i) => i != index));
    }
  };

  const clearLatLon = () => {
    setLatLon(undefined);
  };

  const formSubmit = async (formValue: PlaceRegisterForm) => {
    registerPostPlaceMutate(formValue);
  };

  return (
    <Form<PlaceRegisterForm>
      onSubmit={(values) => {
        formSubmit(values);
      }}
      ref={formRef}
    >
      {({ submit }) => (
        <div>
          <div className={`${centerHorizonContainerStyle()} mt-2`}>
            <div>
              <Field<string>
                name="name"
                onSubmitValidate={z.string().min(1, "名前の入力は必須です")}
              >
                {({ value, setValue, errors }) => (
                  <div className={formBlockStyle()}>
                    <Label
                      htmlFor="name"
                      value="名前"
                      className={inputLabelStyle({ type: "required" })}
                    />
                    <TextInput
                      id="name"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      className={inputTextStyle()}
                    />
                    {errors.map((error) => (
                      <p key={error} className={errorMessageStyle()}>
                        {error}
                      </p>
                    ))}
                  </div>
                )}
              </Field>
              <div className={formBlockStyle()}>
                <Label
                  htmlFor="address"
                  value="住所"
                  className={inputLabelStyle()}
                />
                {/* 地図選択は後で実装を検討
                <div className="flex items-center gap-4 mt-2 mb-2">
                  <div className="flex items-center gap-1">
                    <Radio
                      id="isNotUseMapInputAddress"
                      name="useMapInputAddressOpt"
                      value={""}
                      onClick={() => {
                        setIsUseMapInputAddress(false);
                      }}
                      checked={!isUseMapInputAddress}
                      onChange={() => {}}
                    />
                    <Label htmlFor="isUseMapInputAddress">直接入力</Label>
                  </div>
                  <div className="flex items-center gap-1">
                    <Radio
                      id="isUseMapInputAddress"
                      name="useMapInputAddressOpt"
                      value={"true"}
                      onClick={() => {
                        setIsUseMapInputAddress(true);
                      }}
                      checked={isUseMapInputAddress}
                      onChange={() => {}}
                    />
                    <Label htmlFor="isUseMapInputAddress">地図から選択</Label>
                  </div>
                </div>
                {isUseMapInputAddress && <>地図を表示</>}
                */}
                {!isUseMapInputAddress && (
                  <Field<string> name="address">
                    {({ value, setValue }) => (
                      <TextInput
                        id="name"
                        value={value}
                        onChange={(e) => {
                          clearLatLon();
                          setValue(e.target.value);
                        }}
                        className={inputTextStyle()}
                      />
                    )}
                  </Field>
                )}
              </div>
              <div className={formBlockStyle()}>
                <FieldArray<string> name="categoryIds" initialValue={[]}>
                  {({ value, setValues }) => (
                    <div className={formBlockStyle()}>
                      <Label
                        htmlFor="categoryIds"
                        value="カテゴリー選択"
                        className={inputLabelStyle()}
                      />
                      <PostCategorySelectComponent
                        selectedIds={value}
                        setIds={setValues}
                      />
                    </div>
                  )}
                </FieldArray>
              </div>
              <div className={formBlockStyle()}>
                <Field<string> name="detail">
                  {({ value, setValue }) => (
                    <div className={formBlockStyle()}>
                      <Label
                        htmlFor="detail"
                        value="詳細"
                        className={inputLabelStyle()}
                      />
                      <Textarea
                        id="detail"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className={inputTextStyle()}
                        rows={4}
                      />
                    </div>
                  )}
                </Field>
              </div>
              <div className={formBlockStyle()}>
                <FieldArray<{ urlInput: string }>
                  name="urlList"
                  initialValue={[{ urlInput: "" }]}
                >
                  {({ value }) => (
                    <div className={formBlockStyle()}>
                      <Label
                        htmlFor="urlList"
                        value="参考URL"
                        className={inputLabelStyle()}
                      />
                      {value.map((_, i) => (
                        <div
                          key={`urlList-${i}-div`}
                          className="flex mb-2 gap-4 items-center"
                        >
                          <FieldArrayItem<string>
                            key={`urlList-${i}`}
                            name={`urlList[${i}].urlInput`}
                          >
                            {({ value: textValue, setValue: setTextValue }) => (
                              <TextInput
                                value={textValue}
                                onChange={(e) => setTextValue(e.target.value)}
                                className={inputTextStyle()}
                              />
                            )}
                          </FieldArrayItem>
                          <div
                            className="cursor-pointer"
                            onClick={() => {
                              deleteUrl(i);
                            }}
                          >
                            <svg
                              className="w-[17px] h-[17px] text-gray-800 dark:text-white"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 14 14"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                              />
                            </svg>
                          </div>
                        </div>
                      ))}
                      <div className="flex justify-end mt-4">
                        <Button
                          color="purple"
                          pill
                          onClick={() => {
                            addUrl();
                          }}
                        >
                          <p>URL追加</p>
                        </Button>
                      </div>
                    </div>
                  )}
                </FieldArray>
              </div>
            </div>
          </div>
          {errMsg && (
            <div className={`mt-2 ${errorMessageStyle()}`}>{errMsg}</div>
          )}
          <div className={`${centerHorizonContainerStyle()} mt-4 mb-4 gap-4`}>
            <Button
              color="success"
              pill
              disabled={disabledSubmitButton}
              onClick={() => {
                submit();
              }}
            >
              <p>登録</p>
            </Button>
            <Button
              color="dark"
              pill
              onClick={() => {
                router.back();
              }}
            >
              <p>戻る</p>
            </Button>
          </div>
        </div>
      )}
    </Form>
  );
};
