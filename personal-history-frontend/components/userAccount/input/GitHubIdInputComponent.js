export default function GitHubIdInputComponent(prop) {
  return (
    <>
      <label htmlFor="instagramId">GitHubのユーザ名</label>
      <br />
      <span class="text-sm border border-2 rounded-l px-1 py-2 bg-gray-200">
        https://github.com/
      </span>
      <input
        id="gitHubId"
        type="text"
        name="gitHubId"
        className="w-48 border-solid border-2"
        {...prop.register("gitHubId")}
      />
    </>
  );
}
