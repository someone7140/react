"use client";

import { FC, useRef, useState } from "react";
import { Tabs } from "@heroui/react";
import { Markdown } from "@tiptap/markdown";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Paragraph from "@tiptap/extension-paragraph";
import HardBreak from "@tiptap/extension-hard-break";

import { inputTextStyle } from "@/style/FormStyle";

type Props = {
  fieldName: string;
  defaultValue?: string;
  isInvalid?: boolean;
};

export const MarkDownInputComponent: FC<Props> = ({
  fieldName,
  defaultValue,
  isInvalid,
}) => {
  const [markdownText, setMarkdownText] = useState(defaultValue ?? "");
  const lastSyncedMarkdown = useRef(defaultValue ?? "");

  const baseInputStyle = inputTextStyle();
  const editorClassName = `textarea markdown-editor cursor-text h-[140px] min-h-[140px] overflow-auto resize-y ${
    isInvalid
      ? "!border-[var(--danger)] focus-within:!border-[var(--danger)]"
      : "focus-within:bg-[var(--color-field-focus)] focus-within:!border-[var(--color-field-border-focus)]"
  } ${isInvalid ? baseInputStyle.replace("!border-gray-300", "") : baseInputStyle} w-[330px] mb-2 p-2 outline-none`;

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        paragraph: false,
        hardBreak: false,
      }),
      // Enterキーの挙動を無効化
      Paragraph.extend({
        addKeyboardShortcuts() {
          return {
            Enter: () => false, // デフォルトのEnterキーの挙動ををキャンセル
          };
        },
      }),
      // Enterキーで改行(HardBreak)を実行
      HardBreak.extend({
        addKeyboardShortcuts() {
          return {
            Enter: () => this.editor.commands.setHardBreak(),
            "Shift-Enter": () => this.editor.commands.setHardBreak(),
          };
        },
      }),
      Markdown.configure({
        markedOptions: {
          gfm: true,
        },
      }),
    ],
    content: defaultValue ?? "",
    onUpdate({ editor }) {
      setMarkdownText(editor.getMarkdown());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-a:text-blue-600 max-w-none min-h-[72px] outline-none min-h-full [&_p]:m-0",
      },
    },
  });

  return (
    <>
      <input type="hidden" name={fieldName} value={markdownText} />
      <Tabs
        onSelectionChange={(key) => {
          if (key === "markdown") {
            const markdown = editor?.getMarkdown() ?? markdownText;
            lastSyncedMarkdown.current = markdown;
            setMarkdownText(markdown);
          }

          if (key === "wysiwyg" && editor) {
            if (markdownText !== lastSyncedMarkdown.current) {
              editor.commands.setContent(markdownText, {
                contentType: "markdown",
              });
              lastSyncedMarkdown.current = markdownText;
            }
          }
        }}
      >
        <Tabs.ListContainer>
          <Tabs.List aria-label="Options" className="!p-1 !w-90">
            <Tabs.Tab id="wysiwyg" className="!p-0">
              見たまま編集
              <Tabs.Indicator />
            </Tabs.Tab>
            <Tabs.Tab id="markdown" className="!p-0">
              マークダウン直接編集
              <Tabs.Indicator />
            </Tabs.Tab>
          </Tabs.List>
        </Tabs.ListContainer>
        <Tabs.Panel className="pt-2" id="wysiwyg">
          <EditorContent
            editor={editor}
            data-invalid={isInvalid}
            className={editorClassName}
          />
        </Tabs.Panel>
        <Tabs.Panel className="pt-2" id="markdown">
          <textarea
            className={editorClassName}
            value={markdownText}
            onChange={(e) => setMarkdownText(e.target.value)}
            rows={3}
          />
        </Tabs.Panel>
      </Tabs>
    </>
  );
};
