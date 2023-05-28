import { useCallback, useRef, useState } from "react";

import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import {
  createEditor,
  Editor,
  Element as SlateElement,
  Transforms,
} from "slate";
import { Slate, Editable, ReactEditor, withReact } from "slate-react";
import { v4 as uuidv4 } from "uuid";

import NovelContentsHeadingSetDialogComponent from "components/novelContents/edit/NovelContentsHeadingSetDialogComponent";
import NovelContentsHeadLineListComponent from "components/novelContents/edit/NovelContentsHeadLineListComponent";
import NovelContentsRegisterComponent from "components/novelContents/edit/NovelContentsRegisterComponent";

export default function NovelContentsEditComponent(prop) {
  const toast = useRef(null);
  const [editor] = useState(() => withReact(createEditor()));
  const [showHeadlineSetDialog, setShowHeadlineSetDialog] = useState(false);
  const [focusHeadlineKey, setFocusHeadlineKey] = useState(undefined);

  const getHeadlineMapFromList = (inputList) => {
    const returnMap = new Map();
    if (inputList && inputList.length > 0) {
      inputList.forEach((headline) => {
        returnMap.set(headline.key, headline.name);
      });
    }
    return returnMap;
  };

  const [headlineList, setHeadlineList] = useState(prop.initialHeadlines ?? []);
  const [headlineMap, setHeadlineMap] = useState(
    getHeadlineMapFromList(prop.initialHeadlines)
  ); // 見出しのキーと名前の管理用map

  const initialValue =
    prop.initialContents && prop.initialContents.length > 0
      ? prop.initialContents
      : [
          {
            type: "paragraph",
            children: [{ text: "" }],
          },
        ];

  const renderElement = useCallback(
    ({ attributes, children, element }) => {
      // 現在選択している見出しの場合はフォントを太字にする
      if (element.type === "headline" && element.key === focusHeadlineKey) {
        return (
          <div {...attributes} style={{ fontWeight: 700 }}>
            {children}
          </div>
        );
      }
      return <div {...attributes}>{children}</div>;
    },
    [focusHeadlineKey]
  );

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

  const onChange = () => {
    // 見出しの選択位置の変更を反映
    const key = getBlockKey(editor.selection, "headline");
    setFocusHeadlineKey(key);
  };

  const openHeadlineSetting = () => {
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

  // 見出しの追加
  const addHeadline = (addName) => {
    const addKey = uuidv4();
    setHeadlineMap(new Map(headlineMap.set(addKey, addName)));
    Transforms.setNodes(editor, {
      key: addKey,
      type: "headline",
    });
  };

  // 見出しの削除
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
      const blockKey = getBlockKey(editor.selection, "headline");
      if (blockKey) {
        Transforms.setNodes(editor, {
          type: "paragraph",
          key: undefined,
        });
      } else {
        // ブロックのキーが存在紙な状態でも、一度見出しのリストを再更新する
        updateHeadLineList();
      }
    }
  };

  // 見出しの選択
  const selectHeadline = (key) => {
    const selectedIndex = editor.children.findIndex(
      (child) => child.key == key
    );
    if (selectedIndex > -1) {
      const selectPath = { path: [selectedIndex, 0], offset: 0 };
      const selectLocation = { anchor: selectPath, focus: selectPath };
      Transforms.select(editor, selectLocation);
      ReactEditor.focus(editor);
      setFocusHeadlineKey(key);
    }
  };

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
          height: 600,
          minWidth: 250,
          overflowY: "scroll",
        }}
      >
        {headlineList.length > 0 && (
          <NovelContentsHeadLineListComponent
            headlineList={headlineList}
            focusHeadlineKey={focusHeadlineKey}
            selectHeadline={selectHeadline}
          />
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
                openHeadlineSetting();
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
            <div
              style={{
                marginLeft: 20,
              }}
            >
              <NovelContentsRegisterComponent
                contentId={prop.contentId}
                contents={editor.children}
                headlines={headlineList}
              />
            </div>
          </div>
        }
        style={{
          width: 1000,
          textAlign: "start",
          border: "solid orange 1px",
          height: 600,
          minWidth: 650,
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
              minHeight: 460,
              overflowY: "scroll",
            }}
            renderElement={renderElement}
          />
        </Slate>
      </Card>
    </div>
  );
}
