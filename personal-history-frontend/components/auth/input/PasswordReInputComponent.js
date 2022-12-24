export default function PasswordReInputComponent(prop) {
  return (
    <>
      <label htmlFor="passwordReInput">パスワード（再入力）</label>
      <br />
      <input
        id="passwordReInput"
        type="password"
        name="passwordReInput"
        className="w-64 border-solid border-2"
        {...prop.register("passwordReInput", {
          validate: (input) => input === prop.password,
        })}
      />
      {prop.errors?.passwordReInput && (
        <div className="text-red-500 text-xs">
          入力したパスワードと一致していません
        </div>
      )}
    </>
  );
}
