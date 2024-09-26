import { PostCategoryResponse } from "@/graphql/gen/graphql";

export const getRootCategoryList = (categoryList: PostCategoryResponse[]) => {
  return categoryList.filter(
    (child) =>
      !categoryList.some((parent) => child.parentCategoryId === parent.id)
  );
};

export const getChildrenCategory = (
  categoryList: PostCategoryResponse[],
  parentId: string
) => {
  return categoryList.filter((child) => child.parentCategoryId === parentId);
};
