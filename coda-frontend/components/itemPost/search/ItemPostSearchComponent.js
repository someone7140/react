import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-regular-svg-icons";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import ItemPostRegisterAttributeComponent from "../register/ItemPostRegisterAttributeComponent";

export default function ItemPostSearchComponent(prop) {
  const { register, handleSubmit, errors, formState, getValues } = useForm({
    mode: "onChange",
    defaultValues: prop.displaySearchClearFlag(prop.searchInfo)
      ? {
          keyword: prop.searchInfo.keyword,
          item_type: prop.searchInfo.item_type,
          gender: prop.searchInfo.gender,
          silhouette: prop.searchInfo.silhouette,
          complex: prop.searchInfo.complex,
        }
      : {
          keyword: "",
          item_type: "",
          gender: "",
          silhouette: "",
          complex: "",
        },
  });

  function searchPost(data) {
    prop.setSearchInfo({ ...data, user_setting_id: prop.userSettingId });
    prop.setItemPostSearchModalOpen(false);
    if (prop.setModalFlag) {
      prop.setModalFlag(false);
    }
    document.body.style.overflow = "unset";
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
            prop.setItemPostSearchModalOpen(false);
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
            <ItemPostRegisterAttributeComponent
              register={register}
              searchFlag={true}
            />
            <br />
            <Button
              variant={"primary"}
              type="submit"
              disabled={!formState.isValid}
            >
              アイテム検索
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}
