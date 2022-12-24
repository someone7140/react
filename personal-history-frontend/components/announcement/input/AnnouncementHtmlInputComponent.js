export default function AnnouncementHtmlInputComponent(prop) {
  return (
    <>
      <label htmlFor="announcementHtml">お知らせHTML</label>
      <br />
      <textarea
        id="announcementHtml"
        rows="4"
        name="announcementHtml"
        className="w-64 border-solid border-2"
        {...prop.register("announcementHtml", {
          required: "お知らせHTMLは必須項目です",
        })}
      />
      {prop.errors?.announcementHtml && (
        <div className="text-red-500 text-xs">
          {prop.errors.announcementHtml.message}
        </div>
      )}
    </>
  );
}
