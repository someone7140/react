export default function UserIdInputComponent(prop) {
  return (
    <>
      <label htmlFor="name">
        ユーザ名
        <span className="text-red-500 text-xs ml-1">*</span>
      </label>
      <br />
      <input
        id="name"
        type="text"
        name="name"
        className="w-64 border-solid border-2"
        {...prop.register("name", {
          required: "ユーザ名は必須項目です",
          maxLength: {
            value: 300,
            message: "ユーザ名は300文字以下で入力してください",
          },
        })}
      />
      {prop.errors?.userName && (
        <div className="text-red-500 text-xs">
          {prop.errors.userName.message}
        </div>
      )}
    </>
  );
}
