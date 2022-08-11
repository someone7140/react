import React from "react";

export default function TutorialComponent() {
  return (
    <div>
      <span>
        <b className="h4">①ホーム(タイムライン)</b>
      </span>
      <br />
      <span>
        Instagramの投稿をタイムライン形式で表示します。
        会員登録時に情報入力頂くと、登録頂いた属性情報にマッチしたファッションの投稿を優先して表示します。
        <br />
        ジャンルを指定して絞り込みを行うことができます。また投稿画像を押すことでInstagramへ飛べます。
      </span>
      <br />
      <div className="text-center">
        <img src="/home_image.png" width="310" height="550" />
      </div>
      <br /> <br />
      <span>
        <b className="h4">②いいね機能</b>
      </span>
      <br />
      <span>
        タイムラインで気に入った投稿をハートを押して保存出来ます。
        <br />
        また、過去に保存した投稿をタスクバー内のハートから確認できます。
      </span>
      <br />
      <div className="text-center">
        <img src="/favorite_image.webp" width="310" height="550" />
      </div>
      <br /> <br />
      <span>
        <b className="h4">③会員登録</b>
      </span>
      <br />
      <span>
        タイムラインの属性マッチングやいいね機能を使用するための会員登録機能です。
        <br />
        Google、Facebook、メールアドレスで認証頂いた後に登録可能となります。
      </span>
      <br />
      <div className="text-center">
        <img src="/user_regsiter_image.png" width="310" height="550" />
      </div>
    </div>
  );
}
