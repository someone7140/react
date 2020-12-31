import { atom } from "recoil";

const loginUserDefault = {
  loginUser: undefined,
};

export const loginUserState = atom({
  key: "loginUser",
  default: loginUserDefault,
});
