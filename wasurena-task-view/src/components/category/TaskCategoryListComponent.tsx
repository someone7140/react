"use client";

import React, { FC, useEffect, useState } from "react";
import Link from "next/link";
import { notifications } from "@mantine/notifications";
import { Button, Card, Loader } from "@mantine/core";

import { TaskCategoryDeleteModalComponent } from "./modal/TaskCategoryDeleteModalComponent";
import { CATEGORY_REGISTER_PAGE_PATH } from "@/constants/MenuPathConstants";
import { useGetTaskCategoriesQuery } from "@/graphql/gen/graphql";
import { linkStyle } from "@/style/commonStyle";

export const TaskCategoryListComponent: FC = ({}) => {
  const [{ data, fetching, error }, reexecuteQuery] = useGetTaskCategoriesQuery(
    { requestPolicy: "network-only" }
  );
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);

  const refetchCategoryList = () => {
    reexecuteQuery({ requestPolicy: "network-only" });
  };

  useEffect(() => {
    if (error) {
      notifications.show({
        id: "getCategories-error",
        position: "top-center",
        withCloseButton: true,
        autoClose: 5000,
        title: "取得エラー",
        message: "カテゴリーの取得に失敗しました",
        color: "red",
        loading: false,
      });
    }
  }, [error]);

  const categoryList = data?.getTaskCategories;

  return (
    <>
      {fetching && <Loader size={30} />}
      {!fetching && categoryList && (
        <>
          {categoryList.length === 0 && (
            <div className="w-[310px]">
              カテゴリーが未登録です。
              <Link
                href={CATEGORY_REGISTER_PAGE_PATH}
                className={`${linkStyle()}`}
              >
                こちら
              </Link>
              から登録ができます。
            </div>
          )}
          {categoryList.length > 0 && (
            <div className="flex flex-col gap-5 min-w-[300px] max-w-[335px]">
              {categoryList.map((category) => {
                return (
                  <React.Fragment key={category.id}>
                    <Card shadow="sm" padding="lg" radius="md" withBorder>
                      <div className="text-xl font-semibold break-all">
                        {category.name}
                      </div>
                      {category.displayOrder != null && (
                        <div>表示順：{category.displayOrder}</div>
                      )}
                      <div className="flex justify-center mt-2 gap-3">
                        <Button color="orange">編集</Button>
                        <Button
                          color="gray"
                          onClick={() => {
                            setIsOpenDeleteModal(true);
                          }}
                        >
                          削除
                        </Button>
                      </div>
                    </Card>
                    <TaskCategoryDeleteModalComponent
                      category={category}
                      isOpen={isOpenDeleteModal}
                      setIsOpen={setIsOpenDeleteModal}
                      refetch={refetchCategoryList}
                    />
                  </React.Fragment>
                );
              })}
            </div>
          )}
        </>
      )}
    </>
  );
};
