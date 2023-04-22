import { useRouter } from "next/navigation";
import { Button } from "primereact/button";

import NovelSettingRecordRegisterComponent from "components/novelSetting/NovelSettingRecordRegisterComponent";

export default function NovelListComponent(prop) {
  const router = useRouter();

  return (
    <table style={{ borderCollapse: "separate", borderSpacing: 20 }}>
      {prop.data.map((setting) => (
        <tr key={setting.id}>
          <td>{setting.name}</td>
          <td>
            <NovelSettingRecordRegisterComponent
              setListUpdateTime={prop.setListUpdateTime}
              novelId={prop.novelId}
              setting={setting}
              settingList={prop.data}
            />
          </td>
          <td>
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
          </td>
        </tr>
      ))}
    </table>
  );
}
