export default function AnnouncementTitleInputComponent(prop) {
  return (
    <>
      <label htmlFor="userId">
        タイトル
        <span className="text-red-500 text-xs ml-1">*</span>
      </label>
      <br />
      <input
        id="title"
        type="text"
        name="title"
        className="w-64 border-solid border-2"
        {...prop.register("title", {
          required: "タイトルは必須項目です",
          maxLength: {
            value: 200,
            message: "タイトルは200文字以下で入力してください",
          },
        })}
      />
      {prop.errors?.title && (
        <div className="text-red-500 text-xs">{prop.errors.title.message}</div>
      )}
    </>
  );
}
