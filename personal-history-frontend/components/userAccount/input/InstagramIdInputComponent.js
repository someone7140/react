export default function InstagramIdInputComponent(prop) {
  return (
    <>
      <label htmlFor="instagramId">Instagramのユーザ名</label>
      <br />
      <span class="text-sm border border-2 rounded-l px-1 py-2 bg-gray-200">
        https://www.instagram.com/
      </span>
      <input
        id="instagramId"
        type="text"
        name="instagramId"
        className="w-32 border-solid border-2"
        {...prop.register("instagramId")}
      />
    </>
  );
}
