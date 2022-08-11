import React from "react";
import { useRecoilState } from "recoil";
import { Form } from "react-bootstrap";
import { masterState } from "../../../atoms/Master";

export default function ItemPostRegisterAttributeComponent(prop) {
  const [master, setMaster] = useRecoilState(masterState);

  return (
    <>
      <Form.Label>アイテムの種類</Form.Label>
      <div className="row ml-1">
        <div style={{ margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              width: "100%",
              justifyContent: "center",
            }}
          >
            {(prop.searchFlag ? [{ label: "指定なし", value: "" }] : [])
              .concat(master?.master?.item_type)
              .map((t, i) => {
                return (
                  <>
                    <div
                      style={{
                        padding: "5px",
                        marginBottom: "5px",
                        border: "1px solid #333333",
                      }}
                      class="mr-3"
                    >
                      <Form.Check
                        id="item_type"
                        name="item_type"
                        type="radio"
                        label={t.label}
                        value={t.value}
                        ref={prop.register}
                        style={{ width: "135px" }}
                      ></Form.Check>
                    </div>
                  </>
                );
              })}
          </div>
        </div>
      </div>
      <br />
      <b>【想定ユーザー】</b>
      <br />
      <Form.Label>性別</Form.Label>
      <div className="row ml-1">
        <div style={{ margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {[{ label: "指定なし", value: "" }]
              .concat(master?.master?.gender?.slice().reverse())
              .map((g, i) => {
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
                      ref={prop.register}
                      style={{ width: i == 0 ? "90px" : "80px" }}
                    ></Form.Check>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <br />
      <Form.Label>体型</Form.Label>
      <div className="row ml-1">
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            width: "100%",
            justifyContent: "center",
          }}
        >
          {[{ label: "指定なし", value: "" }]
            .concat(master?.master?.silhouette)
            .map((s) => {
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
                    id="silhouette"
                    name="silhouette"
                    type="radio"
                    label={s.label}
                    value={s.value}
                    ref={prop.register}
                    style={{ width: "100px" }}
                  ></Form.Check>
                </div>
              );
            })}
        </div>
      </div>
      <br />
      <Form.Label>コンプレックス</Form.Label>
      <div className="row ml-1">
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            width: "100%",
            justifyContent: "center",
          }}
        >
          {[{ label: "指定なし", value: "" }]
            .concat(master?.master?.complex)
            .map((c, i) => {
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
                    id="complex"
                    name="complex"
                    type="radio"
                    label={c.label}
                    value={c.value}
                    ref={prop.register}
                    style={{ width: i <= 1 ? "100px" : "80px" }}
                  ></Form.Check>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
