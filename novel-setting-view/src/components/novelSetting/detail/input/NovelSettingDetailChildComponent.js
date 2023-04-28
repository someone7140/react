import { useEffect, useState } from "react";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

export default function NovelSettingDetailChildComponent(prop) {
  const [settingName, setSettingName] = useState(prop.setting.name);
  const [settingValue, setSettingValue] = useState(prop.setting.value);

  useEffect(() => {
    setSettingName(prop.setting.name);
    setSettingValue(prop.setting.value);
  }, [prop.setting]);

  const loopChildrenUpdate = (children, name, value) => {
    if (children && children.length > 0) {
      const updatedChildren = children.map((s) => {
        if (s._id != prop.setting._id) {
          return {
            ...s,
            children: loopChildrenUpdate(s.children, name, value),
          };
        } else {
          return {
            ...s,
            name: name,
            value: value,
          };
        }
      });
      return updatedChildren;
    } else {
      return [];
    }
  };

  const changeNameAndValue = (name, value) => {
    const updatedSettings = prop.settings.map((s) => {
      if (s._id != prop.rootId) {
        return s;
      } else {
        return {
          ...s,
          children: loopChildrenUpdate(s.children, name, value),
        };
      }
    });
    prop.setSettings(updatedSettings);
    setSettingName(name);
    setSettingValue(value);
  };

  const deleteChild = (children) => {
    if (children && children.length > 0) {
      const deletedChildren = children.flatMap((s) => {
        if (s._id != prop.setting._id) {
          return {
            ...s,
            children: deleteChild(s.children),
          };
        } else {
          return [];
        }
      });
      return deletedChildren;
    } else {
      return [];
    }
  };

  const deleteSetting = () => {
    const deletedSettings = prop.settings.map((s) => {
      if (s._id != prop.rootId) {
        return s;
      } else {
        return {
          ...s,
          children: deleteChild(s.children),
        };
      }
    });
    prop.setSettings(deletedSettings);
  };

  return (
    <div
      style={{
        display: "flex",
        gap: 30,
      }}
    >
      <InputText
        key={`${prop.setting._id}childName`}
        type="text"
        placeholder="設定名を入力"
        value={settingName}
        onChange={(e) => {
          changeNameAndValue(e.target.value, settingValue);
        }}
        style={{ width: 300 }}
      />
      <InputText
        key={`${prop.setting._id}childValue`}
        type="text"
        placeholder="設定値を入力"
        value={settingValue}
        onChange={(e) => {
          changeNameAndValue(settingName, e.target.value);
        }}
        style={{ width: 300 }}
      />
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
  );
}
