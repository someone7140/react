import { useState } from "react";

import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

export default function NovelContentsHeadingSetDialogComponent(prop) {
  const [name, setName] = useState("");
  const onClose = () => {
    setName("");
    prop.setShowDialog(false);
  };

  return (
    <Dialog header={"見出し設定"} visible={prop.showDialog} onHide={onClose}>
      <div style={{ width: 350 }}>
        <InputText
          type="text"
          placeholder="見出しを入力"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          style={{ width: 300 }}
        />
        <div style={{ marginTop: 20, textAlign: "right" }}>
          <Button
            rounded
            onClick={() => {
              prop.addHeadline(name);
              onClose();
            }}
            disabled={!name}
          >
            登録
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
