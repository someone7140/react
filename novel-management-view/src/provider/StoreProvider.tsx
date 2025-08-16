/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import {
  makeStore,
  AppStore,
  AppPersistor,
  makePersistor,
} from "@/store/reduxStore";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>(undefined);
  const persistorRef = useRef<AppPersistor>(undefined);

  if (!storeRef.current) {
    // ストアを作成
    storeRef.current = makeStore();
    persistorRef.current = makePersistor(storeRef.current);
  }

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={<></>} persistor={persistorRef.current as any}>
        {children}
      </PersistGate>
    </Provider>
  );
}
