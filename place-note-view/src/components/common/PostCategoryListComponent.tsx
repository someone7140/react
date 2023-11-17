"use client";

import React, { FC, useState } from "react";

import { Button } from "flowbite-react";
import { Spinner } from "flowbite-react";
import { tv } from "tailwind-variants";

import { centerHorizonContainerStyle } from "@/style/CommonStyle";
import { useQuery } from "@tanstack/react-query";
import { getPostCategoryList } from "@/gen/placeNotePostCategoryService-PostCategoryService_connectquery";
import { useRouter } from "next/navigation";
import {
  descriptionMessageStyle,
  errorMessageStyle,
} from "@/style/MessageStyle";
import { DeleteCategoryModalComponent } from "@/components/postCategoryRegister/DeleteCategoryModalComponent";

export const PostCategoryListComponent: FC = ({}) => {
  const router = useRouter();
  const [deleteCategoryId, setDeleteCategoryId] = useState<string | undefined>(
    undefined
  );
  const { queryFn, queryKey } = getPostCategoryList.useQuery({});
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey,
    queryFn,
    retry: 3,
  });

  const memoStyle = tv({
    base: "mt-2 max-w-[80%] break-all whitespace-pre text-stone-500",
  });

  const getRootCategoryList = () => {
    return (
      data?.categoryList.filter(
        (child) =>
          !data?.categoryList.some((parent) => child.parentId === parent.id)
      ) ?? []
    );
  };

  const renderButton = (categoryId: string) => {
    return (
      <div className="flex ml-4 gap-2">
        <Button
          color="purple"
          pill
          onClick={() => {
            router.push(`/myCategory/categoryEdit?id=${categoryId}`);
          }}
        >
          <p>編集</p>
        </Button>
        <Button
          color="dark"
          pill
          onClick={() => {
            setDeleteCategoryId(categoryId);
          }}
        >
          <p>削除</p>
        </Button>
      </div>
    );
  };

  const renderChild = (parentId: string) => {
    const childList =
      data?.categoryList.filter((child) => child.parentId === parentId) ?? [];

    if (childList.length === 0) {
      return undefined;
    } else {
      return (
        <ul className="list-disc mt-4 ml-4">
          {childList.map((c) => (
            <li className="ml-2 mb-4 marker:text-lime-700" key={c.id}>
              <div className="flex-column">
                <div className="flex content-between items-center">
                  <div className="text-xl max-w-[50%] break-all text-lime-700">
                    {c.name}
                  </div>
                  {renderButton(c.id)}
                </div>
                {c.memo && <div className={memoStyle()}>{c.memo}</div>}
              </div>
            </li>
          ))}
        </ul>
      );
    }
  };

  return (
    <ul className="list-disc mt-4">
      {getRootCategoryList().map((c) => (
        <li className="ml-4 mb-4" key={c.id}>
          <div className="flex-column">
            <div className="flex content-between items-center">
              <div className="text-xl max-w-[50%] break-all">{c.name}</div>
              {renderButton(c.id)}
            </div>
            {c.memo && <div className={memoStyle()}>{c.memo}</div>}
          </div>
          {renderChild(c.id)}
        </li>
      ))}
    </ul>
  );
};
