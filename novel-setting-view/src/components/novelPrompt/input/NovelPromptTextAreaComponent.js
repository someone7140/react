import { useRouter, useState } from "next/navigation";
import { InputTextarea } from "primereact/inputtextarea";

export default function NovelPromptTextAreaComponent(prop) {
  return (
    <div>
      <InputTextarea
        value={prop.value}
        onChange={(e) => prop.setValue(e.target.value)}
        rows={20}
        cols={100}
        placeholder="ChatGPT等に貼り付けるプロンプトを入力"
        style={{ border: "solid gray 1.5px" }}
      />
    </div>
  );
}
