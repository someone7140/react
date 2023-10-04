"use client";

import React, { FC, useRef, useState } from "react";

import { Button, Label, Radio, TextInput } from "flowbite-react";
import {
  Field,
  FieldArray,
  FieldArrayInstance,
  FieldArrayItem,
  Form,
  FormInstance,
} from "houseform";
import { z } from "zod";
import { LatLon } from "@/gen/placeNoteGeolocationService_pb";
import { getLatLonFromAddress } from "@/gen/placeNoteGeolocationService-GeolocationService_connectquery";
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
  detail?: string;
};

export const PlaceRegisterComponent: FC = ({}) => {
  const formRef = useRef<FormInstance<PlaceRegisterForm>>(null);

  const [isUseMapInputAddress, setIsUseMapInputAddress] =
    useState<boolean>(false);
  const [latLon, setLatLon] = useState<LatLon | undefined>(undefined);
  const { mutationFn: getLatLonFromAddressFn } =
    getLatLonFromAddress.useMutation({});

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
    if (formValue.address) {
      let latLonRes = latLon;
      // 緯度経度と都道府県の登録
      try {
        if (!latLonRes) {
          // 住所から緯度・経度を取得
          latLonRes = (
            await getLatLonFromAddressFn({
              address: formValue.address,
            })
          )?.latLon;
        }
        if (latLonRes) {
          // 緯度経度から都道府県を取得
          console.log(latLonRes);
        }
      } catch (e) {
        // エラー時は何もしない
      }
    }
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
                onSubmitValidate={z.string().nonempty("名前の入力は必須です")}
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
          <div className={`${centerHorizonContainerStyle()} mt-4`}>
            <Button
              color="success"
              pill
              onClick={() => {
                submit();
              }}
            >
              <p>登録</p>
            </Button>
          </div>
        </div>
      )}
    </Form>
  );
};
