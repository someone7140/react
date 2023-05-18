import { useRef, useState } from "react";

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

import NovelContentsHeadingSetDialogComponent from "components/novelContents/edit/NovelContentsHeadingSetDialogComponent";
import NovelContentsHeadLineListComponent from "components/novelContents/edit/NovelContentsHeadLineListComponent";

export default function NovelContentsEditComponent(prop) {
  const toast = useRef(null);
  const [editor] = useState(() => withReact(createEditor()));
  const [headlineList, setHeadlineList] = useState([]);
  const [headlineMap, setHeadlineMap] = useState(new Map()); // 見出しのキーと名前の管理用map
  const [showHeadlineSetDialog, setShowHeadlineSetDialog] = useState(false);

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

  // 見出しリストの更新
  const updateHeadLineList = () => {
    const listRegisteredMap = new Map(); // リストに追加したキーを管理するmap
    const newHeadlineList = [];
    editor.children
      .filter((child) => child.type === "headline")
      .forEach((child) => {
        const key = child.key;
        if (key && !listRegisteredMap.get(key)) {
          const name = headlineMap.get(key);
          newHeadlineList.push({
            key: key,
            name: name,
          });
          listRegisteredMap.set(key, name);
        }
      });

    setHeadlineMap(listRegisteredMap); // 追加したものだけstateのmapに再セット
    setHeadlineList(newHeadlineList);
  };

  // 見出しの追加
  const addHeadline = (addName) => {
    const addKey = uuidv4();
    setHeadlineMap(new Map(headlineMap.set(addKey, addName)));
    Transforms.setNodes(editor, {
      key: addKey,
      type: "headline",
    });
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
      // 見出しの名前設定用ダイアログを開く
      setShowHeadlineSetDialog(true);
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
          key: undefined,
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
      <NovelContentsHeadingSetDialogComponent
        addHeadline={addHeadline}
        showDialog={showHeadlineSetDialog}
        setShowDialog={setShowHeadlineSetDialog}
      />
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
        {headlineList.length > 0 && (
          <NovelContentsHeadLineListComponent headlineList={headlineList} />
        )}
        {headlineList.length == 0 && <div>見出しの設定はありません</div>}
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
          onChange={() => {
            // 見出しのブロックが変更されたらリストもアップデート
            if (editor.operations.some((op) => op.type === "set_node")) {
              updateHeadLineList();
            }
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
