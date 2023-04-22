import { useState } from "react";

import NovelListComponent from "components/novel/NovelListComponent";
import NovelRegisterComponent from "components/novel/NovelRegisterComponent";

export default function NovelTopComponent() {
  const [listUpdateTime, setListUpdateTime] = useState(Date.now());

  return (
    <div style={{ textAlign: "center" }}>
      <NovelListComponent
        listUpdateTime={listUpdateTime}
        setListUpdateTime={setListUpdateTime}
      />
      <div style={{ marginTop: 5 }}>
        <NovelRegisterComponent setListUpdateTime={setListUpdateTime} />
      </div>
    </div>
  );
}
