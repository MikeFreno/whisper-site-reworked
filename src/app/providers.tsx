"use client";
import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import { ClientProvider } from "./trpcClient";

import { api } from "@/utils/api";

export default function Providers(props: { children: any }) {
  return (
    <ClientProvider>
      <SessionProvider>
        <NextUIProvider>{props.children}</NextUIProvider>
      </SessionProvider>
    </ClientProvider>
  );
}
