export default function DescriptionInputComponent(prop) {
  return (
    <>
      <label htmlFor="description">詳細</label>
      <br />
      <textarea
        id="description"
        rows="4"
        name="description"
        className="w-64 border-solid border-2"
        {...prop.register("description")}
      />
    </>
  );
}
