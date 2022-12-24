export default function UserIdInputComponent(prop) {
  return (
    <>
      <label htmlFor="userId">
        ユーザID
        <span className="text-red-500 text-xs ml-1">*</span>
      </label>
      <br />
      <input
        id="userId"
        type="text"
        name="userId"
        className="w-64 border-solid border-2"
        {...prop.register("userId", {
          required: "ユーザIDは必須項目です",
          pattern: {
            value: /^[A-Z0-9_-]+$/i,
            message: "半角英数字、「_」、「-」で入力ください",
          },
          maxLength: {
            value: 100,
            message: "ユーザIDは100文字以下で入力してください",
          },
        })}
      />
      {prop.errors?.userId && (
        <div className="text-red-500 text-xs">{prop.errors.userId.message}</div>
      )}
    </>
  );
}
