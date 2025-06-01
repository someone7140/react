"use client";

import React, { FC, useState } from "react";
import { Key } from "@react-types/shared";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  Spinner,
  Tab,
  Tabs,
} from "@heroui/react";

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
  const [activeTab, setActiveTab] = useState<Key>(
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

  const onOpenChange = (isOpenChange: boolean) => {
    if (!isOpenChange) closeDialog();
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            {!categoryAndPlaceData && <Spinner />}
            {categoryAndPlaceData && (
              <>
                <ModalBody className={`${dialogBoxStyle()}`} tabIndex={0}>
                  <Tabs
                    className="max-w-[99%]"
                    selectedKey={activeTab}
                    onSelectionChange={setActiveTab}
                  >
                    <Tab key="place" title="場所を選択">
                      <div className="flex flex-col mb-3 overflow-scroll max-h-[60vh] !max-w-[95%] min-w-[280px]">
                        <PostPlaceListDisplayComponent
                          placeList={categoryAndPlaceData.getPostPlaces}
                          categoryList={
                            categoryAndPlaceData.getMyPostCategories
                          }
                          nameFilter={placeNameFilter}
                          setNameFilter={setPlaceNameFilter}
                          onClickFilter={onClickPlaceFilter}
                          placeSelectAction={placeSelect}
                        />
                      </div>
                    </Tab>
                    <Tab key="category" title="カテゴリーを選択">
                      <div className="flex justify-start mb-3 overflow-scroll max-h-[60vh] max-w-[99%] min-w-[280px]">
                        <PostCategoryDisplayComponent
                          categories={categoryAndPlaceData.getMyPostCategories}
                          updateCategoryIdsFunc={categoryIdSelect}
                          displaySelectButton
                        />
                      </div>
                    </Tab>
                  </Tabs>
                </ModalBody>
                <ModalFooter className="flex justify-center mb-3">
                  <Button color="default" onPress={onClose}>
                    閉じる
                  </Button>
                </ModalFooter>
              </>
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
