export default function PasswordInputComponent(prop) {
  return (
    <>
      <label htmlFor="password">パスワード</label>
      <br />
      <input
        id="password"
        type="password"
        name="password"
        className="w-64 border-solid border-2"
        {...prop.register("password", {
          required: "パスワードは必須項目です",
          minLength: {
            value: 6,
            message: "パスワードは6文字以上で入力してください",
          },
          maxLength: {
            value: 100,
            message: "パスワードは100文字以下で入力してください",
          },
        })}
      />
      {prop.errors?.password && (
        <div className="text-red-500 text-xs">
          {prop.errors.password.message}
        </div>
      )}
    </>
  );
}
