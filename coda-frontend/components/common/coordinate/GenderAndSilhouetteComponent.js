import React from "react";
import { Form } from "react-bootstrap";

export default function GenderAndSilhouetteComponent(prop) {
  return (
    <>
      {prop.master && (
        <>
          <Form.Label>性別</Form.Label>
          <div className="row ml-1">
            <div style={{ margin: "0 auto" }}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                {[{ label: "指定なし", value: "" }]
                  .concat(prop.master?.gender?.slice().reverse())
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
                .concat(prop.master?.silhouette)
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
        </>
      )}
    </>
  );
}
