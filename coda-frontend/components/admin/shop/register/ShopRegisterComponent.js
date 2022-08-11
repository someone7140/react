import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-regular-svg-icons";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import { addShop, updateShop } from "../../../../services/api/ApiShopService";
import { loginUserState } from "../../../../atoms/LoginUser";
import { masterState } from "../../../../atoms/Master";
import TargetUserAttributeComponent from "../../../common/coordinate/TargetUserAttributeComponent";

export default function ShopRegisterComponent(prop) {
  const [user, setUser] = useRecoilState(loginUserState);
  const [master, setMaster] = useRecoilState(masterState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const displayNumber = (inpuNum) => {
    return inpuNum ? parseInt(inpuNum) : undefined;
  };

  const shopInfo = prop.shopInfo;
  const { register, handleSubmit, errors, formState, setValue } = useForm({
    mode: "onChange",
    defaultValues: shopInfo
      ? {
          id: shopInfo.id,
          name: shopInfo.name,
          detail: shopInfo.detail,
          shopSettingId: shopInfo.shop_setting_id,
          url: shopInfo.shop_url,
          gender: shopInfo?.shop_target_user?.gender,
          silhouette: shopInfo?.shop_target_user?.silhouette,
          minWeight: displayNumber(shopInfo?.shop_target_user?.min_weight),
          maxWeight: displayNumber(shopInfo?.shop_target_user?.max_weight),
          minHeight: displayNumber(shopInfo?.shop_target_user?.min_height),
          maxHeight: displayNumber(shopInfo?.shop_target_user?.max_height),
        }
      : {
          gender: "",
          silhouette: "",
        },
  });

  function registerShop(data) {
    const request = {
      name: data.name,
      detail: data.detail,
      shop_setting_id: data.shopSettingId,
      shop_url: data.url,
      shop_target_user: {
        gender: data.gender ? data.gender : undefined,
        silhouette: data.silhouette ? data.silhouette : undefined,
        min_weight: displayNumber(data.minWeight),
        max_weight: displayNumber(data.maxWeight),
        min_height: displayNumber(data.minHeight),
        max_height: displayNumber(data.maxHeight),
      },
    };
    if (shopInfo) {
      updateShop(
        { ...request, _id: shopInfo._id },
        setError,
        setSuccess,
        setLoading,
        user
      );
    } else {
      addShop(request, setSuccess, setError, setLoading, user);
    }
  }

  useEffect(() => {
    if (success) {
      const date = new Date();
      prop.setRefetchTime(date.getTime());
      prop.setShopModalOpen(false);
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
            prop.setShopModalOpen(false);
            if (prop.setModalFlag) {
              prop.setModalFlag(false);
            }
            document.body.style.overflow = "unset";
          }}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ textAlign: "center", width: "100%" }}>
          <Form onSubmit={handleSubmit(registerShop)}>
            <Form.Label className="required">ショップID</Form.Label>
            <div className="row">
              <div style={{ margin: "0 auto" }}>
                <Form.Control
                  id="shopSettingId"
                  type="text"
                  name="shopSettingId"
                  placeholder="ショップID"
                  isInvalid={errors.shopSettingId}
                  style={{ width: "300px", backgroundColor: "whitesmoke" }}
                  ref={register({
                    required: "ショップIDは入力必須です",
                  })}
                />
              </div>
            </div>
            {errors.shopSettingId && (
              <div className="text-danger">{errors.shopSettingId.message}</div>
            )}
            <br />
            <Form.Label className="required">ショップ名</Form.Label>
            <div className="row">
              <div style={{ margin: "0 auto" }}>
                <Form.Control
                  id="name"
                  type="text"
                  name="name"
                  placeholder="ショップ名"
                  isInvalid={errors.name}
                  style={{ width: "300px", backgroundColor: "whitesmoke" }}
                  ref={register({
                    required: "ショップ名は入力必須です",
                  })}
                />
              </div>
            </div>
            {errors.name && (
              <div className="text-danger">{errors.name.message}</div>
            )}
            <br />
            <Form.Label>ショップのURL</Form.Label>
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
            <b>【主なユーザー層】</b>
            <br />
            <TargetUserAttributeComponent
              register={register}
              errors={errors}
              master={master?.master}
            />
            <br />
            <br />
            <Button
              variant={"primary"}
              type="submit"
              disabled={!formState.isValid || loading}
            >
              {shopInfo ? "ショップ編集" : "ショップ追加"}
              {loading && <img src="/loading.gif" />}
            </Button>
            {error && (
              <div>
                <br />
                <div className="text-danger">
                  エラーが発生しました。ショップIDが重複していないか確認してください。
                </div>
              </div>
            )}
          </Form>
        </div>
      </div>
    </>
  );
}
