import { useState } from "react";

import { Card } from "primereact/card";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";

export default function NovelContentsEditComponent(prop) {
  const initialValue = [
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ];

  const [editor] = useState(() => withReact(createEditor()));

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: 30,
      }}
    >
      <Card
        title="見出し"
        style={{
          width: 300,
          textAlign: "start",
          border: "solid blue 1px",
          height: 520,
          overflowY: "scroll",
        }}
      >
        <div style={{ wordWrap: "break-word" }}>aaaa</div>
      </Card>
      <Card
        title="本文"
        style={{
          width: 1000,
          textAlign: "start",
          border: "solid orange 1px",
          height: 520,
          overflowY: "scroll",
        }}
      >
        <Slate editor={editor} value={initialValue}>
          <Editable
            placeholder="ここに本文を入力"
            style={{
              border: "solid darkslategray",
              minHeight: 420,
              overflowY: "scroll",
            }}
          />
        </Slate>
      </Card>
    </div>
  );
}
