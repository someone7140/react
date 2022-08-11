import React from "react";
import { useRecoilState } from "recoil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-regular-svg-icons";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";

import ShopSelectComponent from "../../common/coordinate/ShopSelectComponent";
import TargetUserAttributeComponent from "../../common/coordinate/TargetUserAttributeComponent";
import { masterState } from "../../../atoms/Master";

export default function CoordinateSearchComponent(prop) {
  const [master, setMaster] = useRecoilState(masterState);

  const displayNumber = (inpuNum) => {
    return inpuNum ? parseInt(inpuNum) : undefined;
  };
  const searchInfo = prop.searchInfo;
  const {
    register,
    handleSubmit,
    errors,
    formState,
    getValues,
    methods,
    control,
  } = useForm({
    mode: "onChange",
    defaultValues: prop.displaySearchClearFlag(searchInfo)
      ? {
          keyword: searchInfo.keyword,
          shopSettingId: searchInfo.shop_setting_id,
          gender: searchInfo.gender,
          silhouette: searchInfo.silhouette,
          minWeight: searchInfo.min_weight,
          maxWeight: searchInfo.max_weight,
          minHeight: searchInfo.min_height,
          maxHeight: searchInfo.max_height,
          minPrice: searchInfo.min_price,
          maxPrice: searchInfo.max_price,
          category: searchInfo.category,
        }
      : {
          keyword: "",
          gender: "",
          silhouette: "",
        },
  });

  function searchPost(data) {
    prop.setSearchInfo({
      ...data,
      shop_setting_id: data?.shopSettingId,
      min_weight: displayNumber(data?.minWeight),
      max_weight: displayNumber(data?.maxWeight),
      min_height: displayNumber(data?.minHeight),
      max_height: displayNumber(data?.maxHeight),
      min_price: displayNumber(data?.minPrice),
      max_price: displayNumber(data?.maxPrice),
    });
    prop.setCoordinateSearchModalOpen(false);
    if (prop.setModalFlag) {
      prop.setModalFlag(false);
    }
    document.body.style.overflow = "unset";
    prop.afterSearch();
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
            prop.setCoordinateSearchModalOpen(false);
            if (prop.setModalFlag) {
              prop.setModalFlag(false);
            }
            document.body.style.overflow = "unset";
          }}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ textAlign: "center", maxWidth: "100%" }}>
          <Form onSubmit={handleSubmit(searchPost)}>
            <Form.Label>検索キーワード</Form.Label>
            <div className="row">
              <div style={{ margin: "0 auto" }}>
                <Form.Control
                  id="keyword"
                  type="text"
                  name="keyword"
                  placeholder="キーワード"
                  style={{ width: "300px", backgroundColor: "whitesmoke" }}
                  ref={register}
                />
              </div>
            </div>
            <br />
            <ShopSelectComponent
              methods={methods}
              control={control}
              shops={prop.shops}
            />
            <br />
            <TargetUserAttributeComponent
              register={register}
              errors={errors}
              master={prop.master}
            />
            <br />
            <Form.Label>価格（円）</Form.Label>
            <div
              className="row"
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <table>
                <tr>
                  <td>
                    <Form.Control
                      id="minPrice"
                      type="text"
                      name="minPrice"
                      isInvalid={errors.minPrice}
                      style={{ width: "100px" }}
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
                  </td>
                  <td>
                    <span className="ml-2 mr-2">〜</span>
                  </td>
                  <td>
                    <Form.Control
                      id="maxPrice"
                      type="text"
                      name="maxPrice"
                      isInvalid={errors.maxPrice}
                      style={{ width: "100px" }}
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
                  </td>
                </tr>
                <tr>
                  <td>
                    {errors.minPrice && (
                      <div className="text-danger">
                        {errors.minPrice.message}
                      </div>
                    )}
                  </td>
                  <td></td>
                  <td>
                    {errors.maxPrice && (
                      <div className="text-danger">
                        {errors.maxPrice.message}
                      </div>
                    )}
                  </td>
                </tr>
              </table>
            </div>
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
            <Button
              variant={"primary"}
              type="submit"
              disabled={!formState.isValid}
            >
              コーデ検索
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}
