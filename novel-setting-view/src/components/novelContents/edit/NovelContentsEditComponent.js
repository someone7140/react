import { useEffect, useState } from "react";

import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { createEditor, Editor, Element as SlateElement } from "slate";
import { Slate, Editable, withReact } from "slate-react";

export default function NovelContentsEditComponent(prop) {
  const initialValue = [
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ];

  const [editor] = useState(() => withReact(createEditor()));

  const getBlockKey = (selection, format, blockType = "type") => {
    if (!selection) return undefined;

    const [match] = Array.from(
      Editor.nodes(editor, {
        at: Editor.unhangRange(editor, selection),
        match: (n) =>
          !Editor.isEditor(n) &&
          SlateElement.isElement(n) &&
          n[blockType] === format,
      })
    );
    return match?.length ? match[0].key : undefined;
  };

  useEffect(() => {
    const key = getBlockKey(editor.selection, "headline");
    console.log(key);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor.selection]);

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
        title={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 45,
            }}
          >
            本文
            <Button
              severity="help"
              style={{
                height: 15,
                width: 140,
              }}
            >
              見出しの設定
            </Button>
          </div>
        }
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
