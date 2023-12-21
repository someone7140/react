"use client";

import { PostCategoryResponse } from "@/gen/placeNotePostCategoryService_pb";
import React, { FC, ReactNode } from "react";

import { tv } from "tailwind-variants";

type Props = {
  categoryList: PostCategoryResponse[];
  renderCategoryAction: (id: string) => ReactNode;
};

export const PostCategoryListComponent: FC<Props> = ({
  categoryList,
  renderCategoryAction,
}) => {
  const memoStyle = tv({
    base: "mt-2 max-w-[80%] break-all whitespace-pre text-stone-500",
  });

  const getRootCategoryList = () => {
    return (
      categoryList.filter(
        (child) => !categoryList.some((parent) => child.parentId === parent.id)
      ) ?? []
    );
  };

  const renderChild = (parentId: string) => {
    const childList =
      categoryList.filter((child) => child.parentId === parentId) ?? [];

    if (childList.length === 0) {
      return undefined;
    } else {
      return (
        <ul className="list-disc mt-4 ml-4">
          {childList.map((c) => {
            const action = renderCategoryAction(c.id);
            return (
              <li className="ml-2 mb-4 marker:text-lime-700" key={c.id}>
                <div className="flex-column">
                  <div className="flex content-between items-center">
                    <div className={`text-xl max-w-sm break-all text-lime-700`}>
                      {c.name}
                    </div>
                    {action}
                  </div>
                  {c.memo && <div className={memoStyle()}>{c.memo}</div>}
                </div>
              </li>
            );
          })}
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
              <div className="text-xl max-w-sm break-all">{c.name}</div>
              {renderCategoryAction(c.id)}
            </div>
            {c.memo && <div className={memoStyle()}>{c.memo}</div>}
          </div>
          {renderChild(c.id)}
        </li>
      ))}
    </ul>
  );
};
