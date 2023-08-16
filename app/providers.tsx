"use client";

import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";
import store from "@/app/store";
import { fetchUser } from "@/features/userSlice";
import { useEffect } from "react";

type Props = {
  children?: React.ReactNode;
};

export const Providers = ({ children }: Props) => {
  return (
    <SessionProvider>
      <Provider store={store}>
        <NextUIProvider>{children}</NextUIProvider>
      </Provider>
    </SessionProvider>
  );
};
