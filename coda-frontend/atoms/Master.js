import { atom } from "recoil";

const masterDefault = {
  master: undefined,
};

export const masterState = atom({
  key: "master",
  default: masterDefault,
});
