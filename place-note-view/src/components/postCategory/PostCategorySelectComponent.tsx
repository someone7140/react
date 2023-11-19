"use client";

import React, { FC, useState } from "react";

import { Button, Checkbox, Modal } from "flowbite-react";

import { useQuery } from "@tanstack/react-query";
import { getPostCategoryList } from "@/gen/placeNotePostCategoryService-PostCategoryService_connectquery";
import { errorMessageStyle } from "@/style/MessageStyle";
import { PostCategoryListComponent } from "@/components/postCategory/PostCategoryListComponent";

type Props = {
  selectedIds: string[];
  setIds: (ids: string[]) => void;
};

export const PostCategorySelectComponent: FC<Props> = ({
  selectedIds,
  setIds,
}) => {
  const { queryFn: categoryQueryFn, queryKey: categoryQueryKey } =
    getPostCategoryList.useQuery({});
  const { data, isLoading, isError } = useQuery({
    queryKey: categoryQueryKey,
    queryFn: categoryQueryFn,
    retry: 3,
  });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const renderCheckBox = (categoryId: string) => {
    return (
      <div className="ml-4" key={categoryId}>
        {
          <Checkbox
            onChange={(e) => {
              if (e.target.checked) {
                setIds([...selectedIds, categoryId]);
              } else {
                setIds(selectedIds.filter((id) => id !== categoryId));
              }
            }}
            checked={selectedIds.some((id) => id === categoryId)}
            className="w-6 h-6"
          />
        }
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-2">
      {!isError && (
        <>
          {data?.categoryList.length !== 0 && (
            <Button
              color="purple"
              pill
              onClick={() => {
                setIsModalOpen(true);
              }}
              disabled={isLoading}
              className="w-36"
            >
              <p>カテゴリー選択</p>
            </Button>
          )}
          {data && (
            <>
              {data.categoryList.length === 0 && (
                <div>カテゴリーが未登録です</div>
              )}
              <ul className="list-disc ml-4">
                {selectedIds.map((id) => {
                  return (
                    <li key={id} className="ml-2">
                      {data.categoryList.find((c) => c.id === id)?.name}
                    </li>
                  );
                })}
              </ul>
              <Modal
                show={isModalOpen}
                onClose={() => {
                  setIsModalOpen(false);
                }}
                dismissible
              >
                <Modal.Header>カテゴリー選択</Modal.Header>
                <Modal.Body>
                  <PostCategoryListComponent
                    categoryList={data.categoryList}
                    renderCategoryAction={renderCheckBox}
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    color="dark"
                    pill
                    onClick={() => {
                      setIsModalOpen(false);
                    }}
                  >
                    閉じる
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          )}
        </>
      )}
      {isError && (
        <div className={errorMessageStyle()}>カテゴリー取得エラー</div>
      )}
    </div>
  );
};
