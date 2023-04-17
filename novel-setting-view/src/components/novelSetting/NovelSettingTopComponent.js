import { useState } from "react";

import NovelListComponent from "components/novel/NovelListComponent";
import NovelRegisterComponent from "components/novel/NovelRegisterComponent";

export default function NovelSettingTopComponent() {
  const [listUpdateTime, setListUpdateTime] = useState(Date.now());

  return (
    <div style={{ textAlign: "center" }}>
      <NovelListComponent
        listUpdateTime={listUpdateTime}
        setListUpdateTime={setListUpdateTime}
        novelId={prop.novelId}
      />
    </div>
  );
}
