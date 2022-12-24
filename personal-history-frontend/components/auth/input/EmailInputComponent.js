export default function EmailInputComponent(prop) {
  return (
    <>
      <label htmlFor="email">メールアドレス</label>
      <br />
      <input
        id="email"
        type="text"
        name="email"
        placeholder="sample@example.com"
        className="w-64 border-solid border-2"
        {...prop.register("email", {
          required: "メールアドレスは必須項目です",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "メールアドレスの形式で入力してください",
          },
          maxLength: {
            value: 300,
            message: "メールアドレスは300文字以下で入力してください",
          },
        })}
      />
      {prop.errors?.email && (
        <div className="text-red-500 text-xs">{prop.errors.email.message}</div>
      )}
    </>
  );
}
