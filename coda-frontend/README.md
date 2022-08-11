# フロントエンド環境

## ＜ローカル環境構築＞

### 【インストールなど】

- [こちら](https://qiita.com/kyosuke5_20/items/c5f68fc9d89b84c0df09)を参照して node.js をインストールしてください。
- VSCode をインストールしておいてください。[こちら](https://qiita.com/harker/items/b66ad0ccc74e28fb6315)を参考に拡張機能を追加してください。

###　【準備】

- [こちら](https://zenn.dev/sotszk/articles/b4e6a4e19d2e35)を参考に Certificates を生成し、`certificates`フォルダ配下にコピーしてください。
- フロントエンドのフォルダで`npm install`を実行してください。

### 【フロントエンドの起動】

- フロントエンドのフォルダで`npm run dev:https`を実行して起動してください。
- インスタグラムアカウントの投稿収集を行いたい場合は、管理者でログイン時に`authByEmail`の API レスポンスから token 情報を取得してください。そして token を Authrozation のヘッダーにセットし`http://localhost:8080/admin/gatherInstagranPost`にアクセスしてください。
