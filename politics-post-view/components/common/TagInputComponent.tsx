"use client";

import { FC, useEffect, useRef } from "react";
import { ChangeEventData, InputEventData, TagData } from "@yaireo/tagify";
import Tags from "@yaireo/tagify/react";
import "@yaireo/tagify/dist/tagify.css";

type Props = {
  defaultValues: string[];
  fetchSelectList: (keyword: string) => void;
  onChangeTags: (tags: string[]) => void;
  selectList: string[];
};

export const TagInputComponent: FC<Props> = ({
  defaultValues,
  fetchSelectList,
  onChangeTags,
  selectList,
}) => {
  const tagifyRef = useRef<any>(undefined);

  useEffect(() => {
    const tagify = tagifyRef.current;
    if (!tagify) return;

    tagify.whitelist = selectList;

    const currentInput = tagify.state?.inputText ?? "";

    if (selectList.length === 0) {
      tagify.dropdown.hide();
      return;
    }

    if (currentInput) {
      tagify.dropdown.show(currentInput);
    }
  }, [selectList]);

  const onInput = async (event: CustomEvent<InputEventData<TagData>>) => {
    const typingValue =
      "value" in event.detail ? event.detail.value : event.detail.textContent;
    if (typingValue) {
      fetchSelectList(typingValue);
    }
  };

  const onChange = (event: CustomEvent<ChangeEventData<TagData>>) => {
    const commitTags = event.detail.tagify.value;
    onChangeTags(commitTags.map((t) => t.value));
  };

  return (
    <Tags
      tagifyRef={tagifyRef}
      settings={{
        delimiters: " |　",
        trim: false,
        dropdown: {
          enabled: 1,
          highlightFirst: true,
        },
      }}
      placeholder="スペース入力でタグ区切り"
      onInput={onInput}
      onChange={onChange}
      defaultValue={defaultValues}
      whitelist={selectList}
      className="!min-h-[42px] w-[350px] !rounded-md !border-[1.5px] border-gray-400 bg-transparent text-sm shadow-sm transition-colors placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-950 focus:border-gray-950 focus-within:outline-none focus-within:ring-1 focus-within:ring-gray-950 focus-within:border-gray-950 disabled:cursor-not-allowed disabled:opacity-50"
    />
  );
};
