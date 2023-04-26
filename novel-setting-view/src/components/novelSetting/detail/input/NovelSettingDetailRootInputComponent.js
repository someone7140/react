import { useEffect, useState } from "react";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

import NovelSettingDetailChildComponent from "components/novelSetting/detail/input/NovelSettingDetailChildComponent";

export default function NovelSettingDetailRootInputComponent(prop) {
  const [settingValue, setSettingValue] = useState(prop.setting.value);
  useEffect(() => {
    setSettingValue(prop.setting.value);
  }, [prop.setting.value]);

  const changeValue = (updatedValue) => {
    const updatedSettings = prop.settings.map((s) => {
      if (s._id != prop.setting._id) {
        return s;
      } else {
        return { ...prop.setting, value: updatedValue };
      }
    });
    prop.setSettings(updatedSettings);
    setSettingValue(updatedValue);
  };

  const addChildren = () => {
    const updatedSettings = prop.settings.map((s) => {
      if (s._id != prop.setting._id) {
        return s;
      } else {
        return {
          ...prop.setting,
          children: [
            ...prop.setting.children,
            {
              _id: uuidv4(),
              children: [],
            },
          ],
        };
      }
    });
    prop.setSettings(updatedSettings);
    setSettingValue(updatedValue);
  };

  const deleteSetting = () => {
    const deletedSettings = prop.settings.filter((s) => {
      return s._id != prop.setting._id;
    });
    prop.setSettings(deletedSettings);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 30,
        }}
      >
        <InputText
          type="text"
          placeholder="設定値を入力"
          value={settingValue}
          onChange={(e) => {
            changeValue(e.target.value);
          }}
          style={{ width: 300 }}
        />
        <Button
          rounded
          severity="info"
          onClick={() => {
            addChildren();
          }}
        >
          子設定追加
        </Button>
        <Button
          rounded
          severity="secondary"
          onClick={() => {
            deleteSetting();
          }}
        >
          削除
        </Button>
      </div>
      {prop.setting?.children?.map((child) => {
        return (
          <div
            key={child._id}
            style={{
              marginLeft: 10,
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <NovelSettingDetailChildComponent
              setSettings={prop.setSettings}
              setting={child}
              settings={prop.settings}
              rootId={prop.setting._id}
            />
          </div>
        );
      })}
    </div>
  );
}
