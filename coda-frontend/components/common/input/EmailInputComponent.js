import { Form } from "react-bootstrap";

export default function EmailInputComponent(prop) {
  return (
    <div className="row" style={{ display: "flex" }}>
      <div style={{ margin: "0 auto", alignSelf: "center" }}>
        <Form.Control
          id="email"
          type="text"
          name="email"
          placeholder="メールアドレス"
          isInvalid={prop.errors.email}
          style={{ width: "300px" }}
          ref={prop.register({
            required: "メールアドレスは必須項目です",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "メールアドレスの形式で入力してください",
            },
          })}
        />
        {prop.errors.email && (
          <div className="text-danger">{prop.errors.email.message}</div>
        )}
      </div>
    </div>
  );
}
