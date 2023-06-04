import { useState } from "react";
import Link from "next/link";

import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";

export default function NovelPromptSettingSelectComponent(prop) {
  const [selectParentSetting, setSelectParentSetting] = useState(undefined);
  const [childList, setChildList] = useState([]);
  const [selectedChildSettings, setSelectedChildSettings] = useState([]);

  const onChangeParentSetting = (e) => {
    setSelectParentSetting(e.value);
    setSelectedChildSettings([]);
    // 選択した親設定から子設定を取得
    const parentId = e.value.code;
    const childList =
      prop.settingList.find((setting) => setting.id === parentId)?.settings ??
      [];
    setChildList(
      childList.map((child) => {
        return { key: child._id, name: child.value };
      })
    );
  };

  return (
    <div style={{ marginTop: 10 }}>
      {!(prop.settingList?.length > 0) && (
        <>
          設定を使用してプロンプトを作成する際は
          <Link href={`/novel/setting/top?novelId=${prop.novelId}`}>
            こちら
          </Link>
          から物語設定を行なってください。
        </>
      )}
      {prop.settingList?.length > 0 && (
        <div
          style={{
            display: "flex",
            gap: 15,
          }}
        >
          <Dropdown
            value={selectParentSetting}
            onChange={onChangeParentSetting}
            options={prop.settingList.map((setting) => {
              return {
                code: setting.id,
                name: setting.name,
              };
            })}
            optionLabel="name"
            placeholder="プロンプトに追記する設定を選択"
            style={{ width: 320, textAlign: "left" }}
          />
          {selectParentSetting && <div></div>}
          <Button
            severity="primary"
            onClick={() => {}}
            disabled={!(selectedChildSettings.length > 0)}
          >
            プロンプトに追記
          </Button>
        </div>
      )}
    </div>
  );
}
