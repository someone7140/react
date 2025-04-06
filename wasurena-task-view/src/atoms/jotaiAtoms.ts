import { atom } from "jotai";

import { UserAccountResponse } from "@/graphql/gen/graphql";

export const userAccountAtom = atom<UserAccountResponse | undefined>(undefined);
