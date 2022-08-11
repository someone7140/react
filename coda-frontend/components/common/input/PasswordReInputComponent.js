import { Form } from "react-bootstrap";

export default function PasswordInputComponent(prop) {
  return (
    <div className="row" style={{ display: "flex" }}>
      <div style={{ margin: "0 auto", alignSelf: "center" }}>
        <Form.Control
          id="passwordReInput"
          type="password"
          name="passwordReInput"
          placeholder="パスワード（確認用）"
          isInvalid={prop.errors.passwordReInput}
          style={{ width: "300px" }}
          ref={prop.register({
            validate: (input) => input === prop.password,
          })}
        />
        {prop.errors.passwordReInput && (
          <div className="text-danger">
            <span>入力したパスワードと一致していません</span>
          </div>
        )}
      </div>
    </div>
  );
}
