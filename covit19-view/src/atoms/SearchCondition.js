import { atom } from "recoil";

const searchConditionDefault = {
  graphDisplayFlg: false,
};

export const searchConditionState = atom({
  key: "searchCondition",
  default: searchConditionDefault,
});
