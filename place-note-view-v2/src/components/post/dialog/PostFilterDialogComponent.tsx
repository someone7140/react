"use client";

import React, { FC } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  Spinner,
} from "@heroui/react";

import { PostSearchKeywordComponent } from "@/components/post/search/PostSearchKeywordComponent";
import { PostSearchLocationComponent } from "@/components/post/search/PostSearchLocationComponent";
import { PostCategoryDisplayComponent } from "@/components/postCategory/ref/PostCategoryDisplayComponent";
import { PostPlaceListDisplayComponent } from "@/components/postPlace/list/PostPlaceListDisplayComponent";
import {
  GetPostPlacesAndCategoriesQuery,
  PostPlaceResponse,
} from "@/graphql/gen/graphql";
import {
  PostFilterType,
  PostListFilter,
  PostSearchLocationFilter,
} from "@/hooks/inputSessionStore/usePostFilterSessionStore";
import { dialogBoxStyle } from "@/style/CommonStyle";

type Props = {
  openFilterDialogType?: PostFilterType;
  closeDialog: () => void;
  postFilter?: PostListFilter;
  setPostFilter: (filter: PostListFilter | undefined) => void;
  categoryAndPlaceData: GetPostPlacesAndCategoriesQuery | undefined;
  placeNameFilter?: string;
  setPlaceNameFilter: (filter: string) => void;
  onClickPlaceFilter: () => void;
};

export const PostFilterDialogComponent: FC<Props> = ({
  openFilterDialogType,
  closeDialog,
  postFilter,
  setPostFilter,
  categoryAndPlaceData,
  placeNameFilter,
  setPlaceNameFilter,
  onClickPlaceFilter,
}) => {
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
      setPostFilter({
        selectType: PostFilterType.Category,
        category: category,
      });
    }
  };

  const placeSelect = (place: PostPlaceResponse) => {
    handleClose();
    setPostFilter({ selectType: PostFilterType.Place, place: place });
  };

  const locationSelect = (selectLocation: PostSearchLocationFilter) => {
    handleClose();
    setPostFilter({
      selectType: PostFilterType.Location,
      location: selectLocation,
    });
  };

  const keywordSelect = (keyword: string) => {
    handleClose();
    setPostFilter({
      selectType: PostFilterType.Keyword,
      keyword: keyword,
    });
  };

  const onOpenChange = (isOpenChange: boolean) => {
    if (!isOpenChange) closeDialog();
  };

  return (
    <Modal isOpen={!!openFilterDialogType} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            {!categoryAndPlaceData && <Spinner />}
            {categoryAndPlaceData && (
              <>
                <ModalBody className={`${dialogBoxStyle()}`} tabIndex={0}>
                  {openFilterDialogType == PostFilterType.Place && (
                    <div className="flex flex-col mb-3 overflow-scroll max-h-[70vh] !max-w-[95%] min-w-[280px]">
                      <PostPlaceListDisplayComponent
                        placeList={categoryAndPlaceData.getPostPlaces}
                        categoryList={categoryAndPlaceData.getMyPostCategories}
                        nameFilter={placeNameFilter}
                        setNameFilter={setPlaceNameFilter}
                        onClickFilter={onClickPlaceFilter}
                        placeSelectAction={placeSelect}
                      />
                    </div>
                  )}
                  {openFilterDialogType == PostFilterType.Category && (
                    <div className="flex flex-col mb-3 overflow-scroll max-h-[70vh] !max-w-[95%] min-w-[280px]">
                      <PostCategoryDisplayComponent
                        categories={categoryAndPlaceData.getMyPostCategories}
                        updateCategoryIdsFunc={categoryIdSelect}
                        displaySelectButton
                      />
                    </div>
                  )}
                  {openFilterDialogType == PostFilterType.Location && (
                    <div className="mt-3">
                      <PostSearchLocationComponent
                        postFilter={postFilter}
                        locationSelect={locationSelect}
                      />
                    </div>
                  )}
                  {openFilterDialogType == PostFilterType.Keyword && (
                    <div className="mt-3">
                      <PostSearchKeywordComponent
                        postFilter={postFilter}
                        keywordSelect={keywordSelect}
                      />
                    </div>
                  )}
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
