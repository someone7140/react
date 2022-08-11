import { atom } from "recoil";

const authCheckDefault = {
  checked: false,
};

export const authCheckState = atom({
  key: "authCheck",
  default: authCheckDefault,
});
