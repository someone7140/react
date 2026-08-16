"use client";

import { FC, useRef, useState } from "react";
import {
  ListBox,
  Select,
  Tabs,
  Button,
  Key,
  Popover,
  Input,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { Markdown } from "@tiptap/markdown";
import {
  Editor,
  EditorContent,
  useEditor,
  useEditorState,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Paragraph from "@tiptap/extension-paragraph";
import HardBreak from "@tiptap/extension-hard-break";
import Link from "@tiptap/extension-link";

import { inputTextStyle } from "@/style/FormStyle";

type Props = {
  fieldName: string;
  defaultValue?: string;
  isInvalid?: boolean;
};

type HeadingLevel = 1 | 2 | 3 | 4;

const HEADING_OPTIONS: { id: string; label: string }[] = [
  { id: "0", label: "見出しなし" },
  { id: "1", label: "見出し1" },
  { id: "2", label: "見出し2" },
  { id: "3", label: "見出し3" },
  { id: "4", label: "見出し4" },
];

export const MarkDownInputComponent: FC<Props> = ({
  fieldName,
  defaultValue,
  isInvalid,
}) => {
  const [markdownText, setMarkdownText] = useState(defaultValue ?? "");
  const lastSyncedMarkdown = useRef(defaultValue ?? "");
  const [isLinkPopoverOpen, setIsLinkPopoverOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");

  const baseInputStyle = inputTextStyle();
  const editorClassName = `textarea markdown-editor cursor-text h-[160px] min-h-[160px] overflow-auto resize-y ${
    isInvalid
      ? "!border-[var(--danger)] focus-within:!border-[var(--danger)]"
      : "focus-within:bg-[var(--color-field-focus)] focus-within:!border-[var(--color-field-border-focus)]"
  } ${isInvalid ? baseInputStyle.replace("!border-gray-300", "") : baseInputStyle} w-[330px] mb-2 p-2 outline-none`;

  const onEnter = (editor: Editor) => {
    if (editor.isActive("bulletList")) {
      return false;
    }

    if (editor.isActive("heading")) {
      editor.chain().focus().splitBlock().setParagraph().run();
      return true;
    }

    editor.commands.setHardBreak();
    if (editor.isActive("bold")) {
      editor.commands.unsetBold();
    }
    return true;
  };

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        paragraph: false,
        hardBreak: false,
      }),
      Paragraph.extend({
        addKeyboardShortcuts() {
          return {
            Enter: () => false,
          };
        },
      }),
      HardBreak.extend({
        addKeyboardShortcuts() {
          return {
            Enter: () => onEnter(this.editor),
            "Shift-Enter": () => onEnter(this.editor),
          };
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 underline cursor-text",
        },
      }),
      Markdown.configure({
        markedOptions: { gfm: true },
      }),
    ],
    content: defaultValue ?? "",
    onUpdate({ editor }) {
      setMarkdownText(editor.getMarkdown());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-a:text-blue-600 max-w-none min-h-[76px] outline-none min-h-full [&_p]:m-0 [&_h1]:m-0 [&_h2]:m-0 [&_h3]:m-0 [&_h4]:m-0 prose-li:marker:text-black",
      },
      handleDOMEvents: {
        click: (view, event) => {
          const target = event.target;
          if (target instanceof HTMLElement && target.closest("a")) {
            event.preventDefault();
            return true;
          }
          return false;
        },
        mousedown: (view, event) => {
          const target = event.target;
          if (target instanceof HTMLElement && target.closest("a")) {
            event.preventDefault();
            return true;
          }
          return false;
        },
      },
    },
  });

  const { isBold, isLink, isBulletList, currentHeadingLevel } = useEditorState({
    editor,
    selector: (ctx) => ({
      isBold: ctx.editor?.isActive("bold") ?? false,
      isLink: ctx.editor?.isActive("link") ?? false,
      isBulletList: ctx.editor?.isActive("bulletList") ?? false,
      currentHeadingLevel:
        ([1, 2, 3, 4] as HeadingLevel[]).find(
          (level) => ctx.editor?.isActive("heading", { level }) ?? false,
        ) ?? null,
    }),
  });

  const headingSelectValue = currentHeadingLevel
    ? String(currentHeadingLevel)
    : "0";

  const handleBoldToggle = () => {
    if (editor.isActive("bold")) {
      editor.chain().focus().unsetBold().run();
    } else {
      editor.chain().focus().setBold().run();
    }
  };

  const handleBulletListToggle = () => {
    editor.chain().focus().toggleBulletList().run();
  };

  const handleHeadingChange = (key: Key | null) => {
    if (!editor || key === null) return;
    const level = parseInt(String(key), 10) as HeadingLevel | 0;
    if (level === 0) {
      editor.chain().focus().setParagraph().run();
    } else {
      editor.chain().focus().toggleHeading({ level }).run();
    }
  };

  const handleLinkButtonPress = () => {
    setLinkUrl(editor?.getAttributes("link").href ?? "");
    setIsLinkPopoverOpen(true);
  };

  const handleLinkApply = () => {
    if (!editor) return;
    const trimmed = linkUrl.trim();
    if (trimmed === "") {
      editor.chain().focus().unsetLink().run();
    } else {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: trimmed })
        .run();
    }
    setIsLinkPopoverOpen(false);
  };

  const handleLinkRemove = () => {
    if (!editor) return;
    editor.chain().focus().unsetLink().run();
    setIsLinkPopoverOpen(false);
  };

  const handleLinkInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleLinkApply();
    }
  };

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
          <div className="flex items-center gap-2 mb-3">
            <Select
              value={headingSelectValue}
              onChange={handleHeadingChange}
              className="w-35"
              placeholder="なし"
            >
              <Select.Trigger className="border border-gray-200 rounded-md">
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  {HEADING_OPTIONS.map(({ id, label }) => (
                    <ListBox.Item key={id} id={id} textValue={label}>
                      {label}
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>

            <Button
              variant={isBold ? "primary" : "outline"}
              aria-label="太文字"
              aria-pressed={isBold}
              onPress={handleBoldToggle}
              className="w-8 h-8 !rounded-md font-bold text-sm"
              isIconOnly
            >
              B
            </Button>

            <Popover
              isOpen={isLinkPopoverOpen}
              onOpenChange={(open) => {
                setIsLinkPopoverOpen(open);
                if (!open) setLinkUrl("");
              }}
            >
              <Popover.Trigger>
                <Button
                  variant={isLink ? "primary" : "outline"}
                  aria-label="リンクを設定"
                  aria-pressed={isLink}
                  onPress={handleLinkButtonPress}
                  className="w-8 h-8 !rounded-md text-sm"
                  isIconOnly
                >
                  <Icon icon="tabler:link" width={12} height={12} />
                </Button>
              </Popover.Trigger>
              <Popover.Content placement="top">
                <Popover.Dialog>
                  <div className="flex flex-col gap-2 p-1 w-68">
                    <p className="text-sm font-medium text-gray-700">
                      リンクURLを入力
                    </p>
                    <Input
                      autoFocus
                      placeholder="https://example.com"
                      value={linkUrl}
                      onChange={(e) => setLinkUrl(e.target.value)}
                      onKeyDown={handleLinkInputKeyDown}
                      className="w-full"
                    />
                    <div className="flex gap-2 justify-end">
                      {isLink && (
                        <Button
                          variant="outline"
                          size="sm"
                          onPress={handleLinkRemove}
                          className="text-xs"
                        >
                          リンクを削除
                        </Button>
                      )}
                      <Button
                        variant="primary"
                        size="sm"
                        onPress={handleLinkApply}
                        className="text-xs"
                      >
                        設定
                      </Button>
                    </div>
                  </div>
                </Popover.Dialog>
              </Popover.Content>
            </Popover>

            <Button
              variant={isBulletList ? "primary" : "outline"}
              aria-label="箇条書き"
              aria-pressed={isBulletList}
              onPress={handleBulletListToggle}
              className="w-8 h-8 !rounded-md text-sm"
              isIconOnly
            >
              <Icon
                icon="material-symbols-light:format-list-bulleted"
                width={18}
                height={18}
              />
            </Button>
          </div>

          <EditorContent
            editor={editor}
            data-invalid={isInvalid}
            className={editorClassName}
            onClick={(e) => {
              if ((e.target as HTMLElement).closest("a")) {
                e.preventDefault();
              }
            }}
            onMouseDown={(e) => {
              if ((e.target as HTMLElement).closest("a")) {
                e.preventDefault();
              }
            }}
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
