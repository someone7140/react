export default function PostCreate() {
  return (
    <div className="text-center">
      <h2>フィッシュサイト投稿</h2>
      <br />
      フィッシュサイトURL
      <br />
      <input
        type="text"
        name="mailAddress"
        placeholder="sample@example.com"
        onChange={onChangeInputMailAddress}
        style={inputTextStyle}
      />
      <br />
    </div>
  );
}
