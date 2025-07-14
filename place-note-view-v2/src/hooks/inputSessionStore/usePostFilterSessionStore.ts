import { PostCategoryResponse, PostPlaceResponse } from "@/graphql/gen/graphql";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export enum PostSearchLocationType {
  KeywordSelect = "KeywordSelect",
  NowPositionSelect = "NowPositionSelect",
}

export enum PostFilterType {
  Place = "Place",
  Category = "Category",
  Keyword = "Keyword",
  Location = "Location",
}

export type PostSearchLocationFilter = {
  selectType: PostSearchLocationType;
  radiusKiloMeter?: number;
  addressKeyword?: string;
  lat?: number;
  lon?: number;
};

export type PostListFilter = {
  selectType?: PostFilterType;
  category?: PostCategoryResponse;
  place?: PostPlaceResponse;
  keyword?: string;
  location?: PostSearchLocationFilter;
  isOrderPostDate?: boolean;
};

type PostListFilterSessionStore = {
  postListFilterSession: PostListFilter | undefined;
  updatePostListFilterSession: (input?: PostListFilter) => void;
};

export const usePostListFilterSessionStore =
  create<PostListFilterSessionStore>()(
    persist(
      (set) => ({
        postListFilterSession: undefined,
        updatePostListFilterSession: (input?: PostListFilter) => {
          if (input) {
            set({
              postListFilterSession: input,
            });
          } else {
            set({
              postListFilterSession: undefined,
            });
          }
        },
      }),
      {
        name: "postListFilterSession",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  );
