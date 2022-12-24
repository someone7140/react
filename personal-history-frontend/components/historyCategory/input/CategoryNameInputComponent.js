export default function CategoryNameInputComponent(prop) {
  const fieldName = `${prop.fieldArrayName}.${prop.index}.${prop.fieldName}`;
  const errorMessage =
    prop.errors?.[prop.fieldArrayName]?.[prop.index]?.[prop.fieldName]?.message;
  return (
    <>
      <input
        id={fieldName}
        type="text"
        name={fieldName}
        className="border-solid border-2"
        {...prop.register(fieldName, {
          required: "名前は必須項目です",
          maxLength: {
            value: 300,
            message: "300文字以下で入力してください",
          },
        })}
      />
      {errorMessage && (
        <div className="text-red-500 text-xs">{errorMessage}</div>
      )}
    </>
  );
}
