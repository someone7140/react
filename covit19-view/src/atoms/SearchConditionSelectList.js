import { atom } from "recoil";

const searchConditionSelectDefault = [];

export const searchConditionSelectState = atom({
  key: "searchConditionSelect",
  default: searchConditionSelectDefault,
});
