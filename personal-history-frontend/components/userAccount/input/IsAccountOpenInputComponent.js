export default function IsAccountOpenInputComponent(prop) {
  return (
    <>
      <label htmlFor="isAccountOpen">ユーザ全体公開</label>
      <br />
      <select
        id="isAccountOpen"
        name="isAccountOpen"
        className="form-select appearance-none block w-64 px-3 py-1.5 text-base bg-white bg-clip-padding bg-no-repeat border-solid border-2 rounded transition"
        {...prop.register("isAccountOpen")}
      >
        <option value="true">公開する</option>
        <option value="false">公開しない</option>
      </select>
    </>
  );
}
