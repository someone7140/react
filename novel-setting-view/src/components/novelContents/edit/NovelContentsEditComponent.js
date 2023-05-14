import { useEffect, useRef, useState } from "react";

import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import {
  createEditor,
  Editor,
  Element as SlateElement,
  Transforms,
} from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { v4 as uuidv4 } from "uuid";

export default function NovelContentsEditComponent(prop) {
  const toast = useRef(null);
  const [editor] = useState(() => withReact(createEditor()));

  // 現在位置の見出しのキーを取得
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

  const onChange = () => {
    const key = getBlockKey(editor.selection, "headline");
  };

  const headlineSetting = () => {
    const selection = editor.selection;
    if (!selection) {
      toast.current.show({
        severity: "warn",
        summary: "Warning",
        detail: "見出しの範囲を選択してください",
        life: 3000,
      });
    } else {
      Transforms.setNodes(editor, {
        key: uuidv4(),
        type: "headline",
      });
    }
  };

  const headlineLift = () => {
    const selection = editor.selection;
    if (!selection) {
      toast.current.show({
        severity: "warn",
        summary: "Warning",
        detail: "見出しの範囲を選択してください",
        life: 3000,
      });
    } else {
      const isBlockActive = !!getBlockKey(editor.selection, "headline");
      if (isBlockActive) {
        Transforms.setNodes(editor, {
          type: "paragraph",
        });
      }
    }
  };

  const initialValue = [
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: 30,
      }}
    >
      <Toast ref={toast} />
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
              onClick={() => {
                headlineSetting();
              }}
            >
              見出しの設定
            </Button>
            <Button
              severity="warning"
              style={{
                height: 15,
                width: 140,
              }}
              onClick={() => {
                headlineLift();
              }}
            >
              見出しの解除
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
        <Slate
          editor={editor}
          value={initialValue}
          onChange={(currTextContent) => {
            onChange();
          }}
        >
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
