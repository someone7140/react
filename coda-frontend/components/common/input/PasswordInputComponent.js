import { Form } from "react-bootstrap";

export default function PasswordInputComponent(prop) {
  return (
    <div className="row" style={{ display: "flex" }}>
      <div style={{ margin: "0 auto", alignSelf: "center" }}>
        <Form.Control
          id="password"
          type="password"
          name="password"
          placeholder="パスワード"
          isInvalid={prop.errors.password}
          style={{ width: "300px" }}
          ref={prop.register({
            required: "パスワードは必須項目です",
            minLength: {
              value: 6,
              message: "パスワードは6文字以上で入力してください",
            },
          })}
        />
        {prop.errors.password && (
          <div className="text-danger">{prop.errors.password.message}</div>
        )}
      </div>
    </div>
  );
}
