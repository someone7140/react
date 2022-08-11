import React from "react";
import { Form } from "react-bootstrap";

import GenderAndSilhouetteComponent from "./GenderAndSilhouetteComponent";

export default function TargetUserAttributeComponent(prop) {
  return (
    <>
      <GenderAndSilhouetteComponent
        master={prop.master}
        register={prop.register}
      />
      <br />
      <Form.Label>身長（cm）</Form.Label>
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
                id="minHeight"
                type="text"
                name="minHeight"
                isInvalid={prop.errors.minHeight}
                style={{ width: "100px" }}
                ref={prop.register({
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
            </td>
            <td>
              <span className="ml-2 mr-2">〜</span>
            </td>
            <td>
              <Form.Control
                id="maxHeight"
                type="text"
                name="maxHeight"
                isInvalid={prop.errors.maxHeight}
                style={{ width: "100px" }}
                ref={prop.register({
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
            </td>
          </tr>
          <tr>
            <td>
              {prop.errors.minHeight && (
                <div className="text-danger">
                  {prop.errors.minHeight.message}
                </div>
              )}
            </td>
            <td></td>
            <td>
              {prop.errors.maxHeight && (
                <div className="text-danger">
                  {prop.errors.maxHeight.message}
                </div>
              )}
            </td>
          </tr>
        </table>
      </div>

      <br />
      <Form.Label>体重（kg）</Form.Label>
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
                id="minWeight"
                type="text"
                name="minWeight"
                isInvalid={prop.errors.minWeight}
                style={{ width: "100px" }}
                ref={prop.register({
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
            </td>
            <td>
              <span className="ml-2 mr-2">〜</span>
            </td>
            <td>
              <Form.Control
                id="maxWeight"
                type="text"
                name="maxWeight"
                isInvalid={prop.errors.maxWeight}
                style={{ width: "100px" }}
                ref={prop.register({
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
            </td>
          </tr>
          <tr>
            <td>
              {prop.errors.minWeight && (
                <div className="text-danger">
                  {prop.errors.minWeight.message}
                </div>
              )}
            </td>
            <td></td>
            <td>
              {prop.errors.maxWeight && (
                <div className="text-danger">
                  {prop.errors.maxWeight.message}
                </div>
              )}
            </td>
          </tr>
        </table>
      </div>
    </>
  );
}
