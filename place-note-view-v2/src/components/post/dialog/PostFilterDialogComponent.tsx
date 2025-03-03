"use client";

import React, { FC, useState } from "react";
import {
  Button,
  Dialog,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Spinner,
} from "@material-tailwind/react";

import { PostListFilter } from "../PostListComponent";
import { PostCategoryDisplayComponent } from "@/components/postCategory/ref/PostCategoryDisplayComponent";
import { PostPlaceListDisplayComponent } from "@/components/postPlace/list/PostPlaceListDisplayComponent";
import {
  GetPostPlacesAndCategoriesQuery,
  PostPlaceResponse,
} from "@/graphql/gen/graphql";
import { dialogBoxStyle } from "@/style/CommonStyle";

type Props = {
  isOpen: boolean;
  closeDialog: () => void;
  postFilter?: PostListFilter;
  setPostFilter: (filter: PostListFilter | undefined) => void;
  categoryAndPlaceData: GetPostPlacesAndCategoriesQuery | undefined;
  placeNameFilter?: string;
  setPlaceNameFilter: (filter: string) => void;
  onClickPlaceFilter: () => void;
};

export const PostFilterDialogComponent: FC<Props> = ({
  isOpen,
  closeDialog,
  postFilter,
  setPostFilter,
  categoryAndPlaceData,
  placeNameFilter,
  setPlaceNameFilter,
  onClickPlaceFilter,
}) => {
  const [activeTab, setActiveTab] = useState(
    postFilter?.category ? "category" : "place"
  );

  const handleClose = () => {
    closeDialog();
    setPlaceNameFilter("");
  };

  const categoryIdSelect = (id: string) => {
    const category = categoryAndPlaceData?.getMyPostCategories.find(
      (c) => c.id === id
    );
    if (category) {
      handleClose();
      setPostFilter({ category: category });
    }
  };

  const placeSelect = (place: PostPlaceResponse) => {
    handleClose();
    setPostFilter({ place: place });
  };

  return (
    <Dialog open={isOpen} handler={handleClose}>
      {!categoryAndPlaceData && <Spinner />}
      {categoryAndPlaceData && (
        <div className={`${dialogBoxStyle()}`} tabIndex={0}>
          <Tabs value={activeTab} className="max-w-[99%]">
            <TabsHeader
              className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
              indicatorProps={{
                id: "tabs-header-indicator",
                className:
                  "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
              }}
            >
              <Tab
                value={"place"}
                onClick={() => setActiveTab("place")}
                className={
                  "[&_#tabs-header-indicator]:!translate-x-0 " +
                  (activeTab === "place" ? "text-gray-900" : "")
                }
              >
                場所を選択
              </Tab>
              <Tab
                value={"category"}
                onClick={() => setActiveTab("category")}
                className={
                  "[&_#tabs-header-indicator]:!translate-x-0 " +
                  (activeTab === "category" ? "text-gray-900" : "")
                }
              >
                カテゴリーを選択
              </Tab>
            </TabsHeader>
            <TabsBody
              animate={{
                initial: { opacity: 1 },
                mount: { opacity: 1 },
                unmount: { opacity: 1 },
              }}
            >
              {activeTab === "place" ? (
                <TabPanel value={"place"}>
                  <div className="flex flex-col mb-3 overflow-scroll max-h-[60vh] !max-w-[95%] min-w-[280px]">
                    <PostPlaceListDisplayComponent
                      placeList={categoryAndPlaceData.getPostPlaces}
                      categoryList={categoryAndPlaceData.getMyPostCategories}
                      nameFilter={placeNameFilter}
                      setNameFilter={setPlaceNameFilter}
                      onClickFilter={onClickPlaceFilter}
                      placeSelectAction={placeSelect}
                    />
                  </div>
                </TabPanel>
              ) : (
                <TabPanel value={"category"}>
                  <div className="flex justify-start mb-3 overflow-scroll max-h-[60vh] max-w-[99%] min-w-[280px]">
                    <PostCategoryDisplayComponent
                      categories={categoryAndPlaceData.getMyPostCategories}
                      updateCategoryIdsFunc={categoryIdSelect}
                      displaySelectButton
                    />
                  </div>
                </TabPanel>
              )}
            </TabsBody>
          </Tabs>
          <div className="flex justify-center mt-3 mb-3">
            <Button color="blue-gray" onClick={handleClose}>
              閉じる
            </Button>
          </div>
        </div>
      )}
    </Dialog>
  );
};
