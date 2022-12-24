import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function IconImageInputComponent(prop) {
  const [displayIconSrc, setDisplayIconSrc] = useState(prop.initialSrc);

  function onChangeIconImage(e) {
    if (e.target.files.length > 0) {
      const imageFile = e.target.files[0];
      // FileReaderオブジェクトを使ってファイル読み込み
      var reader = new FileReader();
      // ファイル読み込みに成功したときの処理
      reader.onload = function () {
        prop.setValue("iconImage", imageFile);
        setDisplayIconSrc(reader.result);
      };
      // ファイル読み込みを実行
      reader.readAsDataURL(imageFile);
    } else {
      setDisplayIconSrc(undefined);
      prop.setValue("iconImage", undefined);
    }
  }

  return (
    <div>
      <label htmlFor="iconImage">アイコン画像</label>
      <div className="mt-2 mb-2 w-64 flex justify-center">
        {displayIconSrc ? (
          <img src={displayIconSrc} className="w-14 h-14" />
        ) : (
          <FontAwesomeIcon icon={faUser} className="w-14 h-14" />
        )}
      </div>
      <input
        id="iconImage"
        type="file"
        name="iconImage"
        onChange={onChangeIconImage}
        className="block w-64 text-sm text-gray-900 bg-gray-50 border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
      />
    </div>
  );
}
