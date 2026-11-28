"use client";

import { FC, useLayoutEffect, useRef, useState } from "react";
import { Button, Modal } from "@heroui/react";
import { Markdown } from "@tiptap/markdown";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import HardBreak from "@tiptap/extension-hard-break";
import Link from "@tiptap/extension-link";

type PostContentsExpandableProps = {
  title: string;
  markdown: string;
  additionalInfo: { info: string; addedAt: Date }[];
};

export const PostContentsExpandable: FC<PostContentsExpandableProps> = ({
  title,
  markdown,
  additionalInfo,
}) => {
  const previewRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [isPreviewOverflowing, setIsPreviewOverflowing] = useState(false);
  const [isContentsModalOpen, setIsContentsModalOpen] = useState(false);

  const shouldShowButton = isPreviewOverflowing || additionalInfo.length > 0;

  useLayoutEffect(() => {
    const container = previewRef.current;
    const content = contentRef.current;
    if (!container || !content) {
      setIsPreviewOverflowing(false);
      return;
    }

    const check = () => {
      setIsPreviewOverflowing(
        container.scrollHeight > container.clientHeight + 1,
      );
    };

    check();
    const observer = new ResizeObserver(check);
    observer.observe(content);
    return () => observer.disconnect();
  }, [markdown]);

  return (
    <>
      {shouldShowButton && (
        <div className="mt-2 flex justify-end">
          <Button
            size="sm"
            variant="secondary"
            className="text-xs"
            onPress={() => setIsContentsModalOpen(true)}
          >
            全文表示
          </Button>
        </div>
      )}
      <div
        ref={previewRef}
        className="mt-1 max-h-[4.5rem] overflow-hidden break-words text-black leading-6"
      >
        <div ref={contentRef}>
          <PostMarkdownView markdown={markdown} />
        </div>
      </div>

      <Modal>
        <Modal.Backdrop
          isOpen={isContentsModalOpen}
          onOpenChange={setIsContentsModalOpen}
        >
          <Modal.Container>
            <Modal.Dialog className="max-h-[85vh] sm:max-w-[720px]">
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Heading className="text-xl font-bold">{title}</Modal.Heading>
              </Modal.Header>
              <Modal.Body className="overflow-y-auto">
                <PostMarkdownView markdown={markdown} />
                {additionalInfo.length > 0 && (
                  <section className="mt-6 border-t border-gray-200 pt-4">
                    <h3 className="mb-2 font-semibold">補足情報</h3>
                    <div className="flex flex-col gap-4">
                      {additionalInfo.map((info, index) => (
                        <PostMarkdownView key={index} markdown={info.info} />
                      ))}
                    </div>
                  </section>
                )}
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
};

const PostMarkdownView: FC<{ markdown: string }> = ({ markdown }) => {
  const editor = useEditor(
    {
      extensions: [
        StarterKit,
        HardBreak,
        Link.configure({ openOnClick: false }),
        Markdown.configure({ markedOptions: { gfm: true } }),
      ],
      content: markdown,
      contentType: "markdown",
      editable: false,
      immediatelyRender: false,
      editorProps: {
        attributes: {
          class:
            "prose prose-a:text-blue-600 max-w-none [&_p]:m-0 [&_h1]:m-0 [&_h2]:m-0 [&_h3]:m-0 [&_h4]:m-0",
        },
      },
    },
    [markdown],
  );

  return <EditorContent editor={editor} />;
};
