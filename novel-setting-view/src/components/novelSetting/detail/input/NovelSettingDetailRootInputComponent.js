import { useState } from "react";

import { InputText } from "primereact/inputtext";

export default function NovelSettingDetailRootInputComponent(prop) {
  const [settingValue, setSettingValue] = useState(prop.setting.value);
  const changeValue = (updatedValue) => {
    const updatedSettings = prop.settings.map((s) => {
      if (s.id != prop.setting.id) {
        return s;
      } else {
        return { ...setting, value: updatedValue };
      }
    });
    prop.setSettings(updatedSettings);
    setSettingValue(updatedValue);
  };

  return (
    <>
      <InputText
        type="text"
        placeholder="設定値を入力"
        value={settingValue}
        onChange={(e) => {
          changeValue(e.target.value);
        }}
        style={{ width: 300 }}
      />
    </>
  );
}
