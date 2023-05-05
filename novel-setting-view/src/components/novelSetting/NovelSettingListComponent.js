import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Panel } from "primereact/panel";

import NovelSettingRecordRegisterComponent from "components/novelSetting/NovelSettingRecordRegisterComponent";

export default function NovelSettingListComponent(prop) {
  const router = useRouter();

  return (
    <div style={{ flex: "column", gap: 20, marginBottom: 25 }}>
      {prop.data.map((setting) => (
        <Panel
          key={setting.id}
          style={{ width: 1100 }}
          header={
            <div
              style={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                gap: 20,
              }}
            >
              <div>{setting.name}</div>
              <div>
                <NovelSettingRecordRegisterComponent
                  setListUpdateTime={prop.setListUpdateTime}
                  novelId={prop.novelId}
                  setting={setting}
                  settingList={prop.data}
                />
              </div>
              <div>
                <Button
                  rounded
                  severity="success"
                  onClick={() => {
                    router.push(
                      `/novel/setting/detail?id=${setting.id}&novelId=${prop.novelId}`
                    );
                  }}
                >
                  詳細設定
                </Button>
              </div>
            </div>
          }
          toggleable
          collapsed={true}
        >
          aaaaaaa
        </Panel>
      ))}
    </div>
  );
}
