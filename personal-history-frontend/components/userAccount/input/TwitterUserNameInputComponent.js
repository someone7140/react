export default function TwitterUserNameInputComponent(prop) {
  return (
    <>
      <label htmlFor="twitterUserName">Twitterのユーザ名</label>
      <br />
      <span class="text-sm border border-2 rounded-l px-1 py-2 bg-gray-200">
        https://twitter.com/
      </span>
      <input
        id="twitterUserName"
        type="text"
        name="twitterUserName"
        className="w-50 border-solid border-2"
        {...prop.register("twitterUserName")}
      />
    </>
  );
}
