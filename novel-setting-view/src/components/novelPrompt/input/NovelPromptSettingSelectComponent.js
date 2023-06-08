import { useState } from "react";
import Link from "next/link";

import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";

export default function NovelPromptSettingSelectComponent(prop) {
  const [selectParentSetting, setSelectParentSetting] = useState(undefined);
  const [childList, setChildList] = useState(undefined);
  const [selectedChildSettings, setSelectedChildSettings] = useState([]);

  const onChangeParentSetting = (e) => {
    setSelectParentSetting(e.value);
    setSelectedChildSettings([]);
    // 選択した親設定から子設定を取得
    const parentId = e.value.code;
    const updateChildList =
      prop.settingList.find((setting) => setting.id === parentId)?.settings ??
      [];
    setChildList(
      updateChildList.map((child) => {
        return { key: child._id, name: child.value };
      })
    );
  };

  const onCheckChild = (e) => {
    if (e.checked) {
      setSelectedChildSettings([...selectedChildSettings, e.value]);
    } else {
      setSelectedChildSettings(
        selectedChildSettings.filter((child) => child.key !== e.value.key)
      );
    }
  };

  const onAllCheck = () => {
    setSelectedChildSettings(childList);
  };

  const onAllCheckDelete = () => {
    setSelectedChildSettings([]);
  };

  const addPromptInput = () => {
    const parent = prop.settingList.find(
      (setting) => setting.id === selectParentSetting.code
    );
    if (parent?.settings) {
      const targetChildren = parent.settings.filter((child) =>
        selectedChildSettings.some((setting) => child._id === setting.key)
      );

      let addPrompt = "";
      // 親項目の追記
      addPrompt = addPrompt + `\n\n【${parent.name}】`;

      const addPromptFromChild = (level, child) => {
        addPrompt =
          addPrompt + `\n${"  ".repeat(level)}・${child.name}: ${child.value}`;
        child.children?.forEach((child2) => {
          addPromptFromChild(level + 2, child2);
        });
      };

      // 子項目の追記
      targetChildren.forEach((child) => {
        addPrompt = addPrompt + `\n\n ◼️${child.value}`;
        child.children?.forEach((child2) => {
          addPromptFromChild(2, child2);
        });
      });

      prop.setPromptValue((prop.promptValue ?? "") + addPrompt);
    }
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
            style={{ width: 320, textAlign: "left", height: 45 }}
          />
          {childList && (
            <>
              {childList.length === 0 && <div>設定項目がありません</div>}
              {childList.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 15,
                    justifyContent: "center",
                    marginLeft: 20,
                    marginRight: 20,
                  }}
                >
                  {childList.map((child) => {
                    return (
                      <div
                        key={child.key}
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: 10,
                        }}
                      >
                        <Checkbox
                          inputId={child.key}
                          name="child"
                          value={child}
                          onChange={onCheckChild}
                          checked={selectedChildSettings.some(
                            (item) => item.key === child.key
                          )}
                        />
                        <div>{child.name}</div>
                      </div>
                    );
                  })}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 15,
                    }}
                  >
                    <Button rounded severity="info" onClick={onAllCheck}>
                      全てチェック
                    </Button>
                    <Button
                      rounded
                      style={{
                        backgroundColor: "lightGray",
                        borderColor: "cornsilk",
                        color: "black",
                        width: 110,
                      }}
                      onClick={onAllCheckDelete}
                    >
                      全て外す
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
          <Button
            severity="primary"
            onClick={addPromptInput}
            disabled={!(selectedChildSettings.length > 0)}
            style={{
              height: 50,
            }}
          >
            プロンプトに追記
          </Button>
        </div>
      )}
    </div>
  );
}
